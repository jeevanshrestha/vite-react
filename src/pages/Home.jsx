import React  from 'react'
import {useState, useEffect} from 'react'
import {Container } from '../components'
import { PostCard } from '../components/UI'
import blogService from '../services/appwrite/blog'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await blogService.getPosts();
                if (postsData && postsData.documents) {
                    setPosts(postsData.documents);
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
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        { posts.map((post) =>  
            <div  key={post.$id}   className=' p-2'>
             <PostCard post={post} />
            </div>
                       )}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h3 className="text-xl font-medium text-gray-600">No blog posts found</h3>
                        {userData && (
                            <button
                                onClick={() => navigate('/create-post')}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                Create Your First Post
                            </button>
                        )}
                    </div>
                )}
            </Container>

                    
                     
        </div>
    );
};

export default Home;
