import { useEffect, useState } from "react";
// const randomUserUrl = "https://randomuser.me/api";

// Instance yg telah kita buat
import myInstance from "../components/CreateAxiosInstance/AxiosInstance";
// BUAT INSTANCE JIKA URL YANG KITA GUNAKAN DIGUNAKAN DIBEBERAPA COMPONENT

// Instance
//    Dapat melakukan config berulang-ulang,(MIsal kita ingin hit keendpoint yang sama,cuma beda id nya) mAka kita bisa gunakan instance config ini agar tidak menuliskan url yang sama secara berulang-ulang
// DICONTOH INI ENDPOINT NYA KITA TARUH PADA FOLDER YANG TERPISAH di folder createMyInstance,Sebenarnya kita busa menukiskan dalam halaman ini,tetapi jika kita menuliskan difolder lain,kita bisa gunakan dicomponent yang lainnya dengan mudah

const CustomInstance = () => {
  const [datas, setDatas] = useState([]);
  const fetchData = async () => {
    // kita bisa menyisipkan url(yAng nanti akan dimasukkan ke baseURL INSTANCE YG TELAH KITA BUAT)

    const { data } = await myInstance("/react-store-products");
    // JADI DENGAN DIATAS AKAN response yg didapat adalaH melakukan HIT ke endpoint
    // axios({
    //   method: "get",
    //   url: "https://course-api.com/react-store-products",
    //   headers: {
    //     Accept: "application/json"
    //   }
    // })

    setDatas(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log("Custom Instance", datas);
  return (
    <>
      <h2 className="text-center">4. custom instance</h2>
      <h5>Data yang didapat sama dengan data yang ada di table diatas</h5>
    </>
  );
};
export default CustomInstance;
