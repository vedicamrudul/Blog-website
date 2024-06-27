import React from 'react'

function Button({btnText="button Text", type="button", bgColor="bg-blue-500", textColor="white", onClick=null, className="", ...props}) {
  return (
   <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} onClick={onClick} type={type} {...props}>{btnText}</button>
  )
}

export default Button