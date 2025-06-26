import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
function ReviewWrite() {
  const [reviewMessage, setReviewMessage] = useState("");
  const handleChange =async (event) => {
    setReviewMessage(event.target.value);
  };
  const [rating, setRating] = useState(4);
  const {sendReview} = useAuthStore()
  const handleSubmit = async () =>{
    sendReview({
        reviewMessage: reviewMessage,
        rating: rating
    })
    
    setReviewMessage("")
  }
  return (
    <div className="bg-[url('./assets/review.jpeg')] min-h-screen h-full w-full bg-cover bg-no-repeat bg-center relative p-[5%]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md h-full"></div>
      <div className="relative z-10 h-full w-full drop-shadow-2xl flex-col">
        <div className="flex flex-row justify-between" >
        <div className="rating gap-1">
          <input
            type="radio"
            name="rating-3"
            className="mask mask-heart bg-red-400"
            aria-label="1 star"
            onChange={async () =>{setRating(1)}}
          />
          <input
            type="radio"
            name="rating-3"
            className="mask mask-heart bg-orange-400"
            aria-label="2 star"
            onChange={async () =>{setRating(2)}}


          />
          <input
            type="radio"
            name="rating-3"
            className="mask mask-heart bg-yellow-400"
            aria-label="3 star"
            onChange={async () =>{setRating(3)}}


          />
          <input
            type="radio"
            name="rating-3"
            className="mask mask-heart bg-lime-400"
            aria-label="4 star"
            defaultChecked

            onChange={async () =>{setRating(4)}}


          />
          <input
            type="radio"
            name="rating-3"
            className="mask mask-heart bg-green-400"
            aria-label="5 star"
            onChange={async () =>{setRating(5)}}


          />
        </div>
        <button className="btn btn-secondary" onClick={handleSubmit}>Submit</button>
        </div>
        <div className="relative z-10 inset-0 bg-black/20 my-8">

        <textarea
          placeholder="Your Review"
          className="textarea textarea-secondary bg-transparent backdrop-blur-md flex-grow text-xl w-full min-h-96  text-green-700 "
          onChange={handleChange}
          value={reviewMessage}
        ></textarea>
        </div>
      </div>
    </div>
  );
}

export default ReviewWrite;
