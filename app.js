const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv/config");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require("./routes/users");
const roleRoutes = require("./routes/userRole");
const concertRoutes = require("./routes/concerts");
const saleRoutes = require("./routes/sales");

app.use(cors());

app.use("/user", userRoutes);
app.use("/role", roleRoutes);
app.use("/concert", concertRoutes);
app.use("/sale", saleRoutes);

mongoose.connect(process.env.DB_CONNECTION, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err) {
      console.warn('Error connecting to database');
      throw new Error(JSON.stringify(err));
    } else {
      console.log("connected to database!")
    }
  });
  
  const PORT = process.env.PORT; 
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));