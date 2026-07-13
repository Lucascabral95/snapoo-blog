import "server-only";

import { getServerSession } from "next-auth";
import { authOptions } from "./options";

export async function getAuthenticatedUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  return {
    id: session.user.id,
    userName: session.user.userName,
    email: session.user.email,
  };
}
