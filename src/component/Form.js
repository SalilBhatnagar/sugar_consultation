import React, { useState, useEffect } from "react";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Grid, TextField } from "@mui/material";
import validator from "validator";
import axios from "axios";
import {
  convertTime12to24,
  convertTime12to24fornowTime,
  convertAmpm,
  getDateFormat,
  endTime,
} from "../utils/common";
import Alerts from "./Alerts";

const Form = ({ appointments, UtmMedium, UtmSorce, token, setCount }) => {
  const [value, setValue] = useState(new Date());
  const [submit, setSubmit] = useState("BOOK NOW");
  const [fade, setFade] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [alerts, setAlerts] = useState("");
  const [displayAlert, setDisplayAlert] = useState(false);
  const [serviceId, setServiceID] = useState(""); //eslint-disable-line
  const [slots, setSlots] = useState([]);
  const [slot_id, setSlot_id] = useState("");
  const [endDate, setEndDate] = useState("");
  const [allValues, setAllValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    // comment: "",
    time: "",
  });
  let slot_list = [];
  let futureDate = new Date();
  const pattern = /^(d{3})s*d{3}(?:-|s*)d{4}$/;
  const todayTime = new Date();
  let date2 = value;
  let date1 = new Date();
  let diffDays = date2.getDate() - date1.getDate();
  let diffYears = date2.getFullYear() - date1.getFullYear();
  futureDate.setDate(futureDate.getDate() + 14);
  let hours = todayTime.getHours();
  hours = ("0" + hours).slice(-2);
  let minutes = todayTime.getMinutes();
  minutes = ("0" + minutes).slice(-2);
  let nowTime = `${hours}:${minutes}`;
  let endindex = "";
  const changeHandler = (e) => {
    // if (e.target.name == "time") {
    //   setAllValues({
    //     ...allValues,
    //     [e.target.name]: e.target.value.substring(0, 5),
    //   });
    // } else {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
    // }
  };

  const setService = (service) => {
    setServiceID(service);
    axios
      .get("https://kapiva.app/api/get_availability_slots.php", {
        params: { service_id: service },
      })
      .then((resposnse) => {
        setSlots(resposnse.data);
      });
  };
  function checkData(id) {
    // var radios = document.getElementsByTagName("input");
    // for (var i = 0; i < radios.length; i++) {
    //   if (radios[i].type === "radio" && radios[i].checked) {
    //     document.getElementById(`therapy-${id}`).style.border =
    //       "3px solid #80a03c";
    //     document.getElementById(id).style.display = "block";
    //     document.getElementById(id).style.accentColor = "#80a03c";
    //   } else {
    //     document.getElementById(`therapy-${id}`).style.border =
    //       "1px solid black";
    //     document.getElementById(id).style.display = "none";
    //   }
    // }
    // var checkbox = document.getElementById(id);
    // if (checkbox.checked) {
    //   document.getElementById(`therapy-${id}`).style.border =
    //     "3px solid #80a03c";
    //   document.getElementById(id).style.display = "block";
    //   document.getElementById(id).style.accentColor = "#80a03c";
    // } else if (checkbox.checked == +false) {
    //   // document.getElementById(`therapy-${id}`).style.border = "1px solid black";
    //   document.getElementById(id).style.display = "none";
    // }
  }

  const dc_appointment = () => {
    axios.post("https://api.webengage.com/v1/accounts/~15ba20105/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 83ca9bef-1471-4e61-ba2e-4c2fde6e3300",
      },
      data: {
        userId: allValues.email,
        eventName: "dc_appointment_created",
        eventData: {
          Customer_Id: "",
          Phone: "msg.customer.cell_phone",
          Email: "msg.customer.email_id",
          dc_solution_category:
            "msg.payload.appointment_details.data.appointment.service_key",
          dc_appointment_date:
            "msg.payload.appointment_details.data.appointment.start_time",
          dc_appointment_id: "msg.payload.appointment_id",
          dc_appointment_time:
            "msg.payload.appointment_details.data.appointment.start_time",
          dc_doc_id:
            "msg.payload.appointment_details.data.appointment.staff_key",
        },
      },
    });
  };

  const SlotLoot = (timing) => {
    // timing = timing.split("##")[1];
    timing.map((e) => {
      e = e.split("##")[1];
      if (value.toLocaleDateString() === new Date().toLocaleDateString()) {
        if (convertTime12to24fornowTime(nowTime) < convertTime12to24(e)) {
          setFilteredList((fl) => [...fl, e]);
          slot_list.concat(filteredList);
        }
      } else {
        setFilteredList((fl) => [...fl, e]);
      }
    });
  };
  // console.log(allValues.time);

  // endindex = endTime(allValues.time);

  function handleSubmit(event) {
    document.getElementById("submit").disbled = true;
    event.preventDefault();
    if (!serviceId) {
      document.getElementById("service").style = "display: block";
      document.getElementById("service").textContent =
        "Please Select Services...";
    } else if (
      allValues.firstname === "" ||
      /\d/.test(allValues.firstname) === true
    ) {
      document.getElementById("service").style = "display: none";
      document.getElementById("firstname").style = "display : block";
      document.getElementById("firstnameblock").style =
        "border : 1px solid red !important";
    } else if (
      allValues.lastname === "" ||
      /\d/.test(allValues.lastname) === true
    ) {
      document.getElementById("service").style = "display : none";
      document.getElementById("firstname").style = "display : none";
      document.getElementById("firstnameblock").style = "border : none";
      document.getElementById("lastname").style = "display : block";
      document.getElementById("lastnameblock").style =
        "border : 1px solid red !important";
    } else if (
      allValues.contact === "" ||
      allValues.contact.length !== 10 ||
      pattern.test(allValues.contact) ||
      allValues.contact.charAt(0) === "-"
    ) {
      document.getElementById("service").style = "display : none";
      document.getElementById("firstname").style = "display : none";
      document.getElementById("firstnameblock").style = "border : none";
      document.getElementById("lastname").style = "display : none";
      document.getElementById("lastnameblock").style = "border : none";
      document.getElementById("contact").style = "display : block";
      document.getElementById("contactblock").style =
        "border : 1px solid red !important";
    } else if (
      allValues.email === "" ||
      validator.isEmail(allValues.email) !== true
    ) {
      document.getElementById("service").style = "display : none";
      document.getElementById("firstname").style = "display : none";
      document.getElementById("firstnameblock").style = "border : none";
      document.getElementById("lastname").style = "display : none";
      document.getElementById("lastnameblock").style = "border : none";
      document.getElementById("contact").style = "display : none";
      document.getElementById("contactblock").style = "border : none";
      document.getElementById("email").style = "display : block";
      document.getElementById("emailblock").style =
        "border : 1px solid red !important";
      // alert("Please enter valid email");
    } else {
      onChecked();
      document.getElementById("firstname").style = "display : none";
      document.getElementById("firstnameblock").style = "border : none";
      document.getElementById("lastname").style = "display : none";
      document.getElementById("lastnameblock").style = "border : none";
      document.getElementById("email").style = "display : none";
      document.getElementById("emailblock").style = "border : none";
      document.getElementById("contact").style = "display : none";
      document.getElementById("contactblock").style = "border : none";
      // document.getElementById("time").style = "display : none";
      // document.getElementById("timeblock").style = "border : none";
      submitHandler();
    }
  }

  function onChecked() {
    let is_checked = document.getElementById("whatsapp");
    if (is_checked.checked) {
      axios("https://api.webengage.com/v1/accounts/~15ba20105/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 83ca9bef-1471-4e61-ba2e-4c2fde6e3300",
        },
        data: {
          userId: allValues.email,
          eventName: "dc_get_updates_on_whatsapp",
          eventData: { checked: 1 },
        },
      });
    } else {
      axios("https://api.webengage.com/v1/accounts/~15ba20105/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 83ca9bef-1471-4e61-ba2e-4c2fde6e3300",
        },
        data: {
          userId: allValues.email,
          eventName: "dc_get_updates_on_whatsapp",
          eventData: { checked: 0 },
        },
      });
    }
  }

  const submitHandler = () => {
    document.getElementById("submit").disabled = true;
    axios(`https://kapiva.app/api/save_appointment.php`, {
      method: "POST",
      data: {
        // access_token: token,
        first_name: allValues.firstname,
        last_name: allValues.lastname,
        email_id: allValues.email,
        cell_phone: allValues.contact,
        comment: allValues.comment,
        utm_source: UtmSorce,
        utm_medium: UtmMedium,
        service_key: serviceId,
        slot_id: slot_id,
        start_time:
          getDateFormat({ date: value }) +
          "T" +
          convertTime12to24(allValues.time) +
          "Z",
        end_time: getDateFormat({ date: value }) + "T" + endDate + "Z",
      },
    })
      .then((response) => {
        // console.log(response);
        setAlerts(response.data);
        if (response.data.status === "200") {
          setAllValues({
            ...allValues,
            firstname: "",
            lastname: "",
            email: "",
            contact: "",
            comment: "",
            time: "",
          });
          document.querySelector('input[name="check"]:checked').checked = false;
          document.getElementById("time").value = "";
          setCount(0);
          setFilteredList([]);
          setSubmit("Book Now");
        } else {
          setFade(true);
          setDisplayAlert(true);
          setAllValues({
            ...allValues,
            firstname: "",
            lastname: "",
            email: "",
            contact: "",
            comment: "",
            time: "",
          });
          document.querySelector('input[name="check"]:checked').checked = false;
          document.getElementById("time").value = "";
          setFilteredList([]);
          setSubmit("Book Now");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const slotId = (val) => {
    endindex = convertTime12to24(val);
    if (slots) {
      for (const i in slots) {
        if (
          slots[i]["service_slots"]["date"] === getDateFormat({ date: value })
        ) {
          slots[i]["service_slots"].slots.map((d) => {
            if (d.split("##")[1] === val) {
              setSlot_id(d.split("##")[0]);
              setEndDate(endTime(endindex));
            }
          });
        }
      }
    }
  };

  useEffect(() => {
    if (slots) {
      for (const i in slots) {
        if (
          slots[i]["service_slots"]["date"] === getDateFormat({ date: value })
        ) {
          setFilteredList([]);
          SlotLoot(slots[i]["service_slots"].slots);
          break;
        }
      }
    }
  }, [slots, value]);

  return (
    <>
      {displayAlert === true && (
        <div className="alert_background">
          <div className="dc-alerts">
            <Alerts
              alerts={alerts}
              fade={fade}
              setDisplayAlert={setDisplayAlert}
              setFade={setFade}
            />
          </div>
        </div>
      )}
      <form id="form" className="row g-3" onSubmit={handleSubmit}>
        <h3>Step 1: Personal Details</h3>
        {/* <div className="dc-form">
          <div>
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              id="firstnameblock"
              value={allValues.firstname}
              onChange={changeHandler}
              required
            />
            <p className="error" id="firstname">
              Enter Valid First Name...
            </p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              id="lastnameblock"
              value={allValues.lastname}
              onChange={changeHandler}
              required
            />
            <p className="error" id="lastname">
              Enter Valid Last Name...
            </p>
          </div>
          <div>
            <input
              type="number"
              maxLength="10"
              placeholder="Phone No"
              name="contact"
              id="contactblock"
              value={allValues.contact}
              onChange={changeHandler}
              required
            />
            <p className="error" id="contact">
              Enter Valid Contact...
            </p>
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="emailblock"
              value={allValues.email}
              onChange={changeHandler}
              required
            />
            <p className="error" id="email">
              Enter valid email...
            </p>
          </div>
        </div>
        <div className="dc-whatsapp-tick">
          <input type="checkbox" id="whatsapp" />
          <label htmlFor="whatsapp">
            Get updates on{" "}
            <span style={{ color: "#59702F", textDecoration: "underline" }}>
              WhatsApp
            </span>
            . You may opt out anytime
          </label>
        </div>
        <h3>
          Step 2: Pick your therapy <p className="error" id="service"></p>
        </h3>
        {appointments.length !== 0 ? (
          <div className="dc-therepys" id="dc-therepys">
            {appointments &&
              appointments.map((service) => {
                return (
                  <div className="therapy">
                    <input
                      type="radio"
                      name="check"
                      onClick={(event) => {
                        setService(event.currentTarget.value);
                        checkData(event.currentTarget.id);
                      }}
                      className="therapy-input"
                      id={service.service_name}
                      value={service.key}
                      required
                    />
                    <label
                      //
                      id={"therapy-" + service.service_name}
                      for={service.service_name}
                    >
                      <img
                        src={
                          "https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/" +
                          service.key +
                          ".png"
                        }
                        alt=""
                      />
                      <p>{service.service_name}</p>
                    </label>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="dc-loading-icon">
            <div class="loader"></div>
          </div>
        )}
        <h3 className="tellusmore">Tell us more about your concern</h3>
        <input
          type="text"
          id="concern"
          name="comment"
          onChange={changeHandler}
          placeholder="Optional"
        />
        <h3>Step 3: Choose Date & Time</h3>
        <div className="dc-form">
          <div className="date">
            <label htmlFor="date">Select a Date</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                id="date"
                inputFormat="dd/MM/yyyy"
                value={value}
                toolbarPlaceholder="Please select date"
                placeholder="Please select date"
                disablePast={true}
                minDate={new Date()}
                showToolbar={false}
                maxDate={futureDate}
                onChange={(value) => setValue(value)}
                InputProps={{ readOnly: true }}
                renderInput={(params) => <TextField readOnly {...params} />}
              />
            </LocalizationProvider>
          </div>

          <div className="time">
            <label htmlFor="date">
              Pick a Slot <span id="date-time">(Select therapy first)</span>{" "}
            </label>
            <div>
              <select
                class="form-select"
                name="time"
                id="time"
                onChange={(event) => {
                  changeHandler(event);
                  slotId(event.target.value);
                }}
                required
              >
                {allValues.time === "" ? <option value=""></option> : ""}
                {filteredList.map((t) => {
                  return <option value={t}>{t}</option>;
                })}
              </select>
            </div>
          </div>
        </div> */}

        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="firstName"
              name="firstName"
              // label="First name"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              placeholder="First Name"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="lastname"
              name="lastname"
              // label="First name"
              fullWidth
              autoComplete="last-name"
              variant="outlined"
              placeholder="Last Name"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="email"
              name="email"
              type={"email"}
              // label="First name"
              fullWidth
              autoComplete="last-name"
              variant="outlined"
              placeholder="Last Name"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="contact"
              name="contact"
              type={"email"}
              maxRows="10"
              // label="First name"
              fullWidth
              autoComplete="contact"
              variant="outlined"
              placeholder="Contact"
            />
          </Grid>
        </Grid>
        <div className="dc-form-submit">
          <input type="Submit" id="submit" value={submit} />
        </div>
      </form>
    </>
  );
};

export default Form;
