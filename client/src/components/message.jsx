export default function Message({
  profilePic,
  userName,
  previewMessage,
  handleUpdateChat,
  setChat,
}) {
  return (
    <div
      className="message"
      onClick={() => {
        handleUpdateChat("", setChat);
        handleUpdateChat(userName, setChat);
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
