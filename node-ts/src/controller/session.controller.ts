import { Request, Response } from "express";
import log from "../logger";

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate email and password -> service

  // create a session -> service

  // create access token -> util

  // create refresh token -> util

  // send back access & refresh token
}
