import { ContactContext } from "../../context/contactContext";
import { Background } from "../../helpers/colors";
import { useContext } from "react";

const SearchContact = () => {
  const { searchBox } = useContext(ContactContext);
  return (
    <div className="relative">
      <div className="absolute top-3 right-3">
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <input
        type="text"
        placeholder="جست و جو"
        onChange={(e) => searchBox(e.target.value)}
        className="py-2 pr-10 rounded-xl outline-none border-2 outline-offset-0 focus-visible:outline-[#BD93F9] max-w-[200px] md:max-w-lg"
        style={{ backgroundColor: Background }}
      />
    </div>
  );
};

export default SearchContact;
