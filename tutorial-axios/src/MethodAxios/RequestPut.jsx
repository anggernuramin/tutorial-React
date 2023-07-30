import axios from "axios";
import { useEffect, useState } from "react";

const PutRequest = () => {
  const [datas, setDatas] = useState([]);
  const fetchData = async () => {
    try {
      const request = await axios({
        method: "get",
        url: "https://jsonplaceholder.typicode.com/posts?userId=1",
      });

      setDatas(request.data);
    } catch (error) {
      console.log(error.respnse);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  async function handleUpdate(id) {
    try {
      const request = await axios({
        method: "put",
        url: `https://jsonplaceholder.typicode.com/posts/${id}`,
        data: {
          id: id,
          title: "Tittle update",
          body: "Body Update",
          userId: 1,
        },
      });
      const response = request.data;
      //   Update state untuk menamplkan hasil update
      if (datas.map((item) => item.id === response.id)) {
        // clonig datas agar tidak merubah data sebelumnya
        const dataTemp = [...datas];
        // kurangi id dengan 1, karena id dimulai angka 1 ,sedangkan index dimulai dengan 0
        dataTemp[id - 1] = response;
        setDatas(dataTemp);
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      <h2>Method Put</h2>
      <table border={1} cellSpacing={0} cellPadding={15}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.userId}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
                <td>
                  <button onClick={() => handleUpdate(item.id)}>Update</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default PutRequest;
