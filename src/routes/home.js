import React, { useState } from 'react';
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import styled from 'styled-components';
import background from "../img/background.png"
import logo from "../img/logo.png"
import BoltIcon from '@mui/icons-material/Bolt';
import Movie from '../components/movie.js';
import Modal from '../components/modal';
import { Link } from 'react-router-dom';

const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
      title
      description_intro
      isLiked @client
    }
  }
`;

const Home = () => {
  const { loading, data } = useQuery(GET_MOVIES);
  // if (loading) {
  //   return "loading...";
  // }
  // if (data && data.movies) {
  //   return data.movies.map(m => <h1>{m.id}</h1>);
  // }

  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(null);

  const openModal = (id, url, title, description_intro) => {
    console.log(id);
    setIsOpen(true)
    setModal(
      <div>
        <h1 style={{ fontFamily: "'Permanent Marker', cursive", marginBottom: "1rem" }}>
          {title}
        </h1>
        <div>
          <img src={url} />

        </div>
        <Link to={`/${id}`}>
          <Button>Detail</Button>
        </Link>
      </div>
    )
  }
  return (
    <Con>
      <div className='img'>
        <div className="header">
          <img src={logo} />
        </div>

        <div className='secHeader'>
          <div className='background' />
          <div>
            YOLO MOVIE 2022<br />
          </div>
        </div>

      </div>

      <div className='main'>
        {loading ? <div className='loading'>Loading...</div> : <>
          <div className='list'>
            {!loading && data.movies && data.movies.map(m => <Movie isLiked={m.isLiked} key={m.id} title={m.title} description_intro={m.description_intro} id={m.id} openModal={openModal} url={m.medium_cover_image} />)}
          </div>

          <Modal onClose={() => setIsOpen(false)} open={isOpen}>
            <div>
              {modal}
            </div>
          </Modal>

          <div className='bottom'>
            <img src={background} />
            <div>
              powered by HeeYeon Han <BoltIcon />
            </div>
          </div></>}


      </div>


    </Con >
  )
};

export default Home;

const Button = styled.button`
  background-color: #4CAF50; /* Green */
  border: none;
  width: 100%;
  color: white;
  padding: 0.5rem 2rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin: 4px 0px;
  transition-duration: 0.4s;
  cursor: pointer;
  font-family: 'Permanent Marker', cursive;
  border: 2px solid #4CAF50;

  &:hover{
    background-color: white; 
  color: black; 
  color: #4CAF50;
  
  }
`;
const Con = styled.div`

.img{

  .header{
  position:fixed;
  top:0 ;
  left:0;
  width:100%;
  display:flex;
  transition: 0.6s;
  padding: 10px 20px;
  z-index: 10000;

  img{
    width: 5rem;
    height: 5rem;
    }
  }
  .secHeader{

    .background{
    position: relative;
    width: 100%;
    height: 80rem;
    background-size: cover;
    background-image: linear-gradient(-45deg, rgb(253, 223, 70), rgb(23, 213, 209));

  }

  div{
    position: absolute;
    top: 25%;
    left: 50%;
    transform : translate(-50%, -50%);
    font-size: 2.5rem;
    font-family: 'Permanent Marker', cursive;
    color:white;
  }
  }

}

.list{
  display: grid; 
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  padding: 0 2.5rem;

  
  @media screen and (max-width:1200px){
    grid-template-columns: repeat(1, 1fr);
  }


}

.main{
  position: absolute;
  width: 100%;
  top: 25rem;

  .loading {
    font-size: 3rem;
    margin-left: 1rem;
    font-family: 'Permanent Marker', cursive;
    color: white;

  }
  .bottom{

    img{
      height: 10rem;
      width: 100%;

    }

    div{
      position:absolute;
      bottom: 2rem;
      left: 50%;
    transform : translate(-50%, -50%);
    color: white;
    font-size: 1.5rem;
    font-family: 'Permanent Marker', cursive;

    svg{
      color: red;

    }
    }
  }
}
`;