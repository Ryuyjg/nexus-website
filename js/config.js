// Default Website Configuration for NEXUS AI
const DEFAULT_CONFIG = {
  general: {
    companyName: 'NEXUS AI',
    logoText: 'NEXUS',
    logoIcon: 'N', // Single character inside gradient
    copyright: '© 2026 NEXUS AI. All rights reserved.',
    primaryColor: '#00f2fe',
    secondaryColor: '#4facfe',
    accentColor: '#d946ef',
    isDarkTheme: false
  },
  hero: {
    badge: 'Enterprise Intelligence Suite',
    title: 'Automate Decisions. Maximize ROI.',
    subtitle: 'NEXUS AI combines quantum-inspired cognitive computing with enterprise process modeling to run your company at peak performance.',
    ctaPrimaryText: 'Calculate Your ROI',
    ctaPrimaryLink: '#/pricing',
    ctaSecondaryText: 'Explore Services',
    ctaSecondaryLink: '#/services'
  },
  stats: [
    { label: 'System Uptime', value: 99.99, suffix: '%' },
    { label: 'Capital Optimized', value: 2.4, suffix: 'B+' },
    { label: 'AI Models Active', value: 450, suffix: 'k+' },
    { label: 'Average Efficiency Boost', value: 42, suffix: '%' }
  ],
  services: [
    {
      id: 'ai-automation',
      title: 'Cognitive Workflow Automation',
      shortDesc: 'Automate highly complex administrative and logistical pipelines with neural agents that think and adapt.',
      longDesc: 'Our flagship cognitive automation system goes far beyond RPA. We train neural workflow models specifically on your legacy operational telemetry. These agents dynamically reroute tickets, approve corporate decisions, and write system bridges automatically. The result is a 90% reduction in workflow blockages.',
      icon: '🧠',
      category: 'AI'
    },
    {
      id: 'quantum-analytics',
      title: 'Quantum-Inspired Optimization',
      shortDesc: 'Solve highly complex linear programming, routing, and distribution problems in seconds rather than days.',
      longDesc: 'Using simulated quantum tunneling algorithms, our solver handles millions of concurrent resource distribution constraints in milliseconds. Excellent for supply chain routes, financial asset distribution, portfolio optimization, and server architecture allocation.',
      icon: '⚡',
      category: 'Infrastructure'
    },
    {
      id: 'digital-twins',
      title: 'Enterprise Digital Twins',
      shortDesc: 'Build a comprehensive, real-time virtual clone of your entire firm to simulate critical operational scenarios.',
      longDesc: 'Digital Twins synthesize databases, employee velocity charts, cloud spend sheets, and manufacturing metrics into a real-time reactive graph. Run simulated load tests: predict what happens to operating margins if server usage doubles or logistics partners delay by 3 days.',
      icon: '🌐',
      category: 'AI'
    },
    {
      id: 'cyber-defense',
      title: 'Autonomous Threat Hunting',
      shortDesc: 'Next-generation heuristic threat detection that locks down data before security breaches occur.',
      longDesc: 'Deploy lightweight agents across all corporate endpoints. Our heuristic agent listens for abnormal filesystem writes, token creations, and network payloads, isolating compromised machines in a sandbox in under 120 milliseconds. Complete real-time threat reporting generated automatically.',
      icon: '🛡️',
      category: 'Security'
    },
    {
      id: 'cloud-orchestration',
      title: 'Self-Optimizing Hybrid Cloud',
      shortDesc: 'Autonomously balance server loads across AWS, GCP, and Azure to cut computing costs in half.',
      longDesc: 'Nexus Cloud Control watches your API latency and node costs in real-time. By dynamically shifting low-priority batches to spot instances and migrating elastic web servers between GCP, AWS, and Azure based on local zone pricing, we guarantee maximum performance at minimal cost.',
      icon: '☁️',
      category: 'Infrastructure'
    },
    {
      id: 'custom-dev',
      title: 'Predictive Customer Intelligence',
      shortDesc: 'Understand churn and buyer behavior weeks ahead of time using specialized transformer models.',
      longDesc: 'Aggregate customer clickstreams, customer support chats, and transaction logs. Our transformer models construct personalized buyer sentiment paths, flagging users with a high likelihood of churn and auto-scheduling tailored outreach campaigns to retain them.',
      icon: '📈',
      category: 'AI'
    }
  ],
  team: [
    {
      name: 'Dr. Evelyn Vance',
      role: 'CEO & Founder',
      bio: 'Former head of Quantum Research at MIT with 15+ years experience building large scale statistical engines.',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      socials: { twitter: '#', linkedin: '#' }
    },
    {
      name: 'Marcus Kaelen',
      role: 'Chief of AI Systems',
      bio: 'Led distributed database scaling projects at major tech firms. Specialist in neural compilers and low-latency graphs.',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
      socials: { twitter: '#', linkedin: '#' }
    },
    {
      name: 'Sora Tanaka',
      role: 'Head of Infrastructure',
      bio: 'Systems engineer who architected cloud orchestration platforms handling billions of requests per day.',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      socials: { twitter: '#', linkedin: '#' }
    },
    {
      name: 'Elena Rostova',
      role: 'VP of Cybersecurity',
      bio: 'Expert in defensive cryptography and network sandboxing. Advises federal groups on cyber threat intelligence.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      socials: { twitter: '#', linkedin: '#' }
    }
  ],
  testimonials: [
    {
      name: 'Sarah Jenkins',
      position: 'CTO, Global Logistics Corp',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      quote: 'Nexus Quantum Analytics reduced our routing calculation time from 6 hours to 4 seconds, saving our shipping fleet over $18M in fuel costs in the first quarter alone.'
    },
    {
      name: 'David Chen',
      position: 'Director of Security, Apex FinTech',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      quote: 'We had an endpoint vulnerability exploit occur at 3 AM. The autonomous threat hunter quarantined the host and patched the policy dynamically. Unbelievable response time.'
    },
    {
      name: 'Laura Croft',
      position: 'VP Operations, CloudScale Inc',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      quote: 'With self-optimizing hybrid cloud, our cloud budget decreased by 46% without dropping a single active customer API thread. NEXUS is a game changer.'
    }
  ],
  pricing: {
    tiers: [
      {
        name: 'Starter Suite',
        price: '4,500',
        features: [
          '2 Active Neural Agents',
          'Standard Optimization Solver',
          '5 TB Monthly Managed Data',
          'Heuristic Security Scanning',
          'Next-Business-Day Support'
        ]
      },
      {
        name: 'Enterprise Growth',
        price: '12,000',
        featured: true,
        features: [
          '10 Active Neural Agents',
          'Full Simulated Quantum Solver',
          '50 TB Monthly Managed Data',
          'Autonomous Sandbox Quarantines',
          'Hybrid Cloud Cost Optimizer',
          '24/7 Priority SLA Support'
        ]
      },
      {
        name: 'Quantum Custom',
        price: 'Contact Us',
        features: [
          'Unlimited Custom Cognitive Agents',
          'Dedicated Hybrid Clusters',
          'Petabyte Scale Data Stream Sync',
          'Enterprise Digital Twin Sandbox',
          'Custom Cryptographic Auditing',
          'Dedicated Systems Integration Team'
        ]
      }
    ]
  },
  careers: [
    {
      id: 'job-1',
      title: 'Senior Machine Learning Developer',
      department: 'R&D',
      location: 'Boston, MA / Hybrid',
      type: 'Full-Time',
      requirements: 'Master\'s or Ph.D. in CS, Mathematics or similar. 5+ years experience tuning transformers, deep neural workflows, and reinforcement learning loops.'
    },
    {
      id: 'job-2',
      title: 'Cloud Infrastructure Architect',
      department: 'Engineering',
      location: 'Remote (US/EU)',
      type: 'Full-Time',
      requirements: 'Extensive hands-on mastery of Kubernetes, dynamic resource pooling, spot pricing strategies, AWS/GCP/Azure API architectures, and low-latency network pipelines.'
    },
    {
      id: 'job-3',
      title: 'Quantum Algorithm Analyst',
      department: 'Research',
      location: 'Boston, MA',
      type: 'Full-Time',
      requirements: 'Ph.D. in Physics, Applied Mathematics, or Quantum Computing. Expert knowledge of simulated annealing, quantum tunneling algorithms, and combinatorial solvers.'
    }
  ],
  portfolio: [
    {
      company: 'Global Logistics Group',
      industry: 'Logistics & Supply Chain',
      challenge: 'Optimizing continuous scheduling of 2,400 trucks, containers, and depots across Europe with millions of linear routing constraints.',
      solution: 'Deployed Nexus Quantum Optimization Solver, updating dispatch sequences dynamically every 4 minutes based on road telemetry and weather inputs.',
      efficiencyBoost: '42%',
      annualSavings: '$18.2M',
      logoChar: 'L'
    },
    {
      company: 'Apex FinTech Corp',
      industry: 'Financial Infrastructure',
      challenge: 'Frequent zero-day exploit attempts on trading backend nodes resulting in compute degradation and risk vulnerabilities.',
      solution: 'Quarantined vulnerable virtual servers in under 120ms utilizing autonomous heuristic sandboxing. Automatically generated vulnerability reports for engineers.',
      efficiencyBoost: '68%',
      annualSavings: '$6.4M',
      logoChar: 'A'
    },
    {
      company: 'CyberCore Systems',
      industry: 'Cloud Infrastructure',
      challenge: 'Escalating computing expenditures due to static cloud allocations and peak traffic spikes on elastic web portals.',
      solution: 'Automated continuous spot pricing shift and dynamic migration between AWS, GCP, and Azure zones based on billing rates.',
      efficiencyBoost: '46%',
      annualSavings: '$4.1M',
      logoChar: 'C'
    }
  ],
  blogPosts: [
    {
      id: 'blog-post-1',
      title: 'The Power of Simulated Quantum Tunneling in Supply Chains',
      author: 'Dr. Evelyn Vance',
      category: 'Research',
      date: 'May 12, 2026',
      summary: 'How simulated quantum algorithms solve complex multi-node distribution equations in seconds, outperforming traditional linear operations.'
    },
    {
      id: 'blog-post-2',
      title: 'Heuristic Sandboxing: Moving Beyond Signature-Based Cyber Defense',
      author: 'Elena Rostova',
      category: 'Security',
      date: 'April 28, 2026',
      summary: 'Deploying deep neural workflow listeners to identify zero-day threat patterns based on endpoint file actions, rather than signature directories.'
    },
    {
      id: 'blog-post-3',
      title: 'Why Digital Twins are Crucial for Enterprise Stress-Testing',
      author: 'Marcus Kaelen',
      category: 'AI & Modeling',
      date: 'March 15, 2026',
      summary: 'Running simulation stress scenarios on your entire corporate data schema helps identify system bottlenecks before they impact margins.'
    }
  ],
  faqs: [
    {
      question: 'How fast can NEXUS AI be integrated into our systems?',
      answer: 'Typically, core read-only telemetry connections can be configured in 3 to 5 business days. Full cognitive agent integration and write-back automations average 3 to 6 weeks, which includes extensive sandbox stress-testing.',
      category: 'Integration'
    },
    {
      question: 'What cloud providers do your hybrid optimizers support?',
      answer: 'Our self-optimizing hybrid cloud solution natively integrates with Amazon Web Services (AWS), Google Cloud Platform (GCP), Microsoft Azure, and Private Kubernetes clusters using secure API keys.',
      category: 'Tech Stack'
    },
    {
      question: 'How secure is the autonomous threat hunter?',
      answer: 'The autonomous threat hunting agent runs inside a strict kernel sandbox. It has zero external write capabilities to your central databases, and uses encrypted TLS 1.3 streams to push quarantine requests to the local orchestrator.',
      category: 'Security'
    },
    {
      question: 'Do you offer custom proof of concepts (POC)?',
      answer: 'Yes. For qualified enterprises, we build a customized mini-digital twin or a simulated quantum optimizer using your historical data to demonstrate efficiency savings and ROI directly before contract signing.',
      category: 'Billing'
    }
  ],
  status: {
    globalState: 'Operational',
    components: [
      { name: 'Cognitive Solver Engine', status: 'Operational', latency: '12ms' },
      { name: 'Simulated Quantum Node', status: 'Operational', latency: '8ms' },
      { name: 'Hybrid Cloud Orchestrator', status: 'Operational', latency: '15ms' },
      { name: 'Heuristic Intrusion Sandbox', status: 'Operational', latency: '3ms' },
      { name: 'Spot Price Compiler Core', status: 'Operational', latency: '22ms' }
    ],
    incidents: [
      { date: 'May 28, 2026', title: 'Spot compiler elasticity upgrade', desc: 'Successfully migrated compiler pipelines to zero-overhead spot nodes. Downtime: 0ms.' },
      { date: 'May 14, 2026', title: 'Sandbox endpoint routine quarantine audit', desc: 'Executed automated sandbox security quarantine simulation. Threat hunt systems quarantined mock packets in 118ms.' }
    ]
  }
};
window.DEFAULT_CONFIG = DEFAULT_CONFIG;
