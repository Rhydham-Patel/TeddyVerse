'use client'
import LeftPanel from "@/components/home/left-panel";
import PanelMobile from "@/components/home/panel-mobile";
import RightPanel from "@/components/home/right-panel";
import { useState, useEffect } from "react";

const Page = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 880); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
	<main className='sm:m-5'>
	<div className='flex overflow-y-hidden sm:h-[calc(100vh-50px)] h-[100vh] max-w-[1700px] mx-auto bg-left-panel rounded'>
	<div className='fixed top-0 left-0 w-full h-36 bg-green-primary -z-30' />
      {isMobile ? (
        <PanelMobile /> // Show PanelMobile on small screens
      ) : (
        <>
          <LeftPanel />
          <RightPanel />
        </>
      )}
    </div>
    </main>
  );
};

export default Page;