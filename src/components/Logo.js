import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { searchSelectedValue } from '../store/searchSlice';  
import { Grow } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
   
    title: {
        // fontSize: 100, 
        textAlign: 'center',
        bgColor:"default"
    },
    subTitle: {
        // fontSize: 100, 
        textAlign: 'center',
        bgColor:"default",
        paddingTop:5
    },

    grow: {
        transformOrigin: '50% 100%', 
        backgroundSize: 'cover',  
        zIndex: -1,
        position: 'absolute',
        mx: 'auto',
        width: '100%',
        paddingTop: 250,
    }
  }));

export default function Logo(props) {
    const classes = useStyles();

    const [show, setShow] = useState(true);
    const selectedValue = useSelector((state) => state.search.searchSelectedValue);

     // handle fade in an fade out
    const handleFadeOut = () => {
        // setTimeout(() => {
        setShow(false);
        // }, 2000);
    };

    useEffect(() => {
        if (selectedValue !== "") {
        handleFadeOut();
        }
    }, [selectedValue]);
    console.log(show)
    return (
        // show ?
        <Grow in={show} className={classes.grow}
        {...( {timeout:2000} )}>
        <Box sx={{margin:'auto', marginBottom: 0,}}>
            <Typography 
            variant="h3"
            className={classes.title}
            style={{fontFamily: 'Helvetica', }}
            >Card Match Pro</Typography>
            <Typography 
            variant="h5"
            className={classes.subTitle}
            style={{fontFamily: 'Helvetica', }}
            >The Competitive Edge for Pokemon Card Aggregator</Typography>
        </Box>
        </Grow>
        // : null
    )
}