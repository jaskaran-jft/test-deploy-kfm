import { Badge } from "reactstrap";

const Badges = ({ data, color = "primary", style = {}, ...props }) => {
  return (
    <Badge color={color} style={{ width: "max-content", ...style }} {...props}>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </Badge>
  );
};

export default Badges;
