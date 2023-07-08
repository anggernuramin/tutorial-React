import { useEffect, useState } from "react";
import axios from "axios";
import DataDog from "./components/DataDog";

// endpoint
const url = "https://api.thedogapi.com/v1/breeds";
function App() {
  // Buat state untuk menampunh hasil fetchApi
  const [datas, setDatas] = useState([]);

  async function fetchData() {
    try {
      const request = await axios.get(url);
      const response = request.data;
      setDatas(response);
    } catch (error) {
      console.log(error.response);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {/* pars hasil getData dari endpoint ke component DataDog */}
      <DataDog datas={datas} />
    </>
  );
}

export default App;
