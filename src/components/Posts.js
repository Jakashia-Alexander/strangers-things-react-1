import React from 'react';

const Posts = (props) => {
  //need to have a function that lists all the posts on the site
  //we'll somehow need to loop over all the posts and return some form of the template below for each
 return <main className="feature">
 <span className="allPosts">
   <div className="post">
     <h4 className="postTitle">This will the post title</h4> 
      <div className="content">This will be the post content</div>
      <div className='content price'>This will be the thing's price</div>
   </div>
 </span> 
 </main>
}

export default Posts;