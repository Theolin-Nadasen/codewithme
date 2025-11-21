import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      rank?: number;
      proStatus?: boolean;
      dailyApiUses?: number;
      lastApiUseDate?: Date;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    rank?: number;
    proStatus?: boolean;
    dailyApiUses?: number;
    lastApiUseDate?: Date;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    rank?: number;
    proStatus?: boolean;
    dailyApiUses?: number;
    lastApiUseDate?: Date;
    role?: string;
  }
}
