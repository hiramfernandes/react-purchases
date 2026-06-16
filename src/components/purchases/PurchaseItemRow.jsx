function formatCurrency(value, currency = "BRL", locale = "pt-BR") {
    if (typeof value !== "number") return "—";
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
    }).format(value);
}

const PurchaseItemRow = ({ item }) => {
    const itemTotal = item.totalPrice ?? item.unitPrice ?? item.unit_price ?? item.total_price ?? 0;
    const tags = item.tags || [];

    return (
        <div className="purchase-item-row">
            <div className="purchase-item-main">
                <div className="purchase-item-description">
                    {item.description || item.description_raw || "Unnamed item"}
                </div>

                <div className="purchase-item-meta">
                    {item.quantity != null && (
                        <span>
                            Qty: {item.quantity}
                            {item.unit ? ` ${item.unit}` : ""}
                        </span>
                    )}
                    {(item.unitPrice ?? item.unit_price) != null && (
                        <span>
                            Unit: {formatCurrency(item.unitPrice ?? item.unit_price)}
                        </span>
                    )}
                </div>

                {!!tags.length && (
                    <div className="purchase-tag-row">
                        {tags.map((tag) => (
                            <span key={tag} className="purchase-tag-chip">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="purchase-item-price">
                {formatCurrency(itemTotal)}
            </div>
        </div>
    );
}

export default PurchaseItemRow;