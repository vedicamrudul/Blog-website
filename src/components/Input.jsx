import React, {useId} from 'react'
import { forwardRef } from 'react'

// theory at the end explaining useRef and forwardRef

const Input = forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {label}
            </label>   
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input

// jesus i think i understand useRef now and i feel stupid for not understanding it before and weirdly i am still not sure if i understand it
// https://www.youtube.com/watch?v=gwFfzIaKnAU - watch this video to understand useRef and forwardRef. I will still try to explain it as far as i have understood. So basically see useState is used to update the state of a variable and it causes re renders. But how exactly do you access an element in react? Like there is an input field and i want to access it? useState can kinda be used to change the value inside the field and it will cause re renders after every letter is typed but wtv. What if we just want to focus on the input field? we use useRef hook then. If you take reference of the input field and print it, you will get the entire element in the console - '<input type="text"> whatever  </input>'. So you can use useRef to access the element and then use the focus() method to focus on the element. So useRef is used to access the element and then you can use the methods of the element to do wtv you want to do with it. (brooooo copilot just autocompleted this, its so cool). Anyways. Now even if you want the input text you can just take the reference of the input component and then use .value to get the value of that input field. 

// so when is forwardRef used? basically we usually make the input field as a seperate component and we actually have to pass the reference to that component. So when we normally pass it as a prop like for example we pass classname as a prop etc, then it wont work properly. So we have to seperately mention that this argument is a ref. So we use forwardRef to do that. forwardRef(function xyz(props, ref){}) - this is the syntax. So we pass the ref as an argument and then we can use it in the input field. basically we mention that the first part is the prop and the last argument is the ref. (i think i understand this now- bro this bracket was also written by copilot. Its like it knows me)