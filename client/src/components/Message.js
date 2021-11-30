import React from "react";
import "./Message.css";

export default function Message({ title, variant, link }) {
  if (!title) {
    return null;
  }

  return (
    <div className="message-container">
      <div className={`message-box ${variant}`}>
        <p className="title">
          {title}{" "}
          {link ? (
            <span>
              View details{" "}
              <a href={link} target="_blank" rel="noreferrer noopener">
                here
              </a>
              .
            </span>
          ) : (
            <></>
          )}
        </p>
      </div>
    </div>
  );
}
