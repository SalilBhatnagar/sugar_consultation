import React from "react";

const Popup = ({ setCount }) => {
  return (
    <div className="thankyou">
      <h3 id="form" className="dc _thankyou">
        Thankyou for contacting <span style={{ fontWeight: 700 }}>Kapiva</span>.
        <br />
        One of our doctors will get back in touch with you soon!
        <br />
        <br /> Have a great day!
      </h3>
      {/* <div className="dc-form-submit">
        <input
          type="Submit"
          value="Return to Main Page"
          onClick={() => setCount(1)}
        />
      </div> */}
    </div>
  );
};

export default Popup;
