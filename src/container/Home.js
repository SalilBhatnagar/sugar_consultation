import React, { useState, useEffect } from "react";
import Achievement from "../component/Achievement";
import Banner from "../component/Banner";
import BtnConsultation from "../component/BtnConsultation";
// import DoctorCard from "../component/DoctorCard";
import Form1 from "../component/Form1";
import Queries from "../component/Queries";
import Treatments from "../component/Treatments";
import axios from "axios";
import Carousel from "react-elastic-carousel";
import Experience from "../component/Experience";
import Header from "../component/Header";
import Popup from "../component/Popup";

function Home() {
  const [appointments, setAppointments] = useState([]);
  const [count, setCount] = useState(1);
  const [token, setToken] = useState([]);
  const [status, setStatus] = useState(""); //eslint-disable-line
  // let ques = "";
  // let ans = "";
  // let val = "";
  let UtmSorce = "";
  let UtmMedium = "";
  let queryString = window.location.search;
  if (queryString !== "") {
    UtmSorce = queryString.split("=")[1].split("&")[0];
    UtmMedium = queryString.split("&")[1].split("&")[0];
    UtmMedium = UtmMedium.split("=")[1];
  } else {
    UtmSorce = "";
    UtmMedium = "";
  }
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 },
  ];

  useEffect(() => {
    axios("https://kapiva.app/api/get_doc_services.php", { method: "GET" })
      .then((response) => {
        setAppointments([...response.data.data.services]);
      }) //eslint-disable-line
      .catch((error) => {});

    // axios
    //   .get(
    //     "https://h5vx3l2vwdiaobjnp3rp4hcyni0nkaid.lambda-url.ap-south-1.on.aws/"
    //   )
    //   .then((response) => {
    //     setAppointments([...response.data]);
    //   }) //eslint-disable-line
    //   .catch((error) => {});

    axios
      .get("https://developer.setmore.com/api/v1/o/oauth2/token", {})
      .then((response) => {
        setToken((token) => response.data.data.token.access_token);
        setStatus(response.status);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="dc-consultation">
      {/* <img src="" /> */}
      {/* <Header /> */}
      <Banner />
      <div className="dc-consultation-form ">
        <h1>
          Ayurvedic consultation with experienced doctors and nutritionists
        </h1>
        <div className="dc-consultation-form-step-1">
          {count === 1 ? (
            <Form1
              appointments={appointments}
              UtmMedium={UtmMedium}
              UtmSorce={UtmSorce}
              token={token}
              setCount={setCount}
            />
          ) : (
            <Popup setCount={setCount} />
          )}
        </div>
      </div>
      <div className="dc-doctor-details">
        <h3>
          MEET OUR TEAM OF EMPANELLED <br />
          <span style={{ fontWeight: 800 }}>AYURVEDIC DOCTORS</span>
        </h3>
        <div className="dc-doctor-cards">
          <Carousel breakPoints={breakPoints}>
            <div className="dc-card">
              <div className="dc-card-mobile">
                <div className="doctor-image">
                  <img
                    src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/doctors/Dr_Anand.jpg"
                    alt="Doctor Image"
                  />
                </div>
                <div className="mobile-detail">
                  <h2 className="doctor-name">Dr. Anand R Dwivedi</h2>
                  <h2 class="doctor-qualification">B.A.M.S.</h2>
                  <p className="doctor-detail">
                    {/* Ayurvedacharya, Mumbai University, 1987. */}
                    <div className="doctor-experience">
                      <p>
                        <span className="green">Years of Experience</span>: 34
                        Yrs
                      </p>
                      <p>
                        <span className="green">Specialization</span>: Weight
                        management, Sexual Wellness
                      </p>
                      <p>
                        <span className="green">Languages</span>: Hindi, English
                        & Marathi
                      </p>{" "}
                      <p>
                        <span className="green">RM</span>: I-19169
                      </p>
                      <p>
                        <span className="green">Contact</span>:
                        ananddwdr@gmail.com
                      </p>
                    </div>
                  </p>
                </div>
              </div>
              {/* <p className="doctor-info">
                Ayurvedacharya, Mumbai University, 1987. Dr. Anand R Dwivedi has
                been practicing Ayurveda since 1988 and has been associated with
                Kapiva since 2015 and helps people lead a well-balanced
                lifestyle through his deep knowledge of Ayurveda.
              </p> */}
            </div>
            <div className="dc-card">
              <div className="dc-card-mobile">
                <div className="doctor-image">
                  <img
                    src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/doctors/Dr_Meena.jpg"
                    alt="Doctor Image"
                  />
                </div>
                <div className="mobile-detail">
                  <h2 className="doctor-name">Dr. Meena Sharma</h2>
                  <h2 class="doctor-qualification">B.A.M.S.</h2>
                  <p className="doctor-detail">
                    {/* BAMS (Bachelors of Ayurvedic Medicine and Surgery) */}
                    <div className="doctor-experience">
                      <p>
                        <span className="green">Years of Experience</span>: 14
                        Yrs
                      </p>
                      <p>
                        <span className="green">Specialization</span>: Skin &
                        Hair and General wellness
                      </p>
                      <p>
                        <span className="green">Languages</span>: Hindi,
                        English, Dogri & Kannada
                      </p>
                      <p>
                        <span className="green">RM</span>: 787
                      </p>
                      <p>
                        <span className="green">Contact</span>:
                        drmeenasharma8@gmail.com
                      </p>
                    </div>
                  </p>
                </div>
              </div>
              {/* <p className="doctor-info">
                She has conducted over 20 medical camps & has a good knowledge
                of Panchkarma and Gynaecology. She also has an understanding of
                yoga practices and is an expert in making Ayurvedic medicines as
                well.
              </p> */}
            </div>
            <div className="dc-card">
              <div className="dc-card-mobile">
                <div className="doctor-image">
                  <img
                    src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/doctors/Dr_Irfan.jpg"
                    alt="Doctor Image"
                  />
                </div>
                <div className="mobile-detail">
                  <h2 className="doctor-name">Dr. Irfan Ali</h2>
                  <h2 class="doctor-qualification">B.A.M.S.</h2>
                  <p className="doctor-detail">
                    {/* BAMS (Bachelors of Ayurvedic Medicine and Surgery) */}
                    <div className="doctor-experience">
                      <p>
                        <span className="green">Years of Experience</span>: 8
                        Yrs
                      </p>
                      <p>
                        <span className="green">Specialization</span>: Weight
                        management and Sexual wellness
                      </p>
                      <p>
                        <span className="green">Languages</span>: Hindi,
                        English, & Bengali
                      </p>
                      <p>
                        <span className="green">RM</span>: 12190
                      </p>
                      <p>
                        <span className="green">Contact</span>:
                        aliirfany2k@gmail.com
                      </p>
                    </div>
                  </p>
                </div>
              </div>
              {/* <p className="doctor-info">
                Dr. Irfan has spent two years as House Physician in the Dept. Of
                Panchakarma including Atyika Chikitsa (Emergency Management). He
                was a Chief Instructor and Senior physician in the Panchakarma
                Dept. of Ayurjyoti Wellness Ayurveda.
              </p> */}
            </div>
            <div className="dc-card">
              <div className="dc-card-mobile">
                <div className="doctor-image">
                  <img
                    src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/doctors/Dr_Sheetal.jpg"
                    alt="Doctor Image"
                  />
                </div>
                <div className="mobile-detail">
                  <h2 className="doctor-name">Dr. Sheetal Verma</h2>
                  <h2 class="doctor-qualification">B.A.M.S.</h2>
                  <p className="doctor-detail">
                    {/* BAMS (Bachelors of Ayurvedic Medicine and Surgery) */}
                    <div className="doctor-experience">
                      <p>
                        <span className="green">Years of Experience</span>: 7
                        Yrs
                      </p>
                      <p>
                        <span className="green">Specialization</span>: Weight
                        management, Skin & Hair
                      </p>
                      <p>
                        <span className="green">Languages</span>: Hindi &
                        English
                      </p>
                      <p>
                        <span className="green">RM</span>: 53242
                      </p>
                      <p>
                        <span className="green">Contact</span>:
                        sheetalverma1409@gmail.com
                      </p>
                    </div>
                  </p>
                </div>
              </div>
              {/* <p className="doctor-info">
                Dr. Sheetal has been working as an Ayurvedic physician. She has
                a great command over Ayurvedic practices like Panchkarma,
                Pathya, and Apathya. She is specifically good in the treatment
                of Obesity, GIT disorders, Renal and Gall bladder stones, skin
                and hair diseases, and Gynecological diseases.
              </p> */}
            </div>
            <div className="dc-card">
              <div className="dc-card-mobile">
                <div className="doctor-image">
                  <img
                    src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/doctors/Dr_Aswathy.jpg"
                    alt="Doctor Image"
                  />
                </div>
                <div className="mobile-detail">
                  <h2 className="doctor-name">Dr. Aswathy E.S.</h2>
                  <h2 class="doctor-qualification">B.A.M.S.</h2>
                  <p className="doctor-detail">
                    {/* BAMS (Bachelors of Ayurvedic Medicine and Surgery) */}
                    <div className="doctor-experience">
                      <p>
                        <span className="green">Years of Experience</span>: 10
                        Yrs
                      </p>
                      <p>
                        <span className="green">Specialization</span>: General
                        wellness, lifestyle issues
                      </p>
                      <p>
                        <span className="green">Languages</span>: Hindi,
                        English, Malayalam and Kannada
                      </p>
                      <p>
                        <span className="green">RM</span>: 10991
                      </p>
                      <p>
                        <span className="green">Contact</span>:
                        draswathyes.es@gmail.com
                      </p>
                    </div>
                  </p>
                </div>
              </div>
              {/* <p className="doctor-info">
                She has worked as an Ayurvedic consultant and medical officer in
                different nursing homes and hospitals. She has a deep knowledge
                of classical texts, Ayurvedic treatments, and Panchkarma.
              </p> */}
            </div>
            <div className="dc-card">
              <div className="dc-card-mobile">
                <div className="doctor-image">
                  <img
                    src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/doctors/Ninny_Sunny.jpg"
                    alt="Doctor Image"
                  />
                </div>
                <div className="mobile-detail">
                  <h2 className="doctor-name">Ninny Sunny</h2>
                  <p className="doctor-detail">
                    {/* Masters in Food Service Management and Dietetics */}
                    <div className="doctor-experience">
                      <p>
                        <span className="green">Years of Experience</span>: 6
                        Yrs
                      </p>
                      <p>
                        <span className="green">Specialization</span>: Medical
                        nutritionist
                      </p>
                      <p>
                        <span className="green">Languages</span>: Tamil,
                        Malayalam & English
                      </p>
                    </div>
                  </p>
                </div>
              </div>
              {/* <p className="doctor-info">
                Ninny Sunny is a certified nutritionist and has worked with
                brands like HealthifyMe and CureFit. She is an expert in
                evaluating the nutritional status of people and can advise a
                balanced nutritional plan for optimizing overall health and
                wellness.
              </p> */}
            </div>
            <div className="dc-card">
              <div className="dc-card-mobile">
                <div className="doctor-image">
                  <img
                    src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/doctors/Dr_Manjula.jpg"
                    alt="Doctor Image"
                  />
                </div>
                <div className="mobile-detail">
                  <h2 className="doctor-name">Dr. Manjula P.Badiger</h2>
                  <h2 class="doctor-qualification">B.A.M.S.</h2>
                  <p className="doctor-detail">
                    {/* BAMS (Bachelors of Ayurvedic Medicine and Surgery) */}
                    <div className="doctor-experience">
                      <p>
                        <span className="green">Years of Experience</span>: 12
                        Yrs
                      </p>
                      <p>
                        <span className="green">Specialization</span>: General
                        wellness and lifestyle issues
                      </p>
                      <p>
                        <span className="green">Languages</span>: Hindi,
                        English, Telugu & Kannada
                      </p>
                      <p>
                        <span className="green">RM</span>: 24993
                      </p>
                      <p>
                        <span className="green">Contact</span>:
                        drmanjulayu@gmail.com
                      </p>
                    </div>
                  </p>
                </div>
              </div>
              {/* <p className="doctor-info">
                Dr. Manjula has worked as a Consultant and General Physician for
                over 5 years before starting her private practice. In addition
                to BAMS, she also has an Advanced Diploma in Clinical Research
                and is trained in Panchkarma. She is an expert at diagnosis of
                the root cause and planning effective treatment for multiple
                issues.
              </p> */}
            </div>
            <div className="dc-card">
              <div className="dc-card-mobile">
                <div className="doctor-image">
                  <img
                    src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/doctors/Dr_Kalpana.jpg"
                    alt="Doctor Image"
                  />
                </div>
                <div className="mobile-detail">
                  <h2 className="doctor-name">Dr. Kalpana Dongare</h2>
                  <h2 class="doctor-qualification">B.A.M.S.</h2>
                  <p className="doctor-detail">
                    {/* BAMS (Bachelors of Ayurvedic Medicine and Surgery) */}
                    <div className="doctor-experience">
                      <p>
                        <span className="green">Years of Experience</span>: 13
                        Yrs
                      </p>
                      <p>
                        <span className="green">Specialization</span>: Weight
                        management and Skin & Hair
                      </p>
                      <p>
                        <span className="green">Languages</span>: Hindi, English
                        & Marathi
                      </p>
                      <p>
                        <span className="green">RM</span>: I-60404 - A
                      </p>
                      <p>
                        <span className="green">Contact</span>:
                        drkalpanadongre@gmail.com
                      </p>
                    </div>
                  </p>
                </div>
              </div>
              {/* <p className="doctor-info">
                Dr. Kalpana Dongare is adept in the treatment of infertility,
                PCOD, Joint disease, Skin diseases, etc with more than 95%
                patient follow up and more than 80% success rate. She is also an
                expert in all types of Panchakarma procedures.
              </p> */}
            </div>
            {/* <div className="dc-card">
              <div className="dc-card-mobile">
                <div className="doctor-image">
                  <img
                    src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/image.png"
                    alt="Doctor Image"
                  />
                </div>
                <div className="mobile-detail">
                  <h2 className="doctor-name">Dr. Khwaja Mohammed Istiyaque</h2>
                  <p className="doctor-detail">
                    BAMS (Bachelors of Ayurvedic Medicine and Surgery)
                    <div className="doctor-experience">
                      <p>
                        <span className="green">Years of Experience</span>: 5
                        Yrs
                      </p>
                      <p>
                        <span className="green">Specialization</span>: Diabetes,
                        Skin & Hair
                      </p>
                      <p>
                        <span className="green">Languages</span>: Hindi,
                        English & Bengali
                      </p>
                    </div>
                  </p>
                </div>
              </div>
              <p className="doctor-info">
                He has an experienced consultant and has good command on Ayurvedic practices like Panchkarma. He can understand the unique Ayurvedic constitution to recommend a personalized plan of treatment suited to the individual.
              </p>
            </div> */}
            <div className="dc-card">
              <div className="dc-card-mobile">
                <div className="doctor-image">
                  <img
                    src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/doctors/Dr_Shreyas.jpg"
                    alt="Doctor Image"
                  />
                </div>
                <div className="mobile-detail">
                  <h2 className="doctor-name">Dr. Shreyas Bharadwaj K</h2>
                  <h2 class="doctor-qualification">B.A.M.S.</h2>
                  <p className="doctor-detail">
                    {/* BAMS (Bachelors of Ayurvedic Medicine and Surgery) */}
                    <div className="doctor-experience">
                      <p>
                        <span className="green">Years of Experience</span>: 12
                        Yrs
                      </p>
                      <p>
                        <span className="green">Specialization</span>: Men's
                        health, chronic
                      </p>
                      <p>
                        <span className="green">Languages</span>: Hindi,
                        English, Kannada, Tulu, Tamil, Telugu & Malayalam
                      </p>
                      <p>
                        <span className="green">RM</span>: 25950
                      </p>
                      <p>
                        <span className="green">Contact</span>:
                        s.kedila87@gmail.com
                      </p>
                    </div>
                  </p>
                </div>
              </div>
              {/* <p className="doctor-info">
                Dr. Shreyas has worked as a consultant doctor and can handle all
                Panchkarma procedures with personalized guidance on daily diet
                and nutrition. He frequently conducts medical camps, awareness
                workshops, yoga, and meditation classes.
              </p> */}
            </div>
            <div className="dc-card">
              <div className="dc-card-mobile">
                <div className="doctor-image">
                  <img
                    src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/doctors/Anu_Bahl.jpg"
                    alt="Doctor Image"
                  />
                </div>
                <div className="mobile-detail">
                  <h2 className="doctor-name">Anu Bahl</h2>
                  <p className="doctor-detail">
                    {/* PG Diploma in Dietetics */}
                    <div className="doctor-experience">
                      <p>
                        <span className="green">Years of Experience</span>: 6
                        Yrs
                      </p>
                      <p>
                        <span className="green">Specialization</span>: Weight
                        management, Diabities, lifestyle
                      </p>
                      <p>
                        <span className="green">Languages</span>: Hindi,
                        English, Gujarati & Punjabi.
                      </p>
                    </div>
                  </p>
                </div>
              </div>
              {/* <p className="doctor-info">
                Anu Bahl is a certified nutritionist specializing in Weight
                Management. She guides people towards positive lifestyle changes
                with customized diet plans. She is also a Certified Diabetic
                Educator and can help in diabetes lifestyle planning and
                management.
              </p> */}
            </div>
            <div className="dc-card">
              <div className="dc-card-mobile">
                <div className="doctor-image">
                  <img
                    src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/doctors/Dr_Anjali.jpg"
                    alt="Doctor Image"
                  />
                </div>
                <div className="mobile-detail">
                  <h2 className="doctor-name">Dr. Anjali Geetha</h2>
                  <h2 class="doctor-qualification">B.A.M.S, M.D.A.M</h2>
                  <p className="doctor-detail">
                    {/* BAMS, MD (AM) */}
                    <div className="doctor-experience">
                      <p>
                        <span className="green">Years of Experience</span>: 12
                        yrs
                      </p>
                      <p>
                        <span className="green">Specialization</span>: Weight
                        management, Skin & Hair
                      </p>
                      <p>
                        <span className="green">Languages</span>: English, Hindi
                        & Malayalam.
                      </p>
                      <p>
                        <span className="green">RM</span>: r49871659356916823
                      </p>
                      <p>
                        <span className="green">Contact</span>:
                        dranjaligeetha@gmail.com
                      </p>
                    </div>
                  </p>
                </div>
              </div>
              {/* <p className="doctor-info">
                Dr. Anjali is an experienced ayurvedic consultant with hands on
                expertise in Panchkarma and fitness training. She specializes in
                Weight Management, Skin care and Lifestyle diseases. She has
                demonstrated records of accomplishment in skilled patient
                evaluation, diagnostics and treatment planning.
              </p> */}
            </div>
            <div className="dc-card">
              <div className="dc-card-mobile">
                <div className="doctor-image">
                  <img
                    src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/content/health-tech-doc-consult/img/doctors/Dr_Sindhu_Vas.jpg"
                    alt="Doctor Image"
                  />
                </div>
                <div className="mobile-detail">
                  <h2 className="doctor-name">Sindhu Vas</h2>
                  <p className="doctor-detail">
                    {/* PG Diploma in Dietetics */}
                    <div className="doctor-experience">
                      <p>
                        <span className="green">Years of Experience</span>: 4
                        Yrs
                      </p>
                      <p>
                        <span className="green">Specialization</span>: Nutrition
                        Counsellin, Diet Planning, Diabities, weight loss and
                        weight management
                      </p>
                      <p>
                        <span className="green">Languages</span>: Hindi,
                        Kannada, English.
                      </p>
                    </div>
                  </p>
                </div>
              </div>
              {/* <p className="doctor-info">
                Anu Bahl is a certified nutritionist specializing in Weight
                Management. She guides people towards positive lifestyle changes
                with customized diet plans. She is also a Certified Diabetic
                Educator and can help in diabetes lifestyle planning and
                management.
              </p> */}
            </div>
          </Carousel>
        </div>
      </div>
      <h3 className="dc-acheivement-head">
        Our empanelled doctors have treated thousands of patients with:
      </h3>
      <div className="dc-acheivements">
        <Achievement />
      </div>
      <BtnConsultation />
      <h3 className="dc-acheivement-head">
        Get the right treatment after an analysis of the root cause of your
        problems
      </h3>
      <div className="dc-treatments">
        <Treatments />
      </div>
      <div className="dc-consult-queries">
        {/* <h3 className="dc-consult-head">
          Still not very clear with whom you need to consult?
        </h3>
        <p>
          Don’t worry, take this small online test to understand which
          consultation will benefit you.
        </p> */}
        <p className="green">Get a 100% Private and Free Online Test.</p>
      </div>
      <div className="dc-selector">
        <Queries
          val="1"
          ques={"What are the online Ayurvedic consultation charges?"}
          ans={
            "It is completely Free, there are no charges for your online Ayurvedic Consultation at Kapiva."
          }
        />
        <Queries
          val="2"
          ques={"Does Ayurveda work for all ages??"}
          ans={
            "Ayurveda is an effective cure for many lifestyle issues and works for all ages. The medicines and treatments may differ person to person basis their age groups, lifestyle choices, comorbidities and adherence to medicines."
          }
        />
        <Queries
          val="3"
          ques={"How fast is the medicine shipped?"}
          ans={
            "The Products will be dispatched within 24 hours of you placing the order. However it takes 3 – 7 days to reach your location depending on the location. Some areas have varied degrees of covid-related restircition, due to which delivery might be delayed. Kapiva provides you with links to track your order in real time."
          }
        />
        <Queries
          val="4"
          ques={"How can I reschedule my appointment?"}
          ans={
            "The Customer has the option to reschedule their appointments from the confirmation email they receive after booking the first appointment. Alternatively, customers can follow the same steps and book another appointment for the next available slot from the website."
          }
        />
        <Queries
          val="5"
          ques={"What is the mode of consultation?"}
          ans={
            "The consultation will be online through a telephonic call. The doctor will reach out to you on your number at your appointment time for the consultation."
          }
        />
        <Queries
          val="6"
          ques={
            "Whom do I need to reach out if I have any queries regarding the products?"
          }
          ans={
            "For any concerns regarding the products, the customer can reach out to us on the toll free number 18002742575 or can also write to us at info@kapiva.in. Our support team will resolve your concerns at the earliest."
          }
        />
        <Queries
          val="7"
          ques={
            "Is it safe to share personal information and reports with the doctors?"
          }
          ans={
            "All consultations at Kapiva are 100% Private, the medical information shared by the customers shall not be divulged to others without the consent of the customer."
          }
        />
      </div>
      <div className="dc-why-kapiva">
        <h3 className="why-head">
          WHY <span className="bold">KAPIVA AYURVEDA?</span>
        </h3>
        <p>
          Kapiva has a team of experienced Ayurvedic practitioners and
          nutritionists who will guide you at every step to get healthy and fit
          in a natural way.
        </p>
        <div className="dc-treatments">
          <Experience />
        </div>
      </div>
      <BtnConsultation />
    </div>
  );
}

export default Home;
