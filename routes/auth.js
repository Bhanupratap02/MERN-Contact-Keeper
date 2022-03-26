const express = require("express");
const { loggedInUser, Login } = require("../controllers/auth");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/",auth,loggedInUser);
router.post("/",Login);




module.exports = router ;