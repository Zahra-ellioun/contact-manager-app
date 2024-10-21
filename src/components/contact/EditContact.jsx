import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Spinner } from "../../components";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { addContactValidationSchema } from "../../validation/addContactValidation";
import { ContactContext } from "../../context/contactContext";
import { Green, Purple, CurrentLine } from "../../helpers/colors";
import { getContact, updateContact } from "../../services/contactService";
import { useImmer } from "use-immer";
import { toast } from "react-toastify";

const EditContact = () => {
  const {
    groups,
    loading,
    contacts,
    setLoading,
    setContacts,
    setfilteredContacts,
  } = useContext(ContactContext);

  const [contact, setContact] = useImmer({});
  const { contactId } = useParams();

  const Navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactInfo } = await getContact(contactId);
        // const { data: groupName } = await getGroup(contactInfo.group);
        // console.log(contactInfo);
        // console.log(groupName);

        setContact(contactInfo);
        // setGroup(groupName);
        setLoading(false);
      } catch (err) {
        console.log(err.massage);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // action after click on submit button
  const submitForm = async (values) => {
    // e.preventDefault();
    try {
      setLoading(true);
      console.log(values);
      const { data, status } = await updateContact(values, contactId);
      // console.log("zzzzz", status, data);
      // console.log("bbbbb", contact);
      if (status === 200) {
        // const allContacts = [...contacts];
        // console.log(allContacts);
        // const contactIndex = allContacts.findIndex((c) => c.id == contactId);
        // console.log(contactIndex);
        // console.log(typeof parseInt(contactId));
        // allContacts[contactIndex] = { ...data };
        // console.log(allContacts);
        // setContacts(allContacts);
        // console.log(contacts);
        // setfilteredContacts(allContacts);

        setContacts((draft) => {
          const contactIndex = draft.findIndex((c) => c.id == contactId);
          draft[contactIndex] = { ...data };
        });
        setfilteredContacts((draft) => {
          const contactIndex = draft.findIndex((c) => c.id == contactId);
          draft[contactIndex] = { ...data };
        });

        Navigate("/");
      }
      setLoading(false);
      toast.success("مخاطب با موفقیت ویرایش شد ");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto">
      <h2
        className="text-center border-b my-2 py-4 text-xl"
        style={{ color: Green, borderColor: Green }}
      >
        ویرایش مخاطب
      </h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div
            className="flex px-3 mx-2 rounded-md items-center my-8"
            style={{ backgroundColor: CurrentLine }}
          >
            <div className="w-2/3 px-3 lg:px-0 my-3">
              <Formik
                initialValues={{
                  full: contact.full,
                  group: contact.group,
                  photo: contact.photo,
                  email: contact.email,
                  job: contact.job,
                  mobile: contact.mobile,
                }}
                validationSchema={addContactValidationSchema}
                onSubmit={(values) => {
                  console.log(values);
                  submitForm(values);
                }}
              >
                {
                  <Form>
                    {" "}
                    <Field
                      type="text"
                      name="full"
                      className="px-2 py-1 rounded-md w-full border-2 mb-2"
                      placeholder="نام و نام خانوادگی"
                    />
                    <ErrorMessage name="full" />
                    <Field
                      type="text"
                      name="photo"
                      className="px-2 py-1 rounded-md w-full border-2 mb-2"
                      placeholder="آدرس تصویر"
                    />
                    <ErrorMessage name="photo" />{" "}
                    <Field
                      type="number"
                      name="mobile"
                      className="px-2 py-1 rounded-md w-full border-2 mb-2"
                      placeholder="شماره موبایل"
                    />
                    <ErrorMessage name="mobile" />{" "}
                    <Field
                      type="text"
                      name="email"
                      className="px-2 py-1 rounded-md w-full border-2 mb-2"
                      placeholder="ادرس ایمیل"
                    />
                    <ErrorMessage name="email" />{" "}
                    <Field
                      type="text"
                      name="job"
                      className="px-2 py-1 rounded-md w-full border-2 mb-2"
                      placeholder="شغل"
                    />
                    <ErrorMessage name="job" />{" "}
                    <Field
                      as="select"
                      type="text"
                      name="group"
                      className="px-2 py-1 rounded-md w-full border-2 mb-2"
                    >
                      <option value="">انتخاب گروه</option>
                      {groups.length > 0 &&
                        groups.map((group) => (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        ))}
                    </Field>
                    <ErrorMessage name="group" />{" "}
                    <div className="flex justify-center gap-x-2">
                      <input
                        type="submit"
                        className="px-3 py-2 rounded-md"
                        style={{ backgroundColor: Purple }}
                        value="ویرایش مخاطب"
                      />
                      <Link
                        to={"/"}
                        className="px-3 py-2 rounded-md"
                        style={{ backgroundColor: CurrentLine }}
                      >
                        انصراف
                      </Link>
                    </div>
                  </Form>
                }
              </Formik>
              {/* <form onSubmit={submitForm}>
                <input
                  className="px-2 py-1 rounded-md w-full border-2 mb-2"
                  type="text"
                  name="full"
                  value={contact.full}
                  onChange={contactUpdate}
                  placeholder="نام و نام خانوادگی"
                />
                <input
                  className="px-2 py-1 rounded-md w-full border-2 mb-2"
                  type="text"
                  name="photo"
                  value={contact.photo}
                  onChange={contactUpdate}
                  placeholder="آدرس تصویر"
                />
                <input
                  className="px-2 py-1 rounded-md w-full border-2 mb-2"
                  type="number"
                  name="mobile"
                  value={contact.mobile}
                  onChange={contactUpdate}
                  placeholder="شماره موبایل"
                />
                <input
                  className="px-2 py-1 rounded-md w-full border-2 mb-2"
                  type="text"
                  name="email"
                  value={contact.email}
                  onChange={contactUpdate}
                  placeholder="ادرس ایمیل"
                />
                <input
                  className="px-2 py-1 rounded-md w-full border-2 mb-2"
                  type="text"
                  name="job"
                  value={contact.job}
                  onChange={contactUpdate}
                  placeholder="شغل"
                />
                <select
                  className="px-2 py-1 rounded-md w-full border-2 mb-2"
                  type="text"
                  name="group"
                  value={contact.group}
                  onChange={contactUpdate}
                  placeholder="گروه"
                >
                  <option value={contact.group}>{contact.group}</option>
                  {groups.length > 0 &&
                    groups.map((group) => (
                      <option key={group.id} value={group.name}>
                        {group.name}
                      </option>
                    ))}
                </select>
                <div className="flex justify-center gap-x-2">
                  <input
                    type="submit"
                    className="px-3 py-2 rounded-md"
                    style={{ backgroundColor: Purple }}
                    value="ویرایش مخاطب"
                  />
                  <Link
                    to={"/"}
                    className="px-3 py-2 rounded-md"
                    style={{ backgroundColor: Background }}
                  >
                    انصراف
                  </Link>
                </div>
              </form> */}
            </div>
            <div className="w-1/3 ">
              <img
                src="https://via.placeholder.com/250"
                alt=""
                className="mx-auto rounded-md"
              />
            </div>
          </div>
          <img
            src={require("../../assets/man-taking-note.png")}
            alt=""
            className="opacity-50 mx-auto my-8"
          />
        </>
      )}
    </section>
  );
};
export default EditContact;
