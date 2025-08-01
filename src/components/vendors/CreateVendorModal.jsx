import { useState } from "react";

import classes from './CreateVendorModal.module.css';

function CreateVendorModal({ onCancel }) {
    const [enteredName, setEnteredName] = useState("");
    const [enteredLocation, setEnteredLocation] = useState("");
    const [enteredLogo, setEnteredLogo] = useState("");

    function nameChangeHandler(event) {
        setEnteredName(event.target.value);
    }

    function onAddVendor(postData) {
        console.log(postData)
    }

    function onCancel() {
        console.log('Cancelled')
    }

    function locationChangeHandler(event) {
        setEnteredLocation(event.target.value);
    }

    function logoChangeHandler(event) {
        setEnteredLogo(event.target.value);
    }

    function submitHandler(event) {
        event.preventDefault();
        const postData = {
            name: enteredName,
            location: enteredLocation,
            logoUrl: enteredLogo
        };

        fetch("https://aspnet-mongo.azurewebsites.net/api/Vendors/",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(postData)
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

    return (
        <form onSubmit={submitHandler}>
            <p>
                <label htmlFor='name'>Vendor Name</label>
                <textarea id='name' required rows={3} onChange={nameChangeHandler}></textarea>
            </p>
            <p>
                <label htmlFor='location'>Location</label>
                <textarea id='location' required rows={3} onChange={locationChangeHandler}></textarea>
            </p>
            <p>
                <label htmlFor='logo'>Logo URL</label>
                <textarea id='logo' required rows={3} onChange={logoChangeHandler}></textarea>
            </p>
            <p className={classes.actions}>
                <button type="button" onClick={onCancel} >Cancel</button>
                <button>Submit</button>
            </p>
        </form>
    );
}

export default CreateVendorModal;
