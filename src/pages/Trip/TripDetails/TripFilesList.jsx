import React, { Fragment } from "react";
import {
  CardBody,
  CardTitle,
  Form,
  Row,
  Col,
  CardGroup,
  Card,
  CardImg,
} from "reactstrap";

const TripFilesList = (props) => {
  const { resourceFiles = [] } = props;
  return (
    <Fragment>
      <Form>
        <Row>
          {resourceFiles.length > 0 ? (
            <Col md="12">
              <div className="mb-3 file-list-container">
                <CardGroup
                  style={{
                    flexWrap: "nowrap",
                    overflowX: "scroll",
                    overflowY: "hidden",
                  }}
                >
                  {resourceFiles.map((file, index) => (
                    <Card
                      style={{
                        flexBasis: "200px",
                        marginRight: 15,
                        marginLeft: index === 0 ? "3rem" : 0,
                      }}
                      key={index}
                    >
                      <CardImg
                        alt="file image"
                        src={file.url}
                        top
                        width="100%"
                        style={{
                          height: "12rem",
                          width: "200px",
                          objectFit: "fill",
                          cursor: "pointer",
                          alignSelf: "center",
                        }}
                        onClick={() => {
                          window.open(file.url, "_blank").focus();
                        }}
                      />
                      <CardBody>
                        <CardTitle
                          style={{
                            overflow: "hidden",
                            width: "200px",
                          }}
                          tag="h5"
                        >
                          {file.name}
                        </CardTitle>
                      </CardBody>
                    </Card>
                  ))}
                </CardGroup>
              </div>
            </Col>
          ) : (
            <p>No files found</p>
          )}
        </Row>
      </Form>
    </Fragment>
  );
};

export default TripFilesList;
