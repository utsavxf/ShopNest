import React, { useContext } from 'react';
import { Logincontext } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Option = ({deletedata,get}) => {


    const { account, setAccount } = useContext(Logincontext)


  const removedata=async(req,res)=>{
         try {
            const res=await fetch(`/remove/${deletedata}`,{
                method:"DELETE",
                headers:{
                    Accept:"application/json",
                    "Content-type":"application/json"
                },
                credentials:"include"
            }) 
  
            const data=await res.json();
            console.log(data);

            if(res.status===400 || !data){
                console.log('error');
                toast.error("error while deleting item",{
                    position:"top-center",
                })
        
            }else{
                console.log('item deleted');
                get();  //vo getdata waala function calling again
                setAccount(data);//so that badge value get's updated
                toast.success("item successfully removed",{
                    position:"top-center",
                })
                
            }

         } catch (error) {
             console.log('Error');
             
         }
  }



    return (
        <div className="add_remove_select">
            <select name="" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <p  style={{ cursor: "pointer" }} onClick={()=>removedata(deletedata)} >Delete</p><span>|</span>
            <p className="forremovemedia">Save For Later</p><span>|</span>
            <p className="forremovemedia">See More like this</p>
            <ToastContainer />
        </div>

    )
}

export default Option;