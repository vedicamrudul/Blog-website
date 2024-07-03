import React, { useCallback, useEffect } from 'react'
// revision of useCallback: useCallback is a hook that will return a memoized version of the callback function that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate in React).
import { useForm } from 'react-hook-form'
import Button from '../Button'
import Select from '../Select'
import Input from '../Input'
import RTE from '../RTE'
import { useSelector } from 'react-redux'
import Service from '../../appwrite/Db'
import { useNavigate } from 'react-router-dom'


export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await Service.uploadFile(data.image[0]) : null;
            // upload file returns the id of the file that was uploaded? id of image that was uploaded?
            if (file) {
                if (post.featuredImage) {
                    await Service.deleteFile(post.featuredImage)
                }
            }

            const dbPost = await Service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
                // since file stores the id of the image that was uploaded, we can use it to update the featured image of the post
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await Service.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                console.log(data)
                console.log(userData.userData.$id)
                const dbPost = await Service.createPost({ ...data, userId: userData.userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        })
        return subscription.unsubscribe();
    }, [watch, slugTransform, setValue])

    return (
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
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <div className="mb-4">
                    <label htmlFor="featured-image">Featured Image :</label>
                    <Input
                        id="featured-image"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                </div>
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={Service.FilePreview(post.featuredImage)}
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
    );
}