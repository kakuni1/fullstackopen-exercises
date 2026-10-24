const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null;
  }

  const color = messageType === "success" ? "green" : "red";
  const notificationStyle = {
    color: color,
    backgroundColor: "lightsteelblue",
    border: `2px solid ${color}`,
    borderRadius: "0.25rem",
    marginBottom: "0.5rem",
    padding: "1rem",
  };

  return <div style={notificationStyle}> {message} </div>;
};

export default Notification;
