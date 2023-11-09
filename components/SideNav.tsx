import Link from "next/link";
import NavLinks from "@/components/NavLinks";
import MarvinLogo from "@/app/ui/marvin-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 pb-4 md:px-2">
      <Link className="mb-2 flex h-20 items-end justify-start rounded-md bg-teal-600 p-4 md:h-40" href="/">
        <div className="w-32 text-white md:w-40">
          <MarvinLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <div className="hidden md:inline-flex p-2 gap-2 justify-center align-middle text-xs">
          <div className="">Powered by</div>
          <div>
            <a className="" href="https://dataherald.com" target="_blank">
              <img src="https://files.dataherald.com/logos/dataherald.png" alt="Dataherald logo" width={120} />
            </a>
          </div>
        </div>
        <form
          className="flex md:flex-col"
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-teal-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
