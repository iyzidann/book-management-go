import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const Notification = ({ notification }) => {
    const [show, setShow] = useState(false);
    const [currentNotification, setCurrentNotification] = useState(notification);

    useEffect(() => {
        if (notification.show) {
            setShow(true);
            setCurrentNotification(notification);
            
            // Auto-hide after 5 seconds
            const timer = setTimeout(() => {
                setShow(false);
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, [notification]);

    if (!show) {
        return null;
    }

    return (
        <Alert 
            variant={currentNotification.variant} 
            onClose={() => setShow(false)} 
            dismissible
            className="mb-3"
        >
            {currentNotification.message}
        </Alert>
    );
};

export default Notification;
