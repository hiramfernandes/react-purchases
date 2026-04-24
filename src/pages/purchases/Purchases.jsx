import React, { useEffect, useState } from "react";

import { login } from '../../shared/Login/auth.js';

import ListPurchases from "../../components/purchases/ListPurchases";
import LoadingSpinner from '../../shared/UiElements/LoadingSpinner';

const Purchases = () => {
  const [loadedPurchases, setLoadedPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const baseApiUrl = import.meta.env.VITE_API_URL;
  const url = `${baseApiUrl}/api/purchases/`;

  useEffect(() => {

    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const purchasesResponse = await fetch(
          url, {
          method: 'GET',
          headers: {
            'accept': 'text/plain'
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
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPurchases && <ListPurchases items={loadedPurchases} />}
    </React.Fragment>
  );
};

export default Purchases;
