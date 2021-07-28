import React from 'react';
import dateParser from '../../helperFunctions/dateParser.js';
import styled from 'styled-components';
import Helpful from '../../sharedComponents/Helpful.js'
import Response from './Response'

const Tile = styled.div`
    border-bottom: 1px solid grey;
    font-family: Helvetica, sans-serif;
    font-size: 12px;
    color: grey;
`;

const Summary = styled.div`
    font-weight: bold;
`;

const ReviewTile = (props) => {
  if (props.filter.length === 0) {
    return (
      <Tile>
        <div> Star rating here: {props.review.rating} </div>
        <div>{props.review.reviewer_name}</div>
        <div>{dateParser(props.review.date)}</div>
        <Summary>{props.review.summary}</Summary>
        <div>{props.review.body}</div>
        {props.review.recommend ?
          <div> ✓ I recommend this product </div> : null}
        {/* {props.review.response ?
          <div>
            Response from seller
            {props.review.response}
            </div>
            : null} */}

        <Response response={props.review.response}/>
        <Helpful helpfulness={props.review.helpfulness}/>
      </Tile>
    )
  } else {
    if (props.filter.indexOf(+props.review.rating) !== -1) {
      return (
        <Tile>
          <div> Star rating here: {props.review.rating} </div>
          <div>{props.review.reviewer_name}</div>
          <div>{dateParser(props.review.date)}</div>
          <Summary>{props.review.summary}</Summary>
          <div>{props.review.body}</div>
          {props.review.recommend ?
            <div> ✓ I recommend this product </div> : null}
          {/* {props.review.response ?
            <div>
              Response from seller
              {props.review.response}
              </div>
              : null} */}

          <Response response={props.review.response}/>
          <Helpful helpfulness={props.review.helpfulness}/>
        </Tile>
      )
    } else {
      return null;
    }
  }
}

export default ReviewTile;