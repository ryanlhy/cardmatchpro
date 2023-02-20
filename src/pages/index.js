import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Meta from "./../components/Meta";
import FreeSolo from "../components/SearchBar";
import ActionAreaCard from "../components/Card";
import DataGridDemo from "../components/filter";
import DescreteSlider from "../components/FilterSlider";
import { ThemeProvider } from './../util/theme';
import BackgroundImage from "../components/BackgroundImage";
import BackgroundOverlay from "../components/BackgroundOverlay";
import ButtonTags from "../components/ButtonTags";
import SearchTagSection from "../components/SearchTagSection";



function IndexPage(props) {
  console.log(props)
  return (
    <>
      <Meta />
      <ThemeProvider>

      <FreeSolo />
      <SearchTagSection/>
      </ThemeProvider>
      <DescreteSlider/>
      {/* <DataGridDemo/> */}
      <BackgroundOverlay/>

      <ActionAreaCard/>
      {/* <BackgroundImage/> */}
    </>
  );
}

export default IndexPage;
