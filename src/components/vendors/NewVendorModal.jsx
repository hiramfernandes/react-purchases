import { forwardRef } from 'react'
import CreateVendor from './CreateVendor'

const NewVendorModal = forwardRef(function NewVendorModal({}, ref ) {
    return (
        <dialog ref={ref}>
            <CreateVendor/>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    );
});

export default NewVendorModal;