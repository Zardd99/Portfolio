import { Contacts, ContactContent } from "../constants/contact";
import ContactForm from "./contact/ContactForm";
import ContactHero from "./contact/ContactHero";
import ContactInfo from "./contact/ContactInfo";
import ContactSocial from "./contact/ContactSocial";

const Contact: React.FC = () => {
  const contactInfo: ContactContent = Contacts[0];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20">
      {/* Hero Section */}
      <ContactHero description={contactInfo.description} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Let us Connect
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                {contactInfo.description2}
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <ContactInfo
                email={contactInfo.email}
                phone={contactInfo.phone}
                address={contactInfo.address}
              />
            </div>

            {/* Social Links */}
            <ContactSocial />
          </div>

          {/* Contact Form */}
          <ContactForm />
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8"></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
