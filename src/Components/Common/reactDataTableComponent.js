import { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import Notify from "../../common/Toaster/toast";
import { useSelector } from "react-redux";
import { noop } from "src/helpers/format_helper";

createTheme("dark", {
  background: {
    default: "transparent",
  },
});

const ReactDataTable = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filterObj, setFilterObj] = useState({
    currentPage,
    pageLength: 25,
    sortColumn: props.columns[0].sortName,
    sortType: "desc",
    filter: props.filterData,
  });

  const { layoutModeType } = useSelector((state) => state.Layout);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setFilterObj((prev) => {
      return {
        ...prev,
        currentPage: page,
      };
    });
  };

  useEffect(() => {
    fetchData(filterObj, setFirst);
  }, []);

  useEffect(() => {
    if (data.length || first) {
      fetchData(filterObj);
    }
  }, [filterObj, props?.id]);

  useEffect(() => {
    setFilterObj((prev) => {
      return {
        ...prev,
        filter: props.filterData,
      };
    });
  }, [props.filterData]);

  const handlePerRowsChange = async (newPerPage, page) => {
    setFilterObj((prev) => {
      return {
        ...prev,
        pageLength: newPerPage,
      };
    });
  };

  const fetchData = async (data, setFirst = noop) => {
    setLoading(true);
    try {
      const response = props.api ? await props.api(data) : { data: props.data };
      setData(response.data || []);
      setTotal(response.count || 0);
      setLoading(false);
      setFirst(true);
    } catch (err) {
      Notify(err, false);
      setLoading(false);
      setFirst(true);
    }
  };

  const handleSort = async (column, sortDirection) => {
    setFilterObj((prev) => {
      return {
        ...prev,
        sortColumn: column.sortName,
        sortType: sortDirection,
      };
    });
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: "47px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  return (
    <div
      className={`${layoutModeType === "dark" ? "table-dark" : "table-light"}`}
    >
      <DataTable
        title={props.title}
        columns={props.columns}
        data={data}
        theme={layoutModeType}
        pagination
        progressPending={loading}
        paginationServer
        //   paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        //   paginationDefaultPage={2}
        paginationRowsPerPageOptions={[25, 50, 100]}
        //   sortFunction={(rows, field, direction) => getSort(rows, field, direction)}
        onSort={handleSort}
        currentPage={currentPage}
        //   paginationTotalRows={Math.ceil(total / perPage)}
        paginationTotalRows={total}
        customStyles={customStyles}
        style={{ whiteSpace: "unset" }}
      />
    </div>
  );
};

export default ReactDataTable;
