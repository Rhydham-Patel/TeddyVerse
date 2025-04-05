"use client"; // Make sure this is here for client-side hooks

import { Lock } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const ChatPlaceHolder = () => {
	const router = useRouter();

	const handleRedirect = () => {
		router.push("/FromUs"); // Replace with your actual route
	};

	return (
		<div className='w-3/4 bg-gray-secondary flex flex-col items-center justify-center py-10'>
			<div className='flex flex-col items-center w-full justify-center py-10 gap-4'>
				<Image src={"/favicon.png"} alt='Hero' width={300} height={188}/>
				<p className='text-3xl font-extralight mt-5 mb-2'>TeddyVerse Made With Love By Rhydham</p>
				<p className='w-1/2 text-center text-gray-primary text-sm text-muted-foreground'>
					Make calls, share your screen and get a faster experience when you download the Windows app.
				</p>

				<Button
					onClick={handleRedirect}
					className='rounded-full my-5 bg-green-primary hover:bg-green-secondary text-white'
				>
					More From Us
				</Button>
			</div>
			<p className='w-1/2 mt-auto text-center text-gray-primary text-xs text-muted-foreground flex items-center justify-center gap-1'>
				<Lock size={10} /> Your personal messages are end-to-end encrypted
			</p>
		</div>
	);
};

export default ChatPlaceHolder;
