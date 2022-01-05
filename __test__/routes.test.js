const request = require("supertest");
const app = require("../app");

describe("POST /login", () => {
  describe("login success", () => {
    test("should response with 200 status code", async () => {
      const response = await request(app).post("/login").send({
        email: "admin@beam.com",
        password: "Admin1234",
      });

      expect(response.statusCode).toBe(200);
    });
  });
});
