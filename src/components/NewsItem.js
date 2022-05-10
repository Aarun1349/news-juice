import React, { Component } from "react";

const NewsItem = (props) => {
  let { title, description, imageurl, newsurl, author, publishedAt } = props;
  return (
    <div>
      <div className="card">
        <img
          src={
            !imageurl
              ? "https://images.hindustantimes.com/img/2022/04/16/1600x900/Image_3_1650080587180_1650080597371.jpg"
              : imageurl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description.slice(0, 60)}</p>
          <p className="card-text">
            <small className="text-muted">
              By {author ? author : "Unknown"} on{" "}
              {new Date(publishedAt).toGMTString().slice(0, 17)}
            </small>
          </p>
          <a href={newsurl} className="btn btn-dark">
            Read More...
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
