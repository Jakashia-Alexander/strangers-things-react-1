import React, { useState } from "react";

import {hitAPI} from "../api";

const MessageForm = (props) => {
  const [messageContent, setMessageContent] = useState("");
  const postId = props.postId;

  return (
    <form
      className="messages"
     
      style={{
        alignSelf: "flex-start",
        display: "grid",
        gridTemplateColumns: "1fr",
        maxWidth: "480px",
        gap: "8px",
      }}
    >
     <h3>Messages</h3>
      <textarea
        type="text"
        placeholder="message content"
        rows="10"
        columns="80"
        value={messageContent}
        onChange={(event) => setMessageContent(event.target.value)}
      />
      <button onClick={async (event) => {
        event.preventDefault();

        const messageData = {
          message: {
            content: messageContent
          },
        };

        try {
          await hitAPI("POST", "/posts/" + postId + "/messages", messageData);
          setMessageContent('');
        } catch (error) {
          console.error(error);
        }
      }}> SEND MESSAGE</button>
    </form>
  );
};

export default MessageForm;