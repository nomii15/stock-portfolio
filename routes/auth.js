const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Validator = require('validator');

const crypto = require('crypto');

const keys = require('../config/keys');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = mongoose.model('users');

module.exports = (app) => {
  app.post('/api/register', async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    }
    const buf = await crypto.randomBytes(20);
    const token = buf.toString('hex');
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save();
      });
    });

    res.send({ success: 'You have successfully registered!' });
  });

  app.post('/api/login', async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: 'Could not find a user with that email',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const payload = {
        id: user.id,
        name: user.name,
      };

      const accessToken = jwt.sign(payload, keys.secretOrKey, {
        expiresIn: 7889231 * 4,
      });

      res.json({
        success: true,
        token: `Bearer ${accessToken}`,
      });
    } else {
      return res.status(400).json({
        error: 'That username and password combination could not be found.'
      });
    }
  });

  app.post('/api/logout', async (req, res) => {

  });

  app.get('/api/get-current-user', async (req, res) => {

  });
};
