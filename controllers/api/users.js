
const User = require("../../models/User");
// controllers/api/users.js
const jwt = require('jsonwebtoken');

 async function create(req, res) {
    try {
      // Add the user to the database
      console.log(req.body)
      const user = await User.create(req.body);
        // token will be a string
        console.log('hello1', user);
        const token = createJWT(user);
        // Yes, we can use res.json to send back just a string
        // The client code needs to take this into consideration
        res.json(token);
  
    } catch (err) {
      // Client will check for non-2xx status code
      // 400 = Bad Request
      res.status(400).json('here');
    }
  }

  /*-- Helper Functions --*/

function createJWT(user) {
    return jwt.sign(
      // data payload
      { user },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
  }

module.exports = {
    create,
};