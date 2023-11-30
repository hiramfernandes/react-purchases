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
                    <li key={purchase.id} > {purchase.totalAmount} {purchase.vendorName} {purchase.purchaseDate.toString()} </li>
                ))}
            </ul>
        </div>
    )
}

export default ListPurchases;