import React from 'react'
import { useEffect,useState } from 'react';

const Subtotal = ({iteam}) => {
    const [price, setPrice] = useState(0);

    useEffect(() => {
        totalAmount();
    }, [iteam]);

    const totalAmount = () => {
        let sum = 0
        iteam.map((item) => {
            sum = item.price.cost+sum;
        });
        setPrice(sum)

        
    }

    return (
        <div className="sub_item">
            <h3> Subtotal ({iteam.length} items):<strong style={{ fontWeight: "700", color: "#111" }}> ₹{price}</strong></h3>
        </div>
    )
}

export default Subtotal



//TIMEER::2:34:52  FIRST DO DSA 4-5 HRS THEN COME BACK TO THIS ,WE COULD SAY IT'S A WIN,WRAPPING UP MERNSTACK IN THIS WEEK ONLY ALSO FIRST THINGS FIRST INCREASE COOKIE EXPIRY TIME