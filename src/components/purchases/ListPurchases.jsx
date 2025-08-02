import './ListPurchases.css';
import fallbackImage from '/vite.svg';

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
                            <div className="purchase-item__vendor-image m-1">
                                <img src={purchase.vendorLogoUrl ?
                                    purchase.vendorLogoUrl :
                                    fallbackImage} />
                            </div>
                            <div className="purchase-item__info m-1 text-center">
                                <span className='purchase-item__descrption '>
                                    {purchase.vendorName}
                                </span>
                                <br/>
                                <span>
                                    {purchase.purchaseDate.split('T')[0]}
                                </span>
                                <span>
                                    <label className='m-1'>
                                        Total
                                    </label>
                                    <a href={purchase.purchaseUrl} target='_blank' >{purchase.totalAmount}</a><br />
                                </span>
                            </div>
                        </div>
                    </li >
                ))}
            </ul >
        </div>
    )
}

export default ListPurchases;