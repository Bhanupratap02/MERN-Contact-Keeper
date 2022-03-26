/** @format */

const User = require("../models/User");
const Contact = require("../models/Contact");
const Error = require("../middlewares/error");

//@desc     Get all  your saved contact
//@route    Get  /api/contacts
//@access   Private
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(400).json(Error(error.message));
  }
};

//res.data = conctacts

//@desc      Add a new contact in your user account
//@route     Post   /api/contacts
//@access    Private
exports.addContacts = async (req, res) => {
  try {
    const { name, email, phone, type } = req.body;
    const newContact = new Contact({
      user: req.user.id,
      name,
      email,
      type,
      phone,
    });
    const contact = await newContact.save();
    res.json({
      success: true,
      data: contact,
      msg: "Contact added",
    });
  } catch (error) {
    res.status(400).json(Error(error.message));
  }
};

//@desc      Update your existing contact
//@route     Put   /api/contacts/:id
//@access    Private
exports.updateContacts = async  (req, res) => {
  const { name, email, phone, type } = req.body;
  // Build contact object
  const contactField = {};
  if (name) contactField.name = name;
  if (email) contactField.email = email;
  if (phone) contactField.phone = phone;
  if (type) contactField.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json(Error("Contact not found "));
    // make sure that user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json(Error("Not authorized"));
    }
    contact = await Contact.findByIdAndUpdate(req.params.id, {
      $set: contactField,
    },
    {new:true});
    res.status(200).json(contact);
  } catch (error) {
      console.log(error.message);
      res.status(500).json(Error("server error"));
  }
};

//@desc      Delete your existing contact
//@route     Delete   /api/contacts/:id
//@access    Private
exports.deleteContacts = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json(Error("Contact not Found"));
    }
    // make sure that user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json(Error("Not authorized"));
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.status(200).json(Error("Contact removed"));
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};
