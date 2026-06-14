import './Merchants.css';


import MerchantsList from '../../components/merchants/MerchantsList';
import { useEffect, useState } from 'react';
import { login } from '../../shared/Login/auth';

const MERCHANTS = [
  {
    _id: { $oid: "6a2acc2772705d5d64120470" },
    LegalName: "COMPANHIA ZAFFARI COMERCIO E INDUSTRIA",
    TradeName: null,
    Cnpj: "93015006004968",
    Address: {
      Street: "AV ASSIS BRASIL",
      Number: "2611",
      Neighborhood: "CRISTO REDENTOR",
      City: "PORTO ALEGRE",
      State: "RS",
      Zip: null,
      Country: "BR",
    },
  },
  {
    _id: { $oid: "7b3bdd3883816e6e75231581" },
    LegalName: "H&M HENNES & MAURITZ BRAZIL IMPORTACOES LTDA",
    TradeName: "H&M",
    Cnpj: "18254355000195",
    Address: {
      Street: "AV BORGES DE MEDEIROS",
      Number: "100",
      Neighborhood: "MOINHOS DE VENTO",
      City: "PORTO ALEGRE",
      State: "RS",
      Zip: "90020020",
      Country: "BR",
    },
  },
  {
    _id: { $oid: "8c4cee4994927f7f86342692" },
    LegalName: "IGUASPORT LTDA",
    TradeName: "DECATHLON",
    Cnpj: "07882630001560",
    Address: {
      Street: "AV DIÁRIO DE NOTICIAS",
      Number: "300",
      Neighborhood: "CRISTAL",
      City: "PORTO ALEGRE",
      State: "RS",
      Zip: "90200000",
      Country: "BR",
    },
  },
];

const Merchants = () => {
  const [loadedMerchants, setLoadedMerchants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const baseApiUrl = import.meta.env.VITE_API_URL;
  const url = `${baseApiUrl}/api/merchants/`;

  useEffect(() => {

    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const email = import.meta.env.VITE_AUTH_EMAIL;
        const pwd = import.meta.env.VITE_AUTH_PWD;

        debugger;

        const loginResponse = await login(email, pwd);
        const token = loginResponse.accessToken;

        const merchantsResponse = await fetch(
          url, {
          method: 'GET',
          headers: {
            'accept': 'text/plain',
            'authorization': `Bearer ${token}`
          }
        });

        const response = await merchantsResponse.json();

        setLoadedMerchants(response);
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    }

    sendRequest();
  }, []);

  return (
    <MerchantsList merchants={MERCHANTS} />
  )
}

export default Merchants;