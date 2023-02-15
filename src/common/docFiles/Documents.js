import React from "react";
import { Link } from "react-router-dom";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";

const DocumentComponent = (props) => {
  const handleView = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Row>
      <Col lg={12}>
        <div className="table-responsive">
          <Table className="table-borderless align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">File Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {(props.document || []).map((item, key) => (
                <tr key={key}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar-sm">
                        <div
                          className={`avatar-title bg-soft-danger text-danger rounded fs-20`}
                        >
                          <i className="ri-file-pdf-fill"></i>
                        </div>
                      </div>
                      <div className="ms-3 flex-grow-1">
                        <h6 className="fs-15 mb-0">
                          <Link onClick={() => {}}>{item.name}</Link>
                        </h6>
                      </div>
                    </div>
                  </td>
                  <td>
                    <UncontrolledDropdown direction="start">
                      <DropdownToggle
                        tag="a"
                        className="btn btn-light btn-icon"
                        id="dropdownMenuLink15"
                        role="button"
                      >
                        <i className="ri-equalizer-fill"></i>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>
                          <a href={item.url} download={true}>
                            <i className="ri-download-2-fill me-2 align-middle text-muted" />
                            Download{" "}
                          </a>
                        </DropdownItem>
                        <DropdownItem onClick={() => props.delete(item.url)}>
                          <i className="ri-delete-bin-5-line me-2 align-middle text-muted" />
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Col>
    </Row>
  );
};

export default DocumentComponent;
