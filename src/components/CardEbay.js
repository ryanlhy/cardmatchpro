import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Container, containerClasses, Skeleton, Stack, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grow from '@mui/material/Grow';

export default function CardEbay(props) {
    const [growCards, setGrowCards] = useState(true);
    const [open, setOpen] = useState(false);
    const displayFilteredCard = useSelector((state) => state.search.displayFilteredCards);
    const indexProps = props.key
    const cardProps = props.card
    const handleOpen = () => {
        setOpen(true);
        };
    const handleClose = () => {
      setOpen(false);
     };
     const changeImageAttribute = (image, size) => {
        const newImage = image.replace("s-l140", `s-l${size}`);
        return newImage;
      };
    return (
        <Grow in={growCards} style={{ transformOrigin: '50% 100%'} } key={indexProps}
        {...(growCards ? {timeout:2000} : {})}>
            <Card sx={{ maxWidth: 200, px:0, borderRadius:1, margin:1}} key={indexProps}>
                <CardActionArea sx={{}}>
        
        {/* position icon to top right and overlay image*/}
                    <CardMedia
                        component="img"
                        height="200"
                        image={changeImageAttribute(cardProps.galleryURL[0], 250)}
                        alt="green iguana"
                        sx={{objectFit:'contain', borderRadius:1, border:1, borderColor:'black', borderStyle:'solid', position:'relative'}}
                        onClick={handleOpen}
                        />
                        {/* <Avatar sx={{position:'absolute', top:0, right:0, fill:'white', width:30, height:30,}}>
                            <FavoriteBorderIcon sx={{}}/>
                        </Avatar> */}
                        <CardContent>
                            <Typography gutterBottom variant="h7" component="div">
                            {cardProps.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {cardProps.sellingStatus[0].currentPrice[0]['@currencyId']}: {cardProps.sellingStatus[0].currentPrice[0].__value__}
                            </Typography>
                            
                            <Typography variant="body2" color="text.secondary">
                            {`${cardProps.sellingStatus[0].bidCount ? 
                                `Bids: ${cardProps.sellingStatus[0].bidCount}`: 'Fixed Price'}`}
                            </Typography>
                            
                            <Typography variant="body2" color="text.secondary">
                            Time Left: {cardProps.sellingStatus[0].timeLeft}
                            </Typography >
                            <Typography variant="body2" color="text.secondary" component="a" href={cardProps.viewItemURL[0]}>
                            See on ebay
                            </Typography>
                            {/* </Link> */}
                        </CardContent>
                    {/* <AddShoppingCartIcon sx={{position:'absolute', bottom:0, right:0, color:'black'}}/> */}
                    </CardActionArea>
                <Modal
                open={open}
                onClose={handleClose}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // bgColor: 'rgba(0, 0, 0, 0.5)',

                }}
                >
                <img src={changeImageAttribute(cardProps.galleryURL[0], 1000)} alt="Zoomed in image" />
                </Modal>
            </Card>
        </Grow>
    );
}