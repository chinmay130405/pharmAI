import { useState } from 'react';
import { ArrowRight, Zap, BarChart3, Users, Brain, Lock, Microscope, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      id: 1,
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze pharmaceutical data in seconds',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 2,
      icon: BarChart3,
      title: 'Market Intelligence',
      description: 'Real-time market trends, competitor analysis, and growth forecasting',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      icon: Microscope,
      title: 'Clinical Insights',
      description: 'Comprehensive analysis of clinical trials and research data',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      icon: Lock,
      title: 'Patent Intelligence',
      description: 'Freedom-to-operate analysis and patent landscape assessment',
      color: 'from-orange-500 to-rose-500'
    },
    {
      id: 5,
      icon: Users,
      title: 'Collaborative Platform',
      description: 'Share insights and collaborate with your research team seamlessly',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 6,
      icon: Zap,
      title: 'Real-Time Updates',
      description: 'Stay ahead with continuous market monitoring and alerts',
      color: 'from-yellow-500 to-orange-500'
    },
  ];

  const stats = [
    { label: 'Molecules Analyzed', value: '10K+' },
    { label: 'Clinical Trials', value: '50K+' },
    { label: 'Patents Indexed', value: '5M+' },
    { label: 'Research Papers', value: '2M+' },
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      title: 'Chief Research Officer',
      company: 'BioTech Innovations',
      text: 'PharmAI has revolutionized our drug discovery process. We\'ve reduced analysis time by 80%.',
      icon: Brain
    },
    {
      name: 'Prof. James Mitchell',
      title: 'Head of Clinical Trials',
      company: 'Medical Research Institute',
      text: 'The market intelligence features are unparalleled. Highly recommended for any pharma company.',
      icon: Microscope
    },
    {
      name: 'Dr. Maria Garcia',
      title: 'Innovation Director',
      company: 'Global Pharma Corp',
      text: 'Best investment we\'ve made in research infrastructure. The ROI was immediate.',
      icon: Users
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-pharma-900 to-gray-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pharma-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pharma-500/10 border border-pharma-500/30 rounded-full hover:border-pharma-500/60 transition">
            <span className="w-2 h-2 bg-pharma-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-pharma-300">AI-Powered Drug Discovery Platform</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-pharma-400 via-cyan-300 to-pharma-400 bg-clip-text text-transparent leading-tight">
            Accelerate Your Drug Discovery Journey
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Powered by advanced AI agents to identify innovative drug repurposing opportunities, 
            analyze market trends, and make data-driven decisions in pharmaceutical research
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              to="/search"
              className="px-8 py-4 bg-gradient-pharma rounded-xl font-semibold text-lg hover:shadow-glow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Start Analyzing <ArrowRight size={20} />
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border-2 border-pharma-400 text-pharma-300 rounded-xl font-semibold text-lg hover:bg-pharma-400/10 transition-all"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 border-t border-pharma-500/30">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold text-pharma-400 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold">Powerful Features</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to accelerate drug discovery and make smarter research decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={`group relative p-8 rounded-2xl border border-pharma-500/20 bg-gradient-to-br from-pharma-900/40 to-transparent hover:border-pharma-500/60 transition-all cursor-pointer ${
                    hoveredFeature === feature.id ? 'transform scale-105 shadow-2xl' : ''
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity blur`}></div>
                  
                  <div className={`relative z-10 inline-block p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                    <Icon size={28} className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-pharma-300 transition">{feature.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold">How It Works</h2>
            <p className="text-xl text-gray-400">Simple, powerful, and efficient</p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Enter Molecule Name',
                description: 'Simply search for any pharmaceutical molecule or drug candidate you want to analyze'
              },
              {
                step: '02',
                title: 'AI Analysis',
                description: 'Our advanced AI agents analyze market data, clinical trials, patents, and research trends'
              },
              {
                step: '03',
                title: 'Get Insights',
                description: 'Receive comprehensive reports with actionable recommendations and strategic insights'
              },
              {
                step: '04',
                title: 'Make Decisions',
                description: 'Use data-driven insights to accelerate your drug discovery and R&D initiatives'
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-pharma text-white font-bold text-xl">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-400">Pharmaceutical companies and research institutions worldwide rely on PharmAI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => {
              const IconComponent = testimonial.icon;
              return (
              <div key={idx} className="p-8 rounded-2xl border border-pharma-500/20 bg-gradient-to-br from-pharma-900/40 to-transparent hover:border-pharma-500/60 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-pharma-600/20 rounded-lg">
                    <IconComponent size={24} className="text-pharma-400" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.title}</p>
                    <p className="text-xs text-pharma-400">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold">Ready to Transform Your Research?</h2>
          <p className="text-xl text-gray-400">Join thousands of pharmaceutical researchers using PharmAI</p>
          <Link
            to="/search"
            className="inline-block px-10 py-5 bg-gradient-pharma rounded-xl font-bold text-lg hover:shadow-glow-lg transition-all transform hover:scale-105"
          >
            Start Your Free Analysis
          </Link>
        </div>
      </section>
    </div>
  );
}
