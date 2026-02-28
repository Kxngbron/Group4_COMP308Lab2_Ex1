import { verifyToken } from "../utils/jwt.js";

export function getUserFromReq(req) {
  const auth = req.headers.authorization || "";
  const parts = auth.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return null;

  try {
    const decoded = verifyToken(parts[1]);
    return decoded; // { id, studentNumber }
  } catch {
    return null;
  }
}

export function requireAuth(context) {
  if (!context.user) {
    throw new Error("Not authenticated");
  }
}