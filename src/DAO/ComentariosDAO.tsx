import mongo from "@/services/mongoDB";
import Comentarios from "@/models/Comentarios";

export interface CommentRecord {
  _id?: unknown;
  emisor: string;
  likes: number;
  posteo: string;
  usuario: unknown;
  contenido: string;
}

class DAOComentarios {
  async createComentario(data: CommentRecord): Promise<CommentRecord> {
    await mongo();
    return Comentarios.create(data);
  }

  async getComentarios(post: string): Promise<CommentRecord[]> {
    await mongo();
    return Comentarios.find({ posteo: post }).populate("usuario", "avatar userName").lean<CommentRecord[]>();
  }

  async getComentarioByID(id: string): Promise<CommentRecord | null> {
    await mongo();
    return Comentarios.findById(id).lean<CommentRecord>();
  }

  async deleteComentarioByID(id: string): Promise<CommentRecord | null> {
    await mongo();
    return Comentarios.findOneAndDelete({ _id: id }).lean<CommentRecord>();
  }
}

const daoComentarios = new DAOComentarios();
export default daoComentarios;
