import { Request, Response } from "express"
import jwt from 'jsonwebtoken'

export const login = async (req: Request, res: Response) => {
    const {username, password} = req.body
    if (username === undefined || password === undefined) {
        res.status(400).json({message: 'username and password are required'})
        return
    }

    if (username === 'admin' && password === '123') {
        const accessToken = jwt.sign({username}, process.env.JWT_SECRET || "", {expiresIn: '7d'});
        console.log(accessToken)


        res.cookie('accessToken', accessToken, {
            // Prevents client-side JavaScript from accessing the cookie (e.g. document.cookie).
            // This protects against XSS attacks where malicious scripts try to steal the token.
            httpOnly: true, // JS has no access to the cookie

            // When true, the cookie is only sent over HTTPS connections.
            // We enable this in production (where we use HTTPS) but disable it locally (HTTP).
            secure: false, 

            // Controls when the cookie is sent with cross-site requests.
            // 'none': Cookie is sent on all cross-origin requests (required when frontend and API are on different domains in production). Requires secure: true.
            // 'lax': Cookie is sent on same-site requests and top-level navigations (safe default for local development).
            sameSite: 'lax',

            // How long the cookie lives in the browser, in milliseconds.
            // After this time the browser automatically deletes the cookie and the user must log in again.
            maxAge: 1000 * 60 * 60 * 24 * 7 // Lives on for 7 days
        })
        res.json({message: 'You are logged in', isLoggedIn: true})
        return;
    } else {
        res.status(401).json({message: 'username/password are wrong'})
        return
    }
}

export const register = async (req: Request, res: Response) => {
    // Will talkt more about register with bcrypt next week
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie('accessToken')
    res.json({message: "You are logged out"})
}
