import React, { useEffect } from 'react';
import ReviewCard from '../Components/ReviewCard';
import { useAuthStore } from '../store/useAuthStore';

function Review() {
  const { listReviews, getReview } = useAuthStore();

  // Fetch reviews when the component mounts
  useEffect(() => {
    getReview();
  }, [getReview]);

  return (
    <div className="flex flex-wrap gap-4">
      {listReviews && listReviews.length > 0 ? (
        listReviews.map((review, index) => (
          <ReviewCard
            key={index}
            user={review.user}
            rating={review.rating}
            text={review.text}
          />
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}

export default Review;