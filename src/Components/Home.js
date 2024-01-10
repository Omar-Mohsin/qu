import React, { useEffect, useState } from "react";

import axios from "axios";
function Home() {
  const [welcomeMessage, setWelcomeMessage] = useState();

  useEffect(() => {
    axios.get("http://bashars.eu:5555/api/v1/").then((res) => {
      setWelcomeMessage(res.data.message);
    });
  }, []);

  console.log(welcomeMessage);
  return (
    <div>
      {welcomeMessage ? <h1>{welcomeMessage}</h1> : <h1>Loading...</h1>}
    </div>
  );
}

export default Home;
