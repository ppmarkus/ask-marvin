import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Settings"
};


export default function Page() {


  return (
    <div className={`flex flex-col h-full`}>
      <div className="bg-white dark:bg-slate-900 shadow-md rounded-md p-4 mb-4">
        <h2 className="mb-4 font-bold text-lg">Personal Settings</h2>
        <div>
          <div className="flex items-center justify-start">

          </div>
        </div>
      </div>
      <div>
        
      </div>
      <div className="grow ">
        <div className="bg-white dark:bg-slate-900  shadow-md rounded-md p-4">
          <h2 className="mb-4 font-bold text-lg">All Settings</h2>
          {/* Add all other settings components here */}
        </div>
      </div>
    </div>
  );
}
