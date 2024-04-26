import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player/youtube";
import VideoDuration from "./VideoDuration";

const VideoPlayer = ({ sendJsonMessage, lastJsonMessage }) => {
    const playerRef = useRef(null);
    const [playerState, setPlayerState] = useState({
        url: "",
        playing: true,
        played: 0,
    });
    const [duration, setDuration] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [urlInput, setUrlInput] = useState("");

    useEffect(() => {
        if (!lastJsonMessage) {
            return;
        }

        if (lastJsonMessage.messageType !== "playerChange") {
            return;
        }

        playerRef.current.seekTo(lastJsonMessage.newState.played);
        setPlayerState({ ...lastJsonMessage.newState });
    }, [lastJsonMessage]);

    const handleDuration = (dur) => {
        setDuration(dur);
    };

    const handleSeekMouseDown = () => {
        setSeeking(true);
    };

    const handleSeekMouseUp = (e) => {
        setSeeking(false);
        sendJsonMessage({
            messageType: "playerChange",
            messageTypeDetailed: "seek",
            newState: { ...playerState, played: parseFloat(e.target.value) }
        });
    };

    const handleSeekChange = (e) => {
        setPlayerState({ ...playerState, played: parseFloat(e.target.value) });
    };

    const handlePlayPause = () => {
        if (playerState.playing) {
            sendJsonMessage({
                messageType: "playerChange",
                messageTypeDetailed: "pause",
                newState: { ...playerState, playing: false }
            });
        } else {
            sendJsonMessage({
                messageType: "playerChange",
                messageTypeDetailed: "play",
                newState: { ...playerState, playing: true }
            });
        }
    };

    const handleProgress = ({ played }) => {
        if (!seeking) {
            setPlayerState({ ...playerState, played });

            const latestDuration = playerRef.current.getDuration();
            if (latestDuration !== null && latestDuration !== duration) {
                setDuration(latestDuration);
            }
        }
    };

    const handleVideoChange = () => {
        sendJsonMessage({
            messageType: "playerChange",
            messageTypeDetailed: "videoChange",
            newState: {
                url: urlInput,
                playing: true,
                played: 0
            }
        });
        setUrlInput("");
    };

    return (
        <div className="player-with-controls-div">
            <div className="player-wrapper">
                <ReactPlayer
                    ref={playerRef}
                    className="react-player"
                    width="100%"
                    height="100%"
                    style={{ pointerEvents: "none" }}
                    loop={true}
                    url={playerState.url}
                    playing={playerState.playing}
                    volume={0.8}
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                />
            </div>
            <div className="player-controls-row">
                <input
                    type="range"
                    min={0}
                    max={0.999999}
                    step="any"
                    className="slider"
                    value={playerState.played}
                    onMouseDown={handleSeekMouseDown}
                    onChange={handleSeekChange}
                    onMouseUp={handleSeekMouseUp}
                />
            </div>
            <div className="player-controls-row">
                <div className="play-pause-progress-div">
                    <button className="play-pause-button" onClick={handlePlayPause}>
                        {playerState.playing ? "Pause" : "Play"}
                    </button>
                    <VideoDuration className={"video-duration"} seconds={duration} played={playerState.played} />
                </div>
                <div className="change-video-div">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleVideoChange();
                    }}>
                        <input type="text" className="video-url-input" value={urlInput} placeholder="Enter YouTube Video URL Here"
                            onChange={(e) => setUrlInput(e.target.value)}></input>
                        <input type="submit" className="change-video-button" value="OK"></input>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
