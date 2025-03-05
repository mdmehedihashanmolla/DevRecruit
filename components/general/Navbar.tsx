import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { Button } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo DevRecruit" width={40} height={40} />
        <h1 className="text-2xl font-bold">
          Dev<span className="text-purple-500">Recruit</span>
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle/>
        <Button className="bg-purple-500">Login</Button>
      </div>
    </nav>
  );
}
