import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ButtonTags from './ButtonTags';
import { Container } from '@mui/material';
import Grow from '@mui/material/Grow';

export default function SearchTagSection () {
  const [searchTags, setSearchTags] = useState(tagArr);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const buttonGradeTags = useSelector((state) => state.search.buttonGradeTags);
  const selectedValue = useSelector((state) => state.search.searchSelectedValue);

//   useEffect(() => {
//     setSearchTags(searchTagsFromStore);
//   }, [searchTagsFromStore]);

  
  // handle fade in an fade out
  const handleFadeOut = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 2000);
  };

  useEffect(() => {
    if (selectedValue !== "") {
      handleFadeOut();
    }
  }, [selectedValue]);

  console.log(selectedValue)
  return (
    <Container>
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row',     justifyContent: 'center', 
      alignItems: 'center', flexWrap: 'wrap', padding: '10px' }}>
      {show ?
      Object.keys(buttonGradeTags).sort().map((tag) => {
        return (
          <ButtonTags tag={tag} key={tag}/>
          );
        })
        : null}
    </Box>

    </Container>

  );
}

const tagArr = ['test', 'test 2']