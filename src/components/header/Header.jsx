import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import { useSelector } from 'react-redux'
import Container from '../container/Container'
import { Link } from 'react-router-dom'



function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'Home',
      path: '/',
      active: true
    },
    {
      name: 'Login',
      path: '/login',
      active: !authStatus
    },
    {
      name: 'SignUp',
      path: '/signup',
      active: !authStatus
    },
    // {
    //   name: "All Posts",
    //   path: '/all-posts',
    //   active: authStatus
    // },
    {
      name: "Add Post",
      path: '/add-post',
      active: authStatus
    }
  ]

  return (
    <>
    <header className=' py-3 shadow-md shadow-inner  shadow-color4 bg-color2'>
      <Container>
      <nav className='flex'>
          <div className='mr-4'>
     
            <Link to='/'>
              <div width='70px ' className='pt-2' >
Logo
              </div>

              </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.path)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
    </>
  )
}

export default Header