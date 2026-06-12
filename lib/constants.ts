export const SITE_CONFIG = {
  name: 'TranCoreX Pvt. Ltd.',
  tagline: 'Global Export Consultancy · Manufacturing · International Trading',
  description:
    'TranCoreX Pvt. Ltd. is a premier export consultancy, manufacturing, and international trading company based in Delhi, India, serving GCC, Europe, North America, and Australia.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://trancorex.com',
  email: 'info@trancorex.com',
  phone: '+91 11 4567 8900',
  whatsapp: '+919876543210',
  address: 'Connaught Place, New Delhi 110001, India',
  social: {
    linkedin: 'https://linkedin.com/company/trancorex',
    twitter: 'https://twitter.com/trancorex',
    instagram: 'https://instagram.com/trancorex',
    facebook: 'https://facebook.com/trancorex',
  },
};

export const NAV_LINKS = [
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Who We Are', href: '/about' },
      { label: 'Why Choose Us', href: '/why-choose-us' },
      { label: 'Testimonials', href: '/testimonials' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Export Consultancy', href: '/services/export-consultancy' },
      { label: 'Manufacturing', href: '/services/manufacturing' },
      { label: 'International Trading', href: '/services/international-trading' },
      { label: 'Supply Chain Management', href: '/services/supply-chain-management' },
      { label: 'Documentation & Compliance', href: '/services/documentation-compliance' },
      { label: 'Market Entry Strategy', href: '/services/market-entry-strategy' },
      { label: 'Business Development', href: '/services/business-development' },
      { label: 'Import-Export Compliance', href: '/services/import-export-compliance-advisory' },
    ],
  },
  { label: 'Industries', href: '/industries' },
  { label: 'Global Markets', href: '/global-markets' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const SERVICES = [
  {
    id: '1',
    title: 'Export Consultancy',
    slug: 'export-consultancy',
    description:
      'End-to-end export advisory services helping Indian businesses navigate international markets with confidence and compliance.',
    icon: 'Globe',
    features: [
      'Market research & feasibility analysis',
      'Export documentation guidance',
      'Customs clearance support',
      'Trade finance advisory',
      'Regulatory compliance consulting',
    ],
    benefits: [
      { title: 'Faster Market Entry', description: 'Reduce time-to-market by up to 60% with our proven export frameworks.' },
      { title: 'Risk Mitigation', description: 'Comprehensive compliance checks to avoid costly regulatory penalties.' },
      { title: 'Cost Optimization', description: 'Strategic routing and documentation to minimize export costs.' },
    ],
    process: ['Discovery & Assessment', 'Strategy Development', 'Documentation Setup', 'Market Launch', 'Ongoing Support'],
  },
  {
    id: '2',
    title: 'Manufacturing',
    slug: 'manufacturing',
    description:
      'World-class manufacturing solutions with quality assurance, scalable production, and global delivery capabilities.',
    icon: 'Factory',
    features: [
      'Contract manufacturing',
      'Quality control & assurance',
      'Custom product development',
      'Packaging & labeling',
      'Bulk production management',
    ],
    benefits: [
      { title: 'ISO Certified Quality', description: 'Manufacturing processes aligned with international quality standards.' },
      { title: 'Scalable Production', description: 'From prototype to mass production with consistent quality.' },
      { title: 'Global Logistics', description: 'Integrated shipping and delivery to 40+ countries worldwide.' },
    ],
    process: ['Requirements Analysis', 'Prototype Development', 'Production Planning', 'Quality Assurance', 'Global Delivery'],
  },
  {
    id: '3',
    title: 'International Trading',
    slug: 'international-trading',
    description:
      'Strategic import-export trading services connecting businesses across GCC, Europe, North America, and Australia.',
    icon: 'Ship',
    features: [
      'Import-export facilitation',
      'Trade partner matching',
      'Letter of credit handling',
      'Freight forwarding coordination',
      'Multi-currency transactions',
    ],
    benefits: [
      { title: 'Global Network', description: 'Established partnerships across 40+ countries and major trade hubs.' },
      { title: 'Trade Expertise', description: 'Deep knowledge of bilateral trade agreements and tariffs.' },
      { title: 'End-to-End Support', description: 'From sourcing to delivery, we manage the entire trade cycle.' },
    ],
    process: ['Trade Assessment', 'Partner Identification', 'Negotiation & Contracting', 'Logistics Coordination', 'Settlement'],
  },
  {
    id: '4',
    title: 'Supply Chain Management',
    slug: 'supply-chain-management',
    description:
      'Optimized supply chain solutions ensuring seamless flow of goods from origin to destination across global markets.',
    icon: 'Truck',
    features: [
      'Supply chain optimization',
      'Inventory management',
      'Vendor management',
      'Last-mile delivery coordination',
      'Real-time tracking systems',
    ],
    benefits: [
      { title: 'Reduced Lead Times', description: 'Streamlined logistics cutting delivery times by up to 35%.' },
      { title: 'Cost Efficiency', description: 'Optimized routing and consolidation for maximum savings.' },
      { title: 'Visibility', description: 'Real-time tracking and reporting across the entire supply chain.' },
    ],
    process: ['Audit & Mapping', 'Strategy Design', 'Implementation', 'Monitoring', 'Continuous Improvement'],
  },
  {
    id: '5',
    title: 'Documentation & Compliance',
    slug: 'documentation-compliance',
    description:
      'Comprehensive documentation and regulatory compliance services for hassle-free international trade operations.',
    icon: 'FileCheck',
    features: [
      'Export-import documentation',
      'Certificate of origin',
      'Customs compliance',
      'Product certification support',
      'Regulatory filing assistance',
    ],
    benefits: [
      { title: 'Zero Delays', description: 'Accurate documentation preventing customs hold-ups and penalties.' },
      { title: 'Full Compliance', description: 'Stay updated with changing international trade regulations.' },
      { title: 'Expert Review', description: 'Every document reviewed by certified trade compliance specialists.' },
    ],
    process: ['Document Assessment', 'Preparation', 'Verification', 'Submission', 'Follow-up'],
  },
  {
    id: '6',
    title: 'Market Entry Strategy',
    slug: 'market-entry-strategy',
    description:
      'Data-driven market entry strategies tailored for GCC, European, North American, and Australian markets.',
    icon: 'Target',
    features: [
      'Market analysis & sizing',
      'Competitive landscape mapping',
      'Entry mode selection',
      'Localization strategy',
      'Go-to-market planning',
    ],
    benefits: [
      { title: 'Informed Decisions', description: 'Data-backed insights for confident market entry decisions.' },
      { title: 'Reduced Risk', description: 'Thorough analysis minimizing entry failures and wasted investment.' },
      { title: 'Local Expertise', description: 'On-ground knowledge of target market dynamics and culture.' },
    ],
    process: ['Market Research', 'Strategy Formulation', 'Pilot Launch', 'Scale-up Planning', 'Performance Review'],
  },
  {
    id: '7',
    title: 'Business Development',
    slug: 'business-development',
    description:
      'Strategic business development services to expand your global footprint and forge lasting international partnerships.',
    icon: 'TrendingUp',
    features: [
      'Partner identification',
      'Trade show representation',
      'B2B matchmaking',
      'Distribution network setup',
      'Joint venture facilitation',
    ],
    benefits: [
      { title: 'Network Access', description: 'Tap into our extensive global B2B network of verified partners.' },
      { title: 'Revenue Growth', description: 'Proven strategies that have helped clients achieve 3x export growth.' },
      { title: 'Long-term Partnerships', description: 'Focus on sustainable, mutually beneficial business relationships.' },
    ],
    process: ['Opportunity Mapping', 'Outreach & Engagement', 'Negotiation', 'Partnership Formation', 'Growth Management'],
  },
  {
    id: '8',
    title: 'Import-Export Compliance Advisory',
    slug: 'import-export-compliance-advisory',
    description:
      'Expert advisory on import-export regulations, tariffs, and compliance requirements across all major global markets.',
    icon: 'Shield',
    features: [
      'Regulatory compliance audits',
      'Tariff classification',
      'Anti-dumping duty advisory',
      'Free trade agreement utilization',
      'Compliance training programs',
    ],
    benefits: [
      { title: 'Penalty Avoidance', description: 'Proactive compliance preventing costly fines and shipment seizures.' },
      { title: 'Tariff Optimization', description: 'Leverage FTAs and preferential tariffs to reduce duty costs.' },
      { title: 'Audit Ready', description: 'Maintain audit-ready documentation at all times.' },
    ],
    process: ['Compliance Audit', 'Gap Analysis', 'Remediation Plan', 'Implementation', 'Ongoing Monitoring'],
  },
];

export const INDUSTRIES = [
  { name: 'Automobile', icon: 'Car', description: 'Auto components, spare parts, and vehicle exports to global markets.' },
  { name: 'Engineering', icon: 'Cog', description: 'Precision engineering products and industrial machinery exports.' },
  { name: 'Textile', icon: 'Shirt', description: 'Premium textiles, garments, and fabric exports worldwide.' },
  { name: 'Electronics', icon: 'Cpu', description: 'Consumer electronics, components, and tech product trading.' },
  { name: 'Healthcare', icon: 'HeartPulse', description: 'Medical devices, pharmaceuticals, and healthcare supplies.' },
  { name: 'Agriculture', icon: 'Wheat', description: 'Agri-products, seeds, and organic produce exports.' },
  { name: 'Food Processing', icon: 'UtensilsCrossed', description: 'Processed foods, spices, and specialty food exports.' },
  { name: 'Chemicals', icon: 'FlaskConical', description: 'Industrial chemicals, specialty chemicals, and petrochemicals.' },
  { name: 'Construction', icon: 'Building2', description: 'Building materials, steel, and construction equipment.' },
  { name: 'Industrial Equipment', icon: 'Wrench', description: 'Heavy machinery, tools, and industrial equipment trading.' },
];

export const STATS = [
  { label: 'Countries Served', value: 40, suffix: '+' },
  { label: 'Global Clients', value: 500, suffix: '+' },
  { label: 'Projects Completed', value: 1200, suffix: '+' },
  { label: 'Years of Excellence', value: 15, suffix: '+' },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Global Expertise',
    description: 'Deep market knowledge across GCC, Europe, North America, and Australia with on-ground presence.',
    icon: 'Globe2',
  },
  {
    title: 'End-to-End Solutions',
    description: 'From consultancy to manufacturing to delivery — one partner for your entire export journey.',
    icon: 'Layers',
  },
  {
    title: 'Compliance First',
    description: 'Zero-compromise approach to regulatory compliance and documentation accuracy.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Proven Track Record',
    description: '15+ years of excellence with 500+ satisfied clients and 1200+ successful projects.',
    icon: 'Award',
  },
];

export const GLOBAL_REGIONS = [
  {
    id: 'gcc',
    name: 'GCC',
    markets: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'],
    services: ['Export Consultancy', 'International Trading', 'Documentation & Compliance'],
    description: 'Strategic gateway to the Middle East with established partnerships across all GCC nations.',
    coordinates: { x: 62, y: 45 },
  },
  {
    id: 'europe',
    name: 'Europe',
    markets: ['Germany', 'UK', 'France', 'Netherlands', 'Italy', 'Spain'],
    services: ['Market Entry Strategy', 'Manufacturing', 'Supply Chain Management'],
    description: 'Comprehensive European market access with CE compliance and EU regulatory expertise.',
    coordinates: { x: 48, y: 32 },
  },
  {
    id: 'north-america',
    name: 'North America',
    markets: ['USA', 'Canada', 'Mexico'],
    services: ['Business Development', 'Import-Export Compliance', 'International Trading'],
    description: 'Full-service North American trade operations with FDA and USDA compliance support.',
    coordinates: { x: 22, y: 38 },
  },
  {
    id: 'australia',
    name: 'Australia',
    markets: ['Australia', 'New Zealand'],
    services: ['Export Consultancy', 'Market Entry Strategy', 'Documentation & Compliance'],
    description: 'Growing presence in Oceania with specialized agri-export and mining equipment expertise.',
    coordinates: { x: 82, y: 72 },
  },
];

export const TIMELINE = [
  { year: '2010', title: 'Foundation', description: 'TranCoreX established in New Delhi with a vision to simplify global trade for Indian businesses.' },
  { year: '2013', title: 'GCC Expansion', description: 'Opened operations in Dubai, establishing key partnerships across the Gulf region.' },
  { year: '2016', title: 'European Markets', description: 'Expanded into European markets with dedicated compliance and documentation teams.' },
  { year: '2019', title: 'Manufacturing Division', description: 'Launched in-house manufacturing capabilities serving export-quality production.' },
  { year: '2022', title: 'Digital Transformation', description: 'Implemented end-to-end digital trade management platform for real-time tracking.' },
  { year: '2025', title: 'Global Leadership', description: 'Serving 40+ countries with 500+ clients and recognized as a leading export consultancy.' },
];

export const CORE_VALUES = [
  { title: 'Integrity', description: 'Transparent dealings and ethical business practices in every transaction.', icon: 'Scale' },
  { title: 'Excellence', description: 'Uncompromising quality standards across all services and deliverables.', icon: 'Star' },
  { title: 'Innovation', description: 'Continuously evolving strategies to meet dynamic global trade demands.', icon: 'Lightbulb' },
  { title: 'Partnership', description: 'Building long-term relationships based on mutual growth and trust.', icon: 'Handshake' },
  { title: 'Global Vision', description: 'Thinking globally while acting locally in every market we serve.', icon: 'Eye' },
  { title: 'Agility', description: 'Rapid response to market changes and client needs with flexible solutions.', icon: 'Zap' },
];

export const FAQ_CATEGORIES = ['General', 'Export', 'Manufacturing', 'Trading', 'Pricing'] as const;

export const DEFAULT_FAQS = [
  {
    question: 'What services does TranCoreX provide?',
    answer: 'TranCoreX offers comprehensive export consultancy, manufacturing, international trading, supply chain management, documentation & compliance, market entry strategy, business development, and import-export compliance advisory services.',
    category: 'General',
  },
  {
    question: 'Which countries do you serve?',
    answer: 'We serve clients across 40+ countries, with specialized expertise in GCC nations, European markets, North America, and Australia.',
    category: 'General',
  },
  {
    question: 'How do I start exporting with TranCoreX?',
    answer: 'Contact us through our enquiry form or call us directly. Our team will schedule a consultation to understand your requirements and develop a customized export strategy.',
    category: 'Export',
  },
  {
    question: 'Do you handle export documentation?',
    answer: 'Yes, we provide complete documentation services including certificates of origin, shipping bills, insurance documents, and all regulatory filings required for international trade.',
    category: 'Export',
  },
  {
    question: 'What manufacturing capabilities do you offer?',
    answer: 'Our manufacturing division offers contract manufacturing, custom product development, quality control, packaging, and bulk production with ISO-certified processes.',
    category: 'Manufacturing',
  },
  {
    question: 'Can you help with customs clearance?',
    answer: 'Absolutely. We provide end-to-end customs clearance support including pre-shipment inspection, duty calculation, and liaison with customs authorities.',
    category: 'Trading',
  },
  {
    question: 'What are your pricing models?',
    answer: 'We offer flexible pricing including project-based fees, retainer models, and success-based commissions depending on the service scope. Contact us for a customized quote.',
    category: 'Pricing',
  },
];

export const PARTNER_LOGOS = [
  'Maersk', 'DHL', 'FedEx', 'DP World', 'MSC', 'CMA CGM',
  'Hapag-Lloyd', 'Evergreen', 'COSCO', 'ONE', 'Yang Ming', 'ZIM',
];
