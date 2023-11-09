export default function Message({
  profilePic,
  userName,
  previewMessage,
  handleUpdateChat,
}) {
  return (
    <div
      className="message"
      onClick={() => {
        handleUpdateChat(userName);
      }}
    >
      <div className="message-profile-pic">
        <img src={profilePic} alt=""></img>
      </div>
      <div className="message-content">
        <div className="person-name">{userName}</div>
        <div className="text">{previewMessage}</div>
      </div>
    </div>
  );
}
