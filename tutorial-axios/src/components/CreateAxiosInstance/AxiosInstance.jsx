import axios from "axios";

// Dalam membuat axios instance,kita bisa menuliskan method,url,dan body maupun header saat kita melakukan hit api,tergantung apa yang kita butuhkan

const myInstance = axios.create({
  // PASTIKAN SAAT MEMEASUKKAN URL GUNAKAN KEY baseURL (JNGAN YG LAIN)
  baseURL: "https://course-api.com",
  headers: {
    Accept: "application/json",
  },
});

// Dengan begitu maka kita membuat intance url dan request header seperti diatas.MAKA url dapat digunakan di component manapun
export default myInstance;
