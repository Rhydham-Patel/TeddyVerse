"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Video, X } from "lucide-react";
import MessageInput from "./message-input";
import MessageContainer from "./message-container";
import ChatPlaceHolder from "@/components/home/chat-placeholder";
import GroupMembersDialog from "./group-members-dialog";
import { useConversationStore } from "@/store/chat-store";
import { useConvexAuth } from "convex/react";

const RightPanel = () => {
	const {selectedConversation, setSelectedConversation} = useConversationStore();
	const {isLoading} = useConvexAuth();

	if (isLoading) return null;
	if (!selectedConversation) return <ChatPlaceHolder />;

	const conversationName = selectedConversation.name || selectedConversation.groupName;
	const conversationImage = selectedConversation.image || selectedConversation.groupImage;

	return (
		<div className='w-3/4 flex flex-col bg-chat-tile-light dark:bg-chat-tile-dark bg-cover'>
			<div className='w-full sticky top-0 z-50'>
				{/* Header */}
				<div className='flex justify-between dark:bg-gray-primary bg-white p-3 m-3 rounded'>
					<div className='flex gap-3 items-center'>
						<Avatar>
							<AvatarImage src={conversationImage || "/placeholder.png"} className='object-cover bg-white' />
							<AvatarFallback>
								<div className='animate-pulse bg-gray-tertiary w-full h-full rounded-full' />
							</AvatarFallback>
						</Avatar>
						<div className='flex flex-col'>
							<p>{conversationName}</p>
							{selectedConversation.isGroup && <GroupMembersDialog selectedConversation={selectedConversation}/>} 
						</div>
					</div>

					<div className='flex items-center gap-7 mr-5'>
						<X size={16} className='cursor-pointer' onClick={() => setSelectedConversation(null)}/>
					</div>
				</div>
			</div>
			{/* CHAT MESSAGES */}
			<MessageContainer />

			{/* INPUT */}
			<MessageInput />
		</div>
	);
};
export default RightPanel;