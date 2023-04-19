import React, { useState } from "react";
import { useAuth } from "./../util/auth";

function TestForm() {
  const auth = useAuth();
  const [formData, setFormData] = useState({
    name: auth.user.uid,
    job_title: "",
    income: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("formData", formData);
    try {
      const response = await fetch(
        // "https://ryanlhy.pythonanywhere.com/employees/create/",
        "https://ryanlhy.pythonanywhere.com/employees/5/",

        // "http://localhost:8000/employees/5/",
        // "http://localhost:8000/employees/create/",
        {
          method: "PUT",
          // method: "POST",
          // method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Job Title:
        <input
          type="text"
          name="job_title"
          value={formData.job_title}
          onChange={handleChange}
          placeholder={auth.user.uid}
        />
      </label>
      <br />
      <label>
        Income:
        <input
          type="text"
          name="income"
          value={formData.income}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TestForm;
