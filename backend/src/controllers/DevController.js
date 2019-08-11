const axios = require('axios')

const Dev = require('../models/Dev')

module.exports = {
      async store(req, res){
            const { username: user } = req.body

            const userExist = await Dev.findOne({ user })

            if(userExist){
                  return res.json(userExist)
            }

            const response = await axios.get(`https://api.github.com/users/${user}`)
            const { name, bio, avatar_url: avatar } = response.data

            const dev = await Dev.create({
                  name,
                  user,
                  bio,
                  avatar
            })

            return res.json(dev)
      }
}