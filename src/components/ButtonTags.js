import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import Grow from '@mui/material/Grow';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { displayFilteredCards, isButtonFilterOn, removeFilteredCards} from '../store/searchSlice';

export default function ButtonTags(props) {
    const dispatch = useDispatch();
    const pokemonArray = useSelector((state) => state.search.apiResponseData);

    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
      const accessFilterKeyValues = pokemonArray.filterCalls.keywordsListResponse

        if (!clicked) {
            console.info(`you clicked at ${clicked}}`);
            console.log(props.tag)
            console.log(pokemonArray)
            console.log(accessFilterKeyValues[props.tag])
            dispatch(isButtonFilterOn(true));
            dispatch(displayFilteredCards(accessFilterKeyValues[props.tag]));

        } else {
          // dispatch(isButtonFilterOn(false));
          dispatch(removeFilteredCards(accessFilterKeyValues[props.tag]));
          console.info(`you clicked at ${clicked}`);
        }
    }

  return (
    <Grow in={true} style={{ transformOrigin: '50% 100%'} } key={props.tag}
    {...(true ? {timeout:2000} : {})}>
      <Box sx={{padding:1, }}>
        <Button 
        sx={{borderRadius: '30px'}} 
        variant={clicked ? "contained" : "outlined"}
        endIcon={<CancelIcon />}
        onClick={() => {
          setClicked(!clicked);
          handleClick();
        }}
        >
          {props.tag}
        </Button>
        {/* <Button variant="contained" endIcon={<SendIcon />}>
          Send
      </Button> */}
      </Box>
    </Grow>
  );
}