import express from "express";
import { createPool } from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = createPool({
  host: "localhost",
  user: "root",
  database: process.env.DB,
  password: process.env.PASSWORD,
});
const app = express();
app.use(express.json());
app.post("/users", async (req, res) => {
  const { name, email } = req.query;
  console.log(name, " hey ", email, "data");
  const password = "hello@123";
  const q = "INSERT INTO users(name,email,password) value(?,?,?)";
  const [data] = await db.promise().query(q, [name, email, password]);
  return res.status(201).json({
    success: true,
    name,
    email,
  });
});
app.get("/users", async (req, res) => {
  const [data] = await db.promise().query("Select * from users");
  return res.status(200).json({ success: true, data });
});
app.get("/users/:id", async (req, res) => {
  const {id} = req.params;
  if(isNaN(id)){
    return res.status(400).json({success:false,message:"Id must be number"})
  }
  const [data] = await db.promise().query("Select * from users where user_id = ?",[id]);
  console.log("data:",data)
  if(data.length == 0){
    return res.status(404).json({success:true,message:"UserId doesn't exists"})
  }
  return res.status(200).json({ success: true, data });
});
export {db};
export default app;
