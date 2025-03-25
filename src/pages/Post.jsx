import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container } from '../components';
import { Buttons } from '../components/UI';
import blogService from '../services/appwrite/blog';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';

const Post = () => {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (!slug) {
                    navigate('/');
                    return;
                }

                const postData = await blogService.getPost(slug);
                if (!postData) {
                    navigate('/');
                    return;
                }

                setPost({
                    ...postData,
                    featuredImage: postData.featuredImage || null
                });
            } catch (error) {
                console.error("Error fetching post:", error);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug, navigate]);

    const deletePost = async () => {
        try {
            if (!post?.$id) return;

            const status = await blogService.deleteBlog(post.$id);
            if (status && post.featuredImage) {
                await blogService.deleteImage(post.featuredImage);
            }
            navigate('/');
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    if (loading) {
        return (
            <div className="py-8">
                <Container>
                    <div className="text-center">Loading post...</div>
                </Container>
            </div>
        );
    }

    if (!post) {
        return null;
    }

    return (
        <div className='py-8'>
<Container>
  {/* Header with metadata */}
  <div className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2 text-gray-500">
        <span className="text-sm">
          {new Date(post.$createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </span>
        {post.category && (
          <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">
            {post.category}
          </span>
        )}
      </div>
      {isAuthor && (
        <div className="flex gap-2">
          <Link to={`/edit-post/${post.$id}`}>
            <Buttons className="flex items-center gap-1 bg-green-500 hover:bg-green-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Buttons>
          </Link>
          <Buttons 
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 transition-colors"
            onClick={deletePost}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </Buttons>
        </div>
      )}
    </div>

    <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-gray-900">
      {post.title}
    </h1>
  </div>

  {/* Featured Image */}
  <div className="relative mb-10 rounded-xl overflow-hidden shadow-lg border border-gray-200 w-1/4 mx-auto">
    {post.featuredImage ? (
      <img
        src={blogService.getFilePreview(post.featuredImage)}
        alt={post.title}
        className="w-full h-auto max-h-[32rem] object-cover"
      />
    ) : (
      <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center">
        <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-gray-500">No featured image</span>
      </div>
    )}
  </div>

  {/* Content */}
  <div className="prose max-w-none prose-lg prose-headings:font-medium prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-lg prose-img:shadow-md">
    {parse(post.content)}
  </div>

  {/* Footer */}
  {post.tags?.length > 0 && (
    <div className="mt-12 pt-6 border-t border-gray-200">
      <div className="flex flex-wrap gap-2">
        {post.tags.map(tag => (
          <span key={tag} className="px-3 py-1 text-sm bg-gray-100 rounded-full">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )}
</Container>
        </div>
    );
};

export default Post;