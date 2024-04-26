import { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";

const App = () => {
  const [username, setUsername] = useState("");
  return username ? (
    <Home username={username} />
  ) : (
    <Login onSubmit={setUsername} />
  );
};

export default App;
