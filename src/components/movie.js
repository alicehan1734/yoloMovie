import { gql } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation } from "@apollo/client";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client 
  }
`;
const Movie = ({ id, url, openModal, description_intro, title, isLiked }) => {

  const [likeMovie] = useMutation(LIKE_MOVIE, {
    variables: { id: parseInt(id), isLiked }
  });

  return (
    <Con>
      <img src={url} onClick={() => openModal(id, url, title, description_intro)} />

      {/* {isLiked ? <FavoriteIcon onClick={likeMovie}>like</FavoriteIcon> : <FavoriteBorderIcon onClick={likeMovie}>unlike</FavoriteBorderIcon>} */}
    </Con>
  );
};

const Con = styled.div`
  text-align-last: center;
  cursor: pointer;
  
  svg{
    color: red;
    position: absolute;
    
  }
`;
export default Movie;