import { setMilliseconds } from "date-fns";
import React from "react";

export default function Header() {
  function ff() {
    window.location.href = "http://www.kapiva.in";
  }
  return (
    <div className="dc-header">
      <img
        src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/kapiva-logo.svg"
        onClick={() => ff()}
      />
    </div>
  );
}
