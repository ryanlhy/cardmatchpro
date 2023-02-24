import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Container, containerClasses, Skeleton, Stack, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Grid } from '@material-ui/core';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Grow from '@mui/material/Grow';
import { Diversity1Sharp } from '@mui/icons-material';
import BackgroundOverlay from './BackgroundOverlay';
import { buttonGradeTags, displayFilteredCards, apiResponseData, isButtonFilterOn } from '../store/searchSlice';
import { Link } from 'react-router-dom';
import CardEbay from './CardEbay';


export default function ActionAreaCard(props) {
  const [pokemonArray, setPokemonArray] = useState([]);
  const selectedInput = useSelector((state) => state.search.searchSelectedValue);
  const matchFilterStrict = useSelector((state) => state.search.matchFilterStrict);
  const selectedObj = useSelector((state) => state.search.searchSelectedObj);
  const displayFilteredCard = useSelector((state) => state.search.displayFilteredCards);
  const isFilterOn = useSelector((state) => state.search.isButtonFilterOn);
  const [indexFilter, setIndexFilter] = useState([]);
  const [loading, setLoading ] = useState(false);
  const [growCards, setGrowCards] = useState(false);
  const [open, setOpen] = useState(false);

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
      const urlSrc = `https://ryanlhy.pythonanywhere.com/ebay/${param}`;
      // const urlSrc = `http://localhost:8000/ebay/${param}`;
      // const urlSrc = `http://localhost:8000/testparam/${param}`;

      apiFunc(urlSrc);
    }
  };
  // console.log(pokemonArray)

  const apiFunc = async (urlSrc) => {
    const tempArray = pokemonArray; // temp array to reset if error
    try {
      const response = await fetch(urlSrc);
      const data = await response.json();
      if (data.length !== 0 || data.data !== null) {
        console.log("data: ", data);
        setTimeout(() => {
          setPokemonArray(data.data);
        }, 1000);

        // setIndexFilter(data.filterCalls.exactMatch);
        dispatch(apiResponseData(data))
        // dispatch(displayFilteredCards(data.data.map((arr) => arr.itemId[0]))); // display all cards
        dispatch(buttonGradeTags(data.filterCalls.keywordsListResponse));
      }
    } catch (err) {
      console.log("Error: ", err);
      setPokemonArray(tempArray);
    }
    setLoading(false);
    setGrowCards(true);

  };
  useEffect(() => {
    callApiSearch();
  }, [selectedInput]);

  const changeImageAttribute = (image, size) => {
    const newImage = image.replace("s-l140", `s-l${size}`);
    return newImage;
  };
  console.log(displayFilteredCard)
  console.log(pokemonArray);

  const ebayCards = pokemonArray === null? <Stack>No results</Stack> : 
  pokemonArray.map((card, index) => {
    // remove cards that do not match strict filter, and display only cards that match exact filter
    if (displayFilteredCard.length !== 0) {
      console.log("displayFilteredCard: ", displayFilteredCard)
      if (!displayFilteredCard.includes(card.itemId[0])) {
        return null;
      }
    } else {
      // return the ebay card
    }
    return <CardEbay key={index} card={card}/>
//     const handleOpen = () => {
//       setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
// };
  
    // return (
    //     <Grow in={growCards} style={{ transformOrigin: '50% 100%'} } key={index}
    //     {...(growCards ? {timeout:2000} : {})}>
    //   <Card sx={{ maxWidth: 200, px:0, borderRadius:1, margin:1}} key={index}>
    //     <CardActionArea sx={{}}>
        
    //       {/* position icon to top right and overlay image*/}
    //       <CardMedia
    //         component="img"
    //         height="200"
    //         image={changeImageAttribute(card.galleryURL[0], 250)}
    //         alt="green iguana"
    //         sx={{objectFit:'contain', borderRadius:1, border:1, borderColor:'black', borderStyle:'solid', position:'relative'}}
    //         onClick={handleOpen}
    //         />
    //       {/* <Avatar sx={{position:'absolute', top:0, right:0, fill:'white', width:30, height:30,}}>
    //         <FavoriteBorderIcon sx={{}}/>
    //       </Avatar> */}
    //       <CardContent>
    //         <Typography gutterBottom variant="h7" component="div">
    //           {card.title}
    //         </Typography>
    //         <Typography variant="body2" color="text.secondary">
    //           {card.sellingStatus[0].currentPrice[0]['@currencyId']}: {card.sellingStatus[0].currentPrice[0].__value__}
    //         </Typography>
            
    //         <Typography variant="body2" color="text.secondary">
    //           {`${card.sellingStatus[0].bidCount ? 
    //             `Bids: ${card.sellingStatus[0].bidCount}`: 'Fixed Price'}`}
    //         </Typography>
            
    //         <Typography variant="body2" color="text.secondary">
    //           Time Left: {card.sellingStatus[0].timeLeft}
    //         </Typography >
    //         <Typography variant="body2" color="text.secondary" component="a" href={card.viewItemURL[0]}>
    //           See on ebay
    //         </Typography>
    //         {/* </Link> */}
    //       </CardContent>
    //       {/* <AddShoppingCartIcon sx={{position:'absolute', bottom:0, right:0, color:'black'}}/> */}
    //     </CardActionArea>
    //     <Modal
    //       open={open}
    //       onClose={handleClose}
    //       style={{
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         // bgColor: 'rgba(0, 0, 0, 0.5)',

    //       }}
    //     >
    //       <img src={changeImageAttribute(card.galleryURL[0], 1000)} alt="Zoomed in image" />
    //     </Modal>
    //   </Card>
    //       </Grow>
    // );

  });

  return (
    <Container sx={{}}>
      {/* <Box sx={{justifyContent: 'center', display:'flex', zIndex: -1}}>
          <BackgroundOverlay/>
      </Box> */}
      <Grid container spacing={5} sx={{mx:'auto', opacity:0.5}} >
        
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
