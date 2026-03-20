import { describe, it, expect } from "vitest";
import request from "supertest";
import * as appModule from "../src/app.js";
import http from "http";
const app = appModule.default || appModule;
const server = http.createServer(app);

describe("Health endpoint", () => {
  it("returns ok", async () => {
    const res = await request(server).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
