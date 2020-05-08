const { gql } = require("apollo-server-express")
const { createAccessToken, createRefreshToken, sendRefreshToken,
  verifyAccessToken, verifyRefreshToken } = require("./tokensFcts")
const { comparePassword, addUserToDB, findUserById, findUserByName, incrTokenVersion } = require("./users")

const typeDefs = gql`
  type User {
    id: ID
    username: String
    password: String
    tokenVersion: Int
  }

  type GetUserResponse {
    user: User
    errorMsg: String
  }

  type AddUserResponse {
    user: User
    errorMsg: String
  }

  type LoginResponse {
    accessToken: String
    user: User
    errorMsg: String
  }

  type LogoutResponse {
    ok: Boolean
    errorMsg: String
  }

  type Query {
    getUser: GetUserResponse
  }

  type Mutation {
    addUser(username: String!, password: String!): AddUserResponse
    login(username: String!, password: String!): LoginResponse
    logout: LogoutResponse
  }
`

const resolvers = {
  Query: {
    async getUser(_, __, { req }) {
      //get access token from auth
      const auth = req.headers.authorization
      try {
        //get token from auth
        const token = auth.split(" ")[1]
        if (!token) return { user: null, errorMsg: "no token in auth header" }
        //get id from token
        const { id } = verifyAccessToken(token)
        if (!id) return { user: null, errorMsg: "no id in access token" }
        //get user from id
        const user = await findUserById(id)
        if (!user) return { user: null, errorMsg: "no user with the provided id" }
        return { user, errorMsg: "" }
      } catch (err) {
        console.log("error getting user", err.message)
        return { user: null, errorMsg: "error getting user" }
      }
    },
  },
  Mutation: {
    async addUser(_, { username, password }) {
      //validate user input
      //add user
      const user = await addUserToDB(username, password)
      if (!user) return { user: null, errorMsg: "already existing user" }
      return { user, errorMsg: "" }
    },
    async login(_, { username, password }, { res }) {
      //validate user input
      //find user
      const user = await findUserByName(username)
      if (!user) return { user: null, errorMsg: "no user with provided username" }
      //compare passwords
      const result = await comparePassword(password, user.password)
      if (!result) return { user: null, errorMsg: "wrong password" }
      //user & password checked => send access/refresh and user back
      const accessToken = createAccessToken({ id: user.id })
      const refreshToken = createRefreshToken({ id: user.id, tokenVersion: user.tokenVersion })
      sendRefreshToken(res, refreshToken)
      return { accessToken, user, errorMsg: "" }
    },
    async logout(_, __, { req, res }) {
      //get access token from auth
      const auth = req.headers.authorization
      try {
        //get token from auth
        const token = auth.split(" ")[1]
        if (!token) return { ok: false, errorMsg: "no token in auth header" }
        //get id from token
        const { id } = verifyAccessToken(token)
        if (!id) return { ok: false, errorMsg: "no id in access token" }
        //get user from id
        const user = await findUserById(id)
        if (!user) return { ok: false, errorMsg: "no user with the provided id" }
        //incr tokenVersion
        const result = await incrTokenVersion(user.id)
        if (!result) return { ok: false, errorMsg: "incr token version failed" }
        //reset refreshToken
        sendRefreshToken(res, "")
        return { ok: true, errorMsg: "" }
      } catch (err) {
        console.log("error getting user", err.message)
        return { ok: false, errorMsg: "error getting user" }
      }
    },

  }
}

module.exports = {
  typeDefs, resolvers
}