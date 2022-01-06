import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AssistantTwoToneIcon from '@mui/icons-material/AssistantTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;


const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, rgb(253, 223, 70), rgb(23, 213, 209));
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  font-family: 'Permanent Marker', cursive;

  @media screen and (max-width:1200px){
    display: block;
    height: 100%;

  }

.suggestion{
  font-size: 2rem;

  .movie{
    height: 85vh;
  overflow: auto;
  cursor: pointer;

  
  @media screen and (max-width:1200px){
    display: flex;
    height: 30vh;

    .movieImg{
      height: 25vh;

    }
  }
  }

  .movie::-webkit-scrollbar {
  width: 12px;
}

.movie::-webkit-scrollbar-track {
  background-color: white;
    border-radius: 6px;
}

.movie::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: #01AF57;
  
}
}
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;

  @media screen and (max-width:1200px){
    margin-left: 0px;
    padding : 10px;
    width: 90%;
    margin-bottom: 30px;
  }

`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;

  .homeImg{
    svg{
      font-size: 3rem;
      cursor: pointer;
      color: white;
      &:hover{
        color: #01AF57;
      }
    }
  }

  .title{
    font-size: 3rem;
    svg{
      margin-left: 1rem;
    }
  }

  .star{
    font-size: 2rem;
    color: yellow;
  }
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;

  @media screen and (max-width:1200px){
    width: 100%;
    height: 500px;
  }
`;



export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) }
  });


  return (
    <Container>
      <Column>
        <Title>
          {loading && "Loading..."}
        </Title>

        {loading ? null : <>
          <Subtitle>
            <div className='homeImg'>
              <Link to={`/`}>
                <HomeTwoToneIcon />
              </Link>
            </div>
            <div className='title'>
              {data?.movie?.title}
              {/* {data?.movie?.isLiked ? <FavoriteIcon ></FavoriteIcon> : <FavoriteBorderIcon ></FavoriteBorderIcon>} */}
            </div>

            {data?.movie?.language} · <StarTwoToneIcon className='star' />{data?.movie?.rating}
          </Subtitle>
          <Description>{data?.movie?.description_intro}</Description>
        </>}

      </Column>

      {
        loading ? null : <>
          <Poster bg={data?.movie?.medium_cover_image}></Poster>

          <div className='suggestion'>
            <div>
              Suggestion <AssistantTwoToneIcon />
            </div>
            <div className='movie'>
              {data?.suggestions?.map(m =>
                <div >
                  <Link to={`/${m.id}`}>
                    <img src={m.medium_cover_image} className='movieImg' />
                  </Link>
                </div>
              )}
            </div>

          </div>


        </>
      }

    </Container>
  );
};