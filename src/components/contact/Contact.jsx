import { Link } from "react-router-dom";

import { Purple, CurrentLine, Orange, Cyan, Red } from "../../helpers/colors";

const Contact = ({ contact, confirmDelete }) => {
  return (
    <div
      className="rounded-lg p-3 flex items-center justify-between shadow-2xl"
      style={{ backgroundColor: CurrentLine }}
    >
      <img
        src="https://via.placeholder.com/180"
        alt=""
        className="rounded-sm border-1 bg-slate-300 "
        style={{ borderColor: Purple }}
      />

      <div className="flex flex-col md:flex-row items-center text-center lg:text-right">
        <ul className="bg-[#CCCCCC] rounded-md text-sm mx-2 min-w-[200px]">
          <li className="border-b-2 border-gray-500 py-2 px-3">
            نام و نام خانوادگی:{" "}
            <span className="font-bold ">{contact.full} </span>
          </li>
          <li className="border-b-2 border-gray-500 py-2 px-3">
            شماره موبایل: <span className="font-bold ">{contact.mobile}</span>
          </li>
          <li className="py-2 px-3">
            ایمیل: <span className="font-bold ">{contact.email}</span>
          </li>
        </ul>

        <div className="flex flex-row md:flex-col gap-x-3 md:gap-x-0 mt-3 md:mt-0">
          <Link
            to={`/viewContact/${contact.id}`}
            className="w-10 h-10 my-1 rounded-md flex justify-center items-center"
            style={{ backgroundColor: Orange }}
          >
            <i className="fa fa-eye text-xl" />
          </Link>
          <Link
            to={`/editcontact/${contact.id}`}
            className="w-10 h-10 my-1 rounded-md flex justify-center items-center"
            style={{ backgroundColor: Cyan }}
          >
            <i className="fa fa-pen" />
          </Link>
          <button
            className="w-10 h-10 my-1 rounded-md flex justify-center items-center"
            style={{ backgroundColor: Red }}
            onClick={confirmDelete}
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
