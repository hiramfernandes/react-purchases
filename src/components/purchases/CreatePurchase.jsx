import './CreatePurchase.css';

import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import axios from "axios";
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';

const CreatePurchase = () => {
    const [purchaseUrl, setPurchaseUrl] = useState();
    const [purchaseDate, setPurchaseDate] = useState();
    const [vendorName, setVendorName] = useState();
    const [vendorId, setVendorId] = useState();
    const [amount, setAmount] = useState(0);
    const [loadedVendors, setLoadedVendors] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const customStyles = {
        option: provided => ({
          ...provided,
          color: 'black'
        }),
        control: provided => ({
          ...provided,
          color: 'black'
        }),
        singleValue: provided => ({
          ...provided,
          color: 'black'
        })
      }

    useEffect(() => {

        const sendRequest = async () => {
            try {
                const response = await axios.get("https://aspnet-mongo.azurewebsites.net/api/vendors/");
                let responseFormatted = response.data.map(function (v) {
                    return { label: v.name, value: v.id };
                })
                setLoadedVendors(responseFormatted);
            } catch (error) {
                console.log(error.message);
            }
        }

        sendRequest();
    }, []);

    const purchaseUrlChangeHandler = (event) => {
        setPurchaseUrl(event.target.value);
    }

    const handleVendorSelection = (selectedValue) => {
        console.log(`Vendor Name: ${selectedValue.label} - ID: ${selectedValue.value}`);
        setVendorId(selectedValue.value);
        setVendorName(selectedValue.label);
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
        setVendorName('');
        setVendorId('');
        setPurchaseDate('');
        setErrorMessage('');
        setErrorMessage('');
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        // Ensure data is valid
        if (!purchaseUrl ||
            purchaseUrl.length === 0 ||
            !vendorName || vendorName.length === 0 ||
            !vendorId || vendorId.length === 0 || amount == 0) {
            var msg = 'Invalid data';
            setErrorMessage(msg)
            throw new Error(msg);
        }

        const createPurchase = {
            purchaseDate: purchaseDate,
            url: purchaseUrl,
            vendorName,
            vendorId: vendorId,
            items: [],
            totalAmount: amount
        };

        console.log(createPurchase);

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
                toast.success("Purchase saved successfully");
                clearValues();
            })
            .catch(function (res) {
                console.log(res);
                toast.error(res.message);
            });
    }

    return (
        <div className='main'>
            <ToastContainer />
            <div className='createExpense__placeholder'>
                <h1>Create Purchase</h1>
                <form onSubmit={submitHandler} className='createExpense__form'>
                    <div className='createExpense__item'>
                        <label >Purchase URL</label>
                        <input id="purchase" type="text" value={purchaseUrl} onChange={purchaseUrlChangeHandler} ></input>
                    </div>
                    <div className='createExpense__item'>
                        <label >Vendor</label>
                        <Select styles={customStyles} options={loadedVendors} onChange={handleVendorSelection} />
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
                {errorMessage.length > 0 &&
                    <div className='error-dialog'>
                        <p>
                            {errorMessage}
                        </p>
                    </div>
                }
            </div>
        </div>
    );
};

export default CreatePurchase;
