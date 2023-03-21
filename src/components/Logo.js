import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { searchSelectedValue } from '../store/searchSlice';  
import { Grow } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from './../util/router';


const useStyles = makeStyles((theme) => ({
   
    title: {
        // fontSize: 100, 
        textAlign: 'center',
        bgColor:"default",
    },
    subTitle: {
        // fontSize: 100, 
        textAlign: 'center',
        bgColor:"default",
        paddingTop: 10,
        paddingBottom: 15,
        paddingLeft: 5,
        paddingRight: 5,
    },

    grow: {
        transformOrigin: '50% 100% 0', 
        mx: 'auto',
        width: '100%',    }
  }));



export default function Logo(props) {
    const classes = useStyles();
    const { location } = useRouter();
    const [show, setShow] = useState(true);
    const selectedValue = useSelector((state) => state.search.searchSelectedValue);

     // handle fade in an fade out
    const handleFadeOut = () => {
        setShow(false); // fade out

        setTimeout(() => {
            setShow(true); // fade in
        }, 2000);
    };

    useEffect(() => {
        if (selectedValue !== "") {
        handleFadeOut();
        }
        // show if in home page: edge case for 'back' button
        // if (!location.pathname.includes("/search")) setShow(true);
    }, [selectedValue]);
    return (
        <Grow in={show} appear className={classes.grow} 
        // {...( {timeout:2000} )}
        timeout={2000}
        >
        <Box sx={{margin:'auto', marginBottom: 0,}}>
            <Typography 
            variant="h3"
            className={classes.title}
            style={{fontFamily: 'Helvetica', }}
            >Card Match Pro
            </Typography>

            <Typography 
            variant="h5"
            className={classes.subTitle}
            style={{fontFamily: 'Helvetica', }}
            >The Competitive Edge for Pokemon Card Aggregator
            </Typography>
        </Box>
        </Grow>
    )
}