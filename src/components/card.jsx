import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Card = ({ blog }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  

  return (
    <div className=" bg-gray-100 p-6 rounded-lg shadow-lg">
      <div className=" border-b overflow-hidden border-gray-300 mb-6 pb-6">
        <h3 className="text-3xl text-gray-800 uppercase font-bold">{blog.title}</h3>
        {blog.image && (
          <img
            className="mt-4 w-full h-auto rounded-lg"
            src={`http://localhost:3000${blog.image.path}`}
            alt={blog.title}
          />
        )}
       
        {/* {paragraphs.length > 0.1 && (
          <button
            className="mt-4 text-blue-500 hover:underline"
            onClick={() => setShowFullContent(!showFullContent)}
          >
            {showFullContent ? 'Read Less' : 'Read More'}
          </button>
        )} */}
       
      </div>
    </div>
  );
};

export default Card;
