import { Request, Response } from "express";

export const fetchGeneralGreeting = async (_: Request, res: Response) => {
  res.json({greeting: `Hello stranger. What can I do for you?`});
}


export const fetchSpecificGreeting = async (req: Request, res: Response) => {
  const name = req.params.name as string
  
  res.json({greeting: `Hello ${name}. Welcome to the controll panel :)`});
}
