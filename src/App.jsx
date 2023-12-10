import './App.css'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import CreatePurchase from './components/purchases/CreatePurchase';
import Purchases from './pages/purchases/Purchases';
import MainNavigation from './shared/Navigation/MainNavigation';

function App() {


  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact >
            <CreatePurchase />
          </Route>
          <Route path="/purchases" exact >
            <Purchases />
          </Route>
          <Redirect to="/purchases" />
        </Switch>
      </main>
    </Router>
  )
}

export default App
