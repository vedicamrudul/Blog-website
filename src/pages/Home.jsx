import React, { useEffect } from 'react'
import Service from '../appwrite/Db'
import Container from 'src/components/container/Container.jsx'
import PostCard from '../components/PostCard'

function Home() {

    const [posts, setPosts] = React.useState([])

    useEffect(() => {
        Service.getPosts().then((res) => {
            if (res)
                setPosts(res)
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
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