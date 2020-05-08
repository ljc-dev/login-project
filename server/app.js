const express = require("express")
const { ApolloServer } = require("apollo-server-express")
// const { RedisCache} = require("apollo-server-cache-redis")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { typeDefs, resolvers } = require("./lib/schemas")
const { findUserById } = require("./lib/users")
const { createAccessToken, createRefreshToken, sendRefreshToken, verifyRefreshToken } = require("./lib/tokensFcts")


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.post("/refresh-token", async (req, res) => {
  const token = req.cookies["refresh"]
  if (!token) return res.send({ accessToken: "", ok: false, errorMsg: "no refresh token" })
  try {
    //get id and token version from refresh token
    const { id, tokenVersion } = verifyRefreshToken(token)
    if (!id) return res.send({ accessToken: "", ok: false, errorMsg: "no id in refresh token" })
    //find user
    const user = await findUserById(id)
    if (!user) return res.send({ accessToken: "", ok: false, errorMsg: "no user with the provided id" })
    if (user.tokenVersion !== tokenVersion) return res.send({ accessToken: "", ok: false, errorMsg: "invalid token version" })
    //found user, and same token version => send access, refresh and user
    const accessToken = createAccessToken({ id: user.id })
    const refreshToken = createRefreshToken({ id: user.id, tokenVersion: user.tokenVersion })
    sendRefreshToken(res, refreshToken)
    return res.send({ accessToken, ok: true, errorMsg: "" })
  } catch (err) {
    console.log("refresh err", err.message)
    return res.send({ ok: false, errorMsg: "invalid or missing refresh token" })
  }

})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
  // cache: new RedisCache()
})

server.applyMiddleware({ app, cors: false })

const port = process.env.PORT || 4000

app.listen(port, console.log(`GraphQL at http://localhost:${port}${server.graphqlPath}`))