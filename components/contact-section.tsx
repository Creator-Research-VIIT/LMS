"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export function ContactForm({ className }: Readonly<{ className?: string }>) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.name && formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (formData.message && formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setSubmitMessage("Thank you for contacting us! We'll get back to you soon.");
        
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message || "Something went wrong. Please try again.");
        
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus('error');
      setSubmitMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSubmitButtonContent = () => {
    if (isSubmitting) {
      return (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Sending...
        </>
      );
    }
    if (submitStatus === 'success') {
      return (
        <>
          <CheckCircle className="h-5 w-5" />
          Message Sent!
        </>
      );
    }
    return (
      <>
        <Send className="h-5 w-5" />
        Send Message
      </>
    );
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition',
                    errors.name && 'border-red-500 focus:ring-red-500'
                  )}
                  placeholder="John Doe"
                  disabled={isSubmitting}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition',
                    errors.email && 'border-red-500 focus:ring-red-500'
                  )}
                  placeholder="john@example.com"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={cn(
                  'w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition',
                  errors.subject && 'border-red-500 focus:ring-red-500'
                )}
                placeholder="Course inquiry, Technical support, etc."
                disabled={isSubmitting}
              />
              {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={cn(
                  'w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none',
                  errors.message && 'border-red-500 focus:ring-red-500'
                )}
                placeholder="Please tell us how we can help you..."
                disabled={isSubmitting}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-white',
                isSubmitting && 'bg-gray-400 cursor-not-allowed',
                submitStatus === 'success' && 'bg-green-600 hover:bg-green-700',
                !isSubmitting && submitStatus === 'idle' && 'bg-blue-600 hover:bg-blue-700'
              )}
            >
              {getSubmitButtonContent()}
            </button>

            {/* Status Message */}
            {submitMessage && (
              <div
                className={cn(
                  'p-4 rounded-lg flex items-center gap-3',
                  submitStatus === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                )}
              >
                {submitStatus === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                )}
                <p className="font-medium">{submitMessage}</p>
              </div>
            )}
          </form>

          {/* Contact Info Sidebar */}
          <aside className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-8 h-fit shadow-lg">
            <h3 className="text-2xl font-bold mb-8">Get in Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-slate-400 mb-1">Email</p>
                  <a href="mailto:support@eduplatform.com" className="text-white hover:text-blue-400 font-semibold transition">
                    support@eduplatform.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-slate-400 mb-1">Phone</p>
                  <a href="tel:+919545415111" className="text-white hover:text-blue-400 font-semibold transition">
                    +91 9545415111
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-slate-400 mb-1">Address</p>
                  <p className="text-white font-semibold">
                    73 Pannalal Nagar<br />
                    Ch. Sambhaji Nagar, India
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6 mt-6">
                <p className="text-sm text-slate-400 leading-relaxed">
                  Our support team typically responds within 24 hours. For urgent matters, please call us directly.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;