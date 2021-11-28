import React from "react";
import "./Message.css";

export default function Message({ title, variant = "success" }) {
  if (!title) {
    return null;
  }

  return (
    <div className="message-container">
      <div className={`message-box ${variant}`}>
        <p className="title">{title}</p>
      </div>
    </div>
  );
}
