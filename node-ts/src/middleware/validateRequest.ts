import { AnySchema } from "yup"; // why not from Express/mongoose?
import { Request, Response, NextFunction } from "express";
import log from "../logger";

// currying: take in `schema` first and return function taking in req, res, next
const validate = (schema: AnySchema) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validate({
      // exactly what does it do? confirm the existence of these attributes?
      body: req.body,
      query: req.query,
      params: req.params,
    });

  } catch (e) {
    log.error(e);
    return res.status(400).send(e);
  }
};

export default validate;

