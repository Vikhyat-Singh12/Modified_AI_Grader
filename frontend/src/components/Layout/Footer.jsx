import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import logo from "../../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-20 text-center md:text-left">
        {/* Logo & Description */}
        <div className="pr-16 pl-2 ml-7 mr-22 md:pr-8 md:pl-8 lg:pr-10 lg:pl-10 ">
          <img
            src={logo}
            alt="logo"
            className="w-35 md:max-w-48 h-auto"
          />
          <br />
          <p className="text-sm leading-relaxed w-full max-w-[600px] text-[#767478]">
            Revolutionizing academic assessments with AI-powered efficiency
          </p>
          <br />

          {/* Social Media Icons */}
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <a href="https://www.facebook.com/vikhyat.singh.524/"  target="_blanck" className="hover:text-blue-400">
              <FaFacebookF size={20} />
            </a>
            <a href="https://x.com/VikhyatSingh001"  target="_blanck" className="hover:text-blue-400">
              <FaTwitter size={20} />
            </a>
            <a href="https://www.instagram.com/vikhyat.singh_/" target="_blanck" className="hover:text-pink-400">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.linkedin.com/in/vikhyat-singh-b19454294/" target="_blanck" className="hover:text-blue-500">
              <FaLinkedinIn size={20} />
            </a>
            <a href="https://github.com/Vikhyat-Singh12" target="_blanck" className="hover:text-blue-500">
              <FaGithub size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/"  onClick={() => scrollTo(0, 0)} className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about"  onClick={() => scrollTo(0, 0)} className="hover:text-gray-400">
                About
              </Link>
            </li>
            <li>
              <Link to="/faq"  onClick={() => scrollTo(0, 0)} className="hover:text-gray-400">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <ul className="space-y-2">
            <li>
              <p>
                <span className="text-[#767478] font-semibold">Email: </span>{" "}
                <span className="text-gray-200">singhvikhyatmzp.9@gmail.com</span>
              </p>
            </li>
            <li>
              <p>
                <span className="text-[#767478] font-semibold">Phone: </span>{" "}
                <span className="text-gray-200">+91 8354920025</span>
              </p>
            </li>
            <li>
              <p>
                <span className="text-[#767478] font-semibold">Location: </span>{" "}
                <span className="text-gray-200">India</span>
              </p>
            </li>
          </ul>
        </div>


        <div>
          <h3 className="text-xl font-bold mb-4">Connect</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/contact"  onClick={() => scrollTo(0, 0)} className="hover:text-gray-400">
                Feedback
              </Link>
            </li>
            <li>
              <Link to="/Help"  onClick={() => scrollTo(0, 0)} className="hover:text-gray-400">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-600 mt-8 pt-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} AI GRADER. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-6">
          <Link to="/terms"  onClick={() => scrollTo(0, 0)} className="hover:text-gray-400">
            Terms
          </Link>
          <Link to="/privacy"  onClick={() => scrollTo(0, 0)} className="hover:text-gray-400">
            Privacy
          </Link>
          <Link to="/cookies"  onClick={() => scrollTo(0, 0)} className="hover:text-gray-400">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
