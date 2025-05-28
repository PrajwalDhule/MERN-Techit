import React from 'react';

const Toast = ({ type = "info", title, description, action = null }) => {
  const colors = {
    success: {
      bg: 'bg-green-500',
      title: 'text-gray-50',
      desc: 'text-gray-100'
    },
    error: {
      bg: 'bg-red-500',
      title: 'text-gray-50',
      desc: 'text-gray-100'
    },
    info: {
      bg: 'bg-gray-500',
      title: 'text-gray-50',
      desc: 'text-gray-100'
    }
  }
  return (
    <div className={`flex items-start gap-4 p-4 rounded-md shadow-lg w-full ${colors[type].bg}`}>
      <div className="flex flex-col flex-1">
        <strong className={`font-semibold text-sm ${colors[type].title}`}>{title}</strong>
        {description && (
          <p className={`text-xs mt-1 text-gray-100 ${colors[type].desc}`}>{description}</p>
        )}
      </div>
      {action && (
        <div className="shrink-0">
          <button className="text-sm font-medium text-black bg-gray-50 px-4 py-2 rounded-md hover:bg-gray-100">
            {action}
          </button>
        </div>
      )}
    </div>
  );
};

export default Toast;