import React, { useEffect, useRef, useState } from 'react';

const Alert = ({ type, message, onClose, duration = 3000 }) => {
    const [progress, setProgress] = useState(100);
    const intervalRef = useRef();

    useEffect(() => {
        if (duration > 0) {
            const start = Date.now();
            intervalRef.current = setInterval(() => {
                const elapsed = Date.now() - start;
                const percent = Math.max(0, 100 - (elapsed / duration) * 100);
                setProgress(percent);
                if (elapsed >= duration) {
                    clearInterval(intervalRef.current);
                }
            }, 30);

            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => {
                clearInterval(intervalRef.current);
                clearTimeout(timer);
            };
        }
    }, [duration, onClose]);

    const alertStyles = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-white',
        info: 'bg-blue-500 text-white'
    };

    const progressBarColors = {
        success: 'bg-green-700',
        error: 'bg-red-700',
        warning: 'bg-yellow-700',
        info: 'bg-blue-700'
    };

    return (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${alertStyles[type]}`}>
            <div className="flex items-center justify-between">
                <span className="font-medium">{message}</span>
                <button 
                    onClick={onClose}
                    className="ml-3 text-white hover:text-gray-200 font-bold text-lg"
                >
                    ×
                </button>
            </div>
            <div className="w-full h-1 mt-3 bg-white bg-opacity-30 rounded overflow-hidden p-3">
                <div
                    className={`${progressBarColors[type]} h-full transition-all duration-100`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};
Alert.defaultProps = {
    type: 'info',
    message: 'This is an alert message',
    duration: 3000
};
export default Alert;