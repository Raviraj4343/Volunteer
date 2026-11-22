/**
 * middlewares/errorHandler.js — the ONE place errors become HTTP responses.
 * Any `throw` (or `next(err)`) anywhere ends up here.
 *
 * Connects to: utils/ApiError.js, utils/apiResponse.js (sendError),
 * config/env.js (hide stack traces in production). Registered LAST in app.js.
 */
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { sendError } from "../utils/apiResponse.js";
import { isProduction } from "../config/env.js";

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
    let status = 500;
    let message = "Something went wrong.";
    let errors = undefined;

    if(err instanceof ApiError){
      status = err.statusCode;
      message = err.message;
      errors = err.details;
    }else if(err instanceof mongoose.Error.CastError){
      status = 400;
      message = `Invalid ${err.path}: ${err.value}`;
    }else if(err instanceof mongoose.Error.ValidationError){
      status = 422;
      message = "Validation error.";
      errors = Object.values(err.errors).map((error)=>({
        field: error.path,
        message: error.message,
      }));
    }else if(err.code === 11000){
      status = 409;
      message = "Already exists.";
    }else if(err.type === "entity.too.large"){
      status = 413;
      message = "Request body too large.";
    }else{
      console.error("Unexpected error:", err);
      status = 500;
      message = "Something went wrong.";

      if(!isProduction){
        errors={
          stack: err.stack,
          originalMessage: err.message,
        };
      }
    }

    return sendError(res,{
      status,
      message,
      errors,
    });
}
