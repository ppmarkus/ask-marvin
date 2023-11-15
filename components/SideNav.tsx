import MarvinLogo from "@/app/ui/marvin-logo";
import NavLinks from "@/components/NavLinks";
import { PowerIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ThemeButton from "./ThemeButton";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[var(--background-start)] to-[var(--background-end)] px-3 pb-4 text-[var(--foreground)] md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-teal-600 p-4  dark:bg-teal-950 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <MarvinLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 dark:bg-gray-900 md:block"></div>

        <div className="hidden items-center justify-center gap-2 p-2 text-xs md:inline-flex">
          <div className="">Powered by</div>
          <div>
            <a className="" href="https://dataherald.com" target="_blank">
              <img
                className="p-2 dark:rounded-lg dark:bg-teal-900"
                src="https://files.dataherald.com/logos/dataherald.png"
                alt="Dataherald logo"
                width={120}
              />
            </a>
          </div>
        </div>
        <div className="flex">
          <form
            className="flex md:grow md:flex-col"
            action={async () => {
              "use server";
              // await signOut();
              console.log("signing out...");
            }}
          >
            <button className="mr-2 flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-teal-100 hover:text-blue-600 dark:bg-slate-900 dark:hover:text-teal-300 md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
          <ThemeButton />
        </div>
      </div>
    </div>
  );
}
