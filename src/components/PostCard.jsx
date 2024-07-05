import React from 'react'
import Service from '../appwrite/Db'
import {Link} from 'react-router-dom'


function PostCard({$id, title, featuredImage}) {
    // this is the syntax of appwrite; the id is written as '$id'
    // the featuredImage is the id of the image in the storage and the $id is the id of the post
  return (
    <Link  to={`/post/${$id}`}>
        <div className='w-full bg-color2 bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={Service.filePreview(featuredImage)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard