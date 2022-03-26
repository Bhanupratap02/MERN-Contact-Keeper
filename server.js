const express = require('express')
const mongoose = require('mongoose');
const app = express()





// Load  middlewares
app.use(express.json());





// Define Routes
app.use("/api/users",require("./routes/users"));
app.use("/api/auth",require("./routes/auth"));
app.use("/api/contacts",require("./routes/contacts"));



// Defining port for server
const PORT = process.env.PORT || 4000
mongoose
  .connect("mongodb://127.0.0.1:27017/contact-book", {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => {
    console.log("databse connected");
    app.listen(PORT,() => {
      console.log(`server is running on ${PORT}`)
    });
  })
  .catch((err) => {
    console.log("Error in connecting to DataBase", err.message);
  });