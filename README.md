# login-project
Login in nodejs/express back reactjs/nextjs front
P.S: I know it's bad practice to add .env file. I'm keeping it so you can clone the project and build without having to add stuff.
To test tokens, I set refresh to expire in 3min and access in 30s. Which means >3min of inactivity => logout

## How to build and test

### 1 - Run nodejs/express back

`cd server`

`npm i (install modules)`

`npm run dev`

### 2 - Open a new terminal & Run reactjs/nextjs front

`cd web`

`npm i`

`npm run dev`

### 3 - Open it on your browser at http://localhost:3000

Send any criticisms you have my way. Here to learn. Not gonna cry. :smile:
