"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  asChild?: boolean;
  mode?: "modal" | "redirect";
}

export const LoginButton = ({
  asChild,
  mode = "redirect",
  children,
}: LoginButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return <p>TODO: To Be Implemented</p>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
