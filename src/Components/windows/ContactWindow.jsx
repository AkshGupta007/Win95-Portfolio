import React, { useState } from "react";
import { Separator, Button, TextInput } from "react95";
import BaseWindow from "./BaseWindow";
import emailjs from "@emailjs/browser";

const contacts = [
  {
    label: "Email",
    icon: "📧",
    value: "Akshgupta593@email.com",
    url: "mailto:Akshgupta593@email.com",
  },
  {
    label: "GitHub",
    icon: "👾",
    value: "github.com/AkshGupta007",
    url: "https://github.com/AkshGupta007",
  },
  {
    label: "LinkedIn",
    icon: "ℹ️",
    value: "linkedin.com/in/akshgupta593",
    url: "https://www.linkedin.com/in/akshgupta593/",
  },
  {
    label: "Twitter",
    icon: "🐦",
    value: "@akshgupta502",
    url: "https://twitter.com/akshgupta502",
  },
];

function ContactWindow({ onClose, onMinimize }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!name || !email || !message) return;

    setLoading(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          message: message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseWindow
      title="📬 Contact Me"
      onClose={onClose}
      onMinimize={onMinimize}
      width="460px"
      top="90px"
      left="210px"
    >
      {/* Contact links */}
      <div style={{ marginBottom: "12px" }}>
        {contacts.map(({ label, icon, value, url }) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "6px 0",
              borderBottom: "1px solid #ddd",
            }}
          >
            <span style={{ fontSize: "13px" }}>
              {icon} <strong>{label}:</strong> {value}
            </span>
            <Button
              size="sm"
              onClick={() => window.open(url, "_blank")}
              style={{ fontSize: "11px" }}
            >
              Open
            </Button>
          </div>
        ))}
      </div>

      <Separator />

      {/* Message form */}
      <div style={{ marginTop: "12px" }}>
        <p
          style={{ fontSize: "13px", marginBottom: "10px", fontWeight: "bold" }}
        >
          ✉️ Send me a message
        </p>

        {sent ? (
          <div
            style={{
              background: "#008080",
              color: "white",
              padding: "12px",
              textAlign: "center",
              fontSize: "13px",
            }}
          >
            ✅ Message sent! I'll get back to you soon.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <TextInput
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <TextInput
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextInput
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
            <Button
              onClick={handleSend}
              disabled={!name || !email || !message || loading}
              style={{ alignSelf: "flex-end" }}
            >
              {loading ? "⏳ Sending..." : "📨 Send"}
            </Button>
          </div>
        )}
      </div>
    </BaseWindow>
  );
}

export default ContactWindow;
