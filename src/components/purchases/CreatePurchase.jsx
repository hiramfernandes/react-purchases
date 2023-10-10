import './CreatePurchase.css';

import { useState } from 'react'

const CreatePurchase = () => {
    const [purchaseUrl, setPurchaseUrl] = useState();
    const [vendor, setVendor] = useState();
    const [amount, setAmount] = useState(0);

    const purchaseUrlChangeHandler = (event) => {
        setPurchaseUrl(event.target.value);
        console.log(purchaseUrl);
    }

    const vendorChangeHandler = (event) => {
        setVendor(event.target.value);
        console.log(vendor);
    }

    const amountChangeHandler = (event) => {
        setAmount(event.target.value);
        console.log(amount);
    }

    const submitHandler = async (event) => {
        debugger;
        const createPurchase = {
            purchaseUrl: purchaseUrl,
            vendor: vendor,
            amount: amount
        };

        console.log(createPurchase);
        event.preventDefault();
    }

    return (
        <div className='createExpense__placeholder'>
            <h1>Save Purchase</h1>
            <form onSubmit={submitHandler} className='createExpense__form'>
                <div className='createExpense__item'>
                    <label >Purchase URL</label>
                    <input id="purchase" type="text" onChange={purchaseUrlChangeHandler} ></input>
                </div>
                <div className='createExpense__item'>
                    <label >Vendor</label>
                    <input id="vendor" type="text" onChange={vendorChangeHandler} ></input>
                </div>
                <div className='createExpense__item'>
                    <label >Total Spent</label>
                    <input id="amount" type="number" min="0.01" step="0.01" onChange={amountChangeHandler} ></input>
                </div>
                <div className='createExpense__item'>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
};

export default CreatePurchase;
