import axios from "axios";
import { useEffect, useState } from "react";

const productsUrl = "https://course-api.com/react-store-products"; // mengembalikan product dalam array of object > 1
const randomUserUrl = "https://randomuser.me/api"; // menegmbalikan data user yang random dalam bentuk array,Data yg direturn hanya 1 data

const GlobalInstance = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  // GlobaliNstance adalah melakukan hit api dengan langsung memanggil beberapa url yg digunakan
  const fetchData = async () => {
    try {
      const responseProducts = await axios.get(productsUrl);
      const responseUsers = await axios.get(randomUserUrl);
      setProducts(responseProducts.data);
      setUsers(responseUsers.data.results);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-center">3. global instance</h2>
      <h4>instance ke 1 (Hit api products)</h4>
      <table border={1} cellSpacing={0} cellPadding={15}>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {products
            // contoh sort dari huruf yg berawal z ke a
            .sort((a, b) => b.name.localeCompare(a.name))

            .map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.company}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <h4>instance ke 2 (Hit api data detail user)</h4>
      {users.map((item, index) => {
        return (
          <ul key={index}>
            <li>
              <span style={{ display: "block" }}>
                Name :{" "}
                <h5 style={{ display: "inline-block" }}>
                  {item.name.title} {item.name.first} {item.name.last}
                </h5>{" "}
              </span>

              <span style={{ display: "block" }}>
                Email : <h5 style={{ display: "inline-block" }}>{item.email}</h5>{" "}
              </span>
              <span style={{ display: "block" }}>
                Phone : <h5 style={{ display: "inline-block" }}>{item.phone}</h5>{" "}
              </span>
              <span style={{ display: "block" }}>
                Gender : <h5 style={{ display: "inline-block" }}>{item.gender}</h5>{" "}
              </span>
            </li>
          </ul>
        );
      })}
    </>
  );
};
export default GlobalInstance;
