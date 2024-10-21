import { CurrentLine, ForeGround, Purple } from "../helpers/colors";
import SearchContact from "./contact/SearchContact";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <>
      <nav
        className="shadow-2xl lg:px-10"
        style={{ backgroundColor: CurrentLine, color: ForeGround }}
      >
        <div className="max-w-6xl mx-auto flex justify-around items-center px-3">
          {/* col 1 */}
          <div className="flex flex-row-reverse gap-x-4 items-center my-6">
            <h3>
              اپلیکیشن مدیریت <span style={{ color: Purple }}>مخاطبین</span>
            </h3>
            <Link to="/">
              <i className="fa fa-user" style={{ color: Purple }} />
            </Link>
          </div>
          {/* col 2 */}
          <div className="md:flex hidden gap-6">
            <Link
              to="./about"
              className="border-b-2 pb-1 hover:-translate-y-1 duration-150"
              style={{ borderColor: Purple }}
            >
              درباره ما
            </Link>
            <Link
              to="./books"
              className="border-b-2 pb-1 hover:-translate-y-1 duration-150"
              style={{ borderColor: Purple }}
            >
              کتاب ها
            </Link>
          </div>
          {/* col 3 */}
          {/* {console.log("zzzzzz", location)} */}
          {location.pathname === "/" ? <SearchContact /> : null}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
