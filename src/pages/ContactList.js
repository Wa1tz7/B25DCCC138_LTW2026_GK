import { useState } from "react";
import FilterBar from "../components/FilterBar";
import ContactTable from "../components/ContactTable";

const ContactList = ({ contacts, onDelete, onToggleFavorite }) => {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");

  const handleQueryShift = (e) => setQuery(e.target.value);
  const handleGroupChange = (e) => setGroup(e.target.value);

  const keyword = query.trim().toLowerCase();
  const filtered = contacts.filter(
    ({ name, phone, group: contactGroup }) =>
      (name.toLowerCase().includes(keyword) || phone.includes(keyword)) &&
      (group === "all" || contactGroup === group)
  );

  return (
    <div>
      <h2>Danh sách liên hệ</h2>
      <FilterBar
        query={query}
        onQueryChange={handleQueryShift}
        group={group}
        onGroupChange={handleGroupChange}
      />
      <p>{`Tìm thấy ${filtered.length} liên hệ`}</p>
      {filtered.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <ContactTable
          contacts={filtered}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  );
};

export default ContactList;