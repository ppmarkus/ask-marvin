import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Settings",
};

export default function Page() {
  return (
    <div className={`flex h-full flex-col`}>
      <div className="mb-4 rounded-md bg-white p-4 shadow-md dark:bg-slate-900">
        <h2 className="mb-4 text-lg font-bold">Personal Settings</h2>
        <div>
          <div className="flex items-center justify-start"></div>
        </div>
      </div>
      <div></div>
      <div className="grow ">
        <div className="rounded-md bg-white  p-4 shadow-md dark:bg-slate-900">
          <h2 className="mb-4 text-lg font-bold">All Settings</h2>
          {/* Add all other settings components here */}
        </div>
      </div>
    </div>
  );
}
