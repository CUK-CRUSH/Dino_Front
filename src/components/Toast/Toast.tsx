// ToastComponent.tsx

import { setToast } from '@reducer/Toast/toast';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

interface ToastComponentDTO {
  background: string;
  color: string;
  text: string;
}

const ToastComponent: React.FC<ToastComponentDTO> = ({ background, color, text }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setToast(false));
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  return (
    <div className={`z-10 fixed left-1/2 transform -translate-x-1/2 bottom-10 p-4 text-[${color}] bg-[${background}] rounded-lg h-[40px] flex items-center`}>
      <div className="text-center text-sm font-normal">{text}</div>
    </div>
  );
};

export default ToastComponent;