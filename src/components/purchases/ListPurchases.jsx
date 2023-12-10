import './ListPurchases.css';

const ListPurchases = (props) => {

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
        </div>
    )
}

export default ListPurchases;