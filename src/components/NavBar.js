import React, { useContext } from "react";
import './NavBar.css';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';

const NavBar = (() => {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    const logout = () => {
        localStorage.clear();
        dispatch({ type: "LOGOUT" });
        history.push('/login');
    }

    const navList = () => {
        if (state) {//if the user object is present
            return [
                <li key="11111"><Link to="/create-post">Create Post</Link></li>,
                <li key="11178"><Link to="/postsfromfollowing">Posts from Followings</Link></li>,
                <li key="11122"><Link to="/profile">Profile</Link></li>,
                <li key="112121">
                    <button onClick={() => logout()} className="btn waves-effect waves-light #d32f2f red darken-2">Logout</button>
                </li>
            ]
        } else {
            return [
                <li key="222334"><Link to="/login">Login</Link></li>,
                <li key="433435"><Link to="/signup">Signup</Link></li>
            ]
        }
    }

    return (
        <nav>
          <input type="checkbox" id="check"/>
          <label for="check" className="checkbtn"><i class="fas fa-bars"></i></label>
            <div className="nav-wrapper white">
                <Link to={state ? "/" : "/login"} className="brand-logo">Monstagram</Link>
                <ul id="nav-mobile" className="right">
                    {navList()}
                </ul>
            </div>
        </nav>
    );
})
{/* <FontAwesomeIcon icon="fa-solid fa-bars" /> 
<i class="fas fa-bars"></i>*/}
export default NavBar;