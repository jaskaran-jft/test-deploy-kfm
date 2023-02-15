import CountUp from "react-countup";

const ClientWidgetCount = ({ item }) => {
  return (
    <CountUp
      start={0}
      prefix={item.prefix}
      suffix={item.suffix}
      separator={item.separator}
      end={item?.data || 0}
      decimals={item.decimals}
      duration={4}
    />
  );
};

export default ClientWidgetCount;
