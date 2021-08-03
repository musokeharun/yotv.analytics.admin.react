import {Modal} from 'bootstrap'
import React, {useState, useEffect, useRef} from 'react'

function AppModal({children, onCancel, onConfirm, title}) {
    const [modal, setModal] = useState(null)
    const exampleModal = useRef()

    useEffect(() => {
        setModal(new Modal(exampleModal.current))
        console.log(exampleModal);
        modal.show();
    }, [])

    return (
        <>
            <div className="modal fade" ref={exampleModal} tabIndex="-1"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                            <button type="button" className="btn-close" onClick={() => modal.hide()}
                                    aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            {
                                children
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => {
                                try {
                                    onCancel && onCancel()
                                    modal.hide()
                                } catch (e) {

                                }
                            }}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={() => {
                                try {
                                    onConfirm && onConfirm()
                                    modal.hide()
                                } catch (e) {

                                }
                            }}>Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AppModal