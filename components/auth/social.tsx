"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const Social = () => {
  return (
    <div className="w-full flex items-center gap-x-2">
      <Button className="w-full border-blue-500" variant="outline">
        <FcGoogle className="size-5 mr-2" />
        Google
      </Button>
      <Button size="lg" className="w-full">
        <FaGithub className="size-5 mr-2" />
        Github
      </Button>
    </div>
  );
};
