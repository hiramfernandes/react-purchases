import './App.css'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import CreatePurchase from './components/purchases/CreatePurchase';
import Purchases from './pages/purchases/Purchases';
import Receipts from './pages/receipts/Receipts';
import ReceiptsTable2 from './pages/receipts/ReceiptsTable2';
import MainNavigation from './shared/Navigation/MainNavigation';
import CreateVendor from './components/vendors/CreateVendor';
import CreateVendorModal from './components/vendors/CreateVendorModal';
import PurchasesContainer from './pages/purchases/PurchasesContainer';

function App() {

  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact >
            <CreatePurchase />
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
            <Receipts />
          </Route>
          <Route path="/receipts2" exact>
            <ReceiptsTable2 />
          </Route>
          <Redirect to="/purchases" />
        </Switch>
      </main>
    </Router>
  )
}

export default App
