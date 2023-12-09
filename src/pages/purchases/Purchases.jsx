import React, { useEffect, useState } from "react";
import axios from "axios";

import ListPurchases from "../../components/purchases/ListPurchases";

const Purchases = () => {
  const [loadedPurchases, setLoadedPurchases] = useState([]);

  useEffect(() => {
    axios
      .get("https://aspnet-mongo.azurewebsites.net/api/purchases/")
      .then(function (response) {
        debugger;
        console.log(response.data);
        setLoadedPurchases(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <ListPurchases items={loadedPurchases} />
      </React.Fragment>
  );
};

export default Purchases;
