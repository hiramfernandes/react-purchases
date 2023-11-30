import './App.css'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import CreatePurchase from './components/purchases/CreatePurchase';
import ListPurchases from './components/purchases/ListPurchases';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact >
          <CreatePurchase />
        </Route>
        <Route path="/purchases" exact >
          <ListPurchases />
        </Route>
        <Redirect to="/purchases" />
      </Switch>
    </Router>
  )
}

export default App
