import { useState } from "react";

const Login = ({ onSubmit }) => {
    const [username, setUsername] = useState("");

    return (
        <div className="in-middle-div">
            <div>
                <h1>Please enter your name:</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(username);
                }}>
                    <input type="text" className="video-url-input" value={username} placeholder="Enter Your Name Here" onChange={(e) => setUsername(e.target.value)}></input>
                    <input type="submit" className="change-video-button" value="OK"></input>
                </form>
            </div>
        </div>
    );
};

export default Login;
