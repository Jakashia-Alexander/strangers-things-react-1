import { React, useState, useEffect } from "react";

import { hitAPI } from "../api";
import { MessageForm } from "./index";
import { getToken } from "../api";

const Posts = (props) => {
  const allPost = props.postList;
  const filterTerm = props.filterTerm;
  const setPostList = props.setPostList;
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const { postList, setEditablePost } = props;

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
          console.log("Post:", idx, post.willDeliver);
          return (
            <div
              className="post"
              key={idx}
              style={{
                border: post.isAuthor ? "5px solid gold" : "1px solid brown",
              }}
            >
              <h5 className="post-title">{post.title}</h5>
              <h4 className="post-location">{post.location}</h4>
              <p>
                <strong>Posted by:</strong> {post.author.username}
              </p>
              <p>
                <strong>Description:</strong>
                {post.description}
              </p>
              <p>
                <strong>Price:</strong> {post.price}
              </p>
              <p>
                <strong>Posted on:</strong>
                {post.createdAt}
              </p>
              <p>{post.willDeliver}</p>
              {post.isAuthor ? (
                <button
                  className="edit"
                  onClick={() => {
                    setEditablePost(post);
                  }}
                >
                  EDIT
                </button>
              ) : null}

              {!post.isAuthor && isLoggedIn ? (
                <MessageForm postId={post._id} />
              ) : null}

              {post.isAuthor && isLoggedIn ? (
                <>
                  <button
                    className="deletePost"
                    onClick={async () => {
                      await hitAPI("DELETE", "/posts/" + post._id);
                      const data = await hitAPI("GET", "/posts");
                      const { posts } = data;
                      setPostList(posts);
                    }}
                  >
                    DELETE
                  </button>{" "}
                </>
              ) : null}

              {post.isAuthor && isLoggedIn ? (
                <div className="messageInbox">
                  <h3>Messages Received About This Item:</h3>
                  {post.messages.map((message) => {
                    return (
                      <>
                        <p>
                          {message.fromUser.username}: {message.content}
                        </p>
                      </>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
    </div>
  );
};

export default Posts;
