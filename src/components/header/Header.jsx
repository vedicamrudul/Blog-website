import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import { useSelector } from 'react-redux'
import Container from '../container/Container'



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
    {
      name: "All Posts",
      path: '/all-posts',
      active: authStatus
    },
    {
      name: "Add Post",
      path: '/add-post',
      active: authStatus
    }
  ]

  return (
    <>
    <header className='py-3 shadow bg-gray-500'>
      <Container>
      <nav className='flex'>
          <div className='mr-4'>
            LOGO HAHAHAHA
            {/* <Link to='/'>
              <Logo width='70px'   />

              </Link> */}
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