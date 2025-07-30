import request from "supertest";
import app from "../src/app";

describe("POST api/url", () => {
  it("should create new ulr shortener with valid data", async () => {
    const urlData = {
      originalUrl: "https://www.google.com/",
      shortCode: "abc123",
    };

    const response = await request(app)
      .post("/api/url")
      .set("user", "12")
      .send(urlData)
      .expect(200);

    expect(response.body.payload).toHaveProperty("id");
    expect(response.body.payload.original_url).toBe(urlData.originalUrl);
  });
});

describe("GET api/", () => {
  it("should return urls list for user with user header", async () => {
    const response = await request(app)
      .get("/api/")
      .set("user", "12")
      .expect(200);

    expect(Array.isArray(response.body.payload)).toBe(true);
  });
});
