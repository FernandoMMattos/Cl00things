"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserID from "@/hooks/useUserID";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { userId, loading } = useUserID();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !userId) {
      router.replace("/login");
    }
  }, [userId, loading, router]);

  if (loading || !userId) return null;

  return <>{children}</>;
};

export default AuthGuard;
