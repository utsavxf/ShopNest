import React, { useContext, useEffect, useState } from 'react'
import "./Navbar.css"
import logo from "../../images/amazon_PNG25.png"
import SearchIcon from '@mui/icons-material/Search'
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { NavLink, useNavigate } from 'react-router-dom';
import { Logincontext } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';
// import { makeStyles } from '@material-ui/core';
import { Drawer, IconButton, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Rightheader from './Rightheader';
import { getProducts } from '../redux/actions/action';
import { useSelector, useDispatch } from "react-redux";




const Navbar = () => {



    const { account, setAccount } = useContext(Logincontext)
    //   console.log(account);

    const history = useNavigate();

    const [dropen, setDropen] = useState(false)

    const [open, setOpen] = useState(false);  //menu ke liye logout waala 

 
    // ab search bar waali functionality
    const [text,setText]=useState("");
    const [liopen,setLiopen]=useState(true);

    const {products} =useSelector(state=>state.getproductsdata)

    const getText=(items)=>{
        setText(items);
        // console.log(items);
        setLiopen(false)
        
    }
   


    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };
    const handleClose = () => {
        setOpen(false)
    };



    const getdetailsvaliduser = async () => {
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const data = await res.json();
        // console.log(data);

        if (res.status !== 201) {
            console.log("first login");
        } else {
            // console.log("cart add ho gya hain");
            setAccount(data);
        }
    }

    const logoutuser = async () => {
        const res2 = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const data2 = await res2.json();
        // console.log(data);

        if (res2.status !== 201) {
            console.log("first login");
        } else {
            // console.log("cart add ho gya hain");
            setAccount(false);
            setOpen(false);
            toast.success("user Logout 😃!", {
                position: "top-center"
            });
            history("/");
        }
    }


    const handelopen = () => {
        setDropen(true);
    }

    const handledrclose = () => {
        setDropen(false)
    }

    useEffect(() => {
        getdetailsvaliduser();
    }, []);



    return (
        <header>
            <nav>
                <div className="left">
                    <IconButton className="hamburgur" onClick={handelopen}>
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>
                    {/* here define the right header */}
                    <Drawer open={dropen} onClose={handledrclose} >
                        <Rightheader logclose={handledrclose} logout={logoutuser} />
                    </Drawer>
                    <div className="navlogo">
                        <NavLink to="/"> <img src={logo} alt="logo" /> </NavLink>
                    </div>
                    <div className="nav_searchbaar">
                    <input type="text" name=""
                        onChange={(e) => getText(e.target.value)}
                        placeholder="Search Your Products" />
                    <div className="search_icon">
                        {/* <i className="fas fa-search" id="search"></i> */}
                        <SearchIcon/>
                    </div>
                    {
                        text &&
                        <List className="extrasearch" hidden={liopen}>
                            {
                                products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                    <ListItem>
                                        <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                                            {product.title.longTitle}
                                        </NavLink>
                                    </ListItem>
                                ))
                            }
                        </List>
                    }
                </div>
                </div>
                <div className="right">
                    <div className="nav_btn">
                        <NavLink to="/login">Sign in</NavLink>
                    </div>
                    {
                        account ? <NavLink to="/buynow">
                            <div className="cart_btn">
                                <Badge badgeContent={account.carts.length} color="secondary">
                                    {/* <i className="fas fa shopping-cart" id="icon"></i> */}
                                    <ShoppingCartIcon />
                                    {/* <img src={logo} alt="" /> */}
                                </Badge>

                                <p>Cart</p>
                            </div>
                        </NavLink> : <NavLink to="/login">
                            <div className="cart_btn">
                                <Badge badgeContent={0} color="secondary">
                                    {/* <i className="fas fa-shopping-cart" id="icon"></i> */}
                                    <ShoppingCartIcon />
                                </Badge>
                                <p>Cart</p>
                            </div>
                        </NavLink>
                    }

                    {
                        account ?
                            <Avatar className="avtar2" onClick={handleClick}
                                title={account.fname.toUpperCase()}>{account.fname[0].toUpperCase()}</Avatar> :
                            <Avatar className="avtar"
                                onClick={handleClick} />
                    }

                    <div className="menu_div">
                        <Menu
                            anchorEl={open}
                            open={Boolean(open)}
                            onClose={handleClose}
                        // className={classes.component}
                        >
                            <MenuItem onClick={handleClose} style={{ margin: 10 }}>My account</MenuItem>
                            {account ? <MenuItem onClick={() => {
                                handleClose();
                                logoutuser();
                            }} style={{ margin: 10 }} ><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />   Logout</MenuItem> : ""}
                        </Menu>
                    </div>
                    <ToastContainer />
                </div>
            </nav>
        </header>
    )
}

export default Navbar
