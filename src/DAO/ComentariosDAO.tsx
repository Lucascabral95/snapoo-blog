import mongo from "@/services/mongoDB";
import Comentarios from "@/models/Comentarios";
import Usuarios from "@/models/Usuario";
import { ACTIVE_ACCOUNT_FILTER } from "@/infrastructure/account/account-status";
export interface CommentRecord { _id?: unknown; emisor: string; likes: number; posteo: string; usuario: unknown; contenido: string; parentComment?: unknown; }
class DAOComentarios {
  async createComentario(data: CommentRecord): Promise<CommentRecord> { await mongo(); return Comentarios.create(data); }
  async getComentarios(post: string): Promise<CommentRecord[]> { await mongo(); const activeUsers = await Usuarios.find(ACTIVE_ACCOUNT_FILTER).select("_id").lean(); return Comentarios.find({ posteo: post, moderationState: { $ne: "removed" }, usuario: { $in: activeUsers.map((user: any) => user._id) } }).sort({ createdAt: 1 }).populate("usuario", "avatar userName").lean<CommentRecord[]>(); }
  async getComentarioByID(id: string): Promise<CommentRecord | null> { await mongo(); return Comentarios.findById(id).lean<CommentRecord>(); }
  async deleteComentarioByID(id: string): Promise<CommentRecord | null> { await mongo(); return Comentarios.findOneAndDelete({ _id: id }).lean<CommentRecord>(); }
}
const daoComentarios = new DAOComentarios();
export default daoComentarios;

