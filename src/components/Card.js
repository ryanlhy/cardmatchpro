import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Container, containerClasses, Skeleton, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Grid } from '@material-ui/core';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Grow from '@mui/material/Grow';
import { Diversity1Sharp } from '@mui/icons-material';
import BackgroundOverlay from './BackgroundOverlay';


export default function ActionAreaCard(props) {
  const [pokemonArray, setPokemonArray] = useState([]);
  const selectedInput = useSelector((state) => state.search.searchSelectedValue);
  const matchFilterStrict = useSelector((state) => state.search.matchFilterStrict);
  const selectedObj = useSelector((state) => state.search.searchSelectedObj);
  const [indexFilter, setIndexFilter] = useState([]);
  const [loading, setLoading ] = useState(false);
  const [growCards, setGrowCards] = useState(false);
  const dispatch = useDispatch();

  const callApiSearch = async () => {
    if (selectedInput === "") {
      console.log("did not call api from search");
    } else {
      setLoading(true);

      // reset at every search query
      let paramsObj = {
        search: selectedInput,
        searchObj: selectedObj,
      }
      console.log(paramsObj)
      let param = JSON.stringify(paramsObj)
      // const urlSrc = `https://ryanlhy.pythonanywhere.com/ebay/${selectedInput}`;
      const urlSrc = `http://localhost:8000/ebay/${param}`;
      // const urlSrc = `http://localhost:8000/testparam/${param}`;

      apiFunc(urlSrc);
    }
  };
  // console.log(pokemonArray)

  const apiFunc = async (urlSrc) => {
    const tempArray = pokemonArray; // temp array to reset if error
    setGrowCards(true);
    try {
      const response = await fetch(urlSrc);
      const data = await response.json();
      if (data.length !== 0 || data.data !== null) {
        console.log("data: ", data);
        setPokemonArray(data.data);
        setIndexFilter(data.negative_keywords_index);
      }
    } catch (err) {
      console.log("Error: ", err);
      setPokemonArray(tempArray);
    }
    setLoading(false);
  };
  useEffect(() => {
    callApiSearch();
  }, [selectedInput]);

  const changeImageAttribute = (image) => {
    const newImage = image.replace("s-l140", "s-l250");
    return newImage;
  };

  const ebayCards = pokemonArray === null? <Stack>No results</Stack> : 
  pokemonArray.map((card, index) => {
    // remove all cards with index in indexFilter, try to make it a filter
    if (matchFilterStrict === "Exact") {
      if (indexFilter.includes(index)) {
        return null;
      }
    }
    // if (indexFilter.includes(index)) {
    //   return null;
    // }
    return (
      <Card sx={{ maxWidth: 200, px:1, borderRadius:1}} key={index}>
        <Grow in={growCards} style={{ transformOrigin: '50% 100%'}} 
        {...(growCards ? {timeout:2000} : {})}>

        <CardActionArea sx={{}}>
        
          {/* position icon to top right and overlay image*/}
          <CardMedia
            component="img"
            height="200"
            image={changeImageAttribute(card.galleryURL[0])}
            alt="green iguana"
            sx={{objectFit:'contain', borderRadius:1, border:1, borderColor:'black', borderStyle:'solid', position:'relative'}}
            />
          {/* <Avatar sx={{position:'absolute', top:0, right:0, fill:'white', width:30, height:30,}}>
            <FavoriteBorderIcon sx={{}}/>
          </Avatar> */}
          <CardContent>
            <Typography gutterBottom variant="h7" component="div">
              {card.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {card.sellingStatus[0].currentPrice[0]['@currencyId']}: {card.sellingStatus[0].currentPrice[0].__value__}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bids: {card.sellingStatus[0].bidCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Time Left: {card.sellingStatus[0].timeLeft}
            </Typography>
          </CardContent>
          {/* <AddShoppingCartIcon sx={{position:'absolute', bottom:0, right:0, color:'black'}}/> */}
        </CardActionArea>
          </Grow>
      </Card>
    );
  });

  return (
    <Container>
      <Grid container spacing={5} sx={{mx:'auto'}} >
      {/* <BackgroundOverlay/> */}
      {/* skeleton loading animation */}
      {loading ? 
        <Box sx={{  justifyContent: 'center', width: '100%', display:'flex',flexWrap: 'wrap'}}>
          <Skeleton/>
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box> : 
        <Box sx={{display:'flex',flexWrap: 'wrap', paddingX:1, paddingY:5, justifyContent: 'center'}}>
          {ebayCards}
        </Box> }
          
      {/* <Box sx={{display:'flex',flexWrap: 'wrap', paddingX:1, paddingY:5, justifyContent: 'center'}}>
          {ebayCards}
      </Box> */}
      </Grid>
    </Container>
  );
}
