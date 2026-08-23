import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { personalInfo } from "../data";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full name is required.";
    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email formatting is invalid.";
    }
    if (!formData.subject.trim())
      errors.subject = "A short subject header is required.";
    if (!formData.message.trim()) {
      errors.message = "Please input your context message.";
    } else if (formData.message.trim().length < 15) {
      errors.message = "Message must be at least 15 characters long.";
    }
    return errors;
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(false);
    setSubmitSuccess(false);

    try {
      // Simulate real post response time to display high quality loaders
      await new Promise((resolve) => setTimeout(resolve, 1400));

      // Store locally to indicate real processing
      localStorage.setItem(
        `contact_msg_${Date.now()}`,
        JSON.stringify(formData),
      );

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-paper-50 px-6 sm:px-8 lg:px-12 border-b border-paper-200"
    >
      <div className="max-w-5xl mx-auto">
        {/* Contact info descriptor heading */}
        <div className="text-center mb-16">
          <h2 className="text-[10px] uppercase tracking-[0.25em] text-gold-700 mb-2 font-mono font-bold flex items-center justify-center gap-2">
            07 / SECURED CONTACT CHANNEL
          </h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            id="contact-title"
            className="text-4xl sm:text-5xl font-display font-bold text-ink-950 mb-2"
          >
            Contact Me.
          </motion.h3>
          <p className="mt-2 text-xs sm:text-sm font-sans text-ink-700 max-w-lg mx-auto leading-relaxed font-light">
            Have a question, proposed role, or project context? Drop a message
            here to test local submission loops.
          </p>
        </div>

        {/* Info Grid Splitter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch text-left">
          {/* Left Block (Col Span 4) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="bg-paper-100 border border-paper-200 p-6 rounded-xl flex-1 flex flex-col justify-between shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gold-500/5 -mr-6 -mt-6 rounded-full group-hover:scale-125 transition-transform duration-300 pointer-events-none" />

              <div className="space-y-6">
                <div className="text-[9px] font-mono tracking-widest text-gold-700 font-bold uppercase pb-2 border-b border-paper-200">
                  Quick Details
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3.5 text-xs text-ink-700">
                    <MapPin size={14} className="text-gold-600 shrink-0" />
                    <span className="font-medium">{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center space-x-3.5 text-xs text-ink-700">
                    <Mail size={14} className="text-gold-600 shrink-0" />
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="hover:text-gold-700 transition-colors font-semibold break-all leading-relaxed"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3.5 text-xs text-ink-700">
                    <Phone size={14} className="text-gold-600 shrink-0" />
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="hover:text-gold-700 transition-colors font-semibold"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="text-[9.5px] font-mono text-ink-500 uppercase tracking-wider pt-6 border-t border-paper-200/60 mt-6 md:mt-0 font-semibold">
                Available for local roles
              </div>
            </div>
          </div>

          {/* Right Input Form (Col Span 8) */}
          <div className="lg:col-span-8">
            <div className="bg-paper-100 border border-paper-200 p-6 sm:p-8 rounded-xl shadow-sm">
              <form
                onSubmit={handleFormSubmission}
                className="space-y-5"
                id="secure-inquiry-form"
              >
                {/* Visual form logs alerts */}
                <AnimatePresence mode="wait">
                  {submitSuccess && (
                    <motion.div
                      key="success-prompt"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-emerald-500/10 border border-emerald-550/20 text-emerald-600 flex items-start space-x-2.5 rounded-lg text-xs"
                    >
                      <CheckCircle2 size={15} className="shrink-0 mt-0.5" />
                      <div>
                        <strong>SUCCESSFULLY SENT:</strong>
                        <p className="font-sans text-ink-700 mt-1 font-light leading-relaxed">
                          Your message simulation was submitted safely and
                          registered inside localStorage log arrays. Thank you
                          for testing these forms!
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {submitError && (
                    <motion.div
                      key="error-prompt"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-start space-x-2.5 rounded-lg text-xs"
                    >
                      <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      <div>
                        <strong>DISPATCH INCOMPLETE:</strong>
                        <p className="font-sans text-ink-700 mt-1 leading-relaxed font-light">
                          A local submission routing error occurred. Please
                          verify your internet connections or input standards
                          and try again.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="form_name_id"
                      className="text-[9px] font-mono uppercase tracking-widest text-ink-500 font-bold"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="form_name_id"
                      name="name"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-paper-50 border text-ink-950 font-sans text-xs focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none transition-colors rounded-lg ${
                        formErrors.name ? "border-rose-400" : "border-paper-300"
                      }`}
                    />
                    {formErrors.name && (
                      <span className="text-[9px] font-mono text-rose-500 block font-semibold">
                        {formErrors.name}
                      </span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="form_email_id"
                      className="text-[9px] font-mono uppercase tracking-widest text-ink-500 font-bold"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="form_email_id"
                      name="email"
                      placeholder="e.g. j.doe@domain.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-paper-50 border text-ink-950 font-sans text-xs focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none transition-colors rounded-lg ${
                        formErrors.email
                          ? "border-rose-400"
                          : "border-paper-300"
                      }`}
                    />
                    {formErrors.email && (
                      <span className="text-[9px] font-mono text-rose-500 block font-semibold">
                        {formErrors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5 text-left">
                  <label
                    htmlFor="form_subject_id"
                    className="text-[9px] font-mono uppercase tracking-widest text-ink-500 font-bold"
                  >
                    Subject Line
                  </label>
                  <input
                    type="text"
                    id="form_subject_id"
                    name="subject"
                    placeholder="e.g. Partnership Proposal"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-paper-50 border text-ink-950 font-sans text-xs focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none transition-colors rounded-lg ${
                      formErrors.subject
                        ? "border-rose-400"
                        : "border-paper-300"
                    }`}
                  />
                  {formErrors.subject && (
                    <span className="text-[9px] font-mono text-rose-500 block font-semibold">
                      {formErrors.subject}
                    </span>
                  )}
                </div>

                {/* Message Input */}
                <div className="space-y-1.5 text-left">
                  <label
                    htmlFor="form_msg_id"
                    className="text-[9px] font-mono uppercase tracking-widest text-ink-500 font-bold"
                  >
                    Message Context
                  </label>
                  <textarea
                    id="form_msg_id"
                    name="message"
                    rows={4}
                    placeholder="Please details your core requests or project specifications here..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-paper-50 border text-ink-950 font-sans text-xs focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none transition-colors rounded-lg resize-none ${
                      formErrors.message
                        ? "border-rose-400"
                        : "border-paper-300"
                    }`}
                  />
                  {formErrors.message && (
                    <span className="text-[9px] font-mono text-rose-500 block font-semibold">
                      {formErrors.message}
                    </span>
                  )}
                </div>

                {/* Submit button bar */}
                <div className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { y: -1 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className={`w-full py-4.5 text-xs text-center font-mono font-bold uppercase tracking-widest transition-all cursor-pointer rounded-lg flex items-center justify-center space-x-2 ${
                      isSubmitting
                        ? "bg-slate-300 text-slate-500"
                        : "bg-ink-950 hover:bg-gold-600 text-paper-50 shadow-sm"
                    }`}
                  >
                    {isSubmitting ? (
                      <span>DISPATCHING METADATA...</span>
                    ) : (
                      <>
                        <Send size={12} className="relative bottom-[0.5px]" />
                        <span>Dispatch Message Payload</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
