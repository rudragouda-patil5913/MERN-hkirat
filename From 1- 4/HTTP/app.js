const express = require("express");

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
  const count = req.query.count;
  res.json({
    count: count
  })
})



app.listen(3000,()=>{
  console.log("Successfully running")
})