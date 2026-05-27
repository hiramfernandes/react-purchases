const ListReceipts = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No receipts found.</h2>
      </div>
    );
  }

  return (
    <table className="table table-striped  table-secondary">
      <thead>
        <tr>
          <th>Received Date</th>
          <th>URL</th>
          <th>Status</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((receipt) => (
          <tr className="table-light " key={receipt.url}>
            <td>{receipt.receivedDate}</td>
            <td>
              <a href={receipt.url} target="_blank" rel="noopener noreferrer">
                {receipt.url.slice(0, 50)}
              </a>
            </td>
            <td>{receipt.processed ? "OK" : "No"}</td>
            <td>{receipt.processingMessage}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListReceipts;
