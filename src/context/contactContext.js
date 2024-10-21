import { createContext } from "react";

export const ContactContext = createContext({
  loading: false,
  group: {},
  // groups: [],
  contact: {},
  contacts: [],
  // queryContact: {},
  filteredContacts: [],
  // errors: [],
  // setGroup: () => {},
  searchBox: () => {},
  // setContact: () => {},
  setLoading: () => {},
  setContacts: () => {},
  // removeContact: () => {},
  confirmDelete: () => {},
  // onContactChange: () => {},
  createContactForm: () => {},
  setfilteredContacts: () => {},
});
