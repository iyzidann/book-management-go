import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

const Notification = ({ notification }) => {
    const [show, setShow] = useState(false);
    const [currentNotification, setCurrentNotification] = useState(notification);

    const handleClose = () => {
        setShow(false);
    };

    const mapVariant = (bootstrapVariant) => {
        switch (bootstrapVariant) {
            case 'danger':
                return 'error';
            case 'warning':
                return 'warning';
            case 'success':
                return 'success';
            case 'info':
            default:
                return 'info';
        }
    };

    useEffect(() => {
        if (notification.show) {
            setShow(true);
            setCurrentNotification(notification);

            // Auto-hide after 5 seconds (but Snackbar handles this)
        }
    }, [notification]);

    return (
        <Snackbar
            open={show}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            <Alert
                onClose={handleClose}
                severity={mapVariant(currentNotification.variant)}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {currentNotification.message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
