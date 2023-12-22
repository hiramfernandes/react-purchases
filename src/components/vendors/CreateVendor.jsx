import React, { useState } from "react"
import { ToastContainer, toast }  from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import './CreateVendor.css';

const CreateVendor = () => {
    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [logoUrl, setLogoUrl] = useState();

    const submitHandler = (event) => {
        event.preventDefault();

        const createVendor = {
            name,
            location,
            logoUrl
        };

        fetch("https://aspnet-mongo.azurewebsites.net/api/Vendors/",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(createVendor)
            })
            .then(function (res) {
                console.log(res);
                toast.success("Vendor saved successfully");
                clearValues();
            })
            .catch(function (res) { 
                console.log(res);
                toast.error(res.message);
            });
    }

    const nameChangeHandler = (event) => {
        let nameInput = event.target.value;
        console.log(`Name Input: ${nameInput}`);
        setName(nameInput);
    }

    const logoChangeHandler = (event) => {
        let logoUrlInput = event.target.value;
        console.log(`Logo URL: ${logoUrlInput}`);
        setLogoUrl(logoUrlInput);
    }

    const locationChangeHandler = (event) => {
        let locationInput = event.target.value;
        console.log(`Location URL: ${locationInput}`);
        setLocation(locationInput);
    }

    const clearValues = () => {
        setName('');
        setLocation('');
        setLogoUrl('');
    }

    return (
        <div className="main">
            <ToastContainer />
            <div className="createExpense__placeholder">
                <h1> Create Vendor </h1>
                <form onSubmit={submitHandler} className='create-vendor__form'>
                    <div className='create-vendor__item'>
                        <label >Vendor Name</label>
                        <input id="name" type="text" value={name} onChange={nameChangeHandler} ></input>
                    </div>
                    <div className='create-vendor__item'>
                        <label >Location</label>
                        <input id="location" type="text" value={location} onChange={locationChangeHandler} ></input>
                    </div>
                    <div className='create-vendor__item'>
                        <label >Logo</label>
                        <input id="logoUrl" type="text" value={logoUrl} onChange={logoChangeHandler} ></input>
                    </div>

                    <div className='create-vendor__button'>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateVendor;
