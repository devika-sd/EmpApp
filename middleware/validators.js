const { body,validationResult } = require('express-validator');

var register = [
    body('Email').isEmail(),
    body('Firstname').isLength({ min: 5 }),
    body('Phonenumber').isMobilePhone(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});
        next();
      }
]

module.exports =  register ;