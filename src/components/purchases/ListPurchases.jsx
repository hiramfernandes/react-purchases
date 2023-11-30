const ListPurchases = () => {
    const DUMMY_PURCHASES = [
        {
            "id": "655bc864a924696403ac1d45",
            "purchaseDate": "2023-11-20T00:00:00Z",
            "purchaseUrl": "https://dfe-portal.svrs.rs.gov.br/Dfe/QrCodeNFce?p=43230993015006002590651150005011201202790587|2|1|1|079DC64445ACAA8946FD5649F8595DAA569B8633",
            "vendorName": "Bourbon Assis Brasil",
            "totalAmount": 196.22,
        },
        {
            "id": "655bc864a924696403ac1d45",
            "purchaseDate": "2023-11-20T00:00:00Z",
            "purchaseUrl": "https://dfe-portal.svrs.rs.gov.br/Dfe/QrCodeNFce?p=43230993015006002590651150005011201202790587|2|1|1|079DC64445ACAA8946FD5649F8595DAA569B8633",
            "vendorName": "Bourbon Assis Brasil",
            "totalAmount": 196.22,
            "items": []
        }
    ];


    return (
        <div className='createExpense__placeholder'>
            <h1>Purchases</h1>
            <ul>
                <li className='expense-item'>
                    Item 1 - 50 R$ - Bourbon Assis Brasil - 2023-11-28
                </li>
            </ul>
        </div>
    )
}

export default ListPurchases;