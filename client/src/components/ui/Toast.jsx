import React from 'react';

const Toast = ({ title, description, action = null }) => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-md bg-red-500 text-red-800 shadow-lg w-full">
      <div className="flex flex-col flex-1">
        <strong className="font-semibold text-sm text-gray-50">{title}</strong>
        {description && (
          <p className="text-xs mt-1 text-gray-100">{description}</p>
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