import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { getToken, clearToken, hitAPI } from "./api";
import {Auth, Title, Posts, Search} from "./components";


const App = () => {
  // a piece of state that represents the status of the current user
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [postList, setPostList] = useState([]);
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    hitAPI("GET", "/posts")
      .then((data) => {
        const { posts } = data;
        setPostList(posts);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  return (
    <div className="app">
      <Title />
      <Search filterTerm={ filterTerm } setFilterTerm={ setFilterTerm } />
      <Posts 
       postList={postList} filterTerm={ filterTerm } />
      {isLoggedIn ? (
        <>
          <h1>Thanks for logging in!</h1>
          <button
            onClick={() => {
              clearToken();
              setIsLoggedIn(false);
            }}
          >
            LOG OUT
          </button>
        </>
      ) : (
        <Auth setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));