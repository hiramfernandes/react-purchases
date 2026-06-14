import './Merchants.css';

import React from 'react';

const MERCHANTS = [
  {
    _id: { $oid: "6a2acc2772705d5d64120470" },
    LegalName: "COMPANHIA ZAFFARI COMERCIO E INDUSTRIA",
    TradeName: null,
    Cnpj: "93015006004968",
    Address: {
      Street: "AV ASSIS BRASIL",
      Number: "2611",
      Neighborhood: "CRISTO REDENTOR",
      City: "PORTO ALEGRE",
      State: "RS",
      Zip: null,
      Country: "BR",
    },
  },
  {
    _id: { $oid: "7b3bdd3883816e6e75231581" },
    LegalName: "H&M HENNES & MAURITZ BRAZIL IMPORTACOES LTDA",
    TradeName: "H&M",
    Cnpj: "18254355000195",
    Address: {
      Street: "AV BORGES DE MEDEIROS",
      Number: "100",
      Neighborhood: "MOINHOS DE VENTO",
      City: "PORTO ALEGRE",
      State: "RS",
      Zip: "90020020",
      Country: "BR",
    },
  },
  {
    _id: { $oid: "8c4cee4994927f7f86342692" },
    LegalName: "IGUASPORT LTDA",
    TradeName: "DECATHLON",
    Cnpj: "07882630001560",
    Address: {
      Street: "AV DIÁRIO DE NOTICIAS",
      Number: "300",
      Neighborhood: "CRISTAL",
      City: "PORTO ALEGRE",
      State: "RS",
      Zip: "90200000",
      Country: "BR",
    },
  },
];

function formatCnpj(cnpj) {
  if (!cnpj || cnpj.length < 14) return cnpj;
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

function MerchantIcon({ name }) {
  const initials = name
    .split(" ")
    .filter((w) => w.length > 3)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #6c63ff 0%, #a78bfa 100%)",
        borderRadius: "14px",
        width: "48px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        fontSize: "16px",
        fontWeight: "700",
        color: "#fff",
        letterSpacing: "1px",
      }}
    >
      {initials || "M"}
    </div>
  );
}

function MerchantCard({ merchant }) {
  const displayName = merchant.TradeName || merchant.LegalName;
  const { Street, Number, Neighborhood, City, State, Zip, Country } = merchant.Address;

  return (
    <div
      style={{
        background: "#2a2d3a",
        borderRadius: "16px",
        padding: "20px",
        marginBottom: "16px",
        border: "1px solid #3a3d4e",
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
        <MerchantIcon name={displayName} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span
              style={{
                color: "#a78bfa",
                fontWeight: "700",
                fontSize: "15px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {merchant.LegalName}
            </span>
            {merchant.TradeName && (
              <span
                style={{
                  background: "#3a3d4e",
                  color: "#c4b5fd",
                  borderRadius: "20px",
                  padding: "2px 12px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {merchant.TradeName}
              </span>
            )}
            <span
              style={{
                background: "#3a3d4e",
                color: "#9ca3af",
                borderRadius: "20px",
                padding: "2px 10px",
                fontSize: "12px",
              }}
            >
              {State}
            </span>
          </div>
          <div style={{ color: "#6b7280", fontSize: "12px", marginTop: "4px" }}>
            ID: {merchant._id.$oid}
          </div>
        </div>
      </div>

      {/* Full details grid */}
      <div
        style={{
          background: "#1e2130",
          borderRadius: "12px",
          padding: "16px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "14px",
        }}
      >
        {[
          ["Legal Name", merchant.LegalName],
          ["Trade Name", merchant.TradeName || "—"],
          ["CNPJ", formatCnpj(merchant.Cnpj)],
          ["Street", Street],
          ["Number", Number],
          ["Neighborhood", Neighborhood],
          ["City", City],
          ["State", State],
          ["Zip", Zip || "—"],
          ["Country", Country],
        ].map(([label, value]) => (
          <div key={label}>
            <div style={{ color: "#6b7280", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.8px" }}>
              {label}
            </div>
            <div style={{ color: "#e5e7eb", fontSize: "14px", marginTop: "3px", fontWeight: "500" }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Merchants() {
  const [search, setSearch] = React.useState("");

  const filtered = MERCHANTS.filter((m) => {
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

export default Merchants;