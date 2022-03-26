/** @format */
import React, { useContext, useEffect, useRef } from "react";
import ContactContext from "../../context/contact/ContactContext";
const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContact, clearFilter, filtered } = contactContext;
  const text = useRef(" ");
  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  }, [filtered,text]);
  const onChange = (e) => {
    if (text.current.value !== "") {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
