import './CreatePurchase.css';

import { useState } from 'react'

const CreatePurchase = () => {
    const [purchaseUrl, setPurchaseUrl] = useState();
    const [vendor, setVendor] = useState();
    const [amount, setAmount] = useState(0);

    const purchaseUrlChangeHandler = (event) => {
        setPurchaseUrl(event.target.value);
    }

    const vendorChangeHandler = (event) => {
        setVendor(event.target.value);
    }

    const amountChangeHandler = (event) => {
        setAmount(event.target.value);
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        // Ensure data is valid
        if (!purchaseUrl ||
            purchaseUrl.length === 0 || 
            !vendor || vendor.length === 0 || amount == 0) {
            throw new Error('Invald data');
        }

        // Formate current date
        const currentDate = new Date();
        const dateText = currentDate.toISOString().split('T')[0];

        const createPurchase = {
            purchaseDate: dateText,
            url: purchaseUrl,
            vendorName: vendor,
            items: [],
            totalAmount: amount
        };

        fetch("https://aspnet-mongo.azurewebsites.net/api/Purchases/",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(createPurchase)
            })
            .then(function (res) { console.log(res) })
            .catch(function (res) { console.log(res) });
    }

    return (
        <div className='createExpense__placeholder'>
            <h1>Create Purchase</h1>
            <form onSubmit={submitHandler} className='createExpense__form'>
                <div className='createExpense__item'>
                    <label >Purchase URL</label>
                    <input id="purchase" type="text" onChange={purchaseUrlChangeHandler} ></input>
                </div>
                <div className='createExpense__item'>
                    <label >Vendor Name</label>
                    <input id="vendor" type="text" onChange={vendorChangeHandler} ></input>
                </div>
                <div className='createExpense__item'>
                    <label >Total Spent</label>
                    <input id="amount" type="number" min="0.01" step="0.01" onChange={amountChangeHandler} ></input>
                </div>
                <div className='createExpense__button'>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
};

export default CreatePurchase;
