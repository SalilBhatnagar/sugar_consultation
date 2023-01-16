import { set } from "date-fns";
import React from "react";
import styled from "styled-components";

const DoctorCard = (setContent) => {
  styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 250px;
    width: 100%;
    background-color: #00008b;
    color: #fff;
    margin: 0 15px;
    font-size: 4em;
  `;
  return (
    <div className="dc-card">
      <div className="dc-card-mobile">
        <div className="doctor-image">
          <img
            src="https://cdn11.bigcommerce.com/s-2qk49wb9fq/content/health-tech-doc-consult/img/image.png"
            alt="Doctor Image"
          />
        </div>
        <div className="mobile-detail">
          <h2 className="doctor-name">Dr. Anand R Dwivedi</h2>
          <p className="doctor-detail">
            Ayurvedacharya, Mumbai University, 1987.
            <div className="doctor-experience">
              <p>
                <span className="green">Years of Experience</span>: 34 Yrs
              </p>
              <p>
                <span className="green">Specialization</span>: Diabetes, Skin &
                Hair
              </p>
              <p>
                <span className="green">Languages</span>: Hindi, English &
                Marathi
              </p>
            </div>
          </p>
        </div>
      </div>
      <p className="doctor-info">
        Dr. Anand R Dwivedi has been practicing Ayurveda since 1988. He has a
        special interest in the treatment of chronic illnesses with the help of
        Ayurveda. He has been associated with Kapiva since 2015, helping people
        lead a well-balanced lifestyle through his deep knowledge of Ayurveda.
      </p>
    </div>
  );
};

export default DoctorCard;
