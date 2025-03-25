import React from 'react'
import   blogService  from '../services/appwrite/blog'
import {Container } from '../components'
import { PostCard } from '../components/UI'
import { useState, useEffect } from 'react'

const AllBlogs = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await blogService.getPosts();
                if (response && response.documents) {
                    // Filter out posts without required fields if needed
                    const validPosts = response.documents.filter(post => post.$id);
                    console.log("validPosts", validPosts);
                    setPosts(validPosts);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);


  return (
    <div className='py-8'>
        
        <Container>
            {<div className='flex flex-wrap'>

                { loading ? <div>Loading...</div> : posts.map((post) =>  
                <div  key={post.$id}   className='p-2 w-1/4  '>
                 <PostCard post={post} />
                </div>
                )}
            </div>
               

            }

        </Container>
    </div>
  )
}

export default AllBlogs