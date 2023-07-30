import axios from "axios";
import { useEffect, useState } from "react";
import "../index.css";
// endpoint
const url = "https://api.thedogapi.com/v1/breeds";

const FirstRequest = () => {
  const [datas, setDatas] = useState([]);
  // function getData
  async function fetchData() {
    try {
      const request = await axios.get(url);
      // axios akan mereturn sebuah object yg didalamnya adalah object(jdi tidak perlu pasr ke JSON)
      // Untuk mengambil datanya gunakan .data
      const response = request.data;
      setDatas(response);
    } catch (error) {
      // mengambil pesan eror jika(endpoint tidak valid)
      console.log(error.response);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-center">1. Request GET</h2>
      <h3 className="text-center">Data Anjing</h3>
      {datas.length > 0 ? (
        datas.map((item, index) => {
          return (
            <ul key={item.id} className="wrapperListDog">
              {index === 0 && (
                <>
                  <h4>No : {index + 1}</h4>
                  <li>
                    <b>name : </b>
                    {item.name}
                  </li>
                  <li>
                    <b>Batas Usia : </b> {item.life_span}
                  </li>
                  <li>
                    <b>Temperament : </b>
                    {item.temperament}
                  </li>
                  <li>
                    <b>Tinggi Badan : </b>
                    {item.height.imperial}
                  </li>
                  <li>
                    <b>Berat Badan : </b> {item.weight.imperial}
                  </li>
                </>
              )}
              {index === 1 && (
                <>
                  <h4>No : {index + 1}</h4>
                  <li>
                    <b>name : </b>
                    {item.name}
                  </li>
                  <li>
                    <b>Batas Usia : </b> {item.life_span}
                  </li>
                  <li>
                    <b>Temperament : </b>
                    {item.temperament}
                  </li>
                  <li>
                    <b>Tinggi Badan : </b>
                    {item.height.imperial}
                  </li>
                  <li>
                    <b>Berat Badan : </b> {item.weight.imperial}
                  </li>
                </>
              )}
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
