import React from 'react'
import blogService from "../../services/appwrite/blog";
import {Link} from 'react-router-dom'

const PostCard = ({$id, title, featuredImage}) => {
  return (
    <Link to={`/post/${$id}`}>
      <div children='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'> 
            <img src={blogService.getFilePreview(featuredImage)} alt=' ' className=' roundex-xl' />
        </div>
        <h2 className='text-xl font-bold '>{title}</h2> 
      </div>
    </Link>
  )
}

export default React.forwardRef(PostCard)
