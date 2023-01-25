import React, { useState, useEffect } from 'react';
import "./CreatePost.css";
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';
import {baseurl} from "../config"



function CreatePost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const history = useHistory();
    

    useEffect(() => {
      if (image) {//only call when the value of image exist
          //call to create post api
          fetch(baseurl + "/createpost", {
              method: "post",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + localStorage.getItem("token")
              },
              body: JSON.stringify({
                  title: title,
                  body: body,
                  image: image
              })
          })
              .then(response => response.json())
              .then(function (data) {
                  if (data.error) {
                      M.toast({ html: data.error, classes: "#c62828 red darken-3" });
                  }
                  else {
                      M.toast({ html: "Post created successfully!", classes: "#388e3c green darken-2" });
                      history.push('/');
                  }
              }).catch(error => {
                  console.log(error);
              })
      }
  }, [image]);//only call when the value of image changes


    const submitPost = () => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "monsta-app");
      formData.append("cloud_name", "monstagramapp");

      fetch("https://api.cloudinary.com/v1_1/monstagramapp/image/upload", {
          method: "post",
          body: formData
      }).then(response => response.json())
          .then(data => {
              setImage(data.url);
              console.log(data);

          })
          .catch(error => console.log(error));
  }
 
  return (
    <div className='card create-post-container'>
       <input 
       value={title}
       onChange={(event) => setTitle(event.target.value)}
       type="text" placeholder="post title"/>

       <input
       value={body}
      onChange={(event) => setBody(event.target.value)}
       type="text" placeholder="post content"/>

       <div className="file-field input-field">
       <div className="btn">
        <span>Upload Post Image</span>
        <input type="file" onChange={(event) => setImage(event.target.files[0])}/> 
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
    <button onClick={() => submitPost()} className="btn waves-effect waves-light btn-large #64b5f6 blue darken-1">Submit Post</button>
</div>
  )
}



export default CreatePost