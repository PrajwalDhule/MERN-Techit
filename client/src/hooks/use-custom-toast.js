import React from 'react'
import Toast from '../components/ui/Toast'
import { toast } from 'react-toastify'

const useCustomToast = () => {
  const customToast = (title, description, action = null) => {
    if (!toast.isActive("login-toast")) {
      toast(<Toast title={title} description={description} action={action}/>, {
        closeButton: false,
        className: 'p-0 w-[300px] border border-purple-600/40',
        toastId: "login-toast"
      });
    }
  }

  return { customToast }
}

export default useCustomToast;