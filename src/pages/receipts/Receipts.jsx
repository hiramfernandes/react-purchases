import './Receipts.css'

import React, { useEffect, useState } from "react";
import { login } from '../../shared/Login/auth.js';
import LoadingSpinner from '../../shared/UiElements/LoadingSpinner';

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
                    <table className="table table-striped  table-secondary">
                        <thead>
                            <tr>
                                <th>Received Date</th>
                                <th>URL</th>
                                <th>Status</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadedReceipts.map(receipt => (
                                <tr  className='table-light ' key={receipt.url}>
                                    <td>{receipt.receivedDate}</td>
                                    <td><a href={receipt.url} target="_blank" rel="noopener noreferrer">{receipt.url.slice(0, 50)}</a></td>
                                    <td>{receipt.processed ? 'OK' : 'No'}</td>
                                    <td>{receipt.processingMessage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </React.Fragment>
    );
}

export default Receipts;