import React, { useContext, useEffect, useState } from 'react'
import "./cart.css";
// import { products } from '../home/productdata';
import { Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import { Logincontext } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {loadStripe} from '@stripe/stripe-js'

const Cart = () => {


    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top of the page when the component mounts
    }, []); // Empty dependency array ensures this effect runs only once

     
   const {id}=useParams("");    //url se id nikalli
//    console.log(id);


   const history=useNavigate();

   const {account,setAccount}=useContext(Logincontext);


   const [inddata,setInddata]=useState([])
  
   useEffect(()=>{

    const getIndividualData=async()=>{
        const res=await fetch(`/getproductsone/${id}`,{
          method:"GET",
          headers:{
              "Content-Type":"application/json"
          }
        })
  
       const data=await res.json();
         if(res.status===200)
         setInddata(data);
         else
         console.log('No data available');
         
    //    console.log(data);
    //    console.log(inddata);
       
       
   
  
     }

     getIndividualData();
  
   },[id])


   //add cart function
   const addtocart = async (id) => {
    // console.log(id);
     
    if(!account){
        toast.error("login first 😃!", {
            position: "top-center"
          });
    }else{


    const check = await fetch(`/addcart/${id}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            inddata
        }),
        credentials: "include"
    });
    // console.log(check);
    const data1 = await check.json();
    // console.log(data1 +  'frontend data');

    if (check.status !== 201) {
        alert("no data available")
    } else {
        toast.success("item added to cart 😃!", {
            position: "top-center"
          });
          history("/buynow")
        setAccount(data1);
    }
}
}

 //make payment for buynow
 const makePayment = async()=>{
    if(!account){
        toast.error("login first 😃!", {
            position: "top-center"
          });
    }else{
    
    const stripe = await loadStripe("pk_test_51ORrsYSDu5hfD3NQjTXG8PE0q6Tn8O7eYd7ph7LaRnFAFJjOZQ7caKKbfG2u7iLVARpfpHrGQ4ZLsNX4Pc00eUE200A8tByLtp");

    const body = {
        products:inddata
    }
    const headers = {
        "Content-Type":"application/json"
    }
    const response = await fetch("/create_checkout_session",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    }); 

    const session = await response.json();

    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });
    
    if(result.error){
        console.log(result.error);
    }
}
}


    return (
        
           
         
        <div className="cart_section">
             {inddata && Object.keys(inddata).length && 

            <div className="cart_container">
                <div className="left_cart">
                    <img src={inddata.detailUrl} alt="cart" />
                    <div className="cart_btn">
                        <button className="cart_btn1" onClick={()=>addtocart(inddata.id)}>Add to Cart</button>
                        <button className="cart_btn2" onClick={makePayment}>Buy Now</button>
                    </div>

                </div>
                <div className="right_cart">
                    <h3>{inddata.title.shortTitle}</h3>
                    <h4>{inddata.title.longTitle}</h4>
                    <Divider />
                    <p className="mrp">M.R.P. : <del>₹{inddata.price.mrp}</del></p>
                    <p>Deal of the Day : <span style={{ color: "#B12704" }}>₹{inddata.price.cost}.00</span></p>
                    <p>You save : <span style={{ color: "#B12704" }}> ₹{inddata.price.mrp-inddata.price.cost}({inddata.price.discount}) </span></p>

                    <div className="discount_box">
                            <h5 >Discount : <span style={{ color: "#111" }}>{inddata.discount}</span> </h5>
                            <h4>FREE Delivery : <span style={{ color: "#111", fontWeight: "600" }}>Oct 8 - 21</span> Details</h4>
                            <p style={{ color: "#111" }}>Fastest delivery: <span style={{ color: "#111", fontWeight: "600" }}> Tomorrow 11AM</span></p>
                        </div>
                    <p className="description">About the Item : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>{inddata.description}</span></p>
                </div>
                <ToastContainer />
            </div>
        
        } 

            <div className="circle">
                <CircularProgress />
                <h2> Loading....</h2>
            </div> : ""
        </div>
    )
}

export default Cart



