import { categories } from "../../AdminDashboard/TicketStatus/data";
import Badges from "src/Components/Common/Badges";
import { getStatusColor } from "src/helpers/format_helper";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";

const TicketList = ({ data }) => {
  const history = useHistory();
  return (
    <Fragment>
      {categories.map((item, index) => (
        <Badges
          key={item}
          className="ticket-badge"
          data={`${item}&nbsp;&nbsp;${data[item] || 0}&nbsp;&nbsp;>&nbsp;`}
          color={getStatusColor(item)}
          style={index !== 0 ? { marginLeft: 20 } : {}}
          onClick={() => history.push(`/workRequestList/${item}`)}
        />
      ))}
    </Fragment>
  );
};

export default TicketList;
