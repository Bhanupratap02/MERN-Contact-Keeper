/** @format */

import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/ContactContext";
const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  // const { _id, name, email, phone, type } = contact.data;
  // console.log(contact);
  const onDelete = () => {
    deleteContact(contact._id);
    clearCurrent();
  };
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {contact.name}{" "}
        <span
          style={{ float: "right" }}
          className={`badge
       ${contact.type === "professional" ? "badge-success" : "badge-primary"}`}
        >
          {`${contact.type}`.charAt(0).toUpperCase() + contact.type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {contact.email && (
          <li>
            <i className="fas fa-envelope-open"></i> {contact.email}
          </li>
        )}
        {contact.phone && (
          <li>
            <i className="fas fa-phone"></i> {contact.phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};
ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};
export default ContactItem;
