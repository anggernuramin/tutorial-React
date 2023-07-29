import axios from "axios";
import jwt_decode from "jwt-decode";
export const postUsername = (data, callback) => {
  axios
    //JANGAN GUNAKAN TANDA + SETELAH ENDPOINT karena bukan menambahkan object data
    .post("https://fakestoreapi.com/auth/login", data)
    .then((response) => callback(true, response.data.token))
    .catch((error) => callback(false, error));
};

export const userToken = (token) => {
  const decoded = jwt_decode(token);
  // bisa kita destructuring object juga
  // const { sub, user, iat } = decoded;
  return decoded.user;
};
