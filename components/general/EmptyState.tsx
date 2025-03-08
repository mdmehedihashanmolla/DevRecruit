import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

interface IAppProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export function EmptyState({
  title,
  buttonText,
  description,
  href,
}: IAppProps) {
  return (
    <div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border border-dashed p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 dark:border-gray-700">
      <div className="flex flex-col items-center text-center space-y-6 max-w-md">
        {/* Icon Container */}
        <div className="flex size-16 sm:size-20 items-center justify-center rounded-full bg-purple-500/10 dark:bg-purple-500/20">
          <Ban className="size-10 sm:size-12 text-purple-500 dark:text-purple-400" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 dark:text-purple-100">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-purple-700/80 dark:text-purple-300/80 leading-relaxed">
          {description}
        </p>

        {/* Button */}
        <Link
          href={href}
          className={buttonVariants({
            className:
              "bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105",
          })}
        >
          <PlusCircle className="mr-2 size-5 sm:size-6" />
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
