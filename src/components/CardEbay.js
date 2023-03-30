import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { AddShoppingCart } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import ButtonBase from "@mui/material/ButtonBase";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  CardActionArea,
  Container,
  containerClasses,
  Skeleton,
  Stack,
  Modal,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grow from "@mui/material/Grow";

const useStyles = makeStyles((theme) => ({
  addToCartButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 0,
    width: "100%",
    height: "40px",
    margin: "10px",
    display: "none", // hide the button by default
  },
  card: {
    "&:hover $addToCartButton": {
      opacity: 1, // show the button when the card is being hovered over
    },
    maxWidth: 200,
    px: 0,
    borderRadius: 1,
    margin: "9px",
  },
  cardTitle: {
    maxHeight: "5em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical",
  },
}));

export default function CardEbay(props) {
  const showProps = props.isShow;
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [isShow, setIsShow] = useState(showProps);
  const classes = useStyles();

  const displayFilteredCard = useSelector(
    (state) => state.search.displayFilteredCards
  );
  // const indexProps = props.key
  const cardProps = props.card;
  console.log(cardProps);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExited = () => {
    setIsShow(false);
  };

  const changeImageAttribute = (image, size) => {
    const newImage = image.replace("s-l140", `s-l${size}`);
    return newImage;
  };

  // translate the ebay code date format
  function formatDuration(timeCode) {
    const regex = /P(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?/; // regex to match the time code
    const matches = timeCode[0].match(regex); // match the time code with the regex

    let days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0;

    // extract the values for days, hours, minutes, and seconds from the regex matches
    if (matches[1]) {
      days = parseInt(matches[1].slice(0, -1));
    }
    if (matches[4]) {
      hours = parseInt(matches[4].slice(0, -1));
    }
    if (matches[5]) {
      minutes = parseInt(matches[5].slice(0, -1));
    }
    if (matches[6]) {
      seconds = parseInt(matches[6].slice(0, -1));
    }

    // return the formatted duration string
    return `${days}d${days !== 1 ? "" : ""}, 
        ${hours}h${hours !== 1 ? "" : ""}, 
        ${minutes}m${minutes !== 1 ? "" : ""}`;
  }

  return (
    <Grow
      in={isShow}
      style={{ transformOrigin: "50% 100%" }}
      {...(isShow ? { timeout: 2000 } : {})}
      onExited={handleExited}
    >
      <Card
        className={classes.card}
        sx={{ maxWidth: 200, px: 0, borderRadius: 1 }}
      >
        <CardActionArea sx={{}}>
          {/* position icon to top right and overlay image*/}
          <CardMedia
            component="img"
            height="200"
            image={changeImageAttribute(cardProps.galleryURL[0], 250)}
            alt={cardProps.title}
            sx={{
              objectFit: "contain",
              borderRadius: 1,
              border: 1,
              borderColor: "black",
              borderStyle: "solid",
              position: "relative",
            }}
            onClick={handleOpen}
          />
          {/* <Avatar sx={{position:'absolute', top:0, right:0, fill:'white', width:30, height:30,}}>
                            <FavoriteBorderIcon sx={{}}/>
                          </Avatar> */}
          <CardContent>
            <Typography
              className={classes.cardTitle}
              gutterBottom
              variant="h7"
              component="div"
            >
              {cardProps.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {cardProps.sellingStatus[0].currentPrice[0]["@currencyId"]}:{" "}
              {cardProps.sellingStatus[0].currentPrice[0].__value__}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {`${
                cardProps.sellingStatus[0].bidCount
                  ? `Bids: ${cardProps.sellingStatus[0].bidCount}`
                  : "Fixed Price"
              }`}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Time Left: {formatDuration(cardProps.sellingStatus[0].timeLeft)}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              component="a"
              href={cardProps.viewItemURL[0]}
            >
              See on ebay
            </Typography>
            {/* </Link> */}
          </CardContent>
          {/* <AddShoppingCart
            sx={{ position: "absolute", bottom: 0, right: 0, color: "black" }}
          /> */}
        </CardActionArea>
        <ButtonBase className={classes.addToCartButton}>ADD TO CART</ButtonBase>

        <Modal
          open={open}
          onClose={handleClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // bgColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <img
            src={changeImageAttribute(cardProps.galleryURL[0], 1000)}
            alt="Zoomed in image"
          />
        </Modal>
      </Card>
    </Grow>
  );
}
