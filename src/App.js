import React from "react";
import { SelectUser } from "./redux/auth/authSlice";
import { useSelector } from "react-redux";
import Home from "./Components/Home";
function App() {
  const user = useSelector(SelectUser);
  console.log(user);

  return (
    <>
      <Home />
    </>
  );
}

export default App;
