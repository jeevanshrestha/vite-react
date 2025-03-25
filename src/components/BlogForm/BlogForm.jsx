import React, { useCallback, useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {Buttons, Input, Select } from '../UI'
import TinyMCE from '../tinymce/TinyMCE'
import   blogService  from '../../services/appwrite/blog'
import {useNavigate} from 'react-router-dom'
import {   useSelector } from 'react-redux'

const BlogForm = ({post}) => {


  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
 
  const {register ,handleSubmit, watch, setValue, control, getValues} = useForm({
    defaultValues:{
      title: post?.title || "",
      slug: post?.slug || "",
      content:post?.content || "",
      status:post?.status|| '1',
    }
  })

  const navigate = useNavigate()
 
  console.log(userData);

  const submit = async (data) => {
    if (post) {
        const file = data.featuredImage[0] ? await blogService.uploadImage(data.featuredImage[0]) : null;

        if (file) {
          blogService.deleteFile(post.featuredImage);
        }

        const dbPost = await blogService.updatePost(post.$id, {
            ...data,
            featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
        }
    } else {
        const file = await blogService.uploadImage(data.featuredImage[0]);

        if (file) {
            const fileId = file.$id;
            data.featuredImage = fileId;
            const dbPost = await blogService.createBlog({ ...data, userid: userData.$id });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
    }
};

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()                   // Remove whitespace from both ends
        .toLowerCase()            // Convert to lowercase
        .replace(/\s+/g, '-')      // Replace spaces with -
        .replace(/[^\w\-]+/g, '')  // Remove all non-word chars except -
        .replace(/\-\-+/g, '-')    // Replace multiple - with single -
        .replace(/^-+/, '')        // Trim - from start of text
        .replace(/-+$/, '');       // Trim - from end of text
    }
    return '';
  }, []);

  useEffect(()=>{

    const subscription = watch((value, {name})=>{
      if(name==='title'){
        setValue('slug',slugTransform(value.title, {shouldValidate:true}))
      }
    })

    return () => {
      subscription.unsubscribe()
    }

  },[watch, slugTransform, setValue])
  return (
    <div>
       <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <TinyMCE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("featuredImage", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                       { post.featuredImage && <img
                            src={blogService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                            
                        />}
                    </div>
                )}
                <Select
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" }
                ]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Buttons type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Buttons>
            </div>
        </form>
    </div>
  )
}

export default BlogForm
