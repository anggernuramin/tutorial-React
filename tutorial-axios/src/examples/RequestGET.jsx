import axios from "axios";
import { useEffect, useState } from "react";
// limit, if 429 wait for 15 min and try again
// endpoint
const url = "https://api.thedogapi.com/v1/breeds";
const FirstRequest = () => {
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
      <h2 className="text-center">1. Request GET</h2>
      {datas.length > 0 ? (
        datas.map((item) => {
          return (
            <ul key={item.id}>
              <li>{item.id}</li>
              <li>{item.name}</li>
            </ul>
          );
        })
      ) : (
        <p>
          <i>Loading ...</i>
        </p>
      )}
    </>
  );
};

export default FirstRequest;
