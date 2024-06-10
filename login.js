const express = require("express");
const path = require("path");
const app = express();
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyD_huvrivg5sRY_efjJodA6U2XhqNrP8LQ",
  authDomain: "capstone-projet-ee9c8.firebaseapp.com",
  projectId: "capstone-projet-ee9c8",
  storageBucket: "capstone-projet-ee9c8.appspot.com",
  messagingSenderId: "345327430546",
  appId: "1:345327430546:web:4892f554fd509fe27cef4b",
};

const firebaseApp = initializeApp(firebaseConfig);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.post("/registration", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const auth = getAuth(firebaseApp);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        res.sendFile(path.join(__dirname, "loginpagesuccess.html"));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        res.status(400).send(`Error: ${errorMessage}`);
      });
  } catch (e) {
    console.error(e);
    res.redirect("/registration");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const auth = getAuth(firebaseApp);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        res.sendFile(path.join(__dirname, "loginpagesuccess.html"));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        res.status(400).send(`Error: ${errorMessage}`);
      });
  } catch (e) {
    console.error(e);
    res.redirect("/login");
  }
});

app.get("/dashboard", async (req, res) => {
  const recipeName = req.query.name;
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${cityName}`;

  try {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error in searching recipe:", error);
    res.status(500).send("Error in finding the recipe details");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
