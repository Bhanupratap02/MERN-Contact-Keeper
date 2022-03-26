/** @format */
// import Spinner from "../layout/Spinner";
import React, { Fragment, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const Contacts = () => {
  const contactContext = useContext(ContactContext);
  // const { contacts, filtered, getContact,loading } = contactContext;
  // console.log(contactContext.contacts);
   useEffect(()=>{
     contactContext.getContact();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[]);

  // if (contacts.length === 0) {
  //   return <h4>Please add a contact</h4>;
  // }
  return (
    <Fragment>
      <TransitionGroup>
        {contactContext.filtered !== null
          ? contactContext.filtered.map((contact) => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contactContext.contacts && contactContext.contacts.map((contact) => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
