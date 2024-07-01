import React, {useId} from 'react'
import { forwardRef } from 'react'

// other way of using forwardRef

function Select({
    options,
    label,
    className="",
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {/* label && cuz we need to first check if label has been passed as a prop or not */}
        {label && <label htmlFor={id} className=''>{label}</label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {/* options? cuz it will map only if there is some value in option otherwise if you try looping it will crash */}
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}
// second method of using forwardref. First method was like const Select= forwardRef(function Select({}){}), aisa humne input mein kiya tha. Woh dekhlo.
export default forwardRef(Select)