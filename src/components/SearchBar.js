import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { searchSelectedObj } from '../store/searchSlice';
import { createImmutableStateInvariantMiddleware } from '@reduxjs/toolkit';
// require('dotenv').config()

export default function FreeSolo() {
    const selectedInput = useSelector((state) => state.search.searchSelectedObj);
    const dispatch = useDispatch();
    const [pokemonArray, setPokemonArray] = useState([]);
    const [input, setInput] = useState("");
    console.log(pokemonArray)
    const pokeApiKey = process.env.pokeApiKey;
    
    const callTenCharizard = async () => {
        const urlSrc = `https://api.pokemontcg.io/v2/cards?q=name:charizard&pageSize=10&api_key=${pokeApiKey}`;
        apiFunc(urlSrc);
      };

    const callApiSearch = async () => {
        if (input === "") {
          console.log("did not call api from search");
        } else {
          // reset at every search query
          let pageSize = 10;
          const urlSrc = `https://api.pokemontcg.io/v2/cards?q=name:"*${input}*"&pageSize=${pageSize}&api_key=${pokeApiKey}`;
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
          }
        } catch (err) {
          console.log("Error: ", err);
          setPokemonArray(tempArray);
        }
      };
    
      useEffect(() => {
        // check if empty array, dont procees with useEffect
        if (input === "") {
          callTenCharizard();
        } else {
          callApiSearch();
        }
      }, [input]);

      const handleSelectedQuery = (e, value, reason) => {
        const {label, id} = value;
        const selectedArrElement = pokemonArray.filter((p) => p.id === id)[0];
        console.log('selectedArrElement: ', selectedArrElement);
        dispatch(searchSelectedObj(label));
        console.log('value: ', value);
        if (reason === 'selectOption') { // detect if an option is selected
          console.log('selected option');
          // run code 
        }
      }

      const handleAccessProps = (arr, index) => {
        const valueObj = {
          label:`${arr.name} ${arr.number}/${arr.set.printedTotal} ${arr.set.series} ${arr.set.name}`,
          id:arr.id
        }
        return valueObj;
      }
    // searchbar -> card.call api -> card .. map
    return (
      <Container maxWidth="md">
          <Stack spacing={2} mx='auto' sx={{ width: "70%", paddingTop: 5}} >
          <div>dispatch: {selectedInput}</div>
          <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={pokemonArray.map((arr, index) => handleAccessProps(arr, index))}
              onChange={handleSelectedQuery}
              renderInput={(params) => (
                  <TextField
                  {...params}
                  label="Search input"
                  InputProps={{
                      ...params.InputProps,
                      type: 'search',
                  }}
                  onChange={(e) => setInput(e.target.value)}
                    />
                  )}
                  />
          </Stack>
          {/* <ActionAreaCard pokemonArray={pokemonArray} /> */}
      </Container>
    );
  }

// if input contains a partial match of a series arr or name arr, search via series or name also
