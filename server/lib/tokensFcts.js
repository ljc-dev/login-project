const jwt = require("jsonwebtoken")
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../config")

const createAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "30s" })
}

const createRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "3m" })
}

const verifyAccessToken = (token) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET)
}

const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET)
}

const sendRefreshToken = (res, token) => {
  res.cookie("refresh", token, {
    httpOnly: true,
    sameSite: "lax"
  })
}

module.exports = {
  sendRefreshToken, createAccessToken, createRefreshToken, verifyAccessToken, verifyRefreshToken
}