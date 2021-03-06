/** @format */
import axios from "axios";
import React, { useReducer } from "react";
// import { v4 as uuid } from "uuid";
import contactContext from "./ContactContext";
import contactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  ClEAR_CONTACTS,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  GET_CONTACTS,
  SET_CURRENT,
  UPDATE_CONTACT,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get Contacts
  const getContact = async () => {
    try {
      const res = await axios.get("/api/contacts");
      // console.log(res);
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.errorMsg });
    }
  };

  //  Add Contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data.data });
    } catch (error) {
      // console.log(error);
      dispatch({ type: CONTACT_ERROR, payload: error.response.errorMsg });
    }
  };
  //  Delete Contact
  const deleteContact = async (id) => {
     try {
      await axios.delete(`/api/contacts/${id}`);
       dispatch({ type: DELETE_CONTACT, payload: id });
     } catch (error) {
       dispatch({ type: CONTACT_ERROR, payload: error.response.errorMsg });
     }
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // clear contacts
  const clearContact = () => {
    dispatch({ type: ClEAR_CONTACTS });
  };
  // Set Current Contact
  const setCurrent = (contact) => {
    console.log(contact);
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  // Clear current Contacts
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  // Update Contacts
  const updateContact = async (contact) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
    dispatch({ type: UPDATE_CONTACT, payload: res.data});
    } catch (error) {
      // console.log(error);
      dispatch({ type: CONTACT_ERROR, payload: error.response.errorMsg });
    }
   
  };
  // Filter Contacts
  const filterContact = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter,
        getContact,
        clearContact,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
