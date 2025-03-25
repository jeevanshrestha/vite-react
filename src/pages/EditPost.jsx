import React from 'react'
import blogService from '../services/appwrite/blog'
import { useState, useEffect } from 'react'
import {Container, BlogForm} from '../components'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { login } from '../store/authSlice'
import authService from '../services/appwrite/auth'

const EditPost = () => {

    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState({})
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    const {slug} = useParams()

    useEffect(() => {
        blogService.getPost(slug).then((post) => {
            if(post)
            {

            setPost(post)
            setLoading(false)

            }
            else
            return null;
        }).catch((error) => {
            console.log("Error", error)
        })   
    }, [slug, navigate])

  return post? (
    <div className='py-8'>
        
        <Container>
            <BlogForm post={post} />    
            </Container>
    </div>
  ): null;
}

export default EditPost;