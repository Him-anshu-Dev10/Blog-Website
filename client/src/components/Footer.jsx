import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-white text-gray-600">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/[0.3] text-gray-400">
        {/* Company Info / Lorem Ipsum Column */}
        <div className="md:w-1/3">
          <img
            className="w-32 sm:w-44 mb-4"
            src={assets.logo}
            alt="Company Logo"
          />
          <p className="text-sm leading-relaxed max-w-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa est
            vero dolores doloribus, illum perspiciatis. Dolorum aspernatur
            tempore, non rerum illum amet dolore veniam velit voluptates dicta,
            possimus enim maxime!
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col gap-4">
          <h6 className="font-semibold text-lg text-white">Quick Links</h6>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Best Sellers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Offers & Deals
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Need Help? Column */}
        <div className="flex flex-col gap-4">
          <h6 className="font-semibold text-lg text-white">Need Help?</h6>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Delivery Information
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Return & Refund Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Payment Methods
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Track your Order
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us Column */}
        <div className="flex flex-col gap-4">
          <h6 className="font-semibold text-lg text-white">Follow Us</h6>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Information */}
      <p className="py-4 text-center text-sm md:text-base text-gray-500">
        Copyright 2025 All rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
