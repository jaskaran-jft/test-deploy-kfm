const TableLink = ({ value, onClick }) => {
  return (
    <div onClick={onClick} className="table_link">
      {value}
    </div>
  );
};

export default TableLink;
