import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactContent } from "@/app/constants/contact";
type ContactInfoProps = Pick<ContactContent, "email" | "phone" | "address">;

const ContactInfo = ({ email, phone, address }: ContactInfoProps) => {
  return (
    <>
      {/* Email Section */}
      <div className="flex items-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group">
        <div className="flex-shrink-0 w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center group-hover:bg-purple-600/30 transition-colors">
          <Mail className="w-6 h-6 text-purple-400" />
        </div>
        <div className="ml-4">
          <h3 className="text-white font-semibold">Email</h3>
          <p className="text-gray-400">{email}</p>
        </div>
      </div>

      {/* Phone Section */}

      <div className="flex items-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group">
        <div className="flex-shrink-0 w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center group-hover:bg-purple-600/30 transition-colors">
          <Phone className="w-6 h-6 text-purple-400" />
        </div>
        <div className="ml-4">
          <h3 className="text-white font-semibold">Phone</h3>
          <p className="text-gray-400">{phone}</p>
        </div>
      </div>

      {/* Address Section */}

      <div className="flex items-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group">
        <div className="flex-shrink-0 w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center group-hover:bg-purple-600/30 transition-colors">
          <MapPin className="w-6 h-6 text-purple-400" />
        </div>
        <div className="ml-4">
          <h3 className="text-white font-semibold">Location</h3>
          <p className="text-gray-400">{address}</p>
        </div>
      </div>
    </>
  );
};

export default ContactInfo;
