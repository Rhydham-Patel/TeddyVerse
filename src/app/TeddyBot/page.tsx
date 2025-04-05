import { ChevronsLeft } from "lucide-react";
import Link from "next/link";

const TeddyBotPage = () => {
    return (
      <main className='md:m-5'>
	    <div className='flex overflow-y-hidden h-[calc(100vh-50px)] h-[100vh] max-w-[1700px] mx-auto bg-left-panel rounded'>
              {/* Floating Home Button */}
      <Link 
        href="/" 
        className="fixed top-8 left-8 flex items-center gap-2 bg-purple-700 px-3 py-2 rounded-full shadow-lg hover:bg-purple-500 transition z-50"
      >
        <ChevronsLeft className="w-5 h-5 text-white" />
        <span className="font-medium text-white hidden md:inline">Home</span>
      </Link>
		{/* Green background decorator for Light Mode */}
		<div className='fixed top-0 left-0 w-full h-36 bg-green-primary -z-30' />
      <div style={{ width: "100vw", height: '[calc(100vh-50px)]', overflow: "hidden" }}>
        <iframe
          src="/TeddyBot/index.html"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </div>
      </div>
      </main>
    );
  };
  
  export default TeddyBotPage;
  