import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import logo from '../logo.png';
import cartIcon from '../cartIcon.svg';
import Loading from './Loading';

// export default class Navbar extends Component {
const Navbar = (props) => {
    // render() {
        const [editName, setEditName] = useState(false)
        const [displayName, setdisplayName] = useState(props.user?.displayName)

        const inputStyle = {
            backgroundColor: 'grey',
            border: 'none',
            width: ((displayName.length + 6) * 8) + 'px',
            outline: 'none',
        }

        return (
            <div className="navbar">
                <Link className='nav-logo' to="/">
                    <img width="100%" className="logo" src={logo} alt="logo"/>
                </Link>
                {props.user?
                    <div className="dropper">
                        <h4>Hi {editName?
                        <>
                            <input type='search'
                                style={inputStyle}
                                value={displayName}
                                onBlur={() => {
                                    setdisplayName(props.user?.displayName)
                                    setEditName(false)
                                }}
                                onChange={e => setdisplayName(e.target.value)}
                                onKeyPress={e => {e.target.style.width = ((e.target.value.length + 1) * 8) + 'px'}}
                                autoFocus
                            />
                                <img 
                                    onClick={() => {
                                        if(displayName!==props.user.displayName) props.updateName(displayName)
                                        setEditName(false)
                                    }}
                                    src="https://img.icons8.com/emoji/16/26e07f/check-mark-emoji.png"
                                    alt=''
                                />
                            </>:
                            <span>{props.user?.displayName} <img onClick={() => setEditName(true)} src="https://img.icons8.com/android/16/fa314a/edit.png" alt=''/></span>}
                        </h4>
                        <div className="nav-dropdown">
                            <Link className="navlink" to="/signin" onClick={() => {props.startLogOut()}}>
                                Sign Out
                            </Link>
                        </div>
                    </div>
                    :<div className="dropper">
                        <h4>Hi Guest</h4>
                        <Link className="navlink" to="/signin" >Sign In</Link> OR <Link className="navlink" to="/signup">
                            Sign Up
                        </Link>
                    </div>}
                {(props.orders && Object.keys(props.orders).length > 0)?<Link className="link" to="/orders" ><b>Orders</b></Link>:""}
                <div  className="nav-cart-link">
                    {props.cartLoading?<Loading/>:""}
                    <Link to="/cart">
                        {/* <img src="https://img.icons8.com/fluent/48/000000/fast-cart.png" alt="cart-icon"/> */}
                        <img className='cart-icon' src={cartIcon} alt="carticon"/>
                        <span id="cart-count">
                            {props.cart?.reduce((a,c) => a+c.count, 0) || ""}
                        </span>
                    </Link>
                </div>
            </div>
        )
    // }
}

export default Navbar