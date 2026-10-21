const BUILD_TAG = "hb-9472";
/* eslint-disable import/first */
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ContactList from "./pages/ContactList";
import AddContact from "./pages/AddContact";
import ContactDetail from "./pages/ContactDetail";
import "./App.css";
/* eslint-enable import/first */

const STORAGE_KEY = "gk_contacts";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setContacts(JSON.parse(saved));
        setLoading(false);
        return;
      } catch (e) {
      }
    }

    const controller = new AbortController();

    const fetchContacts = async () => {
      try {
        const res = await axios.get("/data/contacts.json", {
          signal: controller.signal,
        });
        if (!Array.isArray(res.data)) throw new Error("Dữ liệu không hợp lệ");
        setContacts(res.data);
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError("Không tải được dữ liệu");
        setLoading(false);
      }
    };

    fetchContacts();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts, loading]);

  const addContact = (contact) => {
    setContacts((prev) => {
      const nextId =
        prev.length > 0 ? Math.max(...prev.map(({ id }) => id)) + 1 : 1;
      return [...prev, { id: nextId, ...contact, favorite: false }];
    });
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const toggleFavorite = (id) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...contact, favorite: !contact.favorite } : contact
      )
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route index element={<Home contacts={contacts} />} />
        <Route
          path="contacts"
          element={
            <ContactList
              contacts={contacts}
              onDelete={deleteContact}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
        <Route path="contacts/new" element={<AddContact onAdd={addContact} />} />
        <Route path="contacts/:id" element={<ContactDetail contacts={contacts} />} />
      </Route>
    </Routes>
  );
};

export { BUILD_TAG };
export default App;