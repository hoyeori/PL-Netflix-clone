import React, { useEffect } from 'react'

const useModalClose = (modalRef, setModalOpen) => {

    useEffect(() => {
        const handleClick = (e) => {
            if (!modalRef.current.contain(e.target)) {
                setModalOpen(false);
            }
        };
        window.addEventListener("click", handleClick);

        return () => { window.removeEventListener("click", handleClick); }
    }, [])

}

export default useModalClose