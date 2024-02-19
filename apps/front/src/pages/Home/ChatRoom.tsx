import { css } from '@panda/css';
import { InputText } from '@src/components/InputText';
import { SocketEvent, useSocket } from '@src/hooks/useSocket';
import { useGetMessageList } from '@src/hooks/usegetMessageList';
import { socket } from '@src/socket';

interface ChatRoomProps {
    roomId: number;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({roomId}) => {
    const { data: messages, refetch } = useGetMessageList({ roomId });

    const socketEventList: SocketEvent[] = [
        {
            name: 'message-sent',
            handler: () => {
                refetch();
            }
        }
    ]

    useSocket(socketEventList);
    
    const handleSubmit = (value: string) => {
        socket.emit('message-send', roomId, value);
        refetch();
        console.log(value);
    };

    return (
        <div
            className={css({
                display: 'flex',
                flex: 1,
                backgroundColor: '#343434',
            })}
        >
            {messages?.map((v) => (
                <div key={v.created_at.toString()} className={css({ color: 'white' })}>
                    {v.content}
                </div>
            ))}
            <div
                className={css({
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    height: '99%',
                })}
            >
                <InputText onSubmit={handleSubmit} />
            </div>
        </div>
    );
};