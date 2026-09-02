import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.cookies.accessToken)
  if (req.cookies.accessToken === undefined) {
    res.sendStatus(401)
    return;
  }
  
  // IF JWT is verified, allow the client to move on the the endpoints
  // ELSE  give error message 
  jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET || "", function(err: jwt.VerifyErrors | null) {
    if (err) {
      res.sendStatus(403)
      return;
    }

    next(); // Makes the request move on to the next step in the process, in this case move on to the /todos endpoints
  });
}
