// import { useEffect } from "react";

const Clock = ({ date, color }) => {
  const style = {
    color: color ? "red" : "black",
  };
  return (
    <>
      <h1 style={style}>ساعت در حال حاضر:{date.toLocaleTimeString()}</h1>
    </>
  );
};

export default Clock;
