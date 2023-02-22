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
  const buttonGradeTags = useSelector((state) => state.search.buttonGradeTags);

//   useEffect(() => {
//     setSearchTags(searchTagsFromStore);
//   }, [searchTagsFromStore]);

  return (
    <Container>
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row',     justifyContent: 'center', 
      alignItems: 'center', flexWrap: 'wrap', padding: '10px' }}>
      {Object.keys(buttonGradeTags).sort().map((tag) => {
        return (
          <ButtonTags tag={tag} key={tag}/>
          );
        })}
    </Box>

    </Container>
  );
}

const tagArr = ['test', 'test 2']