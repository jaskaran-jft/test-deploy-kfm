import { Fragment, useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useSelector } from "react-redux";
import { getTradesList, updateVendorTrades } from "src/helpers/Vendors";
import { CONSTANT } from "src/utils/constant";
import Notify from "src/common/Toaster/toast";
import Loading from "src/common/Loader";
import { Link } from "react-router-dom";
import { Badge, Form, Row } from "reactstrap";
import Badges from "src/Components/Common/Badges";

const TradesComponent = (props) => {
  const [edit, setEdit] = useState(false);
  const { tags } = useSelector((state) => state.Login);
  const [loading, setLoading] = useState(false);
  const [tradeList, setTradeList] = useState([]);
  const [trade, setTrade] = useState([]);

  const { data = {} } = props;
  const { trades = [] } = data;

  useEffect(() => {
    fetchVendorTrades();
  }, [data]);

  const fetchVendorTrades = async () => {
    try {
      const response = await getTradesList();
      const list = response.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      setTradeList(list);
    } catch (err) {
      console.log("Error ", err);
    }
  };

  useEffect(() => {
    if (props.currentTab !== props.id) {
      setEdit(false);
    }
  }, [props.currentTab, props.id]);

  useEffect(() => {
    const list = trades.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    setTrade(list);
  }, [trades]);

  const handleTradeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        tradeId: trade.map((item) => item.value),
      };
      const response = await updateVendorTrades(payload, data.id);
      Notify(response.message || "Success", true);
      setEdit(false);
      setLoading(false);
      props.update();
    } catch (error) {
      Notify(error || "Error", false);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Form>
        {!edit && tags.includes(CONSTANT.UPDATE_VENDOR_INFO) && (
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
          <Row>
            {!edit &&
              trades.map((item, index) => (
                <Badges key={item} data={`&nbsp;${item?.name}&nbsp;&nbsp;`} style={{paddingTop: 8, paddingBottom:10}} />
              ))}

            {edit && (
              <div className="mb-3 md-5 w-40">
                <MultiSelect
                  options={tradeList}
                  value={trade}
                  onChange={(value) => {
                    setTrade(value);
                  }}
                  name={`trades`}
                  labelledBy="Select Trades*"
                />
              </div>
            )}
            {edit && (
              <div className="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleTradeSubmit}
                >
                  Save
                </button>
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
              </div>
            )}
          </Row>
        )}
      </Form>
    </Fragment>
  );
};

export default TradesComponent;
