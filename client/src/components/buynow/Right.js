import React, { useEffect, useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useHistory } from 'react-router';
import {loadStripe} from '@stripe/stripe-js'

const Right = ({iteam}) => {


    const [price, setPrice] = useState(0);
    

     useEffect(()=>{
          totalAmount();
          console.log(iteam);
          
     },[iteam])

    //stripe integration
    const makePayment = async()=>{
        
        const stripe = await loadStripe("pk_test_51ORrsYSDu5hfD3NQjTXG8PE0q6Tn8O7eYd7ph7LaRnFAFJjOZQ7caKKbfG2u7iLVARpfpHrGQ4ZLsNX4Pc00eUE200A8tByLtp");

        const body = {
            products:iteam
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
     

    const totalAmount = () => {
        let sum = 0;
        iteam.map((item) => {
            sum += item.price.cost
        });
        setPrice(sum)
        // console.log(price);
        
    }


    return (
        <div className="right_buy">
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="rightimg" />
            <div className="cost_right">
                <p>Your order is eligible for FREE Delivery. <br />
                    <span style={{ color: "#565959" }}> Select this option at checkout. Details</span></p>
                <h3> Subtotal({iteam.length}) items  <span style={{ fontWeight: "700" }}> ₹{price}.00</span></h3>
                <button className="rightbuy_btn" onClick={makePayment}>Proceed to Buy</button>
                <div className="emi">
                    Emi available
                    {/* {!val ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
                </div>
                <span className="show"> Your order qualifies for EMI with valid credit cards (not available on purchase of Gold,
                    Jewelry  Gift cards and Amazon pay balance top up). Learn more</span>
            </div>
        </div>
    )
}

export default Right;