import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Button, Card, CardBody } from "reactstrap";
import { useSelector } from "react-redux";
import DragAndDropFile from "src/Components/Common/DragAndDropFile";
import { CONSTANT } from "src/utils/constant";
import Notify from "src/common/Toaster/toast";
import { deleteVendorW9Files, updateVendorW9Files } from "src/helpers/Vendors";
import Loading from "src/common/Loader";
import { Link } from "react-router-dom";
import DocumentComponent from "src/common/docFiles/Documents";

export default function W9files(props) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { tags } = useSelector((state) => state.Login);
  const { data = {} } = props;
  const vendorW9 = data.vendorW9 || {};
  const { files = [] } = vendorW9;

  const handleFile = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await updateVendorW9Files(formData, vendorW9.id);
      Notify(response.message || "Success", true);
      setEdit(false);
      setLoading(false);
      props.update();
    } catch (error) {
      Notify(error || "Something went wrong", false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.currentTab !== props.id) {
      setEdit(false);
    }
  }, [props.currentTab, props.id]);

  const handleDelete = async (id) => {
    setLoading(true);
    console.log("here ", id);
    try {
      const response = await deleteVendorW9Files(id);
      Notify(response.message || "Success", true);
      setEdit(false);
      setLoading(false);
      props.update();
    } catch (error) {
      Notify(error || "Something went wrong", false);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {!edit &&
        !loading &&
        tags.includes(CONSTANT.UPDATE_VENDOR_INFO) &&
        files.length > 0 && (
          <div className="d-flex align-items-center mb-2">
            <div className="flex-grow-1">
              <h5 className="card-title mb-0"></h5>
            </div>
            <div className="flex-shrink-0">
              <Link
                onClick={() => setEdit(true)}
                className="badge bg-light text-primary fs-12"
              >
                <i className="ri-edit-box-line align-bottom me-1"></i> Edit
              </Link>
            </div>
          </div>
        )}
      {loading ? (
        <Loading />
      ) : (
        <>
          {(files.length === 0 || edit) && (
            <>
              <DragAndDropFile handleFile={handleFile} />
              <br />
            </>
          )}
          {files.length > 0 && !edit && (
            <DocumentComponent delete={handleDelete} document={files} />
          )}

          {edit &&
            !loading &&
            files.length !== 0 &&
            tags.includes(CONSTANT.UPDATE_VENDOR_INFO) && (
              <>
                <hr></hr>
                <Col>
                  <button
                    type="button"
                    className="btn btn-soft-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      setEdit(false);
                    }}
                  >
                    Cancel
                  </button>
                </Col>
              </>
            )}
        </>
      )}
    </Fragment>
  );
}
