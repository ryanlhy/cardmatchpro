import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Container, containerClasses } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function ActionAreaCard(props) {
  const [pokemonArray, setPokemonArray] = useState([]);
  const selectedInput = useSelector((state) => state.searchInput.inputValue);
  const [indexFilter, setIndexFilter] = useState([]);
  const dispatch = useDispatch();

  const input = "charizard 11/108 holo psa 9"
  const callApiSearch = async () => {
    if (selectedInput === "") {
      console.log("did not call api from search");
    } else {
      // reset at every search query
      const urlSrc = `https://ryanlhy.pythonanywhere.com/ebay/${selectedInput}`;
      // const urlSrc = `http://localhost:8000/ebay/${selectedInput}`;
      apiFunc(urlSrc);
      console.log(urlSrc)
    }
  };
  console.log(pokemonArray)

  const apiFunc = async (urlSrc) => {
    const tempArray = pokemonArray; // temp array to reset if error
    try {
      const response = await fetch(urlSrc);
      const data = await response.json();
      if (data.length !== 0) {
        setPokemonArray(data.data);
        setIndexFilter(data.negative_keywords_index);
      }
    } catch (err) {
      console.log("Error: ", err);
      setPokemonArray(tempArray);
    }
  };
  useEffect(() => {
    callApiSearch();
  }, [selectedInput]);

  const changeImageAttribute = (image) => {
    const newImage = image.replace("s-l140", "s-l250");
    return newImage;
  };

  const ebayCards = pokemonArray.map((card, index) => {
    // remove all cards with index in indexFilter, try to make it a filter
    // if (indexFilter.includes(index)) {
    //   return null;
    // }
    return (
      <Card sx={{ maxWidth: 200, px:1, borderRadius:1}} key={index}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={changeImageAttribute(card.galleryURL[0])}
            alt="green iguana"
            />
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
        </CardActionArea>
      </Card>
    );
  });

  return (
    <Container>
      <Box sx={{display:'flex',flexWrap: 'wrap', paddingX:1, paddingY:5}}>
        {ebayCards}

      </Box>
    </Container>
  );
}
