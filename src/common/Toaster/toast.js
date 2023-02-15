import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notify = (message, stats) => {
  toast.dismiss();
  //   toast("Your application was successfully sent", {
  //     position: "top-center",
  //     hideProgressBar: true,
  //     closeOnClick: false,
  //     className: "bg-success text-white",
  //   });
  if (typeof message === "string") {
    return stats ? toast.success(message) : toast.error(message);
  } else if (typeof message === "object") {
    let msg = "";
    message.map((item, index) => {
      msg = msg + `${index + 1}. ${item}` + "\n";
      return null;
    });
    return stats
      ? toast(msg, {
          position: "top-right",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-success text-white",
        })
      : toast.error(msg, {
          position: "top-right",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-warning text-white",
        });
  }
};
export default Notify;
