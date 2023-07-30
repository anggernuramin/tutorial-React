import { useState } from "react";
import axios from "axios";

const url = "https://icanhazdadjoke.com/";
// Accept : 'application/json'

const Headers = () => {
  const [joke, setJoke] = useState("");

  const fetchDadJoke = async () => {
    try {
      const request = await axios(url, {
        headers: {
          Accept: "application/json",
        },
      });
      // Ketika Anda mengirim permintaan API dengan metode GET dan menyertakan header Accept: application/json, Anda memberitahukan server bahwa Anda ingin menerima respons dalam format JSON.
      const response = await request.data.joke;
      setJoke(response);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <section className="section text-center">
      <h2>2. Request Get(Headers)</h2>
      <button className="btn" onClick={fetchDadJoke}>
        random joke
      </button>
      {joke ? (
        <p className="dad-joke">{joke}</p>
      ) : (
        <p>
          <i>Loading Joke...</i>
        </p>
      )}
    </section>
  );
};
export default Headers;
