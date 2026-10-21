import ContactTable from "../components/ContactTable";

const ContactList = ({ contacts, onDelete, onToggleFavorite }) => (
  <div>
    <h2>Danh sách liên hệ</h2>
    <ContactTable
      contacts={contacts}
      onDelete={onDelete}
      onToggleFavorite={onToggleFavorite}
    />
  </div>
);

export default ContactList;