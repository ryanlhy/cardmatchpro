import React from "react";
import ActionAreaCard from "../components/Card";
import FreeSolo from "../components/SearchBar";
import SearchTagSection from "../components/SearchTagSection";
import Meta from "./../components/Meta";

function SearchPage(props) {
  return (
    <>
      <Meta title="Search" />
      {/* <div
        style={{
          padding: "50px",
          width: "100%",
          textAlign: "center",
        }}
      >
        This is the <code>{props.location.pathname}</code> page
      </div> */}
      <FreeSolo/>
      <SearchTagSection/>
      <ActionAreaCard/>
    </>
  );
}

export default SearchPage;
