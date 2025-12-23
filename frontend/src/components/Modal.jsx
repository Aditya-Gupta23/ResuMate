import { modalStyles } from "../assets/dummystyle";
import { X } from 'lucide-react';

const Modal = ({children, isOpen, onClose, title, hideHeader, showActionBtn, actionBtnIcon = null,
    actionBtnText, onActionClick = () => { } }) => {
    if(!isOpen) return null;
    return (
        <div className={modalStyles.overlay}>
            <div className={modalStyles.container}>
                {!hideHeader && (
                    <div className={modalStyles.header}>
                        <h3 className={modalStyles.title}>
                            {title}
                        </h3>

                        {showActionBtn && (
                            <button className={modalStyles.actionButton} onClick={onActionClick}>
                                {actionBtnIcon}
                                {actionBtnText}
                            </button>
                        )}
                    </div>
                )}

                <button type='button' className={modalStyles.closeButton} onClick={onClose}> 
                    <X size={20} />
                </button>
                <div className={modalStyles.body}>{children}</div>
            </div>
        </div>
    );
}

export default Modal;