import { Fragment, useEffect, useState } from "react";
import { getCount } from "src/helpers/Dashboard";
import TicketList from "./TicketList";

const ActiveTickets = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchDetails = async () => {
    try {
      const response = await getCount();
      setData(response);
      setLoading(false);
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <Fragment>
      {loading ? null : <TicketList data={data} />}
      <div className="mb-3"></div>
    </Fragment>
  );
};

export default ActiveTickets;
