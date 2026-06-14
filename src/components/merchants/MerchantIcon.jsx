const MerchantIcon = ({ name }) => {
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

export default MerchantIcon;