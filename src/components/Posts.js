import { React, useState } from "react";

import { hitAPI } from "../api";
import {Messages} from "./index";

const Posts = (props) => {
  const allPost = props.postList;
  const filterTerm = props.filterTerm;
  const setPostList = props.setPostList;

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
              {!post.isAuthor ? 
              <button className="messageButton" onClick={() =>
                  <Messages />
                }
              >SEND A MESSAGE ABOUT THIS ITEM</button> 
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

                  {/* <div className="messages">
                    {post.messages.map((message, index) => {
                      <>
                        <p>{message[index].fromUser.username}</p>
                        <p>{message[index].content}</p>
                      </>
                    })}
                  </div> */}
                </>
              )}


            </div>
          );
        })}
    </div>
  );
}


export default Posts;
