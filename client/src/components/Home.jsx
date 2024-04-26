import useWebSocket from "react-use-websocket";
import VideoPlayer from "./VideoPlayer";
import Chat from "./Chat";

const Home = ({ username }) => {
    const WS_URL = "ws://localhost:8000";
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, { queryParams: { username } });

    return (
        <>
            <VideoPlayer sendJsonMessage={sendJsonMessage} lastJsonMessage={lastJsonMessage} />
            <Chat sendJsonMessage={sendJsonMessage} lastJsonMessage={lastJsonMessage} />
        </>
    );
};

export default Home;
