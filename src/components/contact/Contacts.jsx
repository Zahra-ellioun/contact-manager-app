import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import { Orange, Pink } from "../../helpers/colors";
import { Spinner, Contact } from "../../components";
import { ContactContext } from "../../context/contactContext";

const Contacts = () => {
  const { loading, confirmDelete, filteredContacts } =
    useContext(ContactContext);
  return (
    <Fragment>
      <section className="flex justify-center max-x-6xl my-4 mx-auto px-3">
        <Link
          to={"/addContact"}
          className="px-4 py-2 rounded-sm"
          style={{ backgroundColor: Pink }}
        >
          ساخت مخاطب جدید <i className="fa-solid fa-circle-plus"></i>
        </Link>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <section className="max-w-6xl my-4 mx-auto px-3 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((c) => (
                <Contact
                  key={c.id}
                  confirmDelete={() => {
                    confirmDelete(c.id, c.full);
                  }}
                  contact={c}
                />
              ))
            ) : (
              <div className="col-span-2 py-5  ">
                <div className="flex flex-col justify-center items-center">
                  <p style={{ color: Orange }} className="text-3xl pb-10">
                    مخاطب یافت نشد...
                  </p>
                  <img
                    src={require("../../assets/no-found.gif")}
                    className="w-96"
                    alt="contact not found"
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default Contacts;
