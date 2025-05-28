import React from "react";
import Toast from "../components/ui/Toast";
import { toast } from "react-toastify";

const useCustomToast = () => {
  const customToast = (type, title, description, action = null) => {
    toast.dismiss();
    toast(
      <Toast
        type={type}
        title={title}
        description={description}
        action={action}
      />,
      {
        closeButton: false,
        className: "p-0 w-[300px] border border-purple-600/40",
      }
    );
  };

  return { customToast };
};

export default useCustomToast;
