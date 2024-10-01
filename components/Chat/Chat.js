import { useEffect, useState } from "react";
import { collection, addDoc, query, orderBy, onSnapshot, setDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = auth.currentUser; // Pobieramy aktualnego użytkownika

  useEffect(() => {
    // Pobieranie wiadomości w czasie rzeczywistym z Firestore
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesArray);
    });

    return () => unsubscribe(); // Zatrzymaj nasłuchiwanie, gdy komponent zostanie usunięty
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "" || !user) return; // Sprawdź, czy użytkownik jest zalogowany

    try {
      await setDoc(doc(db, 'messages', `${Date.now()}_${user.uid}`), {
        text: message,
        userId: user.uid, // Id użytkownika
        timestamp: new Date(),
        username: user.email, // Użyj adresu e-mail jako nazwy użytkownika
      });
      setMessage(""); // Resetuj pole tekstowe
    } catch (error) {
      console.error("Błąd podczas wysyłania wiadomości:", error);
    }
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.userId === user.uid ? "my-message" : "other-message"}`}>
            <p><strong>{msg.username}:</strong> {msg.text}</p> {/* Wyświetl nazwę użytkownika i wiadomość */}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Napisz wiadomość..."
        />
        <button type="submit">Wyślij</button>
      </form>
    </div>
  );
};

