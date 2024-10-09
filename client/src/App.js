import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/showpasswords/").then((response) => {
      setPasswordList(response.data);
    });
  }, []);

  const addPassword = () => {
    Axios.post("http://localhost:3001/addpassword/", {
      password: password,
      title: title,
    });
  };

  const decryptPassword = (encryption) => {
    Axios.post("http://localhost:3001/decryptpassword/", {
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div className="App">
      <div className="AddingPassword">
        <input
          type="text"
          placeholder="Ex. password123"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Ex. Facebook"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button onClick={addPassword}>Add Password</button>
      </div>
      <div className="passwords">
        {passwordList.map((val) => {
          return (
            <div
              className="password"
              onClick={() => {
                decryptPassword({ password: val.password, iv: val.iv });
              }}
            >
              <h3>{val.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
