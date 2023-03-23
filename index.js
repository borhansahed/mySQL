const express = require("express");
require("dotenv").config();
const userRoute = require("./routes/userRoute");
const articleRoute = require("./routes/articleRoute");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

function run (){

  try{
    app.get("/", (req, res) => {
      res.send("Welcome to my ExpressJs And  mySQL project");
    });
    
    app.use("/user", userRoute);
    app.use("/article", articleRoute);
  }catch(err){
     res.send(err);
  }
}

run()


app.listen(PORT, () => {
  console.log(`app listing form  ${PORT}`);
});
