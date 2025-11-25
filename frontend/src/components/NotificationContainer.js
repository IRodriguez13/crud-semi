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
          className={`toast show ${getTypeClass(notification.type)} toast-slide-in`}
          role="alert"
          style={{
            minWidth: '320px',
            maxWidth: '400px',
            marginBottom: '10px',
            animation: 'slideInRight 0.3s ease-out',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid #333',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div className="toast-header" style={{ 
            backgroundColor: 'var(--card-bg)', 
            borderBottom: '1px solid #333',
            padding: '0.75rem 1rem'
          }}>
            <span className="me-2" style={{ fontSize: '1.2rem' }}>{getIcon(notification.type)}</span>
            <strong className="me-auto" style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
              {notification.type === 'success' && 'Éxito'}
              {notification.type === 'error' && 'Error'}
              {notification.type === 'warning' && 'Advertencia'}
              {notification.type === 'info' && 'Información'}
            </strong>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => removeNotification(notification.id)}
              style={{ 
                filter: 'invert(1)',
                opacity: '0.8'
              }}
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="toast-body" style={{ 
            color: 'var(--text-primary)', 
            padding: '0.75rem 1rem',
            fontSize: '0.9rem',
            lineHeight: '1.5'
          }}>
            {notification.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;