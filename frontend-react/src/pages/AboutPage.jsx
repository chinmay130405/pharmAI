import { Award, Users, Globe, Zap, Target, TrendingUp, Brain, BookOpen, Stethoscope, Code } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We constantly push the boundaries of AI and pharmaceutical research'
    },
    {
      icon: Target,
      title: 'Precision & Accuracy',
      description: 'Every analysis is backed by rigorous data validation and expert oversight'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of shared knowledge and teamwork'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Making pharmaceutical research accessible to researchers worldwide'
    },
  ];

  const team = [
    {
      name: 'Dr. Elizabeth Johnson',
      role: 'CEO & Co-Founder',
      expertise: 'PhD in Computational Biology',
      icon: Brain
    },
    {
      name: 'Prof. Michael Chen',
      role: 'Chief Research Officer',
      expertise: 'Former Stanford Pharmaceutical Researcher',
      icon: BookOpen
    },
    {
      name: 'Dr. Sarah Williams',
      role: 'VP Clinical Science',
      expertise: 'MD, Clinical Trial Specialist',
      icon: Stethoscope
    },
    {
      name: 'James Rodriguez',
      role: 'CTO',
      expertise: 'AI/ML Expert, 15+ years experience',
      icon: Code
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pharma-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pharma-600 to-pharma-800 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">About PharmAI</h1>
          <p className="text-xl text-pharma-100">
            Revolutionizing pharmaceutical research through artificial intelligence and data science
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To accelerate pharmaceutical innovation and drug discovery by providing researchers 
                  with powerful AI-driven tools that transform complex data into actionable insights. 
                  We empower global teams to make smarter research decisions faster.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  A future where AI democratizes pharmaceutical research, enabling discoveries that 
                  improve millions of lives. We envision a world where breakthrough drugs reach patients 
                  faster through intelligent analysis and collaborative innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="text-center space-y-4">
                  <div className="inline-block p-4 bg-pharma-100 rounded-full">
                    <Icon className="w-8 h-8 text-pharma-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology & Capabilities */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Our Technology</h2>
            <p className="text-gray-600 text-lg">Built on cutting-edge AI and machine learning</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Agents</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <span className="text-pharma-600 font-bold">•</span>
                  <span>IQVIA Agent: Market intelligence and competitive analysis</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pharma-600 font-bold">•</span>
                  <span>Clinical Agent: Clinical trial data and development status</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pharma-600 font-bold">•</span>
                  <span>Patent Agent: Freedom-to-operate analysis</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pharma-600 font-bold">•</span>
                  <span>Web Intelligence: Trend analysis and sentiment scoring</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Capabilities</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <span className="text-pharma-600 font-bold">•</span>
                  <span>Real-time data analysis and processing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pharma-600 font-bold">•</span>
                  <span>Predictive analytics and forecasting</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pharma-600 font-bold">•</span>
                  <span>Natural language processing and insights generation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pharma-600 font-bold">•</span>
                  <span>Secure data handling and compliance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Leadership Team</h2>
            <p className="text-gray-600 text-lg">World-class experts in pharmaceuticals and AI</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => {
              const IconComponent = member.icon;
              return (
              <div key={idx} className="text-center group">
                <div className="mb-4 group-hover:scale-110 transition-transform">
                  <div className="inline-flex items-center justify-center p-4 bg-pharma-100 rounded-full group-hover:bg-pharma-200">
                    <IconComponent size={32} className="text-pharma-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-pharma-600 font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.expertise}</p>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: 'Founded', value: '2022' },
              { label: 'Countries', value: '45+' },
              { label: 'Enterprise Clients', value: '200+' },
              { label: 'Analyses', value: '1M+' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center space-y-2 p-6 bg-pharma-50 rounded-xl">
                <div className="text-4xl font-bold text-pharma-600">{stat.value}</div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
