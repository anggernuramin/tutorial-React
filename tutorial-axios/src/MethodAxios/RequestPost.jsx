import { useState } from "react";
import axios from "axios";

const PostRequest = () => {
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [body, setBody] = useState("");
  const [data, setData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "" && body === "" && id === "") {
      alert("title dan body tdk boleh kosong");
    } else {
      try {
        const request = await axios({
          method: "post",
          url: "https://jsonplaceholder.typicode.com/posts",
          data: {
            title: title,
            body: body,
            userId: parseInt(id),
          },
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        setData(request.data);
      } catch (error) {
        console.log(error.response);
      }
    }

    setId("");
    setTitle("");
    setBody("");
  };
  console.log("Data", data);

  return (
    <section>
      <h2 className="text-center">post request</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="id" className="form-label">
            Id
          </label>
          <input type="text" className="form-input" id="name" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div className="form-row">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" className="form-input" id="name" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-row">
          <label htmlFor="Body" className="form-label">
            Body
          </label>
          <input type="text" className="form-input" id="email" value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-block">
          Submit
        </button>
      </form>
      {/* Dalam contoh di bawah, Object.getOwnPropertyNames(obj) mengembalikan array kunci dari objek. Jika panjang array tersebut adalah 0, itu berarti objek tidak memiliki isi. */}
      {Object.getOwnPropertyNames(data).length === 0 ? (
        ""
      ) : (
        <ul>
          <li>Id : {data.id}</li>
          <li>Title : {data.title}</li>
          <li>Body : {data.body}</li>
        </ul>
      )}
    </section>
  );
};
export default PostRequest;
