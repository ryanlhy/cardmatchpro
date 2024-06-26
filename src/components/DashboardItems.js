import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import EditItemModal from "./EditItemModal";
import { useAuth } from "./../util/auth";
import { updateItem, deleteItem, useItemsByOwner } from "./../util/db";
import { useSelector, useDispatch } from "react-redux";
import { removeFromList } from "../store/cartSlice";
import Container from "@material-ui/core/Container";
import SectionHeader from "./SectionHeader";
import { getCartItemById, deleteItemsDB } from "../util/apiCalls";

const useStyles = makeStyles((theme) => ({
  paperItems: {
    minHeight: "300px",
  },
  featured: {
    backgroundColor:
      theme.palette.type === "dark" ? theme.palette.action.selected : "#fdf8c2",
  },
  starFeatured: {
    color: theme.palette.warning.main,
  },
}));

function DashboardItems(props) {
  const classes = useStyles();

  const auth = useAuth();
  const itemsData = useSelector((state) => state.cart.list);
  const [items, setItems] = useState(itemsData);
  console.log(items);
  console.log(itemsData);
  async function getData() {
    const itemDB = await getCartItemById(3);

    return itemDB;
  }
  useEffect(() => {
    getData().then((itemDB) => {
      // const filteredItems = itemDB.filter((item) => {
      //   return item.itemId[0] !== itemDB.ebay_item_number;
      // });
      // setItems(...filteredItems, ...itemDB);
      // setItems(filteredItems);
      setItems(itemDB);
    });
  }, []);

  // TODO: to check if items tally with the cart in db
  const dispatch = useDispatch();
  // const {
  //   data: items,
  //   status: itemsStatus,
  //   error: itemsError,
  // } = useItemsByOwner(auth.user.uid);

  const [creatingItem, setCreatingItem] = useState(false);

  const [updatingItemId, setUpdatingItemId] = useState(null);

  const itemsAreEmpty = !items || items.length === 0;

  const canUseStar =
    auth.user.planIsActive &&
    (auth.user.planId === "pro" || auth.user.planId === "business");

  const handleStarItem = (item) => {
    if (canUseStar) {
      updateItem(item.id, { featured: !item.featured });
    } else {
      alert("You must upgrade to the pro or business plan to use this feature");
    }
  };

  const handleDeleteItem = (item) => {
    // if (window.confirm("Are you sure you want to delete this item?")) {
    dispatch(removeFromList(item));
    console.log(item);
    deleteItemsDB(item.id);

    // }
  };

  return (
    <Container>
      <SectionHeader title="Your Cart" size={4} textAlign="center" />
      {/* {itemsError && (
        <Box mb={3}>
        <Alert severity="error">{itemsError.message}</Alert>
        </Box>
      )} */}

      <Paper className={classes.paperItems}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding={2}
        >
          <Typography variant="h5">Items</Typography>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={() => setCreatingItem(true)}
          >
            Add Item
          </Button>
        </Box>
        <Divider />

        {/* {(itemsStatus === "loading" || itemsAreEmpty) && (
          <Box py={5} px={3} align="center">
          {itemsStatus === "loading" && <CircularProgress size={32} />}
          
          {itemsStatus !== "loading" && itemsAreEmpty && (
            <>Nothing yet. Click the button to add your first item.</>
            )}
            </Box>
          )} */}

        {
          // itemsStatus !== "loading" && items && items.length > 0 && (
          <List disablePadding={true}>
            {items.map((item, index) => (
              <ListItem
                key={item.itemId}
                divider={index !== items.length - 1}
                className={item.featured ? classes.featured : ""}
              >
                <ListItemText>{item.title || item.name}</ListItemText>
                <ListItemSecondaryAction>
                  {/* <IconButton
                    edge="end"
                    aria-label="star"
                    onClick={() => handleStarItem(item)}
                    className={item.featured ? classes.starFeatured : ""}
                  >
                    <StarIcon />
                  </IconButton> */}
                  {/* <IconButton
                    edge="end"
                    aria-label="update"
                    onClick={() => setUpdatingItemId(item.id)}
                  >
                    <EditIcon />
                  </IconButton> */}
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    // onClick={() => deleteItem(item.id)}
                    onClick={() => handleDeleteItem(item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          // )
        }
      </Paper>

      {creatingItem && <EditItemModal onDone={() => setCreatingItem(false)} />}

      {updatingItemId && (
        <EditItemModal
          id={updatingItemId}
          onDone={() => setUpdatingItemId(null)}
        />
      )}
    </Container>
  );
}

export default DashboardItems;
