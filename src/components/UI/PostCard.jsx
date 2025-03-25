import React from 'react'
import blogService from "../../services/appwrite/blog";
import {Link} from 'react-router-dom'

const PostCard = ({post}) => {
  return (
<Link to={`/post/${post.$id}`} className="block group">
  <div className="w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-blue-400">
    {/* Image Container */}
    <div className="w-full h-48 overflow-hidden bg-gray-100">
      {post.featuredImage ? (
        <img
          src={blogService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-gray-500 text-sm">No featured image</span>
        </div>
      )}
    </div>

    {/* Content Container */}
    <div className="p-5">
      <h2 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
        {post.title}
      </h2>
      
      {/* Optional metadata row */}
      <div className="flex items-center text-sm text-gray-500 mt-3">
        <span className="flex items-center mr-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {new Date(post.$createdAt).toLocaleDateString()}
        </span>
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          {post.views || 0} views
        </span>
      </div>
    </div>
  </div>
</Link>
  )
}

export default  PostCard;
