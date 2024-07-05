import React, { useEffect } from 'react'
import Service from '../appwrite/Db'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import { useSelector } from 'react-redux'

function Home() {
    const userStatus = useSelector(state => state.auth.status)
    const [posts, setPosts] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    useEffect(() => {
        setLoading(true)
        Service.getAllPosts().then((res) => {
            if (res) {
                setPosts(res.documents)
            }
            setLoading(false) // Move setLoading(false) here to accurately reflect loading state
        })
    }, [])

    // Show loading indicator when loading
    if (loading) {
        return (
            <div className="w-full flex items-center justify-center h-[80vh] py-8 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-[3rem] font-bold hover:text-gray-500">
                                Loading...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0 && userStatus) {
        return (
            <div className="w-full flex items-center justify-center h-[80vh] py-8 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-[3rem] font-bold hover:text-gray-500">
                                No posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    } else if (posts.length === 0 && !userStatus) {
        return (
            <div className="w-full flex items-center justify-center h-[80vh] py-8 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-[3rem] font-bold hover:text-gray-500">
                            Login To View Posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
        )
    }
    return (
        <div className="w-full min-h-[80vh] py-8">
            <Container>
                <div className='flex justify-center  align-center flex-wrap s'>
                    {posts.map((post) => {
                        return (
                            <div key={post.$id} className='p-2 shadow-md bg-color2 shadow-color4 rounded-lg m-8 w-1/4'>
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