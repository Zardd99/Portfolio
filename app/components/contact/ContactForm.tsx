"use client";

import React, { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = (): ValidationErrors => {
    const errors: ValidationErrors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    else if (formData.name.trim().length < 2)
      errors.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!validateEmail(formData.email))
      errors.email = "Please enter a valid email address";

    if (!formData.message.trim()) errors.message = "Message is required";
    else if (formData.message.trim().length < 10)
      errors.message = "Message must be at least 10 characters";
    else if (formData.message.trim().length > 500)
      errors.message = "Message must be less than 500 characters";

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
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        if (response.status === 400)
          throw new Error(result.error || "Please check your input data");
        if (response.status === 401)
          throw new Error("Email service authentication failed. Please contact support.");
        if (response.status === 503)
          throw new Error("Service temporarily unavailable. Please try again later.");
        throw new Error(result.error || `Server error (${response.status})`);
      }
      setSuccess("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(""), 5000);
    } catch (err: unknown) {
      let errorMessage =
        "An unexpected error occurred while sending your message. Please try again.";
      if (err instanceof Error) errorMessage = err.message;
      else if (typeof err === "string") errorMessage = err;
      if (errorMessage.includes("fetch"))
        errorMessage =
          "Network connection error. Please check your internet connection and try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const hasErr = (f: keyof ValidationErrors) => Boolean(validationErrors[f]);

  const fieldClass = (f: keyof ValidationErrors) =>
    `w-full border bg-[#0a0a0b] px-4 py-3.5 text-sm text-ink placeholder-muted/60 outline-none transition-colors focus:border-accent ${
      hasErr(f) ? "border-red-500/60" : "border-line"
    }`;

  return (
    <div className="border border-line bg-[#101013] p-7 md:p-9">
      <div className="mb-7 flex items-center justify-between">
        <h3 className="font-display text-3xl text-ink">SEND A MESSAGE</h3>
        <span className="h-1.5 w-1.5 rotate-45 bg-accent animate-pulse-dot" />
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="mb-2 block font-hud text-[10px] text-muted">
            NAME
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            maxLength={50}
            disabled={isLoading}
            className={fieldClass("name")}
          />
          {hasErr("name") && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
              <AlertCircle size={12} /> {validationErrors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block font-hud text-[10px] text-muted">
            EMAIL
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            maxLength={100}
            disabled={isLoading}
            className={fieldClass("email")}
          />
          {hasErr("email") && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
              <AlertCircle size={12} /> {validationErrors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block font-hud text-[10px] text-muted">
            MESSAGE
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project…"
            rows={5}
            maxLength={500}
            disabled={isLoading}
            className={`${fieldClass("message")} resize-none`}
          />
          <div className="mt-1 flex items-center justify-between">
            {hasErr("message") ? (
              <p className="flex items-center gap-1 text-xs text-red-400">
                <AlertCircle size={12} /> {validationErrors.message}
              </p>
            ) : (
              <span />
            )}
            <span className="font-hud text-[9px] text-muted">
              {formData.message.length}/500
            </span>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 border border-red-500/30 bg-red-500/5 p-3 text-xs text-red-400">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 border border-accent/30 bg-accent-soft p-3 text-xs text-accent">
            <CheckCircle size={14} className="shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="group flex w-full items-center justify-center gap-2 bg-accent py-4 font-hud text-[11px] text-[#0a0a0b] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border border-[#0a0a0b] border-t-transparent" />
              SENDING…
            </>
          ) : (
            <>
              <Send size={14} /> SEND MESSAGE
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
