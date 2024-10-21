import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { Background, CurrentLine, Green, Purple } from "../../helpers/colors";
import { Spinner } from "../../components";
import { getContact, getGroup } from "../../services/contactService";
import { ContactContext } from "../../context/contactContext";

const ViewContact = () => {
  const { contactId } = useParams();
  const { setLoading, loading } = useContext(ContactContext);
  const [state, setState] = useState({
    contact: {},
    group: {},
  });
  // {
  //   console.log(contactId);
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactInfo } = await getContact(contactId);
        console.log(contactInfo);
        // const { data: groupInfo } = await getGroup(contactInfo.group);
        // console.log(groupInfo);

        setState({
          ...state,
          // group: groupInfo,
          contact: contactInfo,
        });
        setLoading(false);
        // console.log(contact);
      } catch (err) {
        console.log(err.massage);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const { contact, group } = state;
  // console.log(contact);
  return (
    <>
      <section className="max-w-6xl mx-auto">
        <h2
          className="text-center border-b my-2 py-4 text-xl"
          style={{ color: Green, borderColor: Green }}
        >
          اطلاعات مخاطب
        </h2>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <div
          className="rounded-md  md:max-w-6xl md:mx-auto mx-7 p-4"
          style={{ backgroundColor: CurrentLine }}
        >
          <div className="flex flex-col md:flex-row justify-between gap-y-4 items-center">
            <img
              src="https://via.placeholder.com/250"
              alt=""
              className="rounded-sm border-1 bg-slate-300 w-[250px]  "
              style={{ borderColor: Purple }}
            />
            <div className="w-3/5 flex flex-col  gap-5 text-center justify-center">
              <ul className="bg-[#CCCCCC] rounded-md">
                <li
                  className="py-2 border-b-2"
                  style={{ borderColor: Background }}
                >
                  {" "}
                  نام و نام خانوادگی:
                  {` ${contact.full}`}
                </li>
                <li
                  className="py-2 border-b-2"
                  style={{ borderColor: Background }}
                >
                  شماره موبایل:{`${contact.mobile}`}
                </li>
                <li
                  className="py-2 border-b-2"
                  style={{ borderColor: Background }}
                >
                  ایمیل:{`${contact.email}`}
                </li>
                <li
                  className="py-2 border-b-2"
                  style={{ borderColor: Background }}
                >
                  شغل: {`${contact.job}`}
                </li>
                <li className="py-2" style={{ borderColor: Background }}>
                  گروه:{`${contact.group}`}
                </li>
              </ul>
              <Link
                to="/"
                className="px-2 py-2 rounded-md mx-4"
                style={{ backgroundColor: Purple }}
              >
                برگشت به صفحه اصلی
              </Link>
            </div>
          </div>
        </div>
      )}
      ;
    </>
  );
};

export default ViewContact;
