import React, { useEffect, useState, useContext } from 'react'
import './Profile.css';
import { UserContext } from '../App';
import {baseurl} from "../config"

function Profile() {

    const [myposts, setMyposts] = useState([]);
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {

        fetch(baseurl + "/myposts", {
            method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => response.json())
            .then(function (data) {
                console.log(data);
                setMyposts(data.posts);
            }).catch(error => {
                console.log(error);
            });
    }, []);//we want to lad only once when component is mounting/loading thats why an empty array as dependency
    return (
        <div className="main-container">
            <div className="profile-container">
                <div>
                    <img style={{ width: "166px", height: "166px", borderRadius: "83px" }}
                        src={state ? state.profilePicUrl : "Loading..."}
                    />
                </div>
                <div className="details-section">
                    <h4>{state ? state.fullName : "Loading..."}</h4>
                    <h5>{state ? state.email : "Loading..."}</h5>
                    <div className="followings">
                        <h6>{myposts.length} posts</h6>
                        <h6>{state && state.hasOwnProperty('followers') ? state.followers.length : 0} followers</h6>
                        <h6>{state && state.hasOwnProperty('following') ? state.following.length : 0} following</h6>
                    </div>
                </div>
            </div>
            <div className="posts">
                {
                    myposts.map((post) => {
                        return (
                            <img src={post.image} className="post" alt={post.title} key={post._id} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile