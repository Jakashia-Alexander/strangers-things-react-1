import React, { useEffect, useState } from "react";

const Messages = () => {
  const [messageContent, setMessageContent] = useState("");

  return (
    <form
      className="messages"
      onSubmit={async (event) => {
        event.preventDefault();

        if (title.length === 0 || description.length === 0 || price.length === 0) {
          setIsDirty(true);
          return;
        }

        const messageData = {
          message: {
            content
          },
        };

        try {
          const result = await hitAPI("POST", "/posts/" + post._id + "/messages");
          addNewMessage(result.data.message);
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
      <button>SEND MESSAGE</button>
    </form>
  );
};

export default Messages;