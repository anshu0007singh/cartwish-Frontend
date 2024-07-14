import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import './LoginPage.css'
import { login } from '../../Services/userServices';
import { useLocation } from 'react-router-dom';

const schema = z.object({
    email:z.string().email({message:"Please enter valid email address."}).min(3),
    password:z.string().min(8,{message:"Password should be atleast 8 characters"})
})

const LoginPage = ({prevPage,pathName}) => {

    const [formError, setFormError] = useState("");

    // const passwordRef = useRef(null);
    // const nameRef = useRef(null);
    // const phoneRef = useRef(null);
    const {register,handleSubmit,formState:{errors}} = useForm({resolver:zodResolver(schema)});

    // const [user, setUser] = useState({
    //     name:"",
    //     phone:""
    // });

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(user);
        // const user = {
        //     name:"",
        //     phone:0
        // }
        // user.name = nameRef.current.value;
        // user.phone = parseInt(phoneRef.current.value);
    // }

    const onSubmit = async (formData) => {
        try {
            await login(formData)
            if(prevPage){
                window.location = pathName
            }else{
                window.location = "/"
            }
        } catch (err) {
            if(err.response && err.response.status===400){
                setFormError(err.response.data.message)
               } 
        }
        
    }

  return (
    <section className='align_center form_page'>
        {/* <form action="" className='authentication_form' onSubmit={handleSubmit}> */}
        <form action="" className='authentication_form' onSubmit={handleSubmit(onSubmit)}>
            <h2>Login Form</h2>
            <div className="form_inputs">
                <div>
                    <label htmlFor="email">Email</label>
                    {/* <input type="text" ref={nameRef} id = 'name' className='form_text_input' placeholder='Enter your name' /> */}
                    {/* <input type="text" id = 'name' className='form_text_input' placeholder='Enter your name' value={user.name} onChange={(e) => setUser({...user,name:e.target.value})} /> */}
                    {/* <input type="email" id = 'email' className='form_text_input' placeholder='Enter your email address' {...register("email",{required:true,minLength:3})} /> */}
                    <input type="email" id = 'email' className='form_text_input' placeholder='Enter your email address' {...register("email")} />
                    {errors.email && <em className="form_error">{errors.email.message}</em>}
                    {/* {errors.name?.type==="required" && <em className="form_error">Please enter your name</em>} */}
                    {/* {errors.name?.type==="minLength" && <em className="form_error">Name should be 3 or more characters</em>} */}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    {/* <input type="number" ref={phoneRef} id = 'number' className='form_text_input' placeholder='Enter your phone number' /> */}
                    {/* <input type="number" id = 'number' className='form_text_input' placeholder='Enter your phone number' value={user.phone} onChange={(e) => setUser({...user,phone:parseInt(e.target.value)})} /> */}
                    {/* <input type="password" id = 'password' className='form_text_input' placeholder='Enter your password' {...register("password",{valueAsNumber:true})} /> */}
                    <input type="password" id = 'password' className='form_text_input' placeholder='Enter your password' {...register("password")} />
                    {errors.password && <em className="form_error">{errors.password.message}</em>}
                    {/* <button type='button' onClick={()=>passwordRef.current.type = "password"}>Hide Password</button>
                    <button type='button' onClick={()=>passwordRef.current.type = "text"}>Show Password</button> */}
                </div>
                {formError && <em className="form_error">{formError}</em>}
                <button type='submit' className='search_button form_submit'>Submit</button>
            </div>
        </form>
    </section>

  )
}

export default LoginPage
