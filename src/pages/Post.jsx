import React, {useEffect, useState} from 'react'
import {Link, useNavigate,useParams} from 'react-router-dom'
import Service from '../appwrite/Db'
import Button from '../components/Button'
import Container from '../components/container/Container'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

export default function Post() {
    const [post, setpost]=useState(null)
    const {slug}=useParams()
    const navigate=useNavigate()

    

    const userData=useSelector((state)=> state.auth.userData)
    const isAuthor=post && userData ? post.userId===userData.userData.$id : false;
    console.log(userData)
    

    console.log(isAuthor)

    useEffect(()=>{
        if(slug){
            Service.getPost(slug).then((res)=>{
                if(res){
                    setpost(res)
                }else{
                    navigate('/')
                }
            })
        }
    },[slug, navigate])

    const deletePost=()=>{
        Service.deletePost(post.$id).then((res)=>{
            if(res){
                Service.deleteFile(post.featuredImage)
                navigate('/')
            }
        })
    }

    const editPost=()=>{
        console.log('edit post');
        
    }
   

    return post ? (
        <div className="py-8 min-h-[80vh]">
            <Container>
                <div className=" flex  items-center justify-center mb-4 relative border  border-[0.2px] rounded-xl p-2">
                    {console.log(Service.filePreview(post.featuredImage))}
                    <img
                    width={700}
                        src={Service.filePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button onClick={editPost} btnText="Edit" bgColor="bg-green-500" className="mr-3">
                                    
                                </Button>
                            </Link>
                            <Button onClick={deletePost} btnText="Delete" bgColor="bg-red-500">
                                
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
                    </Container>
        </div>
    ) : null;
}