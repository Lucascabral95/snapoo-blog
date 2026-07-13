"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Search, Users } from "lucide-react";
import Avvvatars from "avvvatars-react";
import Skeleton from "react-loading-skeleton";
import { useDebounce } from "@/presentation/hooks/useDebounce";
import Card from "@/presentation/components/UI/Card";
import Button from "@/presentation/components/UI/Button";
import StateBlock from "@/presentation/components/UI/StateBlock";
import searchStyles from "@/presentation/components/Search/Search.module.scss";
import styles from "./People.module.scss";

interface Post {
  _id: string;
  descripcion: string;
  imagen: string;
  usuario: {
    email: string;
    userName: string;
  };
}

interface Creator {
  userName: string;
  email: string;
}

export default function PeoplePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const debouncedInput = useDebounce(input, 300);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get("/api/posteos");
        if (data?.result) setPosts(data.result);
      } catch (error) {
        console.error("Error al cargar creadores:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  const creators = useMemo(() => {
    const byUsername = new Map<string, Creator>();
    posts.forEach((post) => {
      const userName = post.usuario?.userName;
      if (userName && !byUsername.has(userName)) {
        byUsername.set(userName, { userName, email: post.usuario.email });
      }
    });
    return Array.from(byUsername.values());
  }, [posts]);

  const filteredCreators = useMemo(() => {
    const term = debouncedInput.trim().toLowerCase();
    if (!term) return creators;
    return creators.filter(
      (creator) => creator.userName.toLowerCase().includes(term) || creator.email.toLowerCase().includes(term),
    );
  }, [creators, debouncedInput]);

  return (
    <div className={searchStyles.page}>
      <div className={searchStyles.header}>
        <div className={searchStyles.searchInput}>
          <Search size={14} className={searchStyles.searchIcon} />
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Buscar personas..."
            className={searchStyles.input}
            autoComplete="off"
          />
        </div>
      </div>

      {isLoading ? (
        <div className={styles.grid}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} height={92} borderRadius={16} />
          ))}
        </div>
      ) : filteredCreators.length === 0 ? (
        <StateBlock
          icon={<Users size={22} />}
          title="No encontramos creadores"
          description="Probá con otro nombre de usuario o email."
        />
      ) : (
        <div className={styles.grid}>
          {filteredCreators.map((creator) => (
            <Card key={creator.userName} className={styles.card}>
              <Avvvatars value={creator.userName} size={44} />
              <div className={styles.info}>
                <p className={styles.name}>{creator.userName}</p>
              </div>
              <Button href={`/usuario/${creator.userName}`} variant="secondary" size="sm">
                Ver perfil
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
