import React, {useState, useEffect} from 'react'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import Service from '../appwrite/Db'

function AllPosts() {
    const [posts, setPosts]=usestate([])
    useEffect(()=>{
        Service.getAllPosts().then((res)=>{
            if(res)
            setPosts(res)
        })
    },[])


    return (
        <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
    )
}
export default AllPosts