import request from "supertest";
import app,{db} from "./integration.js";
import { describe, test, expect, beforeEach, afterAll } from "vitest";
describe("Basic CRUD - GET", async () => {
  test("Get Users", async () => {
    const response = await request(app)
      .get("/users");
    expect(response.status).toBe(200)
  })
  test("Get Users with id", async () => {
    const response = await request(app)
      .get("/users/1");
    expect(response.status).toBe(200)
    expect(response.body.data[0].user_id).toBe(1)
  })
  test("Invalid user-Id", async () => {
    const response = await request(app)
      .get("/users/1000");
    expect(response.status).toBe(404)
  })
  test("String user-Id", async () => {
    const response = await request(app)
      .get("/users/hey");
    expect(response.status).toBe(400)
  })
})

describe("POST", async () => {
  beforeEach(async () => {
    await db.promise().query(`start transaction`);
  })
  afterAll(async()=>{
    await db.promise().query(`rollback`)
  })
  test("Creates a User", async () => {
    const response = await request(app)
      .post("/users").query({ name: "MeetBhai2", email: "meet32@gmail.com" })
    // console.log(response)
    // here it will work but email must be unique in every test case to work
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("MeetBhai2");
  });
})