import React, { useEffect, useState } from 'react';

import { Icon } from 'semantic-ui-react';

const ScrollableModal = ({ open, onClose, heading = 'Heading', content = 'Content' }) => {
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const handleClose = () => {
        setIsOpen(false);
        if (onClose) onClose();
    };

    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: isOpen ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
        backgroundColor: 'rgba(128, 128, 128, 0.87)', // Dimmed background
        color: 'wheat',
        width: '100%',
        height: '100%',
        zIndex: '1',
        display: isOpen ? 'block' : 'none',
    };

    const contentStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: '2',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#18191a',
        color: 'wheat',
        borderRadius: '20px',
        width: '80%',
        maxWidth: '350px',
        maxHeight: '80%',
        overflowY: 'auto',
        padding: '20px',
    };

    return (
        <>
            {isOpen && (
                <>
                    <div style={modalStyle} onClick={handleClose}></div>
                    <div style={contentStyle}>
                        <Icon
                            name="close"
                            link
                            style={{ position: 'absolute', top: '10px', right: '10px' }}
                            onClick={handleClose}
                        />
                        <h2 style={{ fontFamily: 'Cinzel Decorative', paddingBottom: '10px' }}>{heading}</h2>
                        {content}
                    </div>
                </>
            )}
        </>
    );
};

export default ScrollableModal;
