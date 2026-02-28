import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export function signToken(payload) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: "2h" });
}

export function verifyToken(token) {
  return jwt.verify(token, config.jwtSecret);
}