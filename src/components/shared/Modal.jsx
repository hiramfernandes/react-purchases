function Modal({ children, onClose }) {
    return (
        <>
            <div className={classes.backdrop} onClose={onClose} />
            <dialog open className={classes.modal}>
                {children}
            </dialog>   
        </>
    )
}

export default Modal;