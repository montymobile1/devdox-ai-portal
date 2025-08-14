import React from 'react';
import { useNotification } from '../../hooks/useNotification';

// Demo component to test the notification system
export function NotificationDemo() {
  const { showSuccess, showError, showInfo, showWarning } = useNotification();

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Notification System Demo</h3>
      <div className="flex space-x-2">
        <button
          onClick={() => showSuccess('Repository added successfully!', 'Success')}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Test Success
        </button>
        <button
          onClick={() => showError('Failed to add repository', 'Error')}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Test Error
        </button>
        <button
          onClick={() => showInfo('Repository is being processed', 'Info')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Test Info
        </button>
        <button
          onClick={() => showWarning('Token expires soon', 'Warning')}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Test Warning
        </button>
      </div>
    </div>
  );
}
