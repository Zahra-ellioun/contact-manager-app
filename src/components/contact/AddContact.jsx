import { Link } from "react-router-dom";
import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { Spinner } from "../../components";
import { ContactContext } from "../../context/contactContext";
import { CurrentLine, Green, Purple } from "../../helpers/colors";
import { addContactValidationSchema } from "../../validation/addContactValidation";

const AddContact = () => {
  const {
    groups,
    loading,
    createContactForm,
    // errors,
  } = useContext(ContactContext);

  return (
    <section className="max-w-6xl mx-auto">
      <h2
        className="text-center border-b my-2 py-4 text-xl"
        style={{ color: Green, borderColor: Green }}
      >
        ساخت مخاطب جدید
      </h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex">
          <div className="w-1/3 px-3 lg:px-0 my-3">
            {/* {errors?.map((err, index) => (
              <p className="text-red-400 py-1" key={index}>
                {err.message}
              </p>
            ))} */}
            <Formik
              initialValues={{
                full: "",
                group: "",
                photo: "",
                email: "",
                job: "",
                mobile: "",
              }}
              validationSchema={addContactValidationSchema}
              onSubmit={(values) => {
                console.log(values);
                createContactForm(values);
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
                      value="ساخت مخاطب"
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
          </div>
          <div className="w-2/3">
            <img
              src={require("../../assets/man-taking-note.png")}
              alt=""
              className="opacity-50"
            />
          </div>
        </div>
      )}
    </section>
  );
};
export default AddContact;
