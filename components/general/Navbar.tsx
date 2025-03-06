import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { auth, signOut } from "@/app/utils/auth";
import { UserDropdown } from "./UserDropDown";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo DevRecruit" width={40} height={40} />
        <h1 className="text-2xl font-bold">
          Dev<span className="text-purple-500">Recruit</span>
        </h1>
      </Link>

      {/* Desktop Navigation */}

      <div className="hidden md:flex items-center gap-5">
        <ThemeToggle />
        <Link
          className={buttonVariants({
            size: "lg",
            className: "bg-purple-500 hover:bg-purple-600",
          })}
          href="/post-job"
        >
          Post Job
        </Link>

        {session?.user ? (
          <UserDropdown
            email={session.user.email as string}
            image={session.user.image as string}
            name={session.user.name as string}
          />
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
