import React from "react";

function Treatments() {
  return (
    <>
      <div className="treatment">
        <div className="treatment-image">
          <img
            src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/icon/ayruvedic.png"
            alt=""
          />
        </div>
        <h1 className="treatment-count">100+</h1>
        <p className="treatment-text">Years of Ayurvedic experience</p>
      </div>
      <div className="treatment">
        <div className="treatment-image">
          <img
            className="mobile-width"
            src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/icon/consultation.png"
            alt=""
          />
        </div>
        <h1 className="treatment-count">40,000+</h1>
        <p className="treatment-text">Successful online consultations</p>
      </div>
      <div className="treatment">
        <div className="treatment-image">
          <img
            src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/icon/treatment.png"
            alt=""
          />
        </div>
        <h1 className="treatment-count">200+</h1>
        <p className="treatment-text">Highly qualified doctors empanelled</p>
      </div>
      <div className="treatment ">
        <div className="treatment-image">
          <img
            src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/icon/doctors.png"
            alt=""
            className="mobile-width"
          />
        </div>
        <h1 className="treatment-count">90+</h1>
        <p className="treatment-text">Disease Treatment Available</p>
      </div>
    </>
  );
}

export default Treatments;
