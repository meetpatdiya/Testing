import express from "express";
import { createPool } from "mysql2";
const db = createPool({
  host: "localhost",
  user: "root",
  database: "temp",
  password: "meet1987",
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
export default app;
