import './App.css'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import CreatePurchase from './components/purchases/CreatePurchase';
import ListPurchases from './components/purchases/ListPurchases';

function App() {
  const DUMMY_PURCHASES = [
    {
        "id": "655bc864a924696403ac1d45",
        "purchaseDate": "2023-11-20T00:00:00Z",
        "purchaseUrl": "https://dfe-portal.svrs.rs.gov.br/Dfe/QrCodeNFce?p=43230993015006002590651150005011201202790587|2|1|1|079DC64445ACAA8946FD5649F8595DAA569B8633",
        "vendorName": "Bourbon Assis Brasil",
        "totalAmount": 196.22,
    },
    {
        "id": "655bc864a924696403ac1d452",
        "purchaseDate": "2023-11-20T00:00:00Z",
        "purchaseUrl": "https://dfe-portal.svrs.rs.gov.br/Dfe/QrCodeNFce?p=43230993015006002590651150005011201202790587|2|1|1|079DC64445ACAA8946FD5649F8595DAA569B8633",
        "vendorName": "Bourbon Assis Brasil",
        "totalAmount": 196.22,
        "items": []
    },
    {
      "id": "655bc864a924696403ac1d453",
      "purchaseDate": "2023-11-20T00:00:00Z",
      "purchaseUrl": "https://dfe-portal.svrs.rs.gov.br/Dfe/QrCodeNFce?p=43230993015006002590651150005011201202790587|2|1|1|079DC64445ACAA8946FD5649F8595DAA569B8633",
      "vendorName": "Bourbon Assis Brasil",
      "totalAmount": 196.22,
      "items": []
  }
];

  return (
    <Router>
      <Switch>
        <Route path="/" exact >
          <CreatePurchase />
        </Route>
        <Route path="/purchases" exact >
          <ListPurchases items={DUMMY_PURCHASES} />
        </Route>
        <Redirect to="/purchases" />
      </Switch>
    </Router>
  )
}

export default App
