import React, { useEffect, useMemo, useState } from "react";
import { login } from "../../shared/Login/auth";

import './PurchasesContainer.css'

function formatCurrency(value, currency = "BRL", locale = "pt-BR") {
    if (typeof value !== "number") return "—";
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
    }).format(value);
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

function getVendorName(purchase) {
    return (
        purchase.vendor?.name ||
        purchase.vendorName ||
        purchase.merchant?.legal_name ||
        "Unknown vendor"
    );
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

function getCurrency(purchase) {
    return purchase.totals?.currency || "BRL";
}

function getPurchaseDate(purchase) {
    return (
        purchase.purchaseDate ||
        purchase.transaction?.issue_datetime ||
        null
    );
}

function getPaymentLabel(purchase) {
    const payments = purchase.metadata?.paymentMethods || purchase.totals?.payment;
    if (!payments || !payments.length) return "Payment unavailable";

    if (typeof payments[0] === "string") return payments.join(", ");
    return payments.map((p) => p.method).filter(Boolean).join(", ");
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

function PurchaseItemRow({ item }) {
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

export function PurchaseCard({ purchase, defaultExpanded = false }) {
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

                        <p className="purchase-card-location">{vendorLocation}</p>

                        <div className="purchase-card-meta">
                            <span>Purchased on {formatDate(purchaseDate)}</span>
                            <span>{paymentLabel}</span>
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

export default function PurchasesContainer() {
      const [loadedPurchases, setLoadedPurchases] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
    
      const baseApiUrl = import.meta.env.VITE_API_URL;
      const url = `${baseApiUrl}/api/purchases/`;
    
      useEffect(() => {
    
        const sendRequest = async () => {
          setIsLoading(true);
          try {
            const email = import.meta.env.VITE_AUTH_EMAIL;
            const pwd = import.meta.env.VITE_AUTH_PWD;
    
            const loginResponse = await login(email, pwd);
            const token = loginResponse.accessToken;
    
            const purchasesResponse = await fetch(
              url, {
              method: 'GET',
              headers: {
                'accept': 'text/plain',
                'authorization': `Bearer ${token}`
              }
            });
    
            const response = await purchasesResponse.json();
    
            setLoadedPurchases(response);
          } catch (error) {
            console.log(error.message);
          }
          setIsLoading(false);
        }
    
        sendRequest();
      }, []);

    const purchases = loadedPurchases;
    //     {
    //         purchaseDate: { $date: "2026-03-16T00:00:00.000Z" },
    //         purchaseUrl:
    //             "https://dfe-portal.svrs.rs.gov.br/Dfe/QrCodeNFce?p=43260393015006002590651110009259541354192794|2|1|1|3F75B358F0FA2A63C7C10FC9E9B80B3AF13199F6",
    //         vendorName: "COMPANHIA ZAFFARI COMERCIO E INDUSTRIA",
    //         vendorLocation: "Porto Alegre, RS",
    //         TotalAmount: 168.83,
    //         items: [
    //             {
    //                 description: "KIT VAR 2M B.ARTE 28MM 54 3P",
    //                 unitPrice: 54.9,
    //                 tags: ["tools", "hardware"],
    //             },
    //             {
    //                 description: "FILE CX/SC FGO NAT VD IQF 1KG",
    //                 unitPrice: 22.9,
    //                 tags: ["frozen", "food"],
    //             },
    //             {
    //                 description: "LIMP L.PES VEJA F.CAMP 1L",
    //                 unitPrice: 21.5,
    //                 tags: ["cleaning", "household"],
    //             },
    //         ],
    //     },
    // ];

    return (
        <section className="purchases-shell">
            <div className="purchases-container">
                <header className="purchases-header">
                    <div>
                        <h2 className="purchases-title">Summary</h2>
                        <p className="purchases-subtitle">
                            Purchases, receipt data, items and tags
                        </p>
                    </div>
                </header>

                <div className="purchases-list">
                    {purchases.map((purchase, index) => (
                        <PurchaseCard
                            key={purchase.purchaseUrl || purchase.transaction?.access_key_44 || index}
                            purchase={purchase}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
