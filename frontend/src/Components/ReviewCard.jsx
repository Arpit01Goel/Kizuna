import React from 'react';

function ReviewCard({ user, rating, text }) {
  return (
    <div className="card w-96 bg-secondary-content text-accent-content shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{user}</h2>
        <p className="text-sm text-gray-500">Rating: {rating}/5</p>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ReviewCard;