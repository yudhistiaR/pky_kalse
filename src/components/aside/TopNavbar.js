"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

//Components
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const TopNavbar = ({ onClick, open }) => {
  const { data: session } = useSession();

  return (
    <nav className="w-full h-16 bg-white flex items-center border-b">
      <div className="hidden md:block">
        <Link
          href="/dashboard"
          className="w-60 border-r-2 px-4 flex items-center gap-2"
        >
          <Image src="/logo-pky.png" width={40} height={40} alt="logo pky" />
          <p className="text-lg font-bold">PKY KALSE</p>
        </Link>
      </div>
      <div className="w-full flex justify-between items-center px-4">
        <Button variant="outline" size="icon" onClick={onClick}>
          {open ? <PanelLeftClose size={65} /> : <PanelLeftOpen size={65} />}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="w-full flex text-center">
              <span>{session?.user.username}</span> <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>{session?.user.jabatan}</DropdownMenuItem>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                signOut({
                  redirect: "/",
                })
              }
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default TopNavbar;
