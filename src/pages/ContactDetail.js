import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ContactDetail = ({ contacts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCalling, setIsCalling] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isCalling) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [isCalling]);

  const contact = contacts.find((c) => c.id === Number(id));

  const handleCall = () => {
    setSeconds(0);
    setMessage("");
    setIsCalling(true);
  };

  const handleEnd = () => {
    setIsCalling(false);
    setMessage(`Cuộc gọi kết thúc sau ${seconds} giây`);
  };

  if (!contact) {
    return (
      <div>
        <p>Không tìm thấy liên hệ</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  const { name, phone, email, group, favorite } = contact;

  return (
    <div>
      <h2>Chi tiết liên hệ</h2>
      <p>{`Họ tên: ${name}`}</p>
      <p>{`Số điện thoại: ${phone}`}</p>
      <p>{`Email: ${email}`}</p>
      <p>{`Nhóm: ${group}`}</p>
      <p>{`Yêu thích: ${favorite ? "Có" : "Không"}`}</p>

      {isCalling ? (
        <div>
          <p>{`Đang gọi... ${seconds} giây`}</p>
          <button onClick={handleEnd}>Kết thúc</button>
        </div>
      ) : (
        <div>
          {message && <p>{message}</p>}
          <button onClick={handleCall}>Gọi</button>
        </div>
      )}

      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default ContactDetail;