import React, { useState, useEffect, useContext } from 'react';
import './Home.css';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
import {baseurl} from "../config"

function Postsfromfollowing() {

    const [posts, setPosts] = useState([]); //initialize to empty array
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        fetch(baseurl + "/postsfromfollowing", {
            method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => response.json())
            .then(function (data) {
                console.log(data);
                setPosts(data.posts);
            }).catch(error => {
                console.log(error);
            });
    }, []);//we want to lad only once when component is mounting/loading thats why an empty array as dependency
    const likeUnlike = (postId, url) => {
        fetch(baseurl + url, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({ postId: postId })

        })
            .then(response => response.json())
            .then(function (updatedPost) {
                console.log(updatedPost);
                const newPostArr = posts.map((oldPost) => {
                    if (oldPost._id == updatedPost._id) {
                        return updatedPost;
                    } else {
                        return oldPost;
                    }
                });
                setPosts(newPostArr);
            }).catch(error => {
                console.log(error);
            });
    }
    const deletePost = (postId) => {

        fetch(baseurl + `/deletepost/${postId}`, {
            method: "delete",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }

        })
            .then(response => response.json())
            .then(function (deletedPost) {
                console.log("deletedPost = ", deletedPost);
                const newPostArr = posts.filter((oldPost) => {
                    return oldPost._id !== deletedPost.result._id //return the post whose id dont match the deleted id
                });
                setPosts(newPostArr);
            }).catch(error => {
                console.log(error);
            });
    }
    const submitComment = (event, postId) => {
        event.preventDefault();//avaoid the page refresh
        const commentText = event.target[0].value;

        fetch(baseurl + "/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({ commentText: commentText, postId: postId })

        })
            .then(response => response.json())
            .then(function (updatedPost) {
                console.log(updatedPost);
                const newPostArr = posts.map((oldPost) => {
                    if (oldPost._id == updatedPost._id) {
                        return updatedPost;
                    } else {
                        return oldPost;
                    }
                });
                setPosts(newPostArr);
            }).catch(error => {
                console.log(error);
            });
    }
    return (
        <div className="home-container">
            {
                posts.map((post) => {
                    return (
                        <div className="card home-card" key={post._id}>
                            <h5 style={{ padding: "10px" }}>
                                <img className="profilePic" src={post.author.profilePicUrl} alt="Profile picture" />
                                <Link to={post.author._id !== state._id ? "/profile/" + post.author._id : "/profile"}>{post.author.fullName}</Link>

                                {post.author._id == state._id
                                    && <i onClick={() => deletePost(post._id)}
                                        style={{ color: "red", cursor: "pointer", float: "right", fontSize: "34px" }}
                                        className="material-icons">delete_forever</i>}
                            </h5>
                            <div className="card-image">
                                <img src={post.image} />
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{ color: "red", marginRight: "10px" }}>favorite</i>
                                {
                                    post.likes.includes(state._id)
                                        ? <i onClick={() => likeUnlike(post._id, '/unlike')}
                                            className="material-icons"
                                            style={{ color: "red", cursor: "pointer" }}>thumb_down</i>
                                        : <i onClick={() => likeUnlike(post._id, '/like')}
                                            className="material-icons"
                                            style={{
                                                color: "blue",
                                                marginRight: "10px", cursor: "pointer"
                                            }}>thumb_up</i>
                                }

                                <h6>{post.likes.length} likes</h6>
                                <h6>{post.title}</h6>
                                <p>{post.body}</p>
                                {
                                    post.comments.length > 0
                                        ? <h6 style={{ fontWeight: "600" }}>All Comments</h6>
                                        : ""
                                }

                                {
                                    post.comments.map((comment) => {
                                        return (<h6 key={post._id}>
                                            <img className="profilePic" src={comment.commentedBy.profilePicUrl} alt="Profile picture" />
                                            <span style={{ fontWeight: "500", marginRight: "10px" }}>{comment.commentedBy.fullName}</span>
                                            <span>{comment.commentText}</span>
                                        </h6>)
                                    })
                                }
                                <form onSubmit={(event) => { submitComment(event, post._id) }}>
                                    <input type="text" placeholder="Enter comment" />
                                </form>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Postsfromfollowing