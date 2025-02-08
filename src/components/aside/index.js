"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

//Components
import {
  LayoutDashboard,
  User,
  Database,
  Scale,
  Book,
  Library,
} from "lucide-react";
import Link from "next/link";

const navItem = [
  {
    id: 1,
    name: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard color="#d97706" />,
  },
  {
    id: 2,
    name: "Data TPM",
    url: "/dashboard/metadata",
    icon: <Database color="#d97706" />,
  },
  {
    id: 3,
    name: "Data Hakim",
    url: "/dashboard/datahakim",
    icon: <Scale color="#d97706" />,
  },
  {
    id: 4,
    name: "List Pengadilan",
    url: "/dashboard/pengadilan",
    icon: <Book color="#d97706" />,
  },
  {
    id: 5,
    name: "Rekam Jejak Hakim",
    url: "/dashboard/rekamjejak",
    icon: <Library color="#d97706" />,
  },
  {
    id: 6,
    name: "Account",
    url: "/dashboard/account",
    icon: <User color="#d97706" />,
  },
];

const NavLink = ({ path }) => {
  return (
    <>
      {navItem.map((item) => (
        <motion.li key={item.id}>
          <Link
            href={item.url}
            className={cn(
              "flex justify-start items-center gap-2 transition-colors duration-300 font-semibold p-4 hover:bg-gray-200 hover:border-r-4 hover:border-amber-600",
              path === item.url
                ? "border-r-4 border-amber-600 bg-gray-200"
                : "",
            )}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        </motion.li>
      ))}
    </>
  );
};

const Aside = ({ open }) => {
  const path = usePathname();
  return (
    <motion.aside
      layout
      initial={{ x: 0 }}
      animate={{ x: open ? 0 : -250 }}
      exit={{ x: -250 }}
      transition={{ duration: 0.4 }}
      className="bg-white h-full flex flex-col justify-between w-60 border-r-2 fixed z-50"
    >
      <ul>
        <NavLink path={path} />
      </ul>
    </motion.aside>
  );
};

export default Aside;
