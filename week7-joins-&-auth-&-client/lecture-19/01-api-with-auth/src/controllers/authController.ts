import { Request, Response, CookieOptions } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,                       // true in production (HTTPS), false locally (HTTP)
  sameSite: isProduction ? 'none' : 'lax',    // 'none' for cross-origin in production, 'lax' locally
  maxAge: 1000 * 60 * 60 * 24 * 7             // 7 days
}


export const login = async (req: Request, res: Response) => {
  const {username, password} = req.body;
  if (username === undefined || password === undefined) {
    res.status(400).json({message: "Username and password are required"})
    return
  }

  const hashedPassword = "$2b$10$YTqBOyvtzrMoMYxVLSdvdO2.aXaidiT2yOfWb58GTO5doTSt4/Ewq"
  const isLoggedIn = await bcrypt.compare(password, hashedPassword)
  if (username === "admin" && password === "123") {
    const accessToken = jwt.sign({username}, process.env.JWT_SECRET || "", {expiresIn: "7d"});

    res.cookie('accessToken', accessToken, cookieOptions)
    res.json({message: 'You are logged in', isLoggedIn: isLoggedIn});
  } else {
    res.status(401).json({message: "Username or password are wrong"})
  }
}


export const register = async (req: Request, res: Response) => {
  const {username, password} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save the username/password in DB after encoding/hashing with bcrypt
    console.log(hashedPassword);
    res.json(hashedPassword)

  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}


export const logout = (req: Request, res: Response) => {
  res.clearCookie('accessToken')
  res.json({message: 'Token cleared'})
}