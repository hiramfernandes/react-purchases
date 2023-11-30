import './CreatePurchase.css';

import { useState } from 'react'

const CreatePurchase = () => {
    const [purchaseUrl, setPurchaseUrl] = useState();
    const [purchaseDate, setPurchaseDate] = useState();
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

    const purchaseDateHandler = (event) => {
        setPurchaseDate(event.target.value);
        console.log(event.target.value);
    }

    const clearValues = () => {
        setPurchaseUrl('');
        setAmount('');
        setVendor('');
        setPurchaseDate('');
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        // Ensure data is valid
        if (!purchaseUrl ||
            purchaseUrl.length === 0 ||
            !vendor || vendor.length === 0 || amount == 0) {
            throw new Error('Invald data');
        }

        const createPurchase = {
            purchaseDate: purchaseDate,
            url: purchaseUrl,
            vendorName: vendor,
            items: [],
            totalAmount: amount
        };

        fetch("https://aspnet-mongo.azurewebsites.net/api/purchases/",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(createPurchase)
            })
            .then(function (res) {
                console.log(res);
                clearValues();
            })
            .catch(function (res) { console.log(res) });
    }

    return (
        <div className='main'>
            <div className='createExpense__placeholder'>
                <h1>Create Purchase</h1>
                <form onSubmit={submitHandler} className='createExpense__form'>
                    <div className='createExpense__item'>
                        <label >Purchase URL</label>
                        <input id="purchase" type="text" value={purchaseUrl} onChange={purchaseUrlChangeHandler} ></input>
                    </div>
                    <div className='createExpense__item'>
                        <label >Vendor Name</label>
                        <input id="vendor" type="text" value={vendor} onChange={vendorChangeHandler} ></input>
                    </div>
                    <div className='createExpense__item'>
                        <label >Purchase Date</label>
                        <input id="purchaseDate" type="date" min="2023-01-01" value={purchaseDate} onChange={purchaseDateHandler} ></input>
                    </div>
                    <div className='createExpense__item'>
                        <label >Total Spent</label>
                        <input id="amount" type="number" min="0.01" step="0.01" value={amount} onChange={amountChangeHandler} ></input>
                    </div>
                    <div className='createExpense__button'>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePurchase;
