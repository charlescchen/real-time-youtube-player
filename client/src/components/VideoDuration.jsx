const VideoDuration = ({ className, seconds, played }) => {
    return (
        <p className={className}>
            {format(seconds, played)}
        </p>
    );
};

const format = (seconds, played) => {
    const totalDate = new Date(seconds * 1000);
    const totalHH = totalDate.getUTCHours();
    const totalMM = totalDate.getUTCMinutes();
    const totalSS = pad(totalDate.getUTCSeconds());
    let totalDuration = "";
    if (totalHH) {
        totalDuration = `${totalHH}:${pad(totalMM)}:${totalSS}`;
    } else {
        totalDuration = `${totalMM}:${totalSS}`;
    }

    const playedDate = new Date(seconds * played * 1000);
    const playedHH = playedDate.getUTCHours();
    const playedMM = playedDate.getUTCMinutes();
    const playedSS = pad(playedDate.getUTCSeconds());
    let playedDuration = "";
    if (playedHH) {
        playedDuration = `${playedHH}:${pad(playedMM)}:${playedSS}`;
    } else {
        playedDuration = `${playedMM}:${playedSS}`;
    }

    return playedDuration + " / " + totalDuration;
};

const pad = (string) => {
    return ('0' + string).slice(-2);
};

export default VideoDuration;
