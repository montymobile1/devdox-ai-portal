import React from 'react';
import { X, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';
import { Notification, NotificationType } from '../../hooks/useNotification';

interface NotificationItemProps {
  notification: Notification;
  onClose: (id: string) => void;
}

const notificationStyles: Record<NotificationType, string> = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
};

const iconStyles: Record<NotificationType, string> = {
  success: 'text-green-400',
  error: 'text-red-400',
  info: 'text-blue-400',
  warning: 'text-yellow-400',
};

const icons: Record<NotificationType, React.ComponentType<{ className?: string }>> = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

function NotificationItem({ notification, onClose }: Readonly<NotificationItemProps>) {
  const Icon = icons[notification.type];

  return (
    <div
      className={`
        flex items-start space-x-3 p-4 rounded-lg border shadow-lg transform transition-all duration-300 ease-in-out
        ${notificationStyles[notification.type]}
      `}
    >
      <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconStyles[notification.type]}`} />
      
      <div className="flex-1 min-w-0">
        {notification.title && (
          <h4 className="text-sm font-medium mb-1">
            {notification.title}
          </h4>
        )}
        <p className="text-sm">
          {notification.message}
        </p>
      </div>

      <button
        onClick={() => onClose(notification.id)}
        className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

interface NotificationContainerProps {
  notifications: Notification[];
  onClose: (id: string) => void;
}

export function NotificationContainer({ notifications, onClose }: Readonly<NotificationContainerProps> ) {
  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
