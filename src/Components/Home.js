import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [welcomeMessage, setWelcomeMessage] = useState();

  useEffect(() => {
    axios.get("http://bashars.eu:5555/api/v1/").then((res) => {
      setWelcomeMessage(res.data.message);
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-black">
      <div className="text-center">
        {welcomeMessage ? (
          <h1 className="text-4xl font-bold mb-4">{welcomeMessage}</h1>
        ) : (
          <h1 className="text-4xl font-bold">Loading...</h1>
        )}
        <p className="text-lg">Welcome to your awesome application!</p>
      </div>
    </div>
  );
}

export default Home;
