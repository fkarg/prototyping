import { Express, Request, Response } from "express";
import { createUserHandler, createUserSessionHandler } from "./controller/user.controller";
import validateRequest from "./middleware/validateRequest";
import { createUserSchema, createUserSessionHandler } from "./schema/user.schema";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));


  // Register user
  // POST /api/user
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // Login
  // POST /api/sessions
  app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler);


  // Get the users session
  // GET /api/sessions


  // Logout
  // DELETE /api/sessions

}

