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

function Form({ appointments, UtmMedium, UtmSorce, token, setCount }) {
    const [getFullName, setFullName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getContact, setContact] = useState('');
    const [date, setDate] = useState(new Date())
    const [endDate, setEndDate] = useState("");
    const [time, setTime] = useState("");
    const [slots, setSlots] = useState([]);
    const [slot_id, setSlot_id] = useState("");
    const [filteredList, setFilteredList] = useState([]);
    const [err, setErr] = useState(false)
    const [serviceId, setServiceID] = useState("bb1c6f0d-4504-4bf9-a1be-c44da6849799");
    let slot_list = [];
    const [alerts, setAlerts] = useState("");
    const [displayAlert, setDisplayAlert] = useState(false);
    const [ErrFullName, setErrFullName] = useState("");
    const [ErrEmail, setErrEmail] = useState("");
    const [ErrContact, setErrContact] = useState("");
    const [Errdate, setErrDate] = useState("")
    const [Errtime, setErrTime] = useState("");
    const [submit, setSubmit] = useState("BOOK NOW");
    const [fade, setFade] = useState(false);

    //   let slot_list = [];
    let futureDate = new Date();
    //   const pattern = /^(d{3})s*d{3}(?:-|s*)d{4}$/;
    const todayTime = new Date();
    let date2 = date;
    let date1 = new Date();
    let diffDays = date2.getDate() - date1.getDate();
    let diffYears = date2.getFullYear() - date1.getFullYear();
    futureDate.setDate(futureDate.getDate() + 14);
    let hours = todayTime.getHours();
    hours = ("0" + hours).slice(-2);
    let minutes = todayTime.getMinutes();
    minutes = ("0" + minutes).slice(-2);
    let nowTime = `${hours}:${minutes}`;
    const[ endindex, setEndIndex] = useState("");
    const changeHandler = (e) => {
        // if (e.target.name == "time") {
        //     setTime({
        //         ...time,
        //         [e.target.name]: e.target.value.substring(0, 5),
        //     });
        //     console.log("Change Handler:",e.target.value)
        // }
        setTime({...time, [e.target.name]: e.target.value});
    };


    const setService = () => {
        axios
            .get("https://kapiva.app/api/get_availability_slots.php", {
                params: { service_id: "bb1c6f0d-4504-4bf9-a1be-c44da6849799" },
            })
            .then((resposnse) => {
                setSlots(resposnse.data);
                // console.log(resposnse.data);
            });
    };

    const SlotLoot = (timing) => {
        // timing = timing.split("##")[1];
        timing.map((e) => {
            e = e.split("##")[1];
            if (date.toLocaleDateString() === new Date().toLocaleDateString()) {
                if (convertTime12to24fornowTime(nowTime) < convertTime12to24(e)) {
                    setFilteredList((fl) => [...fl, e]);
                    slot_list.concat(filteredList);
                }
            } else {
                setFilteredList((fl) => [...fl, e]);
            }
        });
    };

    const submitHandler = () => {
        // console.log(time.time);
        setSubmit("Booking....")
        // var err = false;
        var fullname = new RegExp(/(^[A-Za-z]{1,16})([ ]{0,1})([A-Za-z]{1,16})?([ ]{0,1})?([A-Za-z]{1,16})?([ ]{0,1})?([A-Za-z]{3,16})/);/*regular expration in only character name*/
        var lname = new RegExp(/^[A-Za-z ]+$/);/*regular expration in only character name*/
        var contact = new RegExp(/^[6789]\d{9}$/);/*regular expration in only number  /^[0-9]+$/ */
        // indian number start digit /^[6789]\d{9}$/
        var mailformat = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/); /*regular expration in email*/
        var dateformat = new RegExp("([0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[-](0[1-9]|1[0-2])[-][0-9]{4})");
        // time regular expration
        var timeFormat = new RegExp(/^\d{1,2}:\d{2}([ap]m)?$/);
        //  name validation 
        if (getFullName == "") {
            // setErr(true)
            setErrFullName(<p style={{ color: 'red' }}>This field required</p>);

        }
        else if (!fullname.test(getFullName)) {
            // setErr(true)
            setErrFullName(<p style={{ color: 'red' }}>Please enter full name</p>);
        }
        else {
            // setErr(false)
            setErrFullName("");
        }

        // email validation
        if (getEmail == "") {
            // setErr(true)
            setErrEmail(<p style={{ color: 'red' }}>Email field required</p>);

        }
        else if (!mailformat.test(getEmail)) {
            setErr(true)
            setErrEmail(<p style={{ color: 'red' }}>Email invalied</p>);
        }

        else {
            // setErr(false)
            setErrEmail("")
        }

        // number validation
        if (getContact == "") {
            // setErr(true)
            setErrContact(<p style={{ color: 'red' }}>Number field required</p>);

        }
        else if (!contact.test(getContact)) {
            // setErr(true)
            setErrContact(<p style={{ color: 'red' }}>Please enter a valid only phone number</p>);
        }
        else {
            // setErr(false)
            setErrContact("")
        }

        // Date validation
        if (date === "") {
            setErrDate(<p style={{ color: 'red' }}>Date field required</p>);
            // setErr(true)

        }
        // else if (!dateformat.test(date)) {
        //     setErrDate(<p style={{ color: 'red' }}>Invalied date</p>);
        // }
        else {
            // setErr(false)
            setErrDate("")
        }


        // Time validation
        if (time === "") {
            setErrTime(<p style={{ color: 'red' }}>Time field required</p>);
        }
        // else if (!timeFormat.test(time)) {
        //     setErrTime(<p style={{ color: 'red' }}>Invalied time</p>);
        // }
        else {
            // setErr(false)
            setErrTime("")
        // setEndIndex(...endindex , endTime(time.time));
        }

        if (ErrFullName === ""  && ErrContact === "" && Errdate === "" && Errtime === "") {
            setErr(false)
            console.log(getFullName, getEmail, getContact, time);
            // createAppointment(getFullName, getEmail, getContact, time)
        }
    };

    const createAppointment = (getFullName,email,contact,time) => {
        document.getElementById("submit").disabled = true;

// console.log("object", {first_name: getFullName.split(" ")[0],
// last_name: getFullName.split(" ")[1],
// email_id: email,
// cell_phone: contact,
// utm_source: UtmSorce,
// "utm_medium": UtmMedium,
// "service_key": serviceId,
// "slot_id": slot_id,
// "start_time":
//   getDateFormat({ date: date }) +
//   "T" +
//   convertTime12to24(time.time) +
//   "Z",
// "end_time": getDateFormat({ date: date }) + "T" + convertTime12to24(endTime(time.time)) + "Z"});


        axios(`https://kapiva.app/api/save_appointment.php`, {
          method: "POST",
          data: {
            // access_token: token,
            first_name: getFullName.split(" ")[0],
            last_name: getFullName.split(" ")[1],
            email_id: email,
            cell_phone: contact,
            utm_source: UtmSorce,
            utm_medium: UtmMedium,
            service_key: serviceId,
            slot_id: slot_id,
            start_time:
              getDateFormat({ date: date }) +
              "T" +
              convertTime12to24(time) +
              "Z",
            end_time: getDateFormat({ date: date }) + "T" + convertTime12to24(endTime(time)) + "Z"
          },
        })
          .then((response) => {
            // console.log(response);
            setAlerts(response.data);
            if (response.data.status === "200") {
              setFilteredList([]);
              setSubmit("Book Now");
            } else {
              setFade(true);
              setDisplayAlert(true);
              setFilteredList([]);
              setSubmit("Book Now");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };



    const slotId = (val) => {
        console.log(val);
        endindex = convertTime12to24(val);
        if (slots) {
            for (const i in slots) {
                if (
                    slots[i]["service_slots"]["date"] === getDateFormat({ date: date })
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
        setService();
        if (slots) {
            for (const i in slots) {
                if (
                    slots[i]["service_slots"]["date"] === getDateFormat({ date: date })
                ) {
                    setFilteredList([]);
                    SlotLoot(slots[i]["service_slots"].slots);
                    break;
                }
            }
        }
    }, [slots, date]);

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
            {/* <form id="form" className="row g-3" onSubmit={handleSubmit}> */}
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
                        id="fullName"
                        name="fullName"
                        // label="First name"
                        fullWidth
                        autoComplete="full-name"
                        variant="outlined"
                        placeholder="Full Name"
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <h6 style={{ textAlign: 'center' }}>{ErrFullName}</h6>
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
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <h6 style={{ textAlign: 'center' }}>{ErrEmail}</h6>
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
                        onChange={(e) => setContact(e.target.value)}
                    />
                    <h6 style={{ textAlign: 'center' }}>{ErrContact}</h6>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                            id="date"
                            inputFormat="dd/MM/yyyy"
                            value={date}
                            toolbarPlaceholder="Please select date"
                            placeholder="Please select date"
                            disablePast={true}
                            minDate={new Date()}
                            showToolbar={false}
                            maxDate={futureDate}
                            onChange={(date) => setDate(date)}
                            InputProps={{ readOnly: true }}
                            renderInput={(params) => <TextField readOnly {...params} />}
                        />
                    </LocalizationProvider>
                    <h6 style={{ textAlign: 'center' }}>{Errdate}</h6>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <div>
                        <select
                            class="form-select"
                            name="time"
                            id="time"
                            onChange={(event) => {
                                changeHandler(event);
                                slotId(event.target.value);
                            }}
                            // placeholder={"Select Time"}
                            required
                        >
                            {time === "" ? <option value="">Select Time...</option> : ""}
                            {filteredList.map((t) => {
                                return <option value={t}>{t}</option>;
                            })}
                        </select>
                    </div>
                    <h6 style={{ textAlign: 'center' }}>{Errtime}</h6>
                </Grid>

            </Grid>
            <div className="dc-form-submit">
                <input type="Submit" id="submit" value={submit} onClick={() => submitHandler()} />
            </div>
            {/* </form> */}
        </>
    );
};

export default Form;
