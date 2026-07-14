import { NextResponse } from "next/server";
import { getActiveAuthenticatedUser } from "@/infrastructure/auth/session";
import mongo from "@/services/mongoDB";
import Usuarios from "@/models/Usuario";
import DatosPersonales from "@/models/DatosPersonales";
import Posteos from "@/models/Posteos";
import Comentarios from "@/models/Comentarios";
import PostLike from "@/models/PostLike";
import UserFollow from "@/models/UserFollow";
import UserBlock from "@/models/UserBlock";
export async function GET() { const user = await getActiveAuthenticatedUser(); if (!user) return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 }); await mongo(); const [profile, personalData, posts, comments, likes, follows, blocks] = await Promise.all([Usuarios.findById(user.id).select("email userName avatar emailVerifiedAt isPrivate acceptsMessages createdAt").lean(), DatosPersonales.findOne({ user: user.id }).lean(), Posteos.find({ usuario: user.id }).lean(), Comentarios.find({ usuario: user.id }).lean(), PostLike.find({ user: user.id }).lean(), UserFollow.find({ $or: [{ follower: user.id }, { followed: user.id }] }).lean(), UserBlock.find({ $or: [{ blocker: user.id }, { blocked: user.id }] }).lean()]); const response = NextResponse.json({ exportedAt: new Date().toISOString(), profile, personalData, posts, comments, likes, follows, blocks }); response.headers.set("Content-Disposition", 'attachment; filename="snapoo-data.json"'); return response; }
