import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = {
  success: (message) => {
    toast.success(message, {
      className: "custom-toast success",
    });
  },

  error: (message) => {
    toast.error(message, {
      className: "custom-toast error",
    });
  },

  info: (message) => {
    toast.info(message, {
      className: "custom-toast info",
    });
  },
};
