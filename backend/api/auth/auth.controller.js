const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
  const { username, password } = req.body
  try {
    const user = await authService.login(username, password)
    logger.info('User login:\n', user)
    res.json(user)
  } catch (err) {
    logger.error('Failed to Login:\n', err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

async function signup(req, res) {
  try {
    const { username, password, fullname } = req.body
    const account = await authService.signup(username, password, fullname)
    logger.info(`New account created:\n` + JSON.stringify(account))
    const user = await authService.login(username, password)
    res.json(user)
  } catch (err) {
    logger.error('Failed to signup:\n', err)
    res.status(500).send({ err: 'Failed to signup' })
  }
}

async function logout(req, res) {
  try {
    res.send({ msg: 'Logged out successfully' })
  } catch (err) {
    logger.error('Failed to logout:\n', err)
    res.status(500).send({ err: 'Failed to logout' })
  }
}

module.exports = {
  login,
  signup,
  logout,
}
