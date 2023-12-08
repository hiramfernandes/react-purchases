import './ListPurchases.css';
import axios from 'axios';

const ListPurchases = (props) => {

    // TODO: Perform this call through Axios
    const getPurchases = async () => {
        axios.get("https://aspnet-mongo.azurewebsites.net/api/purchases/")
            .then(function (result) {
                debugger;
                console.log(result.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        const response = await fetch("https://aspnet-mongo.azurewebsites.net/api/purchases/");
        if (response.ok) {
            debugger;
            var receivedData = await response.json();
            console.log(receivedData);

            if (receivedData && receivedData.length > 0) {
                props.items = receivedData;
            }
        }
    }

    if (props.items.length === 0) {
        return <div className="center">
            <h2>No purchases found.</h2>
        </div>
    }

    return (
        <div className='createExpense__placeholder'>
            <h1>Purchases</h1>
            <ul>
                {props.items.map(purchase => (
                    <li key={purchase.id} >
                        <div className="purchase-item__content">
                            <div className="purchase-item__vendor-image">
                                <img src="https://pbs.twimg.com/profile_images/1280601592350289921/QHXBK1ns_400x400.jpg" />
                            </div>
                            <div className="purchase-item__info">
                                Total: {purchase.totalAmount} {purchase.vendorName} {purchase.purchaseDate.split('T')[0]}
                            </div>
                        </div>
                    </li >
                ))}
            </ul >
            <div>
                <button type="button" onClick={getPurchases}>Get Purchases</button>
            </div>    
        </div>
    )
}

export default ListPurchases;