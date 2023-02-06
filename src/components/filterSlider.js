import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Container }  from '@material-ui/core';

const marks = [
    {
      value: 0,
      label: 'Loose',
    },
    {
      value: 40,
      label: 'Mid',
    },
    {
      value: 70,
      label: 'Strict',
    },
    {
      value: 100,
      label: 'Exact',
    },
  ];
  
  function valuetext(value) {
    return `${value}°C`;
  }
  
  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) ;
  }


export default function DiscreteSlider() {
  return (
    <Container maxWidth="md">
        <Box sx={{ width: 300 }}>
        <Slider
            aria-label="Temperature"
            defaultValue={30}
            getAriaValueText={valuetext}
            valueLabelDisplay="on"
            step={30}
            marks
            min={10}
            max={110}
            // disabled
            />
        <Slider defaultValue={30} step={10} marks min={10} max={110}  />
        </Box>
        <Box sx={{ width: 300 }}>
            <Slider
                aria-label="Restricted values"
                defaultValue={20}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
            />
        </Box>
    </Container>
  );
}