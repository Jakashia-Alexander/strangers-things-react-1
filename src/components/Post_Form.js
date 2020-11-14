import React, { useState, useEffect } from "react";

import { hitAPI } from "../api";

const PostForm = (props) => {
  const { addNewPost, _id, setEditablePost, updatePost } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  useEffect(() => {
    setTitle(props.title || "");
    setDescription(props.description || "");
    setPrice(props.price || "");
    setLocation(props.location || "");
    setWillDeliver(props.willDeliver || false);
  }, [_id]);

  function clearForm() {
    setTitle("");
    setDescription("");
    setPrice("");
    setLocation("");
    setWillDeliver(false);
  }

  const [isDirty, setIsDirty] = useState(false);

  return (
    <form
      className="post-form"
      onSubmit={async (event) => {
        event.preventDefault();

        if (
          title.length === 0 ||
          description.length === 0 ||
          price.length === 0
        ) {
          setIsDirty(true);
          return;
        }

        const postData = {
          post: {
            title,
            description,
            price,
            willDeliver,
          },
        };

        if (location.length > 0) {
          postData.post.location = location;
        }

        try {
          if (_id) {
            const result = await hitAPI("PATCH", `/posts/${_id}`, postData);
            const { post } = result;
            post.messages = props.messages;
            updatePost(post);
            setEditablePost({});
          } else {
            const result = await hitAPI("POST", "/posts", postData);
            addNewPost(result.post);
            clearForm();
          }
        } catch (error) {
          console.error(error);
        }
      }}
      style={{
        alignSelf: "flex-start",
        display: "grid",
        gridTemplateColumns: "1fr",
        maxWidth: "480px",
        gap: "8px",
        fontsize: "30px",
      }}
    >
      {_id ? <h3>Update Your Post</h3> : <h3>Whatcha got?</h3>}

      <input
        type="text"
        placeholder="title for your post"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      {isDirty && title.length === 0 ? (
        <h3 style={{ color: "red" }}>You need a title</h3>
      ) : null}
      <textarea
        type="text"
        placeholder="description of the item"
        rows="10"
        columns="80"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <input
        type="text"
        placeholder="requested price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
      <input
        type="text"
        placeholder="location, leave blank for [On Request]"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
      />
      <label>
        <input
          className="checkbox"
          type="checkbox"
          checked={willDeliver}
          onChange={() => setWillDeliver(!willDeliver)}
        />
        I will deliver this
      </label>
      <button>POST IT</button>
    </form>
  );
};

export default PostForm;
