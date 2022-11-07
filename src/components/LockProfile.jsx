import React from "react";
import { CiLock } from "react-icons/ci";
function LockProfile() {
  return (
    <div className="w-full flex justify-center mt-20">
      <div className="text-center ">
        <div className="w-24 h-24 border-2 border-zinc-200 rounded-full flex justify-center items-center mx-auto">
          <CiLock size={60} className="text-zinc-300" />
        </div>
        <div className="mt-2 space-y-1">
          <p className="text-zinc-400">This account is private.</p>
          <p className="text-zinc-400">Send request to see their posts.</p>
        </div>
      </div>
    </div>
  );
}

export default LockProfile;
