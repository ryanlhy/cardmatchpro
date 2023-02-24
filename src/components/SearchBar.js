import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from 'react-redux';
import { searchSelectedValue, searchSelectedObj } from '../store/searchSlice';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Paper } from '@mui/material';
import { PropaneSharp } from '@mui/icons-material';

export default function FreeSolo(props) {
    const selectedValue = useSelector((state) => state.search.searchSelectedValue);
    const selectedObj = useSelector((state) => state.search.searchSelectedObj);
    // const autoCompleteGrade = useSelector((state) => state.search.autoCompleteGrade);
    const dispatch = useDispatch();
    const [pokemonArray, setPokemonArray] = useState([]);
    const [input, setInput] = useState("");
    const [inputIsSelected, setInputIsSelected] = useState(false);
    const [searchOptions, setSearchOptions] = useState([]);
    const [displayAdditionalOptions, setDisplayAdditionalOptions] = useState(false);
    const [callNewApi, setCallNewApi] = useState(true);
    const [saveSearchObj, setSaveSearchObj] = useState([]);
    const [show, setShow] = useState(true);
    const [displayTop, setDisplayTop] = useState(false);
    const pokeApiKey = process.env.pokeApiKey;
    
    const gradingCompanies = ["PSA", "CGC", "BGS", "SGC", "GAI", "Beckett"]
    console.log(pokemonArray)
    console.log(saveSearchObj)
    const callTenCharizard = async () => {
        const urlSrc = `https://api.pokemontcg.io/v2/cards?q=name:"*charizard*"&pageSize=10&api_key=${pokeApiKey}`;
        apiFunc(urlSrc);
      };

    const callApiSearch = async () => {
        if (input === "") {
            console.log("did not call api from search");
        } else {
            // reset at every search query
            let pageSize = 10;
            // const urlSrc = `https://api.pokemontcg.io/v2/cards?q=name:"*${input}*"&pageSize=${pageSize}&api_key=${pokeApiKey}`;
            // const urlSrc = `https://api.pokemontcg.io/v2/cards?q=name:"*${input}*"&pageSize=${pageSize}&api_key=${pokeApiKey}`;
            // const urlSrc = `http://localhost:8000/pokemon/${input}`;
            const urlSrc = `https://ryanlhy.pythonanywhere.com/pokemon/${input}`;

            apiFunc(urlSrc);
            console.log(urlSrc)
        }
        // when a space is entered into search bar, add a * to the search query before the word
        // if dont return any pokemon, enter set name?
      };
    
      const apiFunc = async (urlSrc) => {
            const tempArray = pokemonArray; // temp array to reset if error
            try {
                const response = await fetch(urlSrc);
                const data = await response.json();
                if (data.data.length !== 0) {
                  setPokemonArray(data.data);
                  setSearchOptions(prevSearchOptions =>
                    [...prevSearchOptions, ...data.data.map((arr, index) => handleAccessProps(arr, index))]
                      .filter((option, index, options) => options.findIndex(o => o.id === option.id) === index)
                  ); // filter to remove duplicate options
                  
                }
          } catch (err) {
                console.log("Error: ", err);
                setPokemonArray(tempArray);
                setSearchOptions(tempArray.map((arr, index) => handleAccessProps(arr, index)))
          }
      };
    
      useEffect(() => {
          console.log(inputIsSelected)
          // check if empty array, dont procees with useEffect
          if (input === "" && callNewApi === true) {
              callTenCharizard();
          } else {
              // check if there is space in input
              if (callNewApi === true) callApiSearch(); /// this will create a new pokemon array
              else console.log("callNewApi: " + callNewApi)
          }
        
      }, [input, inputIsSelected]);

      // const handleSetSearchOptions = (label, id, gradingCompanies) =>{
      //     setSearchOptions((searchOptions) => [ ...concatSearchOptions(label, id, gradingCompanies), ...searchOptions]);

      // }

      const handleSelectedQuery = (e, value, reason) => {
          const {label, id} = value;
          const selectedArrElement = pokemonArray.filter((p) => p.id === id || p.id === saveSearchObj.id)[0];
          dispatch(searchSelectedValue(label || value));
          dispatch(searchSelectedObj(selectedArrElement));
          handleFadeOut();

          setCallNewApi(false);
          if (reason === 'selectOption') { // detect if an option is selected
              console.log('selected option');
              setInputIsSelected(true);
              setSearchOptions({
                label: label,
                id: id
              });
              // setSearchOptions((searchOptions) => [ ...concatSearchOptions(label, id, gradingCompanies), ...searchOptions]);
          }
      }

      const handleAccessProps = (arr, index) => {
          // if selectedvalue does not have PSA, add it to the pokemonFullName
          let pokemonFullName =`${arr.name} ${arr.number}/${arr.set.printedTotal} ${arr.set.series} ${arr.set.name}`
          const valueObj = {
              label: pokemonFullName,
              id:arr.id
          }
          return valueObj;
    }

    // const concatSearchOptions = (label, id, conCatArr) => {
    //       const newarr = conCatArr.map((e, index) => {
    //           const valueObj = {
    //             label: label.concat(` ${e}`),
    //             id: id
    //         }
    //         return valueObj
    //       })
    //       // concat the search options with the grading companies
    //       return newarr;
    // }

    const handleSetInput = (e) => {
        setInput(e.target.value);
        if (selectedValue.length < input.length) {
            setCallNewApi(true);
            // setInputIsSelected(false);
        }
        // find obj of the selected value for id later
        const selectedObjId = searchOptions.filter((p) => {
          // handlesetinput only activates when a key is pressed after arrowing down via keyboard
          return p.label === e.target.value.slice(0, -1) || p.label.slice(0, -1) === e.target.value
        });
        setSaveSearchObj(selectedObjId);
    }

    // handle fade in an fade out
    const handleFadeOut = () => {
      setShow(false);
      setTimeout(() => {
        setDisplayTop(true);
        setShow(true);
      }, 2000);
    };
    console.log(selectedValue)

    // searchbar -> card.call api -> card .. map
    return (
      <Container maxWidth={props.maxWidth} sx={{}}>
        <Grow in={show} style={{ transformOrigin: '50% 100% 0'}} 
        {...( {timeout:2000} )}>
          <Stack spacing={2} mx='auto' sx={{ width: "70%", paddingTop: 0, marginTop: displayTop? 0 : 40}} >
          {/* <div>selectedValue: {selectedValue}</div>
          <div>input: {input}</div> */}
          <Paper
            // component="form"
            sx={{ alignItems: 'center'}}
          >
          <Autocomplete
              placeholder="Search for a pokemon"
              autoFocus
              includeInputInList
              freeSolo
              autoComplete
              id="free-solo-2-demo"
              // disableClearable
              // disabledItemsFocusable
              loading={true}
              // multiple={true}
              // options={searchOptions.map((e) => e)}
              options={searchOptions}
              // options={searchOptions}
              // getOptionLabel={(option) => option.label}
              onChange={handleSelectedQuery}
              renderInput={(params) => (
                // <Grow in={true} style={{ transformOrigin: '0 0 0'}} 
                //   {...(true ? {timeout:2000} : {})}>
                <TextField
                  {...params}
                  onBlur={params.onBlur}
                  label="Search input"
                  // value={input} // display updated selected value
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                  SelectProps={{
                    native: true,
                  }}
                  // helperText="Please enter a pokemon name"
                  onChange={(e) => handleSetInput(e)}
                  // variant="standard"
                  >
                    </TextField>
                      // </Grow>
                  )}
                  />
                  </Paper>
                  {/* <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                  </IconButton> */}
                  
          </Stack>
          </Grow>
      </Container>
    );
  }

