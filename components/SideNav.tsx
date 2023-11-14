import Link from "next/link";
import NavLinks from "@/components/NavLinks";
import MarvinLogo from "@/app/ui/marvin-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import ThemeButton from "./ThemeButton";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 pb-4 md:px-2 bg-gradient-to-b from-[var(--background-start)] to-[var(--background-end)] text-[var(--foreground)]">
      <Link className="mb-2 flex h-20 items-end justify-start rounded-md bg-teal-600 dark:bg-teal-950  p-4 md:h-40" href="/">
        <div className="w-32 text-white md:w-40">
          <MarvinLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block dark:bg-gray-900"></div>
       
        <div className="hidden md:inline-flex p-2 gap-2 justify-center items-center text-xs">
          <div className="">Powered by</div>
          <div>
            <a className="" href="https://dataherald.com" target="_blank">
              <img className="dark:bg-teal-900 dark:rounded-lg p-2" src="https://files.dataherald.com/logos/dataherald.png" alt="Dataherald logo" width={120} />
            </a>
          </div>
        </div>
        <div className="flex">
          <form
            className="flex md:flex-col md:grow"
            action={async () => {
              "use server";
              // await signOut();
              console.log("signing out...");
            }}
          >
            <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-teal-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 mr-2 dark:bg-slate-900 dark:hover:text-teal-300">
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
