import React, { useEffect } from 'react'
import Service from '../appwrite/Db'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import { useSelector } from 'react-redux'


function Home() {


    const userStatus= useSelector(state=>state.auth.status)
    const [posts, setPosts] = React.useState([])

    useEffect(() => {
        Service.getAllPosts().then((res) => {
            if (res)
                setPosts(res.documents)
        })
    }, [])

    if (posts.length === 0 && userStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }else if(posts.length===0 && !userStatus){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className="w-full py-8 mt-4">
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => {
                        return (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        )
                    })}
                </div>
            </Container>
        </div>

    )
}

export default Home