import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { getToken, clearToken, hitAPI } from "./api";
import { Auth, Title, Posts, Search, Post_Form } from "./components";

const App = () => {
  // a piece of state that represents the status of the current user
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [postList, setPostList] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [viewMessages, setViewMessages] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [editablePost, setEditablePost] = useState({});

  function addNewPost(newPost) {
    setPostList([...postList, newPost]);
  }

  function updatePost(updatedPost) {
    let index = postList.findIndex((post) => {
      return post._id === updatedPost._id;
    });

    if (index > -1) {
      let postListCopy = [...postList];
      postListCopy[index] = updatedPost;
      setPostList(postListCopy);
    }
  }


  function removePost(post) {
    setPostList(
      postList.filter(x => x !== post)
    )
  }

  function addNewMessage(newMessage) {
    setMessageList([...messageList, newMessage]);
  }

  useEffect(() => {
    hitAPI("GET", "/posts")
      .then((data) => {
        const { posts } = data;
        setPostList(posts);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      setUserMessages([]);
      return;
    }

    hitAPI("get", "/users/me")
      .then((data) => {
        const { messages } = data;
        setUserMessages(messages);
      })
      .catch(console.error);
  }, [isLoggedIn]);


  return (
    <div className="app">
      <Title />
      <Search filterTerm={filterTerm} setFilterTerm={setFilterTerm} />
      <Posts postList={ postList } setPostList={ setPostList } filterTerm={ filterTerm } setEditablePost={ setEditablePost } />
      {isLoggedIn ? (
        <>
          <div className="logout">
            <h1 className="loginMessage">Thanks for logging in!</h1>
            <span>
              <button
                className="logoutButton"
                onClick={() => {
                  clearToken();
                  setIsLoggedIn(false);
                  window.location.reload(false);
                }}
              >
                LOG OUT
              </button>
            </span>
          </div>
        </>
      ) : (
        <Auth setIsLoggedIn={setIsLoggedIn} />
      )}
      {isLoggedIn ? <> 
        <Post_Form addNewPost={addNewPost} updatePost={updatePost} {...editablePost} setEditablePost={setEditablePost} /> 
         </> 
        : null}

    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));


