import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastifyConfig = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default ToastifyConfig;
