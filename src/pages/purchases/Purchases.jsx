import React, { useEffect, useState } from "react";
import axios from "axios";

import ListPurchases from "../../components/purchases/ListPurchases";
import LoadingSpinner from '../../shared/UiElements/LoadingSpinner';

const Purchases = () => {
  const [loadedPurchases, setLoadedPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://aspnet-mongo.azurewebsites.net/api/purchases/");
        setLoadedPurchases(response.data);
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
