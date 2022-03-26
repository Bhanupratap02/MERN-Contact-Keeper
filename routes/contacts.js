const express = require("express");
const { addContacts, getContacts, updateContacts, deleteContacts } = require("../controllers/contacts");
const { auth } = require("../middlewares/auth");
const router = express.Router();
router.use(auth);

router.route("/")
.post(addContacts)
.get(getContacts)

router.route("/:id")
.put(updateContacts)
.delete(deleteContacts)





module.exports = router ;