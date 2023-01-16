import React from "react";

function BtnConsultation() {
  return (
    <div className="dc-book-consulation">
      <a href="#form">
        <button className="btn-book">
          <div className="btn-initial">
            <div className="btn-image">
              <img
                src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/dc-consult.png"
                alt=""
              />
            </div>
            <p className="btn-text">BOOK A FREE CONSULTATION</p>
          </div>
          <div className="btn-secondary">
            <img
              src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/right-arrow.png"
              alt=""
            />
          </div>
        </button>
      </a>
    </div>
  );
}

export default BtnConsultation;
