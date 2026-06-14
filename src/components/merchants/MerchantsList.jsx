import React from 'react';
import MerchantCard from '../../components/merchants/MerchantCard';

const MerchantsList = ({ merchants }) => {
  const [search, setSearch] = React.useState("");

  const filtered = merchants.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.LegalName.toLowerCase().includes(q) ||
      (m.TradeName && m.TradeName.toLowerCase().includes(q)) ||
      m.Cnpj.includes(q) ||
      m.Address.City.toLowerCase().includes(q) ||
      m.Address.State.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ minHeight: "100vh", background: "#4a5568", fontFamily: "'Inter', sans-serif" }}>
      {/* Top bar */}
      <div
        style={{
          background: "#374151",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: "700", margin: 0 }}>Merchants</h1>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Summary header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h2 style={{ color: "#9ca3af", fontSize: "32px", fontWeight: "700", margin: 0 }}>Summary</h2>
          <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "6px" }}>
            Merchant registry, addresses and tax information
          </p>
        </div>

        {/* Search */}
        <div style={{ marginBottom: "20px" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, CNPJ, city..."
            style={{
              width: "100%",
              background: "#2a2d3a",
              border: "1px solid #3a3d4e",
              borderRadius: "12px",
              padding: "12px 16px",
              color: "#e5e7eb",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Count badge */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "12px" }}>
          <span
            style={{
              background: "#3a3d4e",
              color: "#9ca3af",
              borderRadius: "20px",
              padding: "4px 14px",
              fontSize: "13px",
            }}
          >
            {filtered.length} merchants
          </span>
        </div>

        {/* Cards */}
        {filtered.length === 0 ? (
          <div style={{ color: "#6b7280", textAlign: "center", marginTop: "40px" }}>
            No merchants found.
          </div>
        ) : (
          filtered.map((m) => <MerchantCard key={m._id.$oid} merchant={m} />)
        )}
      </div>
    </div>
  );
}

export default MerchantsList;
