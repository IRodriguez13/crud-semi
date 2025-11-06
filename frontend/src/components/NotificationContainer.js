import React from 'react';
import { useNotification } from '../context/NotificationContext';

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  const getTypeClass = (type) => {
    switch (type) {
      case 'success': return 'toast-success';
      case 'error': return 'toast-error';
      case 'warning': return 'toast-warning';
      default: return 'toast-info';
    }
  };

  return (
    <div className="toast-container">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`toast show ${getTypeClass(notification.type)}`}
          role="alert"
          style={{
            minWidth: '300px',
            marginBottom: '10px',
            animation: 'slideInRight 0.3s ease-out'
          }}
        >
          <div className="toast-header" style={{ backgroundColor: 'var(--card-bg)', borderBottom: '1px solid #333' }}>
            <span className="me-2">{getIcon(notification.type)}</span>
            <strong className="me-auto" style={{ color: 'var(--text-primary)' }}>
              {notification.type === 'success' && 'Éxito'}
              {notification.type === 'error' && 'Error'}
              {notification.type === 'warning' && 'Advertencia'}
              {notification.type === 'info' && 'Información'}
            </strong>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => removeNotification(notification.id)}
              style={{ filter: 'invert(1)' }}
            ></button>
          </div>
          <div className="toast-body" style={{ color: 'var(--text-secondary)' }}>
            {notification.message}
          </div>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationContainer;