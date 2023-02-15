import React from "react";
import { Link } from "react-router-dom";
import LogoImage from "src/assets/img/fm-logo.png";
import BannerLogo from "src/assets/img/kfm-banner.png";
import DetailsImage from "src/assets/img/details-1.png";
import DetailsImage2 from "src/assets/img/details-2.png";

const Landing = () => {
  return (
    <body>
      <header
        id="header"
        className="fixed-top d-flex align-items-center header-transparent"
      >
        <div className="container d-flex align-items-center justify-content-between">
          <div className="logo">
            <h1>
              <a>
                <img src={LogoImage} alt="" />
              </a>
            </h1>
          </div>
          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <Link className="nav-link scrollto" to="/login">
                  <i
                    style={{ fontSize: "30px", marginRight: "10px" }}
                    className="bx bx-user-circle"
                  ></i>{" "}
                  Login
                </Link>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
      <section id="hero">
        <div className="container" style={{ height: "440px" }}>
          <div className="row justify-content-between">
            <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex align-items-center">
              <div data-aos="zoom-out">
                <h1>
                  Better Facility Management Starts With&nbsp;
                  <span>FM Integrated</span>
                </h1>
                <h2>
                  Fast Facility Maintenance Solutions, Prompt Support, Great
                  Value
                </h2>
                <div className="text-center text-lg-start">
                  <a href="#about" className="btn-get-started scrollto">
                    Learn more
                  </a>
                </div>
              </div>
            </div>
            <div
              className="col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="zoom-out"
              data-aos-delay="300"
            >
              <img src={BannerLogo} className="img-fluid animated" alt="" />
            </div>
          </div>
        </div>
        <svg
          className="hero-waves"
          xmlns="http://www.w3.org/2000/svg"
          //   xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28 "
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="wave-path"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="wave1">
            <use
              xlinkHref="#wave-path"
              x="50"
              y="3"
              fill="rgba(255,255,255, .1)"
            />
          </g>
          <g className="wave2">
            <use
              xlinkHref="#wave-path"
              x="50"
              y="0"
              fill="rgba(255,255,255, .2)"
            />
          </g>
          <g className="wave3">
            <use xlinkHref="#wave-path" x="50" y="9" fill="#fff" />
          </g>
        </svg>
      </section>
      <main id="main">
        <section id="about" className="about">
          <div className="container-fluid">
            <div className="row">
              <div
                className="col-xl-12 col-lg-12 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5 text-center"
                data-aos="zoom-out"
              >
                <h3>Services</h3>
                <p style={{ fontSize: "18px" }}>
                  We have solution for your problems
                </p>
                <div className="row">
                  <div className="col-xl-4">
                    <div className="icon-box">
                      <div className="icon">
                        <i className="bx bx-buildings"></i>
                      </div>
                      <h4 className="title">Commercial maintenance</h4>
                      <p className="description">
                        KFM24/7 provides custom made service plans designed for
                        your specific needs. Whether it’s for a single trade at
                        a single location or multiple trades at thousands of
                        locations, we will be there when you need us and off
                        your books when you don’t.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <div className="icon-box">
                      <div className="icon">
                        <i className="bx bx-cog"></i>
                      </div>
                      <h4 className="title">Facility maintenance</h4>
                      <p className="description">
                        KFM24/7 has developed flexible solutions to meet the
                        demands of a constantly evolving facility maintenance
                        program. We offer around the clock service for trades
                        inclusive of general maintenance, plumbing, electrical,
                        asset protection (locks), preventative HVAC maintenance,
                        and more.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <div className="icon-box">
                      <div className="icon">
                        <i className="bx bx-home"></i>
                      </div>
                      <h4 className="title">Residential maintenance</h4>
                      <p className="description">
                        KFM24/7 simplifies multi-unit residential maintenance as
                        a one call solution. From general repairs and
                        maintenance to complete turnkey and remediations,
                        KFM24/7 is your single source for timely and optimal
                        outcomes. Electrical, Plumbing, General Maintenance and
                        Snow Removal are just a few of the services our clients
                        rely on us to execute seamless and intelligently.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="counts" className="counts">
          <div className="container">
            <div className="row" data-aos="fade-up">
              <div className="col-lg-3 col-md-6">
                <div className="count-box">
                  <i className="bx bx-dollar-circle"></i>
                  <span>20%</span>
                  <p>reduction in tickets costs</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
                <div className="count-box">
                  <i className="bx bx-hard-hat"></i>
                  <span>81%</span>
                  <p>reduction in sending out the wrong type of technician</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                <div className="count-box">
                  <i className="bx bx-mobile-alt"></i>
                  <span>6%</span>
                  <p>tickets are solved over the phone</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                <div className="count-box">
                  <i className="bx bx-stopwatch"></i>
                  <span>47%</span>
                  <p>faster ticket resolution times</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="features">
          <div className="container">
            <div className="row" data-aos="fade-left">
              <div className="col-lg-3 col-md-4">
                <div
                  className="icon-box"
                  data-aos="zoom-in"
                  data-aos-delay="50"
                >
                  <i
                    className="bx bx-check-circle"
                    style={{ color: "#ffbb2c" }}
                  ></i>
                  <h3>General Maintenance</h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
                <div
                  className="icon-box"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                >
                  <i
                    className="bx bx-check-circle"
                    style={{ color: "#5578ff" }}
                  ></i>
                  <h3>Store Build Outs</h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
                <div
                  className="icon-box"
                  data-aos="zoom-in"
                  data-aos-delay="150"
                >
                  <i
                    className="bx bx-check-circle"
                    style={{ color: "#e80368" }}
                  ></i>
                  <h3>Exterior Building Repairs</h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4 mt-lg-0">
                <div
                  className="icon-box"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  <i
                    className="bx bx-check-circle"
                    style={{ color: "#e361ff" }}
                  ></i>
                  <h3>Remodel / Refresh Projects</h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div
                  className="icon-box"
                  data-aos="zoom-in"
                  data-aos-delay="250"
                >
                  <i
                    className="bx bx-check-circle"
                    style={{ color: " #47aeff" }}
                  ></i>
                  <h3>Remediation</h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div
                  className="icon-box"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                >
                  <i
                    className="bx bx-check-circle"
                    style={{ color: " #ffa76e" }}
                  ></i>
                  <h3>Natural Disaster Preparation / Recovery</h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div
                  className="icon-box"
                  data-aos="zoom-in"
                  data-aos-delay="350"
                >
                  <i
                    className="bx bx-check-circle"
                    style={{ color: "#11dbcf" }}
                  ></i>
                  <h3>ADA Compliance Installations</h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div
                  className="icon-box"
                  data-aos="zoom-in"
                  data-aos-delay="400"
                >
                  <i
                    className="bx bx-check-circle"
                    style={{ color: "#4233ff" }}
                  ></i>
                  <h3>Electrical</h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div
                  className="icon-box"
                  data-aos="zoom-in"
                  data-aos-delay="450"
                >
                  <i
                    className="bx bx-check-circle"
                    style={{ color: "#b2904f" }}
                  ></i>
                  <h3>Lighting Repairs & Retrofits</h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div
                  className="icon-box"
                  data-aos="zoom-in"
                  data-aos-delay="500"
                >
                  <i
                    className="bx bx-check-circle"
                    style={{ color: "#b20969" }}
                  ></i>
                  <h3>Emergency / Exit Light Repairs</h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div
                  className="icon-box"
                  data-aos="zoom-in"
                  data-aos-delay="550"
                >
                  <i
                    className="bx bx-check-circle"
                    style={{ color: " #ff5828" }}
                  ></i>
                  <h3>Electrical Code Violations</h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div
                  className="icon-box"
                  data-aos="zoom-in"
                  data-aos-delay="600"
                >
                  <i
                    className="bx bx-check-circle"
                    style={{ color: " #29cc61" }}
                  ></i>
                  <h3>Power Outages</h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div
                  className="icon-box"
                  data-aos="zoom-in"
                  data-aos-delay="50"
                >
                  <i
                    className="bx bx-check-circle"
                    style={{ color: " #ffbb2c" }}
                  ></i>
                  <h3>Major and Minor Electrical repairs</h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div
                  className="icon-box"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                >
                  <i
                    className="bx bx-check-circle"
                    style={{ color: " #5578ff" }}
                  ></i>
                  <h3>Plumbing</h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div
                  className="icon-box"
                  data-aos="zoom-in"
                  data-aos-delay="150"
                >
                  <i
                    className="bx bx-check-circle"
                    style={{ color: "#e80368" }}
                  ></i>
                  <h3>Major and Minor Plumbing Repairs</h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div
                  className="icon-box"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  <i
                    className="bx bx-check-circle"
                    style={{ color: " #e361ff" }}
                  ></i>
                  <h3>Floor Drains</h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div
                  className="icon-box"
                  data-aos="zoom-in"
                  data-aos-delay="250"
                >
                  <i
                    className="bx bx-check-circle"
                    style={{ color: "#47aeff" }}
                  ></i>
                  <h3>Backflow Inspections / Maintenance</h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div
                  className="icon-box"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                >
                  <i
                    className="bx bx-check-circle"
                    style={{ color: "#ffa76e" }}
                  ></i>
                  <h3>Pipe Leaks</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="details" className="details">
          <div className="container">
            <div className="row content">
              <div className="col-md-6 text-center" data-aos="fade-right">
                <img
                  width="480"
                  src={DetailsImage}
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="col-md-6 pt-4" data-aos="fade-up">
                <h3>History</h3>
                <p style={{ fontSize: "18px" }}>
                  The advantage of being in our network
                </p>
                <p>
                  Year over year our steady growth isn’t by mistake. Keystone
                  combines streamline processes and cutting-edge technologies
                  with world-className customer service and expert management.
                  The end result—better buying power that keeps costs down for
                  you.
                </p>
                <ul>
                  <li>
                    <i className="bi bi-check"></i> Cost Efficiency
                  </li>
                  <li>
                    <i className="bi bi-check"></i> Accountability & Consistent
                    Quality Assurance
                  </li>
                  <li>
                    <i className="bi bi-check"></i> Transparency
                  </li>
                  <li>
                    <i className="bi bi-check"></i> Risk Management & Compliance
                  </li>
                  <li>
                    <i className="bi bi-check"></i> Highly Qualified Technicians
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="testimonials">
          <div className="container">
            <div
              className="testimonials-slider swiper"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <h3>Facility Director</h3>
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                      KFM has always performed well for us. They have exceeded
                      our expectation and consistently deliver on their service
                      commitments. Going the extra mile is important to us and
                      that’s why chose KFM. Their project management team and
                      techs are knowledgeable and promptly respond to our
                      service request. KFM developed a service delivery method
                      that aligns with our facility maintenance objectives while
                      saving us money. Definitely a great service partner.
                      <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                    </p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <h3>Facility Manager</h3>
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                      Solutions driven is the best way to describe KFM. It’s
                      reassuring to know that exceptional outcomes are just a
                      phone call way regardless of the time of day. Their
                      proactive approach in how they respond and execute repairs
                      is invaluable to how we maintain our stores.
                      <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                    </p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <h3>Facilities Coordinator</h3>
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                      It is a pleasure to do business with such a client-focused
                      company whose performance and support excels on various
                      levels. They understand our business and I’m glad I made
                      the decision and chose KFM. They are able to deliver
                      optimal outcomes consistently across our brand.
                      <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </section>
        <section id="details" className="details">
          <div className="container">
            <div className="row content">
              <div
                className="col-md-6 order-1 order-md-2 text-center"
                data-aos="fade-left"
              >
                <img
                  width="520"
                  src={DetailsImage2}
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="col-md-6 order-2 order-md-1" data-aos="fade-up">
                <h3>Advanced Technology</h3>
                <p style={{ fontSize: "18px" }}>
                  We use the state of the art technology
                </p>
                <p>
                  KFM24/7 is powered by the state of the art proprietary
                  technology that drives efficiencies and significant cost
                  savings to our clients.
                </p>
                <ul>
                  <li>
                    <i className="bi bi-check"></i> Continuous Platform
                    Innovation
                  </li>
                  <li>
                    <i className="bi bi-check"></i> Consistent Business
                    Operations Improvements
                  </li>
                  <li>
                    <i className="bi bi-check"></i> Year-Over-Year Savings
                  </li>
                  <li>
                    <i className="bi bi-check"></i> Convenient Manager
                    Application for Fast Incident Reporting
                  </li>
                  <li>
                    <i className="bi bi-check"></i> Real-Time Visibility into
                    Reported Incident Progress
                  </li>
                  <li>
                    <i className="bi bi-check"></i> Easy to Use, User-Friendly
                    Interface
                  </li>
                  <li>
                    <i className="bi bi-check"></i> Reliable Service
                  </li>
                  <li>
                    <i className="bi bi-check"></i> Quality-of-Service Reporting
                  </li>
                  <li>
                    <i className="bi bi-check"></i> Quality-of-Service Control
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer id="footer">
        <div className="container">
          <div className="copyright">© 2023 FMI All Rights Reserved.</div>
        </div>
      </footer>
      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
      {/* <div id="preloader"></div> */}
    </body>
  );
};

export default Landing;
