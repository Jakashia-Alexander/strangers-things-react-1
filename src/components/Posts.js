import { React, useState } from "react";

import { hitAPI } from "../api";
import {MessageForm} from "./index";
import { getToken } from "../api";

const Posts = (props) => {
  const allPost = props.postList;
  const filterTerm = props.filterTerm;
  const setPostList = props.setPostList;
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken())

  // allPost.filter(post =>{ return post.title.includes(filterTerm) || post.description.includes(filterTerm) }).map()

  return (
    <div className="posts">
      {allPost
        .filter((post) => {
          return (
            post.title.toLowerCase().includes(filterTerm.toLowerCase()) ||
            post.description.toLowerCase().includes(filterTerm.toLowerCase())
          );
        })
        .reverse()
        .map((post, idx) => {
          return (
            <div
              className="post"
              key={idx}
              style={{
                border: post.isAuthor ? "5px solid gold" : "1px solid brown",
              }}
            >
              <h5 className="post-title">
                {post.title}
              </h5>
              <h4 className="post-location">{post.location}</h4>
              <p><strong>Posted by:</strong> {post.author.username}</p>
              <p><strong>Description:</strong>{post.description}</p>
              {post.willDeliver ? <p>{post.willDeliver}</p> : null}
              <p><strong>Price:</strong> {post.price}</p>
              <p><strong>Posted on:</strong>{post.createdAt}</p>
              {
                !post.isAuthor && isLoggedIn ?
                <MessageForm postId={ post._id } />
                : null
              }
              {!post.isAuthor && isLoggedIn ? // COME BACK TO THIS!! FIGURE OUT WHY MESSAGE BUTTON SHOWS UP WHEN NOT LOGGED IN!!!
              null 
              :
               (
                <>
                  <button
                    className="deletePost"
                    onClick={async () => {
                      await hitAPI("DELETE", "/posts/" + post._id)
                      const data = await hitAPI("GET", "/posts")
                      const {posts} = data;
                      setPostList(posts);
                    }}
                  >
                    DELETE
                  </button>

                 {post.isAuthor ? <div className="messageInbox">
                   <h3>MESSAGES BELOW HERE</h3>
                    {post.messages.map((message) => {
                      console.log(post.messages)
                      return <>
                        <p>{message.fromUser.username}: {message.content}</p>
                        
                      </>
                    })}
                   </div> : null} 
                </>
              )}


            </div>
          );
        })}
    </div>
  );
}


export default Posts;
