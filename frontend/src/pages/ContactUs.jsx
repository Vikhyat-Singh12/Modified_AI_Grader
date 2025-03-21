import React, { useState } from "react";
import { Send } from "lucide-react";
import {
  FaUser,
  FaCommentDots,
  FaEnvelope,
  FaUserGraduate,
} from "react-icons/fa";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";

function ContactUs() {
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
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto p-6">
      {/* contact  */}
      <div className="container mx-auto px-6 py-4">
        <div className="space-x-10 flex items-center justify-center mb-6 ">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-blue-600">Contact Us</h1>

          <div className=" min-w-44 min-h-44 ">
            <lottie-player
              id="firstLottie"
              autoplay
              loop
              mode="normal"
              src="https://lottie.host/070ce691-dda9-4304-927c-078e238af9ef/sXSWbUzSPC.json"
              background="transparent"
            ></lottie-player>
          </div>
        </div>

        <p className="text-4xl text-gray-700 text-center mb-8">
          Have questions or feedback? Reach out to us!
        </p>
      </div>

      {/*message */}
      <div className="grid md:grid-cols-2 gap-10 w-full max-w-8xl">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 ">
          <form onSubmit={handleSubmit} className="space-y-5 ">
            {/* Logo */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-32 h-32 mx-auto ">
                {/* Main Profile Image */}
                <img
                  src="https://img.freepik.com/premium-vector/cartoon-boy-with-green-background_1024980-112239.jpg?uid=R188590608&ga=GA1.1.687125877.1740208879&semt=ais_hybrid"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-gray-300 shadow-md"
                />

                {/* Bottom-Right Icon */}
                <div className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full shadow-md">
                  <FaUserGraduate size={20} />
                </div>
              </div>

              <h1 className="text-2xl font-bold mt-4 text-gray-900">
                Send a Message
              </h1>
              <p className="text-gray-500">Keep your data safe</p>
            </div>

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-xl text-gray-700 font-medium mb-1">
                  Name
                </label>
                <div className="flex items-center border rounded-lg p-3 shadow-sm focus-within:ring focus-within:ring-blue-300">
                  <FaUser className="text-gray-500 mr-3" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xl text-gray-700 font-medium mb-1">
                  Email
                </label>
                <div className="flex items-center border rounded-lg p-3 shadow-sm focus-within:ring focus-within:ring-blue-300">
                  <FaEnvelope className="text-gray-500 mr-3" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xl text-gray-700 font-medium mb-1">
                  Message
                </label>
                <div className="flex items-start border rounded-lg p-3 shadow-sm focus-within:ring focus-within:ring-blue-300">
                  <FaCommentDots className="text-gray-500 mr-3 mt-1" />
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                    placeholder="Write your message..."
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-orange-400 text-white py-3 rounded-xl font-semibold text-lg hover:bg-red-500 transition duration-300 shadow-md hover:shadow-lg active:scale-95"
            >
              <Send size={20} />
              Send Message
            </button>
          </form>
        </div>

        {/* side bar */}
        <div className="bg-gray-700 text-white p-8 rounded-xl w max-w-3xl relative hidden  md:flex">
          {/* Left Side with Image */}
          <div className="w-28 relative">
            <img
              src="https://img.freepik.com/free-vector/costumer-support-illustration_24908-61541.jpg?uid=R188590608&ga=GA1.1.687125877.1740208879&semt=ais_hybrid"
              alt="Team Working"
              className="rounded-lg  h-auto"
            />
          </div>

          {/* Right Side with Contact Details */}
          <div className="sm:p-7">
            <h2 className="text-4xl font-bold text-blue-300">
              GET IN TOUCH WITH US
            </h2>

            <div className="mt-8 ">
              <p className="text-xl mb-3">📞 +91 8354920025</p>
              <p className="text-xl mb-3">✉ singhvikhyatmzp.9@gmail.com</p>
              <p className="text-xl mb-6">📍Gorakhpur, UP, INDIA</p>
            </div>

            <hr className="border-gray-700 mb-4" />
            <p className="text-blue-300 text-xl mb-3">@reallygreatsite</p>

            <div className="flex gap-4 mt-4 flex-wrap">
              <img
                src="https://img.freepik.com/free-photo/ai-chip-artificial-intelligence-future-technology-innovation_53876-129780.jpg?uid=R188590608&ga=GA1.1.687125877.1740208879&semt=ais_hybrid"
                alt="Team Working"
                className="rounded-lg h-36 w-28 mb-3 "
              />

              <img
                src="https://img.freepik.com/free-photo/girl-coding-interactive-screen_53876-97188.jpg?uid=R188590608&ga=GA1.1.687125877.1740208879&semt=ais_hybrid"
                alt="Team Working"
                className="rounded-lg h-36 w-28 mb-12"
              />
              <img
                src="https://img.freepik.com/free-photo/technology-concept-with-futuristic-element_23-2151910960.jpg?uid=R188590608&ga=GA1.1.687125877.1740208879&semt=ais_hybrid"
                alt="Team Working"
                className="rounded-lg h-36 w-28 mb-16"
              />
            </div>

            <h2 className="text-xl font-bold text-white mt-6 mb-4">
              Follow Us
            </h2>
            <div className="flex gap-6">
              <a
                href="https://www.facebook.com/vikhyat.singh.524/"
                target="_blanck"
                className="hover:text-blue-400"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://x.com/VikhyatSingh001"
                target="_blanck"
                className="hover:text-blue-400"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://www.instagram.com/vikhyat.singh_/"
                target="_blanck"
                className="hover:text-pink-400"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/vikhyat-singh-b19454294/"
                target="_blanck"
                className="hover:text-blue-500"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a
                href="https://github.com/Vikhyat-Singh12"
                target="_blanck"
                className="hover:text-blue-500"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
