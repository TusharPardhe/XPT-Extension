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

    const modalContainerStyle = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(0 0 0 / 80%)', // Dimmed background
        zIndex: '1',
        display: 'flex',
        color: 'wheat',
        justifyContent: 'center',
        alignItems: 'center',
        scrollbarWidth: 'none',
        transition: 'opacity 0.3s ease',
        opacity: isOpen ? '1' : '0',
        pointerEvents: isOpen ? 'auto' : 'none', // Disable pointer events when modal is closed
    };

    const modalContentStyle = {
        color: 'wheat',
        borderRadius: '8px',
        background: 'var(--sgray)',
        padding: '20px',
        maxWidth: '80%',
        maxHeight: '80%',
        overflowY: 'auto',
        transition: 'transform 0.4s ease',
        transform: isOpen ? 'scale(1)' : 'scale(0.5)',
        opacity: isOpen ? '1' : '0',
        scrollbarWidth: 'none',
        border: '1px solid #f5deb378',
    };

    return (
        <div style={modalContainerStyle} onClick={handleClose}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                <Icon
                    name="close"
                    link
                    style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}
                    onClick={handleClose}
                />
                <h2
                    style={{
                        fontFamily: 'Cinzel Decorative',
                        paddingBottom: '10px',
                        textAlign: 'center',
                        margin: '10px',
                    }}
                >
                    {heading}
                </h2>
                {content}
            </div>
        </div>
    );
};

export default ScrollableModal;
