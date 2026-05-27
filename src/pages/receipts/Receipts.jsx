import './Receipts.css'

import React, { useEffect, useState } from "react";
import { login } from '../../shared/Login/auth.js';
import LoadingSpinner from '../../shared/UiElements/LoadingSpinner';
import ListReceipts from '../../components/receipts/ListReceipts';

const Receipts = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [loadedReceipts, setLoadedReceipts] = useState([]);

    const baseApiUrl = import.meta.env.VITE_API_URL;
    const url = `${baseApiUrl}/api/receipts/`;

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try {
                const email = import.meta.env.VITE_AUTH_EMAIL;
                const pwd = import.meta.env.VITE_AUTH_PWD;

                const loginResponse = await login(email, pwd);
                const token = loginResponse.accessToken;
                const receiptsResponse = await fetch(
                    url, {
                    method: 'GET',
                    headers: {
                        'accept': 'text/plain',
                        'authorization': `Bearer ${token}`
                    }
                });

                const response = await receiptsResponse.json();

                setLoadedReceipts(response);
            } catch (error) {
                console.log(error.message);
            }
            setIsLoading(false);
        }

        sendRequest();
    }, []);

    return (
        <React.Fragment>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedReceipts &&
                <div className="container">
                    <h1 className='receipts_title'>Receipts</h1>
                     <ListReceipts items={loadedReceipts} />
                </div>
            }
        </React.Fragment>
    );
}

export default Receipts;