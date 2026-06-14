import './App.css'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import CreatePurchase from './components/purchases/CreatePurchase';
import Purchases from './pages/purchases/Purchases';
import Receipts from './pages/receipts/Receipts';
import ReceiptsTable from './pages/receipts/ReceiptsTable';
import MainNavigation from './shared/Navigation/MainNavigation';
import CreateVendor from './components/vendors/CreateVendor';
import CreateVendorModal from './components/vendors/CreateVendorModal';
import PurchasesContainer from './pages/purchases/PurchasesContainer';
import Merchants from './pages/merchants/Merchants';

function App() {

  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact >
            <PurchasesContainer />
          </Route>
          <Route path="/purchases" exact>
            <PurchasesContainer />
          </Route>
          <Route path="/purchases2" exact >
            <Purchases />
          </Route>
          <Route path="/vendor" exact >
            <CreateVendor />
          </Route>
          <Route path="/modalvendor" exact >
            <CreateVendorModal />
          </Route>
          <Route path="/vendors" exact >
            <CreateVendor />
          </Route>
          <Route path="/receipts" exact>
            <ReceiptsTable />
          </Route>
          <Route path='/merchants' exact>
            <Merchants />
          </Route>
          <Redirect to="/purchases" />
        </Switch>
      </main>
    </Router>
  )
}

export default App
