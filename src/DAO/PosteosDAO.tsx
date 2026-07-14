import mongo from "@/services/mongoDB";
import Posteos from "@/models/Posteos";
import Usuarios from "@/models/Usuario";
import UserFollow from "@/models/UserFollow";
import { getBlockedUserIds } from "@/infrastructure/moderation/visibility";
import { ACTIVE_ACCOUNT_FILTER } from "@/infrastructure/account/account-status";

async function visibleUserIds(viewerId?: string): Promise<unknown[]> {
  const [users, blockedUsers, follows] = await Promise.all([
    Usuarios.find(ACTIVE_ACCOUNT_FILTER).select("_id isPrivate").lean(),
    getBlockedUserIds(viewerId),
    viewerId ? UserFollow.find({ follower: viewerId }).select("followed").lean() : [],
  ]);
  const followedIds = new Set(follows.map((follow: any) => String(follow.followed)));
  return users.filter((user: any) => !blockedUsers.includes(String(user._id)) && (!user.isPrivate || String(user._id) === viewerId || followedIds.has(String(user._id)))).map((user: any) => user._id);
}

class DAOPosteos {
  async getAll(viewerId?: string): Promise<any> { await mongo(); return Posteos.find({ moderationState: { $ne: "removed" }, usuario: { $in: await visibleUserIds(viewerId) } }).populate("usuario"); }
  async getPosteoByID(id: string, viewerId?: string): Promise<any> { await mongo(); return Posteos.findOne({ _id: id, moderationState: { $ne: "removed" }, usuario: { $in: await visibleUserIds(viewerId) } }).populate("usuario"); }
  async getAllWithoutPopulate(viewerId?: string): Promise<any> { await mongo(); return Posteos.find({ moderationState: { $ne: "removed" }, usuario: { $in: await visibleUserIds(viewerId) } }); }
  async createPost(data: any): Promise<any> { await mongo(); return Posteos.create(data); }
  async deletePosteoByID(id: string): Promise<any> { await mongo(); return Posteos.findOneAndDelete({ _id: id }); }
  async filtrarPosteosPorUsuario(id: string): Promise<any> { await mongo(); const user = await Usuarios.findOne({ _id: id, ...ACTIVE_ACCOUNT_FILTER }); return user ? Posteos.find({ usuario: id, moderationState: { $ne: "removed" } }).populate("usuario") : []; }
  async likePosteo(id: string): Promise<any> { await mongo(); return Posteos.findOneAndUpdate({ _id: id }, { $inc: { likes: 1 } }, { new: true }); }
  async getAllPosteosByUserNameId(userName: string): Promise<any> { await mongo(); const user = await Usuarios.findOne({ userName, ...ACTIVE_ACCOUNT_FILTER }); return user ? Posteos.find({ usuario: user._id, moderationState: { $ne: "removed" } }) : []; }
}
const daoPosteos = new DAOPosteos();
export default daoPosteos;
