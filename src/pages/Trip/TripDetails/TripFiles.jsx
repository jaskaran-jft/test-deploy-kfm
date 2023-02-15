import { Fragment, useMemo, useState } from "react";
import classNames from "classnames";
import { Accordion, AccordionItem, Collapse, Card, CardBody } from "reactstrap";
import TripFilesList from "./TripFilesList";

const TripFiles = (props) => {
  const [preWork, setPreWork] = useState(false);
  const [postWork, setPostWork] = useState(true);
  const [workCollapse, setWorkCollapse] = useState(false);
  const [signatureCollapse, setSignatureCollapse] = useState(false);

  const { data = {} } = props;
  const { resourceFiles = [] } = data;

  const preWorkFiles = useMemo(
    () => resourceFiles.filter((item) => item.type === "Prework"),
    [resourceFiles],
  );
  const postWorkFiles = useMemo(
    () => resourceFiles.filter((item) => item.type === "Postwork"),
    [resourceFiles],
  );
  const workFiles = useMemo(
    () => resourceFiles.filter((item) => item.type === "Work"),
    [resourceFiles],
  );
  const signatureFiles = useMemo(
    () => resourceFiles.filter((item) => item.type === "Signature"),
    [resourceFiles],
  );

  const t_collapse = () => {
    setPreWork(!preWork);
    setPostWork(false);
    setWorkCollapse(false);
    setSignatureCollapse(false);
  };

  const t_postWork = () => {
    setPostWork(!postWork);
    setPreWork(false);
    setWorkCollapse(false);
    setSignatureCollapse(false);
  };

  const t_work = () => {
    setWorkCollapse(!workCollapse);
    setPostWork(false);
    setPreWork(false);
    setSignatureCollapse(false);
  };

  const t_signature = () => {
    setSignatureCollapse(!signatureCollapse);
    setWorkCollapse(false);
    setPostWork(false);
    setPreWork(false);
  };

  return (
    <Fragment>
      <Accordion id="default-accordion-example">
        <AccordionItem>
          <h2 className="accordion-header" id="headingOne">
            <button
              className={classNames("accordion-button", {
                collapsed: !preWork,
              })}
              type="button"
              onClick={t_collapse}
              style={{ cursor: "pointer" }}
            >
              Pre-Work Files
            </button>
          </h2>
          <Collapse
            isOpen={preWork}
            className="accordion-collapse"
            id="collapseOne"
          >
            <div className="accordion-body">
              <Card>
                <CardBody>
                  <TripFilesList resourceFiles={preWorkFiles} />
                </CardBody>
              </Card>
            </div>
          </Collapse>
        </AccordionItem>

        <AccordionItem>
          <h2 className="accordion-header" id="headingTwo">
            <button
              className={classNames("accordion-button", {
                collapsed: !postWork,
              })}
              type="button"
              onClick={t_postWork}
              style={{ cursor: "pointer" }}
            >
              Post-Work Files
            </button>
          </h2>
          <Collapse
            isOpen={postWork}
            className="accordion-collapse"
            id="collapseTwo"
          >
            <div className="accordion-body">
              <Card>
                <CardBody>
                  <TripFilesList resourceFiles={postWorkFiles} />
                </CardBody>
              </Card>
            </div>
          </Collapse>
        </AccordionItem>

        <AccordionItem>
          <h2 className="accordion-header" id="headingTwo">
            <button
              className={classNames("accordion-button", {
                collapsed: !workCollapse,
              })}
              type="button"
              onClick={t_work}
              style={{ cursor: "pointer" }}
            >
              Work Files
            </button>
          </h2>
          <Collapse
            isOpen={workCollapse}
            className="accordion-collapse"
            id="collapseTwo"
          >
            <div className="accordion-body">
              <Card>
                <CardBody>
                  {" "}
                  <TripFilesList resourceFiles={workFiles} />
                </CardBody>
              </Card>
            </div>
          </Collapse>
        </AccordionItem>

        <AccordionItem>
          <h2 className="accordion-header" id="headingTwo">
            <button
              className={classNames("accordion-button", {
                collapsed: !signatureCollapse,
              })}
              type="button"
              onClick={t_signature}
              style={{ cursor: "pointer" }}
            >
              Signature
            </button>
          </h2>
          <Collapse
            isOpen={signatureCollapse}
            className="accordion-collapse"
            id="collapseTwo"
          >
            <div className="accordion-body">
              <Card>
                <CardBody>
                  {" "}
                  <TripFilesList resourceFiles={signatureFiles} />
                </CardBody>
              </Card>
            </div>
          </Collapse>
        </AccordionItem>
      </Accordion>
    </Fragment>
  );
};

export default TripFiles;
