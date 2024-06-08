import { ZodError, ZodIssue } from "zod"
import { TErrorSource, TGenericErrorResponse } from "../interface/error"

export const handleZodError = (error : ZodError):TGenericErrorResponse=>{
    const errorSources:TErrorSource = error.issues.map((issue: ZodIssue)=>{
      return{
        path: issue?.path[issue.path.length-1],
        message: issue.message
      }
    })
    const statusCode = 400
    return {
      statusCode,
      message : "Validation error",
      errorSources, 
    }
  }