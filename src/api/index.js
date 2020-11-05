const BASE = "http://strangers-things.herokuapp.com/api/2007-LSU-RM-WEB-PT"

function setToken(token) {
  localStorage.setItem('bearer-token', token);
}

function getToken() {
  return localStorage.getItem('bearer-token');
}

// write functions like
// registerUser -> make request, when JSON comes back, store that token using setToken
// signIn
// fetchPosts
// createPost -> n eeds a bearer token,so use getToken() before making fetch request so you can build the correct header...
// 

// each of these should be async, should make a valid call to an endpoint, possibly setting the correct header...