import { Link } from "lucide-react";
import React from "react";

const ContactSocial = () => {
  return (
    <>
      {/* Social Links */}
      <div className="pt-8">
        <h3 className="text-white font-semibold mb-4">Follow Me</h3>
        <div className="flex space-x-4">
          {["GitHub", "LinkedIn", "Twitter"].map((social) => (
            <Link
              key={social}
              href=""
              className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-purple-500/50 flex items-center justify-center text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110"
            >
              <span className="text-sm font-medium">{social[0]}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContactSocial;
