import React, { useState } from "react";

function HelpSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been submitted!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Help & Support</h2>

      {/* FAQ Section */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-3">
          Frequently Asked Questions
        </h3>
        <ul className="space-y-2">
          <li>
            <strong>Q:</strong> How do I submit an assignment? <br />
            <strong>A:</strong> Go to the "Assignment Submission" page and
            upload your PDF.
          </li>
          <li>
            <strong>Q:</strong> How do I check my grades? <br />
            <strong>A:</strong> Visit the "AI Grading & Feedback" section to see
            detailed reports.
          </li>
          <li>
            <strong>Q:</strong> How do I contact my teacher? <br />
            <strong>A:</strong> Use the "Chat" feature to connect with your
            assigned teacher.
          </li>
        </ul>
      </div>

      {/* Contact Support Form */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3">Need Further Assistance?</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <textarea
            name="message"
            placeholder="Describe your issue..."
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded-md h-24"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Quick Links */}
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
        <div className="flex justify-center space-x-4">
          <a href="/faq" className="text-blue-600 underline">
            FAQs
          </a>
          <a href="/contact" className="text-blue-600 underline">
            Contact Us
          </a>
          <a href="/guides" className="text-blue-600 underline">
            User Guides
          </a>
        </div>
      </div>
    </div>
  );
}

export default HelpSupport;
