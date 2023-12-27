import { Divider } from '@mui/material';
import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import "./signup.css";
import logo from '../../images/blacklogoamazon.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Logincontext } from '../context/ContextProvider';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

  const {account,setAccount}=useContext(Logincontext) 


  const [udata, setUdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: ""
  })

  const navigate=useNavigate();

  const adddata = (e) => {
    const { name, value } = e.target;

    setUdata(() => {
      return {
        ...udata,
        [name]: value
      }
    })

    //  console.log(udata);


  }

  const senddata = async (e) => {

    e.preventDefault();

    const { fname, email, mobile, password, cpassword } = udata;

    //jyaada frontend par validation nahi ki is app me khud karlio toastify use karke

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fname, email, mobile, password, cpassword
      })
    });

    const data = await res.json();
    // console.log(data);

    if (res.status === 422 || !data) {
      toast.info("Fill all the details 😊!", {
        position: "top-center"
      });
    } 
    else 
    if (res.status === 423 || !data) {
      toast.info("This Email already exists 😀!", {
        position: "top-center"
      });
    } 
    else 
    if (res.status === 424 || !data) {
      toast.dark("Passwords do not match 😐!", {
        position: "top-center"
      });
    } 
    else 
    if (res.status === 425 || !data) {
      toast.dark("Error while registering the user 😥!", {
        position: "top-center"
      });
    } 
    else {
      // alert("data successfully added")
      toast.success("Registration Successfully done 😃!", {
        position: "top-center"
      });
      setUdata({ ...udata, fname: "", mobile: "", password: "", email: "", cpassword: "" });
      navigate("/login")
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
            <h1>Create account</h1>
            <div className="form_data">
              <label htmlFor="name">Your name</label>
              <input type="text" name="fname"
                id="name"
                onChange={adddata}
                value={udata.fname} />
            </div>
            <div className="form_data">
              <label htmlFor="email">email</label>
              <input type="email" name="email"
                id="email"
                onChange={adddata}
                value={udata.email} />
            </div>
            <div className="form_data">
              <label htmlFor="mobile">Mobile number</label>
              <input type="number" name="mobile"
                id="mobile"
                onChange={adddata}
                value={udata.mobile} />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input type="password" name="password"
                id="password" placeholder="At least 6 characters"
                onChange={adddata}
                value={udata.password} />
            </div>
            <div className="form_data">
              <label htmlFor="passwordg">Password again</label>
              <input type="password" name="cpassword"
                id="cpassword"
                onChange={adddata}
                value={udata.cpassword} />
            </div>
            <button type="submit" className="signin_btn" onClick={senddata}>Continue</button>

            <Divider />

            <div className="signin_info">
              <p>Already have an account?</p>
              <NavLink to="/login">Sign in</NavLink>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  )
}

export default Signup;