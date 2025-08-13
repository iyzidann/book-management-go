import React from 'react';
import { Alert } from 'react-bootstrap';

const Notification = ({ notification, setNotification }) => {
    if (!notification.show) {
        return null;
    }

    return (
        <Alert variant={notification.variant} onClose={() => setNotification({ ...notification, show: false })} dismissible>
            {notification.message}
        </Alert>
    );
};

export default Notification;
