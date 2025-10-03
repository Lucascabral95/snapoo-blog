import type { PostDetailProps } from "@/infrastructure/types";

import styles from "./PostDetail.module.scss";
import PostDetailHeader from "./PostDetailHeader";
import PostDetailImage from "./PostDetailImage";
import PostDetailInfo from "./PostDetailInfo";
import PostDetailActions from "./PostDetailActions";

interface PostDetailComponentProps extends PostDetailProps {}

export default function PostDetail(props: PostDetailComponentProps) {
  return (
    <article className={styles.postDetail}>
      <PostDetailHeader
        usuario={props.usuario}
        username={props.username}
        fecha={props.fecha}
      />

      <PostDetailImage url={props.url} descripcion={props.descripcion} />

      <PostDetailInfo descripcion={props.descripcion} likes={props.likes} />

      <PostDetailActions postId={props.id} likes={props.likes} />
    </article>
  );
}
