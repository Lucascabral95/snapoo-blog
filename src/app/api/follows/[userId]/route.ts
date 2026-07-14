import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getActiveAuthenticatedUser } from "@/infrastructure/auth/session";
import mongo from "@/services/mongoDB";
import Usuarios from "@/models/Usuario";
import UserFollow from "@/models/UserFollow";
import { createSocialNotification, removeGroupedSocialNotification, usersAreBlocked } from "@/infrastructure/social/notifications";
import { ACTIVE_ACCOUNT_FILTER } from "@/infrastructure/account/account-status";

async function current() { const user = await getActiveAuthenticatedUser(); return user || NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 }); }
export async function GET(_: Request, { params }: { params: Promise<{ userId: string }> }) { const user = await current(); if (user instanceof NextResponse) return user; const { userId } = await params; if (!mongoose.isValidObjectId(userId)) return NextResponse.json({ code: "VALIDATION_ERROR" }, { status: 400 }); await mongo(); return NextResponse.json({ result: { following: Boolean(await UserFollow.exists({ follower: user.id, followed: userId })) } }); }
export async function PUT(_: Request, { params }: { params: Promise<{ userId: string }> }) { const user = await current(); if (user instanceof NextResponse) return user; const { userId } = await params; if (!mongoose.isValidObjectId(userId) || userId === user.id) return NextResponse.json({ code: "VALIDATION_ERROR" }, { status: 400 }); await mongo(); if (!await Usuarios.exists({ _id: userId, ...ACTIVE_ACCOUNT_FILTER })) return NextResponse.json({ code: "NOT_FOUND" }, { status: 404 }); if (await usersAreBlocked(user.id, userId)) return NextResponse.json({ code: "FORBIDDEN" }, { status: 403 }); try { await UserFollow.create({ follower: user.id, followed: userId }); } catch (error: any) { if (error?.code !== 11000) throw error; } await createSocialNotification({ recipient: userId, actor: user.id, type: "user_follow", resourceType: "profile", resourceId: userId, href: `/usuario/perfil/${user.userName ?? ""}` }); return NextResponse.json({ result: { following: true } }); }
export async function DELETE(_: Request, { params }: { params: Promise<{ userId: string }> }) { const user = await current(); if (user instanceof NextResponse) return user; const { userId } = await params; await mongo(); const deleted = await UserFollow.findOneAndDelete({ follower: user.id, followed: userId }); if (deleted) await removeGroupedSocialNotification({ recipient: userId, actor: user.id, type: "user_follow", resourceId: userId }); return NextResponse.json({ result: { following: false } }); }
