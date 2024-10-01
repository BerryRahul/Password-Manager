const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const PORT = 3001;

const {encrypt, decrypt} = require("./encryptionHandler");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "PasswordManager",
});

// route
app.post("/addpassword", (req, res) => {
  const { password, title } = req.body;
  const hashedPassword = encrypt(password);

  db.query(
    "INSERT INTO passwords (password, title, iv) VALUES (?, ?, ?)",
    [hashedPassword.password, title, hashedPassword.iv],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
});

app.listen(PORT, () => {
  console.log("Server is running");
});
