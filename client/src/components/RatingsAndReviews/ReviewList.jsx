/* eslint-disable */

// the review List and functionality of the review list goes here
// imprts review tile
import React from 'react';
import axios from 'axios';
import ReviewTile from './ReviewTile.jsx';
import NewReview from './NewReview.jsx';
const url = 'http://3.134.102.30/reviews';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // showNewReview: false,
      productId: this.props.productId,
      reviewShown: [],
      reviewSplitNum: 0,
      data: [],
      selectedValue: 'newest',
    };
    this.moreReviews = this.moreReviews.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadList = this.loadList.bind(this);
    // this.addToData = this.addToData.bind(this);
  }

  async componentDidMount() {
    const { productId } = this.state;
    console.log(this.props.productId);
    try {
      const getReviews = await axios.get(`${url}/${productId}/list?`, {
        params: {
          sort: this.state.selectedValue,
        },
      });
      this.setState({
        data: getReviews.data,
      });
      this.loadList();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(this.state.selectedValue);
    console.log(prevProps.productId);
    console.log(this.props);
    if (prevProps.productId !== this.props.productId) {
      this.setState(
        {
          productId: this.props.productId,
        },
        () => {
          return this.componentDidMount();
        },
      );
    }
    if (prevState.selectedValue !== this.state.selectedValue) {
      this.componentDidMount();
    }
  }

  loadList() {
    const listArr = this.state.data.results.slice(
      this.state.reviewSplitNum,
      this.state.reviewSplitNum + 2,
    );
    this.setState({
      reviewShown: this.state.reviewShown.concat(listArr),
      reviewSplitNum: this.state.reviewSplitNum + 2,
    });
  }

  handleChange(e) {
    this.setState(
      {
        selectedValue: e.target.value,
      },
      () => {
        console.log(this.state.selectedValue);
      },
    );
  }

  moreReviews(e) {
    e.preventDefault();
    const addArr = this.state.data.results.slice(
      this.state.reviewSplitNum,
      this.state.reviewSplitNum + 2,
    );
    this.setState({
      reviewShown: this.state.reviewShown.concat(addArr),
      reviewSplitNum: this.state.reviewSplitNum + 2,
    });
  }

  render() {
    console.log(this.state.productId);
    // this.addToData();
    if (this.props.showReviewList === false) {
      return null;
    }
    return (
      <div>
        Number of Reviews sorted by
        <select
          className="reviewFilters"
          value={this.state.selectedValue}
          onChange={this.handleChange}
        >
          <option value="newest">Newest</option>
          <option value="helpful">Helpful</option>
          <option value="relevant">Relevant</option>
        </select>
        <br />
        {this.state.reviewShown.map((review) => {
          return <ReviewTile review={review} reviewId={review.review_id} />;
        })}
        <button
          className="moreReviews"
          onClick={(e) => {
            this.moreReviews(e);
          }}
        >
          More Reviews
        </button>
        {/* <button
          className="addReview"
          onClick={() => {
            return this.openNewReview();
          }}
        >
          Add a Review +
        </button> */}
        <NewReview
          newReview={this.newReview}
          product={this.props.productId}
          // showNewReview={this.state.showNewReview}
          // closeNewReview={this.closeNewReview}
        />
      </div>
    );
  }
}

export default ReviewList;

// The list should display 2 tiles at a time, if more than 2 review button "More Reviews" appears
// below the list
// does button need to go in main page?
// if < 2 reviews no button to appear or if no more reviews in list
// button displays 2 moew reviews putting new reviews under the ones already generaterd

// list should be scrollable button and sort outside scross

// sort form (dropdown)

// if no reviews, om;ynew review button appears
