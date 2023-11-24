import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './signup.css'
// import { Logincontext } from '../context/Contextprovider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logo from '../../images/blacklogoamazon.png'
import { Logincontext } from '../context/ContextProvider';

const SignIn = () => {

       const {account,setAccount}=useContext(Logincontext) 

      const history=useNavigate();  

  const [logdata,setData]=useState({
    email:"",
    password:""
  });



  const adddata=(e)=>{
      const {name,value}=e.target;

    setData(()=>{
      return{
         ...logdata,
         [name]:value
      }
    })

    // console.log(logdata);
    

  }

  const senddata = async (e) => {

    e.preventDefault();

    const { email, password  } = logdata;

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
         email,password 
      })
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 400 || !data) {
          
      
      toast.error("Invalid Details 👎!", {
        position: "top-center"
      });
    } else {
      setAccount(data);
      toast.success("User Logged in Successfully done 😃!", {
        position: "top-center"
      });
      history("/")
      setData({ ...logdata,  password: "", email: "" });
    }


  }



      
  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src={logo} alt="signupimg" />
        </div>
        <div className="sign_form">
          <form method="POST">
            <h1>Sign-In</h1>

            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input type="email" name="email"
               onChange={adddata}
               value={logdata.email}
                id="email" />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input type="password" name="password"
                id="password" placeholder="At least 6 characters"
                onChange={adddata}
                value={logdata.password} />
            </div>
            <button type="submit" className="signin_btn" onClick={senddata} >Continue</button>
          </form>
          <ToastContainer />
        </div>
        <div className="create_accountinfo">
          <p>New to Amazon?</p>
          <button>  <NavLink to="/signup">Create your Amazon Account</NavLink></button>
        </div>
      </div>

    </section>
  )
}

export default SignIn