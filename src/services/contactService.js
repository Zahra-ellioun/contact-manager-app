import axios from "axios";
const URL_SERVER = "http://localhost:9000";

export const getAllContact = () => {
  const url = `${URL_SERVER}/contact`;
  return axios.get(url);
};

export const getContact = (contactId) => {
  const url = `${URL_SERVER}/contact/${contactId}`;
  return axios.get(url);
};

export const updateContact = (contact, contactId) => {
  const url = `${URL_SERVER}/contact/${contactId}`;
  return axios.put(url, contact);
};

export const createContact = (contact) => {
  const url = `${URL_SERVER}/contact`;
  return axios.post(url, contact);
};

export const deleteContact = (contactId) => {
  const url = `${URL_SERVER}/contact/${contactId}`;
  return axios.delete(url);
};

export const getAllGroup = () => {
  const url = `${URL_SERVER}/group`;
  return axios.get(url);
};

export const getGroup = (groupId) => {
  const url = `${URL_SERVER}/group/${groupId}`;
  return axios.get(url);
};
