//mock-up db, added extra async/await even if not needed to mimic looking up stuff in db
const { v4: uuidV4 } = require("uuid")
const bcrypt = require("bcrypt")
const users = []

const createUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = {
    id: uuidV4(),
    username,
    password: hashedPassword,
    tokenVersion: 0,
  }

  await users.push(user)
  return user
}

const addUserToDB = async (username, password) => {
  if (await findUserByName(username)) return null
  return await createUser(username, password)
}

const findUserById = async (id) => {
  return await users.find(user => user.id === id)
}

const findUserByName = async (username) => {
  return await users.find(user => user.username === username)
}

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

const incrTokenVersion = async (id) => {
  //mock increment of token version with trycatch
  try {
    user = await users.find(user => user.id === id)
    user.tokenVersion++
    return true
  } catch{
    return false
  }
}

module.exports = {
  addUserToDB, comparePassword, findUserById, findUserByName, incrTokenVersion
}