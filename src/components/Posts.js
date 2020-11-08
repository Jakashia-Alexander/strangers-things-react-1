import { React, useState } from "react";

const Posts = (props) => {
  const allPost = props.postList;
  const filterTerm = props.filterTerm;

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
              {!post.isAuthor ? null : (
                <>
                  <button
                    className="deletePost"
                    onClick={() => {
                      allPost.filter((post) => {
                        return post._id //pick up here...figure out how to access the active and make it false
                      })
                    }}
                  >
                    DELETE
                  </button>

                  <div className="messages">
                    {post.messages.map((message, index) => {
                      <>
                        <p>{message[index].fromUser.username}</p>
                        <p>{message[index].content}</p>
                      </>
                    })}
                  </div>
                </>
              )}
              
            </div>
          );
        })}
    </div>
  );
};

export default Posts;
