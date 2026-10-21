import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GROUPS } from "../data";

const AddContact = ({ onAdd }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState(GROUPS[1]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedPhone || !trimmedEmail) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (!/^0\d{9}$/.test(trimmedPhone)) {
      setError("Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0");
      return;
    }
    if (!trimmedEmail.includes("@")) {
      setError("Email không hợp lệ");
      return;
    }

    onAdd({ name: trimmedName, phone: trimmedPhone, email: trimmedEmail, group });
    navigate("/contacts", { replace: true });
  };

  return (
    <div>
      <h2>Thêm liên hệ</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="name">Họ tên</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="phone">Số điện thoại</label>
          <input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="group">Nhóm</label>
          <select id="group" value={group} onChange={(e) => setGroup(e.target.value)}>
            {GROUPS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <button type="submit">Thêm</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddContact;