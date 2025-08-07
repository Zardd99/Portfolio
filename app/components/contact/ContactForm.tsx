import React, { useState } from "react";
import {
  Mail,
  User,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    } else if (formData.message.trim().length > 500) {
      errors.message = "Message must be less than 500 characters";
    }

    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");

    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");
    setValidationErrors({});

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(result.error || "Please check your input data");
        } else if (response.status === 401) {
          throw new Error(
            "Email service authentication failed. Please contact support."
          );
        } else if (response.status === 503) {
          throw new Error(
            "Service temporarily unavailable. Please try again later."
          );
        } else {
          throw new Error(result.error || `Server error (${response.status})`);
        }
      }

      setSuccess("Message sent successfully! I'll get back to you soon. 🎉");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (err: unknown) {
      console.error("Email sending failed:", err);

      let errorMessage =
        "An unexpected error occurred while sending your message. Please try again.";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }

      if (errorMessage.includes("fetch")) {
        errorMessage =
          "Network connection error. Please check your internet connection and try again.";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldError = (field: keyof ValidationErrors) => {
    return validationErrors[field];
  };

  const hasFieldError = (field: keyof ValidationErrors) => {
    return Boolean(validationErrors[field]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 p-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Get In Touch</h2>
          <p className="text-gray-400">
            Send me a message and I will get back to you!
          </p>
        </div>

        <form className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                maxLength={50}
                className={`w-full pl-12 pr-4 py-3 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  hasFieldError("name")
                    ? "border-red-500/50 focus:ring-red-500"
                    : "border-gray-600/50 focus:ring-purple-500 focus:border-transparent"
                }`}
                disabled={isLoading}
              />
            </div>
            {hasFieldError("name") && (
              <p className="text-red-400 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {getFieldError("name")}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                maxLength={100}
                className={`w-full pl-12 pr-4 py-3 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  hasFieldError("email")
                    ? "border-red-500/50 focus:ring-red-500"
                    : "border-gray-600/50 focus:ring-purple-500 focus:border-transparent"
                }`}
                disabled={isLoading}
              />
            </div>
            {hasFieldError("email") && (
              <p className="text-red-400 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {getFieldError("email")}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Message
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={5}
                maxLength={500}
                className={`w-full pl-12 pr-4 py-3 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                  hasFieldError("message")
                    ? "border-red-500/50 focus:ring-red-500"
                    : "border-gray-600/50 focus:ring-purple-500 focus:border-transparent"
                }`}
                disabled={isLoading}
              />
            </div>
            {hasFieldError("message") && (
              <p className="text-red-400 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {getFieldError("message")}
              </p>
            )}
            <div
              className={`text-right text-xs mt-1 ${
                formData.message.length > 450
                  ? "text-yellow-400"
                  : formData.message.length > 500
                  ? "text-red-400"
                  : "text-gray-500"
              }`}
            >
              {formData.message.length}/500
            </div>
          </div>

          {/* General Error Message */}
          {error && (
            <div className="flex items-start p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400">
              <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="text-sm">{success}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg hover:shadow-purple-500/25"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
