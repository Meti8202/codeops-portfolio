import { useState } from "react";
import "./OrderForm.css";

const OrderForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [status, setStatus] = useState("");

  const isPhoneValid = /^09\d{8}$/.test(form.phone);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isPhoneValid) {
      setStatus("error");
      return;
    }

    setStatus("success");

    setForm({ name: "", phone: "", address: "" });
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        TeleBirr Phone
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="09xxxxxxxx"
          required
        />
      </label>

      <label>
        Address
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit" disabled={!isPhoneValid}>
        Place Order
      </button>

      {status === "success" && (
        <p className="status success">Order placed successfully!</p>
      )}

      {status === "error" && (
        <p className="status error">
          Enter a valid TeleBirr number (09xxxxxxxx)
        </p>
      )}

      {!isPhoneValid && form.phone.length > 0 && status !== "error" && (
        <p className="status error">
          Enter a valid TeleBirr number (09xxxxxxxx)
        </p>
      )}
    </form>
  );
};

export default OrderForm;