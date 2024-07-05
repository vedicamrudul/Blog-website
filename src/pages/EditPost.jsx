import React,{useEffect, useState} from 'react'
import Container from '../components/container/Container'
import PostForm from '../components/post-form/PostForm'
import Service from '../appwrite/Db'
import {useNavigate, useParams} from 'react-router-dom'

function EditPost(){
    const [post, setpost]=useState(null)
    const {slug}=useParams()
    const navigate=useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8 bg-color3 min-h-[80vh]'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost
