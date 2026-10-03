import request from "supertest";
import app from "./integration.js";
import { describe,test,expect } from "vitest";
describe("Basic CRUD",async()=>{
  test("Creates a User", async () => {
    const response = await request(app)
      .post("/users").query({name:"MeetBhai2",email:"meet121@gmail.com"})
      console.log(response)
      // here it will work but email must be unique in every test case to work
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("MeetBhai2");
  });
  test("Get Users",async()=>{
    const response = await request(app)
    .get("/users");
    expect(response.status).toBe(200)
  })
})