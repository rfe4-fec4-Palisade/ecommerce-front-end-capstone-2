import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PortalModal from './PortalModal';
import RatingStars from '../../sharedComponents/Stars/RatingStars.js';
import {FaRegStar} from 'react-icons/fa';

const StyledCard = styled.div `
  align-items: center;
  background-color: beige;
  margin: 1rem;
  padding: 1rem;
  border: solid;
  width: 220px;
  height: 300px;
`;

const StyledButton = styled.div `
  position: relative;
  bottom: 425px;
  left: 250px;
`;


const Card = (props) => {
  var id = props.id;


  const [card, updateCard] = useState({})
  const [openp, setOpenP] = useState(false);



  const getProduct = (id) => {
    axios.get(`http://localhost:3000/products/${id}`)
    .then(result => updateCard(result.data));
  }

  useEffect(() => {
    getProduct(id)
  }, [id])

  if (props.index < props.currentSlide ||  props.index > (props.currentSlide + 3)) {
    return null;
  }

  return (
    <div>
      <PortalModal
        message="Compare:"
        card={card}
        currentProduct={props.currentProduct}
        setOpenP={setOpenP}
        isOpen={openp}
      />
      <StyledCard className='card' onClick={() => props.setProduct(id)}>
        <h2>{id}: {card.name}</h2>
        <div>{card.slogan}</div>
        <h5>${card.default_price}</h5>
        <div>{card.category}</div>
      </StyledCard>
        <div><RatingStars metadata={props.metadata}/></div>
      <StyledButton>
        <FaRegStar onClick={() => setOpenP(!openp)}/>
      </StyledButton>
    </div>
  )
}

export default Card;