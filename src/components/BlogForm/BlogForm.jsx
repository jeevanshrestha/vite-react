import React, { useCallback, useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {Button, Input, Select } from '../UI'
import TinyMCE from '../tinymce/TinyMCE'
import   blogService  from '../../services/appwrite/blog'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const BlogForm = (post) => {

  const {register ,handleSubmit, watch, setValue, control, getValues} = useForm({
    defaultValues:{
      title: post?.title || "",
      slug: post?.slug || "",
      content:post?.content || "",
      status:post?.status|| 'active',
    }
  })

  const navigate = useNavigate()
  const userData = useSelector(state => state.auth.UserData)

  const submit = async  (data) => {
    const file = data.image[0]? blogService.uploadImage(data.image[0]) : null
    if(post) {
      if(file){
        blogService.deleteImage(post.featuredImage)
      }

      const dbPost = await blogService.updatePost(post.$id, {...data, featuredImage:file?file.$id:undefined})
      if(dbPost){
        navigate(`/post/$(dbPost.$id)`)
      }

    }
    else{
        if(file){
           data.featuredImage = file.$id
           const dbPost = await blogService.createBlog({
            ...data,
            userId: userData.$id,
           })

           if(dbPost){
            navigate(`/post/$dbPost.$id`)
           }

        }
    }
  }

  const slugTransform = useCallback((value)=>{

    if(value && typeof value === 'string') 
      return value.trim().toLowerCase().replace(/^[a-zA-z\d]+/g,'-')
    else
      return '';

  },[])

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
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default PostForm
