import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Meta from "./../components/Meta";
import FreeSolo from "../components/SearchBar";
import ActionAreaCard from "../components/Card";
import DataGridDemo from "../components/filter";
import DescreteSlider from "../components/filterSlider";


function IndexPage(props) {
  return (
    <>
      <Meta />
      <FreeSolo />
      <DescreteSlider/>
      {/* <DataGridDemo/> */}
      <ActionAreaCard/>
      
    </>
  );
}

export default IndexPage;
