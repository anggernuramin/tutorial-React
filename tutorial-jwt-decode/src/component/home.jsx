import { useEffect, useState } from "react";
import { userToken } from "../service/auth.login.service";
import "../App.css";

export const Home = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    // handle jika user belum mempunyai token tapi ingin akses /home,maka kita tolak
    if (token === null) {
      document.location.href = "/login";
    }

    userToken(token);
    setName(userToken(token));
    document.title = "home";
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    document.location.href = "/login";
  }
  return (
    <div className="container-home">
      <h1>Name User : {name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
