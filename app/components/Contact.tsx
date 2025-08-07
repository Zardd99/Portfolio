import { Contacts, ContactContent } from "../constants/contact";
import ContactForm from "./contact/ContactForm";
import ContactHero from "./contact/ContactHero";
import ContactInfo from "./contact/ContactInfo";

const Contact: React.FC = () => {
  const contactInfo: ContactContent = Contacts[0];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20 rounded-2xl">
      {/* Hero Section */}
      <ContactHero description={contactInfo.description} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-bebas-neue text-3xl font-bold text-white mb-6">
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
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
