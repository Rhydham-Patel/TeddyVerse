import ChatBubble from "./chat-bubble";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useConversationStore } from "@/store/chat-store";
import { useEffect, useRef, useState } from "react";

const MessageContainer = () => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [videoLoaded, setVideoLoaded] = useState(false);

	const { selectedConversation } = useConversationStore();
	const messages = useQuery(api.messages.getMessages, {
		conversation: selectedConversation!._id,
	});
	const me = useQuery(api.users.getMe);

	// ✅ Auto-scroll when messages update or video is loaded
	useEffect(() => {
		const scrollToBottom = () => {
			if (scrollRef.current) {
				scrollRef.current.scrollTo({
					top: scrollRef.current.scrollHeight,
					behavior: "smooth",
				});
			}
		};

		setTimeout(scrollToBottom, 200); // Small delay for ReactPlayer
	}, [messages, videoLoaded]); // ✅ Scroll when messages update or video loads

	return (
		<div className="relative p-3 flex-1 overflow-auto h-full mb-2" ref={scrollRef}>
			<div className="md:mx-12 flex flex-col gap-3 h-full">
				{messages?.map((msg, idx) => (
					<div key={msg._id}>
						<ChatBubble
							me={me}
							message={msg}
							previousMessage={idx > 0 ? messages[idx - 1] : undefined}
							onVideoLoad={() => setVideoLoaded(true)} // ✅ Pass event to ChatBubble
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default MessageContainer;
