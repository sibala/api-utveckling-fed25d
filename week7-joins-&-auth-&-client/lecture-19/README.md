# Auth intro

## Videolinks
- [01 - Todoclient DELETE request solution](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F08%20API%2Dutveckling%2FRecordings%2FAPI%2Dutveckling%2D20260903%5F092818%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E17a4df6d%2De311%2D4967%2Dbf31%2De9fc59f42f58)
- [02 - Todoclient POST request solution](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F08%20API%2Dutveckling%2FRecordings%2FAPI%2Dutveckling%2D20260903%5F101727%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E62d88be2%2D870d%2D4b77%2D861e%2Dbd75171d906f)
- [03 - Auth API with exercises](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F08%20API%2Dutveckling%2FRecordings%2FAPI%2Dutveckling%2D20260903%5F111617%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E5a0529ac%2Deffa%2D44c2%2D862c%2Ddefd67556f3a)


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


# Getting started

## 1. Start the API (`02-api-with-auth`)

```bash
cd 02-api-with-auth
npm install
```

Create a `.env` file in the `02-api-with-auth` folder with the following content:

```
JWT_SECRET = 'secret'
NODE_ENV = 'development'
CLIENT_URL = 'http://localhost:4000'
```

Start the API:

```bash
npm run dev
```

The API runs on `http://localhost:3000`.

## 2. Start the client (`03-client-template`)

Open a **new terminal** and run:

```bash
cd 03-client-template
npx serve -p 4000
```

The client runs on `http://localhost:4000`. Make sure both the API and client are running at the same time.

---

# Exercises

Use the `03-client-template` folder. The HTML, CSS, and `functions.js` are provided — you only need to write the JavaScript.
The client should already be running on port 4000 (see above).

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
