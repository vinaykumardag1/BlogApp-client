import React from 'react'

const Card = ({blog}) => {
  const userId=localStorage.getItem('userId')
  return (
    <div  className="flex justify-center items-center  bg-gray-100">

        <div  className="w-1/2 border-b overflow-hidden border-gray-300 mb-6 pb-6">
          <h3 className="text-3xl  text-gray-800">{blog.title}</h3>
          {blog.image && (
            <img
              className="mt-4 w-full  h-auto"
              src={`http://localhost:3000${blog.image.path}`}
              alt={blog.title}
            />
          )}
          <p className="text-lg text-gray-600 mt-4 text-justify">{blog.content}</p>
          
     </div>
   </div>
  )
}

export default Card
