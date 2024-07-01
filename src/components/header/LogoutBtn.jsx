import React from 'react'
import { logout } from '../../store/authSlice'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'

function LogoutBtn() {
  const dispatch = useDispatch()
  const handleClick = () => {
    authService.logout().then(() => {
      dispatch(logout())
    }).catch((err) => {
      console.error(err)
    })
  }


  return (
    <>
      <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={handleClick}>LogOut</button>
    </>
  )
}

export default LogoutBtn