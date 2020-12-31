import React from 'react';

export interface INotifyProps {
  type: 'info' | 'error' | undefined;
  msg: string;
}

export const NOTIFY_CLASS_NAME = {
  info: 'bg-indigo-200 text-indigo-600',
  success: 'bg-green-200 text-green-600',
  error: 'bg-red-200 text-red-600',
};

const Notify: React.FC<INotifyProps> = ({ type, msg }) => {
  const typeClass = !type ? NOTIFY_CLASS_NAME.info : NOTIFY_CLASS_NAME[type];

  return (
    <div className={`${typeClass} shadow px-4 py-5 sm:px-6 rounded-lg`}>
      {msg}
    </div>
  );
};

export default Notify;
