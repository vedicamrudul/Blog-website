import React, {useState, useEffect} from 'react'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import Service from '../appwrite/Db'

function AllPosts() {
    const [posts, setPosts]=useState([])
    useEffect(()=>{
        Service.getAllPosts().then((res)=>{
            if(res)
            setPosts(res)
        console.log(posts)
        })
    },[])


    return (
        <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                
                {posts.length>0 ?        posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard id={post.$id} title={post.title}   />
                    </div>
                )): <div>No Posts Found</div>}
            </div>
            </Container>
    </div>
    )
}
export default AllPosts