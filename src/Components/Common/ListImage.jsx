import { noop } from "src/helpers/format_helper";

const ListImage = ({ file = "", handleFileDelete = noop, index = "" }) => {
  return (
    <div id="container" style={{ width: "180px" }}>
      <button
        id="x"
        style={{ top: "-2px", borderRadius: "44px" }}
        type="button"
        onClick={(e) => handleFileDelete(e, index)}
      >
        X
      </button>
      <img
        alt="Logo"
        src={URL.createObjectURL(file)}
        style={{
          height: "11rem",
          width: "180px",
          objectFit: "fill",
          cursor: "pointer",
        }}
        onClick={() => {
          window.open(URL.createObjectURL(file), "_blank").focus();
        }}
      />
    </div>
  );
};

export default ListImage;
