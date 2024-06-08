import { TGenericErrorResponse } from "../interface/error";

export const handleDuplicateError = (error:any) : TGenericErrorResponse =>{
    //extract value within double quotes using regex
    const match = error.message.match(/"([^"]*)"/);

    //Extracted value will be in the first capturing group
    const extractMessage = match && match[1];

    const errorSources = [{
        path : '',
        message : extractMessage
    }]

    const statusCode = 400
    return {
      statusCode,
      message : "Invalid ID",
      errorSources, 
    }
}