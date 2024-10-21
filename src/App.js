import { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import { Route, Routes, useNavigate } from "react-router-dom";
import { ContactContext } from "./context/contactContext";

import "./App.css";
import { ToastContainer, toast } from "react-toastify";
// import { addContactValidationSchema } from "./validation/addContactValidation";
import { Background, CurrentLine, Yellow, Purple } from "./helpers/colors";
import {
  Contacts,
  Navbar,
  About,
  Books,
  Book,
  AddContact,
  ViewContact,
  EditContact,
} from "./components";
import {
  getAllGroup,
  getAllContact,
  createContact,
  deleteContact,
} from "./services/contactService";
import { useImmer } from "use-immer";

// app function
const App = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useImmer([]);
  const [filteredContacts, setfilteredContacts] = useImmer([]);
  const [groups, setGroups] = useState([]);
  // const [errors, setErrors] = useState([]);
  const [contact, setContact] = useState({});

  // add initial to navigate for redirect item after an event
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: dataContact } = await getAllContact();
        const { data: datagroup } = await getAllGroup();

        setContacts(dataContact);
        setfilteredContacts(dataContact);
        setGroups(datagroup);

        setLoading(false);
      } catch (err) {
        console.log(err.massage);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // function for add contact with submit button
  const createContactForm = async (values) => {
    // e.preventDefault();
    try {
      setLoading((prevLoading) => !prevLoading);

      // await addContactValidationSchema.validate(contact, { abortEarly: false });

      const { status, data } = await createContact(values);

      if (status === 201) {
        // const { data: dataContact } = await getAllContact();
        // SetContacts(dataContact);
        // const allContacts = [...contacts, data];

        // setContacts(allContacts);
        // setfilteredContacts(allContacts);

        setContacts((draft) => {
          draft.push(data);
        });
        setfilteredContacts((draft) => {
          draft.push(data);
        });

        // setContact({});
        // setErrors([]);
        setLoading((prevLoading) => !prevLoading);
        navigate("/");
        toast.success("مخاطب با موفقیت اضافه شد ");
      }
    } catch (err) {
      // console.log("gdgdgdbgdbgbd", err);
      // setErrors(err.inner);
      console.log(err);
      setLoading((prevLoading) => !prevLoading);
    }
  };

  // // function for add item in contact when start to write text in addContact form
  // const onContactChange = (e) => {
  //   setContact({ ...contact, [e.target.name]: e.target.value });
  // };

  // confirm alert for delete contact
  const confirmDelete = (contactId, contactFull) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            className="p-6 m-3 bg-opacity-40 rounded-md"
            style={{ backgroundColor: Background }}
          >
            <h1 className="text-4xl" style={{ color: Yellow }}>
              پاک کردن مخاطب
            </h1>
            <p className="py-3 text-white">
              مطمئنی که می خوای {contactFull} رو پاک کنی؟
            </p>
            <button
              className="rounded-md px-2 mx-2 py-1"
              style={{ backgroundColor: Purple }}
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
            >
              مطمئن هستم
            </button>
            <button
              className="rounded-md px-2 mx-2 py-1"
              style={{ backgroundColor: CurrentLine }}
              onClick={onClose}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  // function for delete contact
  const removeContact = async (contactId) => {
    const allContactsCopy = [...contacts];
    try {
      setLoading(true);

      const { status } = await deleteContact(contactId);
      // console.log(response);
      // console.log(response);
      if (status == 200) {
        // const { data: allContacts } = await getAllContact();
        // console.log(allContacts);
        // const newContacts = allContacts.filter((c) => c.id != contactId);
        // console.log(newContacts);
        // setContacts(newContacts);
        // setfilteredContacts(newContacts);

        setContacts((draft) => draft.filter((c) => c.id != contactId));
        setfilteredContacts((draft) => draft.filter((c) => c.id != contactId));
        setLoading(false);
        toast.error("مخاطب با موفقیت حذف شد ");
      }
    } catch (err) {
      console.log(err);
      setContacts(allContactsCopy);
      setfilteredContacts(allContactsCopy);
      setLoading(false);
    }
  };

  // function searchbox in navbar
  // let amountTimeout;
  // const searchBox = (query) => {
  //   clearTimeout(amountTimeout);
  //   amountTimeout = setTimeout(() => {
  //     setfilteredContacts(
  //       contacts.filter((contact) => contact.full.includes(query))
  //     );

  //   }, 1000);
  // };
  let amountTimeout;
  const searchBox = (query) => {
    console.log("again");
    console.log(query);
    clearTimeout(amountTimeout);
    if (!query) return setfilteredContacts([...contacts]);

    amountTimeout = setTimeout(() => {
      setfilteredContacts([...contacts]);
      setfilteredContacts((draft) => {
        console.log("zizi");
        return draft.filter((c) => {
          console.log("hi");
          return c.full.includes(query);
        });
      });
    }, 1000);
  };

  return (
    <ContactContext.Provider
      value={{
        contact,
        contacts,
        loading,
        filteredContacts,
        groups,
        // errors,
        setLoading,
        searchBox,
        confirmDelete,
        // onContactChange,
        createContactForm,
        removeContact,
        setContacts,
        setfilteredContacts,
      }}
    >
      <>
        <ToastContainer rtl={true} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="/addcontact" element={<AddContact />} />
          <Route path="/viewContact/:contactId" element={<ViewContact />} />
          <Route
            path="/editcontact/:contactId"
            element={<EditContact groups={groups} loading={loading} />}
          />
          <Route path="/books" element={<Books />}>
            <Route
              index
              element={
                <div className="w-2/4 text-xl text-white text-center py-10">
                  کتاب مورد نظر را جست وجو کنید
                </div>
              }
            />
            <Route path=":bookName" element={<Book />} />
          </Route>

          <Route path="/about" element={<About />} />
          <Route
            path="*"
            element={
              <main className="flex justify-center my-10">
                <p className="text-white text-xl">محتوایی یافت نشد</p>
              </main>
            }
          />
        </Routes>
      </>
    </ContactContext.Provider>
  );
};

export default App;
