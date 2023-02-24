import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Container }  from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { matchFilterStrict } from '../store/searchSlice';  
import { Grow } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

export default function DiscreteSlider() {
  const [show, setShow] = useState(true);
  const selectedValue = useSelector((state) => state.search.searchSelectedValue);
  const dispatch = useDispatch();

  const handleValueText= (value) => {
    dispatch(matchFilterStrict(accessLabelVariable(value)));
  }

  const accessLabelVariable = (value) => marks[marks.findIndex((mark) => mark.value === value)].label;
  
  const valueLabelFormat = (value) => accessLabelVariable(value);

  // handle fade in an fade out
  const handleFadeOut = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 2000);
  };

  useEffect(() => {
    if (selectedValue !== "") {
      handleFadeOut();
    }
  }, [selectedValue]);

  console.log(selectedValue)
  return (
    selectedValue !== "" ? 
    <Container maxWidth="md">
      <Grow in={show} style={{ transformOrigin: '50% 100% 0'}} 
        {...( {timeout:2500} )}>
        <Box sx={{ width: 300 , mx:'auto', paddingTop:5, paddingBottom:5}}>
            <Slider
                aria-label="Restricted values"
                defaultValue={0}
                valueLabelFormat={valueLabelFormat}
                // getAriaValueText={valuetext}
                onChange={(e, newValue) => handleValueText(newValue)}
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
            />
        </Box>
        </Grow>
    </Container>
    : null
  );
}

const marks = [
  {
    value: 0,
    label: 'All',
  },
  {
    value: 50,
    label: 'Strict',
  },
  {
    value: 100,
    label: 'Exact',
  },
];
