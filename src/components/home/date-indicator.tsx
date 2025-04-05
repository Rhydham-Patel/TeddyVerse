import { getRelativeDateTime, isSameDay } from "@/lib/utils";
import { IMessage } from "@/store/chat-store";

type DateIndicatorProps = {
    message: IMessage;
    previousMessage?: IMessage;
}

const DateIndicator = ({message, previousMessage}: DateIndicatorProps) => {
  return (
    <>
        {!previousMessage || !isSameDay (previousMessage._creationTime, message._creationTime) ? (
            <div className='flex items-center justify-center'>
                <p className='text-sm font-bold text-gblack dark:text-gray-300 mb-2 p-1 pl-2 pr-2 z-50 rounded-md bg-white dark:bg-gray-primary'>
                    {getRelativeDateTime(message, previousMessage)}
                </p>
            </div>
        ) : null}
    </>
  )
}

export default DateIndicator