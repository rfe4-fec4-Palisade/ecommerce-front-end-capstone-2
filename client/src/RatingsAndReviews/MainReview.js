// main review file that will render all child components.
// make the get request here and populate state
import React, { useState, useEffect } from 'react';
import Sort from './SortComponents/sort.js';
import List from './ReviewList/List.js';
import Breakdown from './RatingBreakdown/Breakdown.js';
import NewReview from './WriteNewReview/NewReview.js';
import axios from 'axios';

const MainReview = (props) => {
  const [sort, setSort] = useState('Relevance');
  const [currentProduct, setProduct] = useState(props.currentProduct)
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [metadata, setMetadata] = useState({});

  const getReviews = (id, sort = 'relevant') => {
    axios.get(`/reviews?product_id=${id}&sort=${sort}&count=50`)
      .then((response) => {
        let reviews = response.data.results
        let count = response.data.count
        setData(reviews)
        setCount(count)
      })
      .catch((err) => {console.log(err)})
  }

  const getMetadata = (id) => {
    axios.get(`/reviews/meta?product_id=${id}`)
    .then((response) => {
      let newMeta = response.data
      setMetadata(newMeta)
    })
    .catch((err) => {console.log(err)})
  }

  useEffect(()=>{
    getReviews(currentProduct)
    return () => {
      setData({});
    }
  }, [])

  useEffect(()=>{
    getMetadata(currentProduct)
    return () => {
      setMetadata({});
    }
  }, [])

  const changeSortOption = (option) => {
    var searchQuery;
    if (option === 'Relevance') {
      searchQuery = 'relevant'
    } else {
      searchQuery = option.toLowerCase();
    }
    setSort(option)
    getReviews(currentProduct, searchQuery)
  }

  const filter = () => {

  }

    return (
        <div className="main-review">
          <h1>This is the entire review component</h1>
          <Sort sortOption={sort} reviews={data} count={count} changeSortOption={changeSortOption}/>
          <Breakdown id={currentProduct} metadata={metadata} filter={filter}/>
          <List reviews={data}/>
          <NewReview id={currentProduct} metadata={metadata}/>
      </div>
    )
};

export default MainReview;