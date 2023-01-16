import React, { useEffect, useState } from "react";

const Queries = ({ ques, ans, val }) => {
  var count = 1;

  const dropdown = (id) => {
    let qa = id.split("-")[1];
    counter(qa);
  };

  const counter = (qa) => {
    count += 1;
    if (count % 2 === 0) {
      // console.log(qa);
      document.getElementById(`result-${qa}`).style.display = "block";
      document.getElementById(`review-${qa}`).style.backgroundImage =
        " url('https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/up-arrow.png') ";
    } else {
      // console.log(qa);
      document.getElementById(`result-${qa}`).style.display = "none";
      document.getElementById(`review-${qa}`).style.backgroundImage =
        " url('https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/down-arrow.png') ";
    }
  };

  return (
    <div className="review">
      <p
        className="question"
        id={`review-${val}`}
        onClick={(event) => dropdown(event.target.id)}
      >
        {ques}
      </p>
      <p className="answer" style={{ display: "none" }} id={`result-${val}`}>
        {ans}
      </p>
    </div>
  );
};

export default Queries;
