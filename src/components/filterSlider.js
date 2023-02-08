import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Container }  from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { matchFilterStrict } from '../store/searchSlice';  

export default function DiscreteSlider() {
  const dispatch = useDispatch();

  const handleValueText= (value) => {
    dispatch(matchFilterStrict(accessLabelVariable(value)));
  }

  const accessLabelVariable = (value) => marks[marks.findIndex((mark) => mark.value === value)].label;
  
  const valueLabelFormat = (value) => accessLabelVariable(value);

  return (
    <Container maxWidth="md">
        <Box sx={{ width: 300 , mx:'auto', paddingTop:5}}>
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
    </Container>
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
