export default function Message({
  profilePic,
  userName,
  previewMessage,
  handleUpdateChat,
}) {
  async function firstFunction() {
    handleUpdateChat(null);
  }

  async function secondFunction() {
    await firstFunction();
    handleUpdateChat(userName);
  }
  return (
    <div
      className="message"
      onClick={() => {
        secondFunction();
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
