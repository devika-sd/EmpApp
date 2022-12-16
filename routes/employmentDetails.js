var express = require('express');
var employmentDetails = require('../controller/employmentDetails');
var router = express.Router();

router.route("/details/:id")
.get(employmentDetails.viewDetails);

module.exports=router;