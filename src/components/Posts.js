import { React, useState } from "react";

const Posts = (props) => {
  const allPost = props.postList;
  const filterTerm = props.filterTerm;

  // allPost.filter(post =>{ return post.title.includes(filterTerm) || post.description.includes(filterTerm) }).map()

  return (
    <div>
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
                {post.title} ({post.location})
              </h5>
              <p>{post.description}</p>
              <p>{post.willDeliver}</p>
              <p>{post.price}</p>
              <p>{post.createdAt}</p>
              {!post.isAuthor ? null : (
                <>
                  <button
                    onClick={() => {
                      allPost.filter((post) => {
                        return post._id; //pick up here...figure out how to access the active and make it false
                      });
                    }}
                  >
                    DELETE
                  </button>

                  <div className="messages">
                    {post.messages.map((message, index) => {
                      <>
                        <p>{message[index].fromUser.username}</p>
                        <p>{message[index].content}</p>
                      </>;
                    })}
                  </div>
                </>
              )}
              ;
            </div>
          );
        })}
    </div>
  );
};

export default Posts;
