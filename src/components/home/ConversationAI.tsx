import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";



const ConversationAI = () => {
  const router = useRouter();
const handleClick = () => {
  router.push("/TeddyBot");
};

  return (
    <>
      <div className="flex gap-2 items-center p-3 cursor-pointer m-2 rounded-lg transition-all duration-300 hover:brightness-110 hover:scale-[1.02]
        
        /* Theme Adaptive Background - Lighter in Dark Mode */
        bg-gradient-to-r from-[#e0c3fc] to-[#8ec5fc] 
        dark:from-pink-00 dark:to-purple-400
      " onClick={handleClick}>

        {/* Avatar with Animated Online Dot */}
        <div className="relative">
          <Avatar className="border border-gray-900 bg-white w-12 h-12">
            <AvatarImage src="/favicon.png" className="rounded-full object-cover w-full h-full" />
            <AvatarFallback>
              <div className="animate-pulse bg-gray-300 w-full h-full rounded-full"></div>
            </AvatarFallback>
          </Avatar>
          {/* Green dot with bounce effect */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900 animate-ping"></span>
          <span className="absolute top-0 right-0 w-3 h-3 bg-purple-500 rounded-full border-2 border-gray-900"></span>
        </div>

        {/* Bot Name & Status */}
        <div className="flex flex-col">
          <h3 className="text-sm lg:text-base font-semibold 
            bg-gradient-to-r from-purple-700 to-pink-600 text-transparent bg-clip-text">
            TeddyBot
          </h3>
			<div className="flex flex-row">
          <p className="text-xs text-gray-700 dark:text-gray-900">AI Assistant <span className="keycap inherit-flex items-center gap-1">Gemini</span></p>
			</div>

        </div>
      </div>
    </>
  );
};

export default ConversationAI;
