import { useState } from 'react'
import './App.css'

function App() {
  const [purchaseUrl, setPurchaseUrl] = useState();
  const [vendor, setVendor] = useState();
  const [amount, setAmount] = useState(0);

  const purchaseUrlChangeHandler = (event) => {
    setPurchaseUrl(event.target.value);
    console.log(purchaseUrl);
  }

  const vendorChangeHandler = (event) => {
    setVendor(event.target.value);
    console.log(vendor);
  }

  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
    console.log(amount);
  }

  const submitHandler = (event) => {
    const createPurchase = {
      purchaseUrl: purchaseUrl,
      vendor: vendor,
      amount: amount
    };

    console.log(createPurchase);
    event.preventDefault();
  }

  return (
    <>
      <h1>Save Purchase</h1>
      <div className="card">
        <form onSubmit={submitHandler}>
          <div>
            <label for="purchase">Purchase URL</label>
            <input id="purchase" type="text" onChange={purchaseUrlChangeHandler} ></input>
          </div>
          <div>
            <label for="vendor">Vendor</label>
            <input id="vendor" type="text" onChange={vendorChangeHandler} ></input>
          </div>
          <div>
            <label for="amount">Total Spent</label>
            <input id="amount" type="number" min="0.01" step="0.01" onChange={amountChangeHandler} ></input>
          </div>
          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default App
