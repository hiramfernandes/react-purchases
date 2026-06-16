import React, { useEffect, useMemo, useState } from "react";
import { login } from "../../shared/Login/auth";

import PurchaseCard from "../../components/purchases/PurchaseCard";

import './PurchasesContainer.css'

export default function PurchasesContainer() {
      const [loadedPurchases, setLoadedPurchases] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
    
      const baseApiUrl = import.meta.env.VITE_API_URL;
      const url = `${baseApiUrl}/api/purchases/`;
    
      useEffect(() => {
    
        const sendRequest = async () => {
          setIsLoading(true);
          try {
            const email = import.meta.env.VITE_AUTH_EMAIL;
            const pwd = import.meta.env.VITE_AUTH_PWD;
    
            const loginResponse = await login(email, pwd);
            const token = loginResponse.accessToken;
    
            const purchasesResponse = await fetch(
              url, {
              method: 'GET',
              headers: {
                'accept': 'text/plain',
                'authorization': `Bearer ${token}`
              }
            });
    
            const response = await purchasesResponse.json();
    
            setLoadedPurchases(response);
          } catch (error) {
            console.log(error.message);
          }
          setIsLoading(false);
        }
    
        sendRequest();
      }, []);

    return (
        <section className="purchases-shell">
            <div className="purchases-container">
                <header className="purchases-header">
                    <div>
                        <h2 className="purchases-title">Summary</h2>
                        <p className="purchases-subtitle">
                            Purchases, receipt data, items and tags
                        </p>
                    </div>
                </header>

                <div className="purchases-list">
                    {loadedPurchases.map((purchase, index) => (
                        <PurchaseCard
                            key={purchase.purchaseUrl || purchase.transaction?.access_key_44 || index}
                            purchase={purchase}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
