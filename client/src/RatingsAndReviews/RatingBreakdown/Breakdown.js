import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';

const Breakdown = (props) => {
  if( props.metadata.ratings === undefined ) {
    return null;
  }
  const [total, setTotal] = useState(0);
  const [bars, setBars] = useState([1,2,3,4,5])
  /*
  {
    "product_id": "19089",
    "ratings": {
        "1": "15",
        "2": "30",
        "3": "15",
        "4": "12",
        "5": "39"
    },
}

  approach for rating breakdown: go into metadata.ratings and total up all the values. set state total.

  create a state for each rating [1,2,3,4,5]. map over this array and pass in each number, as well as the value
  */
 useEffect(()=>{
    const ratings = props.metadata.ratings
    let num = 0
    for (var key in ratings) {
      num += +ratings[key]
    }
    setTotal(num)
  }, [])

    return (
      <div>
        {bars.map((bar) => <StarRating key={bar} total={total} count={props.metadata.ratings[bar]} rating={bar} filter={props.filter} onFilter={props.onFilter} />)}
      </div>
    )
}

export default Breakdown;