import { useNavigate, useParams, useLocation } from "react-router-dom";
import { deleteBook, getBook } from "../data/data";
import { Red } from "../helpers/colors";

const Book = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const book = getBook(params.bookName);

  if (book) {
    return (
      <div className="text-white text-center my-4 w-2/4">
        <p className="py-3">نام کتاب : {book.name}</p>
        <p className="py-3">تاریخ چاپ کتاب : {book.due}</p>
        <p className="py-3">مبلغ کتاب : {book.amount}</p>
        <button
          className="px-3 py-2 rounded-sm mt-4"
          style={{ backgroundColor: Red }}
          onClick={() => {
            deleteBook(book.number);
            navigate("/Books" + location.search);
          }}
        >
          حذف کتاب
        </button>
      </div>
    );
  } else {
    return (
      <div className="text-white text-center my-4 w-2/4">
        این کتاب موجود نیست
      </div>
    );
  }
};
export default Book;
