
//we will be using redux thunks to create asynchronous logic


export const getProducts = ()=> async(dispatch)=>{
    try {
        const data = await fetch("/getproducts",{
                method:"GET",
                headers:{ 
                    "Content-Type":"application/json"
                }
        });

        const res = await data.json();
        // console.log(res);
        dispatch({type:"SUCCESS_GET_PRODUCTS",payload:res});
    } catch (error) {
        dispatch({type:"FAIL_GET_PRODUCTS",payload:error.response});
    }
}

//now what we are doing here is fetching data and according to response ,sending it to reducer 

// Yes, after the getProducts function dispatches an action, the action will be handled by a reducer in your Redux store. The reducer will update the state of the store based on the type of action that was dispatched.