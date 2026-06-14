import MerchantIcon from "./MerchantIcon";

function formatCnpj(cnpj) {
  if (!cnpj || cnpj.length < 14) return cnpj;
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

const MerchantCard = ({ merchant }) => {
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

export default MerchantCard;