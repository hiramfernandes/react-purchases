import { useState, useMemo } from "react";

import PurchaseItemRow from "./PurchaseItemRow";

function getVendorName(purchase) {
    return (
        purchase.vendor?.name ||
        purchase.vendorName ||
        purchase.merchant?.legal_name ||
        "Unknown vendor"
    );
}

function getVendorLocation(purchase) {
    if (purchase.vendor?.location?.formatted) return purchase.vendor.location.formatted;

    const merchantAddress = purchase.merchant?.address;
    if (merchantAddress) {
        const parts = [
            merchantAddress.street,
            merchantAddress.number,
            merchantAddress.neighborhood,
            merchantAddress.city,
            merchantAddress.state,
        ].filter(Boolean);
        return parts.join(", ");
    }

    if (purchase.vendorLocation) return purchase.vendorLocation;
    return "Location unavailable";
}

function formatDate(dateValue, locale = "en-CA") {
    if (!dateValue) return "—";
    const date =
        typeof dateValue === "string"
            ? new Date(dateValue)
            : dateValue?.$date
                ? new Date(dateValue.$date)
                : new Date(dateValue);

    if (Number.isNaN(date.getTime())) return "—";
    return new Intl.DateTimeFormat(locale).format(date);
}

function formatCurrency(value, currency = "BRL", locale = "pt-BR") {
    if (typeof value !== "number") return "—";
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
    }).format(value);
}

function getTotalAmount(purchase) {
    return (
        purchase.totals?.amount ??
        purchase.totals?.total ??
        purchase.TotalAmount ??
        purchase.totalAmount ??
        0
    );
}

function getPurchaseDate(purchase) {
    return (
        purchase.purchaseDate ||
        purchase.transaction?.issue_datetime ||
        null
    );
}

function getItems(purchase) {
    return purchase.items || [];
}

function getItemsCount(purchase) {
    return purchase.totals?.itemsCount || purchase.totals?.items_count || getItems(purchase).length;
}

function getPurchaseTags(purchase) {
    return purchase.purchase_tags || purchase.tags || [];
}

function getPaymentLabel(purchase) {
    const payments = purchase.metadata?.paymentMethods || purchase.totals?.payment;
    if (!payments || !payments.length) return "Payment unavailable";

    if (typeof payments[0] === "string") return payments.join(", ");
    return payments.map((p) => p.method).filter(Boolean).join(", ");
}

function getCurrency(purchase) {
    return purchase.totals?.currency || "BRL";
}

const PurchaseCard = ({ purchase, defaultExpanded = false }) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    const vendorName = useMemo(() => getVendorName(purchase), [purchase]);
    const vendorLocation = useMemo(() => getVendorLocation(purchase), [purchase]);
    const totalAmount = useMemo(() => getTotalAmount(purchase), [purchase]);
    const currency = useMemo(() => getCurrency(purchase), [purchase]);
    const purchaseDate = useMemo(() => getPurchaseDate(purchase), [purchase]);
    const paymentLabel = useMemo(() => getPaymentLabel(purchase), [purchase]);
    const items = useMemo(() => getItems(purchase), [purchase]);
    const itemsCount = useMemo(() => getItemsCount(purchase), [purchase]);
    const purchaseTags = useMemo(() => getPurchaseTags(purchase), [purchase]);

    const previewItems = expanded ? items : items.slice(0, 3);

    return (
        <article className={`purchase-card ${expanded ? "is-expanded" : ""}`}>
            <button
                type="button"
                className="purchase-card-header"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
            >
                <div className="purchase-card-header-left">
                    <div className="purchase-card-badge" aria-hidden="true">
                        ⚡
                    </div>

                    <div className="purchase-card-heading-group">
                        <div className="purchase-card-title-row">
                            <h3 className="purchase-card-vendor">{vendorName}</h3>

                            <div className="purchase-inline-chips">
                                <span className="purchase-meta-chip">{itemsCount} items</span>
                                {purchaseTags.slice(0, 2).map((tag) => (
                                    <span key={tag} className="purchase-meta-chip purchase-meta-chip--accent">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* <p className="purchase-card-location">{vendorLocation}</p> */}

                        <div className="purchase-card-meta">
                            <span>Purchased on {formatDate(purchaseDate)}</span>
                            {/* <span>{paymentLabel}</span> */}
                            {purchase.transaction?.nfce_number && (
                                <span>NFC-e #{purchase.transaction.nfce_number}</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="purchase-card-header-right">
                    <div className="purchase-card-total">
                        {formatCurrency(totalAmount, currency)}
                    </div>
                    <div className="purchase-card-expand-label">
                        {expanded ? "Hide details" : "Show details"}
                    </div>
                </div>
            </button>

            <div className="purchase-card-body">
                <div className="purchase-section">
                    <div className="purchase-section-title">Items</div>

                    <div className="purchase-items-list">
                        {previewItems.map((item, index) => (
                            <PurchaseItemRow
                                key={`${item.description || item.description_raw || "item"}-${index}`}
                                item={item}
                            />
                        ))}
                    </div>

                    {!expanded && items.length > 3 && (
                        <button
                            type="button"
                            className="purchase-secondary-button"
                            onClick={() => setExpanded(true)}
                        >
                            View {items.length - 3} more items
                        </button>
                    )}
                </div>

                {expanded && (
                    <div className="purchase-details-grid">
                        <div className="purchase-detail-block">
                            <div className="purchase-section-title">Vendor</div>
                            <div className="purchase-detail-line">
                                <strong>Name:</strong> {vendorName}
                            </div>
                            <div className="purchase-detail-line">
                                <strong>Location:</strong> {vendorLocation}
                            </div>
                            {(purchase.vendor?.id || purchase.vendorId || purchase.merchant?.cnpj) && (
                                <div className="purchase-detail-line">
                                    <strong>ID:</strong> {purchase.vendor?.id || purchase.vendorId || purchase.merchant?.cnpj}
                                </div>
                            )}
                        </div>

                        <div className="purchase-detail-block">
                            <div className="purchase-section-title">Transaction</div>
                            <div className="purchase-detail-line">
                                <strong>Date:</strong> {formatDate(purchaseDate)}
                            </div>
                            <div className="purchase-detail-line">
                                <strong>Total:</strong> {formatCurrency(totalAmount, currency)}
                            </div>
                            <div className="purchase-detail-line">
                                <strong>Payment:</strong> {paymentLabel}
                            </div>
                            {purchase.transaction?.series && (
                                <div className="purchase-detail-line">
                                    <strong>Series:</strong> {purchase.transaction.series}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}

export default PurchaseCard;