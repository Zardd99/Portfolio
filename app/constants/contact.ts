const Contacts: ContactContent[] = [
  {
    description:
      "Have a project in mind? Let us discuss how we can bring your ideas to life. I am always excited to work on new challenges and create amazing experiences.",
    description2:
      "I am always open to discussing new opportunities, creative ideas, or potential collaborations. Whether you have a question or just want to say hi, I will do my best to get back to you!",
    email: "lqykim275@gmail.com",
    phone: "+855 71 416 666 56",
    address: "Phnom Penh, Cambodia",
  },
];

type ContactContent = {
  description: string;
  description2: string;
  email: string;
  phone: string;
  address: string;
};

export { Contacts, type ContactContent };
