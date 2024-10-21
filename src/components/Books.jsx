import {
  NavLink,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { getBooks } from "../data/data";
import { CurrentLine, Red } from "../helpers/colors";

const Books = () => {
  const books = getBooks();
  const location = useLocation();
  const [searchPrams, setSearchPrams] = useSearchParams();
  return (
    <nav className="flex">
      <div
        className="border-l-2 p-3 w-1/4 h-screen"
        style={{ borderColor: CurrentLine }}
      >
        <input
          value={searchPrams.get("filter") || ""}
          onChange={(e) => {
            let filter = e.target.value;
            if (filter) {
              setSearchPrams({ filter });
            } else {
              setSearchPrams({});
            }
          }}
          type="text"
          placeholder="جستوجوی کتاب"
          className="px-3 py-2 shadow-lg my-4 rounded-sm w-full"
          style={{ backgroundColor: CurrentLine }}
        />
        <div className="text-white flex flex-col">
          {books
            .filter((book) => {
              let filter = searchPrams.get("filter");
              let name = book.name;
              if (!filter) {
                return true;
              }
              return name.startsWith(filter);
            })
            .map((book) => (
              <NavLink
                to={`/books/${book.name}${location.search}`}
                className="py-1 text-center"
                style={({ isActive }) => {
                  return {
                    color: isActive ? Red : "",
                  };
                }}
                key={book.number}
              >
                {book.name}
              </NavLink>
            ))}
        </div>
      </div>
      <Outlet />
    </nav>
  );
};

export default Books;
