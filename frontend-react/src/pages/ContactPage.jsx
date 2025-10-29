import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@pharmai.com',
      description: 'We\'ll respond within 24 hours'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Monday - Friday, 9AM - 6PM EST'
    },
    {
      icon: MapPin,
      title: 'Office',
      value: 'San Francisco, CA',
      description: '123 Innovation Drive, Suite 200'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pharma-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pharma-600 to-pharma-800 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">Get In Touch</h1>
          <p className="text-xl text-pharma-100">
            Have questions? We'd love to hear from you. Reach out to our team.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {contactMethods.map((method, idx) => {
              const Icon = method.icon;
              return (
                <div key={idx} className="text-center p-8 bg-white rounded-2xl shadow-card border border-gray-200 hover:shadow-card-hover transition-all">
                  <div className="inline-block p-4 bg-pharma-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-pharma-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-pharma-600 font-semibold mb-2">{method.value}</p>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Send us a Message</h2>
            <p className="text-gray-600 text-lg">Or fill out the form below and we'll get back to you as soon as possible</p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-12 text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-900">Message Sent Successfully!</h3>
              <p className="text-gray-600">Thank you for reaching out. We'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pharma-600 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pharma-600 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Pharma Inc."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pharma-600 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pharma-600 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us more about your inquiry..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pharma-600 focus:outline-none transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-pharma text-white rounded-lg font-bold text-lg hover:shadow-glow transition-all flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                question: 'How quickly can I get results?',
                answer: 'Most analyses complete within seconds. Our AI agents process data in real-time, providing instant insights and comprehensive reports.'
              },
              {
                question: 'Is my data secure?',
                answer: 'Yes, we use enterprise-grade encryption and comply with HIPAA, GDPR, and other regulatory requirements. Your data is protected with multiple security layers.'
              },
              {
                question: 'Do you offer API access?',
                answer: 'Yes, we offer REST APIs for enterprise clients. Contact our sales team to discuss custom integration options.'
              },
              {
                question: 'What kind of support do you provide?',
                answer: 'We offer 24/7 technical support, dedicated account managers for enterprise clients, and comprehensive documentation.'
              },
              {
                question: 'Can I try it for free?',
                answer: 'Yes! Start with our free trial that includes 100 analyses. No credit card required.'
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-pharma-300 transition">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
