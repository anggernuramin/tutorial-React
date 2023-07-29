/* eslint-disable no-unused-vars */
import "./App.css";
import { useState, useEffect } from "react";
import { postUsername } from "./service/auth.login.service";
import { useNavigate } from "react-router";

function App() {
  const [ceklist, setCeklist] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [messageFailedPost, setMessageFailedPost] = useState("");

  const navigate = useNavigate();

  function toggleEyePassword() {
    // lakukan operasi kebalikan menggunakan operator (!) agar menjadi button toggle
    setShowPassword(!showPassword);
  }

  // PASSWORD DAN EMAIL YANG VALID
  // USERNAME : johnd
  // PASSWP0RD : m38rmF$
  // CEK die endpoint https://fakestoreapi.com/users
  function submitForm(e) {
    if (password === "" || username === "" || ceklist === false) {
      alert("input kosong");
    } else {
      const data = {
        username: username,
        password: password,
      };
      postUsername(data, (status, result) => {
        if (status === true) {
          const token = result;
          localStorage.setItem("token", token);
          navigate("/home");
        } else {
          setMessageFailedPost(result.response.data);
        }
      });
    }
    e.preventDefault();
  }

  return (
    <div className="overlay">
      <form>
        <div className="con">
          <header className="head-form">
            <h2>Log In</h2>
            <p>login here using your username and password</p>
          </header>
          <br />
          <div className="field-set">
            {/* Pesan error */}
            {messageFailedPost ? <p className="error-message">{messageFailedPost}</p> : ""}
            <span className="input-item">
              <i className="fa fa-user-circle"></i>
            </span>
            <input
              autoFocus
              required
              className="form-input"
              id="txt-input"
              type="text"
              placeholder="@UserName"
              onChange={(e) => {
                setMessageFailedPost("");
                setUsername(e.target.value);
              }}
            />

            <br />

            <span className="input-item">
              <i className="fa fa-key"></i>
            </span>
            {/* lakukan kondisi untuk menentukan type input , jika showPaswword true maka ubah menjadi type text dan jika showPassword ubah menjadi type password*/}
            {showPassword === true ? (
              <>
                <input
                  required
                  className="form-input"
                  type="text" // Jika showPassword false (KARENA STATE PERTAMA pada showPassword === FALSE) maka Ubah menjadi text agar,inputan bisa dilihat
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={password} // dan agar tetap yg ditampilkan inputan dari input password, maka set value dengan statae password
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setMessageFailedPost("");
                  }}
                />
                {/* button eye hide*/}
                <span>
                  <i className="fa-regular fa-eye-slash" aria-hidden="true" type="button" id="eye" onClick={toggleEyePassword}></i>
                </span>
              </>
            ) : (
              <>
                <input
                  required
                  className="form-input"
                  type="password" // Jika showPassword true,MAKA ubah type menjadi password agar inputan m,enjadi hidden (sesuai dengan tipoe PASSWORD)
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={password} // Use the password state as the value for the input
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setMessageFailedPost("");
                  }}
                />
                {/* button eye */}
                <span>
                  <i className="fa fa-eye" aria-hidden="true" type="button" id="eye" onClick={toggleEyePassword}></i>
                </span>
              </>
            )}

            <br />
            <div className="checkbox-term">
              <input type="checkbox" name="term" id="term" required onClick={() => setCeklist(true)} />
              <label htmlFor="term">I caccept the Terms of Use & Privacy Policy.</label>
            </div>

            <button type="submit" className="log-in" onClick={submitForm}>
              {" "}
              Log In{" "}
            </button>
          </div>

          <div className="other">
            <button className="btn submits frgt-pass">Forgot Password</button>
            <button className="btn submits sign-up">
              Sign Up
              <i className="fa fa-user-plus" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
