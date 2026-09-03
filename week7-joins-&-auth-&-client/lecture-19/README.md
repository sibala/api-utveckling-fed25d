# Auth intro

## Videolinks
- [01 -...]()
- [02 -...]()
- [03 -...]()


## The code walkthrough
- [01-todoclient-solutions](01-todoclient-solutions) - Solutions on exercise from previous lecture 18
- [02-api-with-auth](02-api-with-auth) - API with endpoints protected by an authentication layer
- [03-client-template](03-client-template) - Empty template for the exercise below


## Reading suggestions
### Auth & CORS
- [JWT.io - What is JSON Web Token](https://www.jwt.io/introduction#what-is-json-web-token)
- [What is the difference between CORS and CSP?](https://dev.to/sophiekaelin/what-is-the-difference-between-cors-and-csp-i7n)
- [npm - jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [npm - cors](https://www.npmjs.com/package/cors)
- [npm - cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [npm - bcrypt](https://www.npmjs.com/package/bcrypt)

### Install auth-related packages
```bash
npm install bcrypt cookie-parser cors jsonwebtoken
npm install -D @types/bcrypt @types/cookie-parser @types/cors @types/jsonwebtoken
```

### Client
- [MDN - try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
- [MDN - Fetch API (GET, POST, DELETE)](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN - async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN - URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [MDN - JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
- [MDN - window.location.href](https://developer.mozilla.org/en-US/docs/Web/API/Location/href)


# Exercises

Use the `03-client-template` folder. The HTML, CSS, and `functions.js` are provided — you only need to write the JavaScript.
Serve the client with `npx serve -p 4000` from the `03-client-template` folder.

## 1. Login - Implement the login logic in `login.js`
- Add a click event listener to the Login button (`#login-btn`)
- On click, send a `POST` request to `/auth/login` with hardcoded username and password in the request body
- Remember to set `credentials: "include"` in the fetch settings, so the browser accepts the cookie from the API
  ```js
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ /* data */ })
  })
  ```
- On success, redirect to `protected.html` using `window.location.href`
- On failure, display an error message in `#login-message`

## 2. Protected page - Fetch and display protected content in `protected.js`
- Fetch `GET /greetings/admin` with `credentials: "include"` in the fetch settings
- If the response is OK, display the greeting in `#greeting`
- If the response is not OK (401/403), redirect back to `index.html` with a query parameter message (e.g. `?message=You must be logged in to view this page`)
- In `login.js`, read the query parameter on page load using `URLSearchParams` and display the message if present

## 3. Logout - Implement the logout logic in `protected.js`
- Add a click event listener to the Logout button (`#logout-btn`)
- On click, send a `POST` request to `/auth/logout` with `credentials: "include"`
- After logout, redirect back to `index.html` with a message (e.g. `?message=You have been logged out`)
