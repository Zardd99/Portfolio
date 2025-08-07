import React from "react";
import { ContactContent } from "../../constants/contact";
type ContactHeroProps = Pick<ContactContent, "description">;

const ContactHero = ({ description }: ContactHeroProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 mb-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;
