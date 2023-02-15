import React from "react";
import { Col } from "reactstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

const AuthSlider = (props) => {
  return (
    <React.Fragment>
      <Col lg={6}>
        <div className="p-lg-5 p-4 auth-one-bg h-100">
          <div className="bg-overlay"></div>
          <div className="position-relative h-100 d-flex flex-column">
            <div className="mb-4">
              <Link to="/login" className="d-block">
                <img
                  src={props.userDomain?.logoUrl}
                  alt=""
                  style={{ maxHeight: 100, maxWidth: 100 }}
                />
              </Link>
            </div>
            <div className="mt-auto">
              <Carousel
                showThumbs={false}
                autoPlay={false}
                showArrows={false}
                showStatus={false}
                infiniteLoop={true}
                className=" "
                id="qoutescarouselIndicators"
              >
                <div className="carousel-inner text-justify text-white pb-5">
                  <div className="item">
                    <h1 className="text-white">
                      " Better Facility Management Starts With{" "}
                      {props.userDomain?.name || "FMI"}"
                    </h1>
                    <ul className="list-inline kfm_login-hightlight-list">
                      <li className="list-inline-item">
                        • Fast Facility Maintenance Solutions
                      </li>
                      <li className="list-inline-item">• Prompt Support</li>
                      <li className="list-inline-item">• Great Value</li>
                      <li className="list-inline-item">
                        • {props.userDomain?.name || "FMI"}
                      </li>
                    </ul>
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

export default AuthSlider;
