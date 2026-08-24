import React, { useState, useEffect } from 'https://esm.sh/react@18.3.1';
import { createRoot } from 'https://esm.sh/react-dom@18.3.1/client';

const clientProjects = [
  {
    id: 'kooijman',
    name: 'Kooijman En Kooijman BV',
    url: 'https://kooijmanenkooijman.nl',
    category: 'Client Collaboration',
    badge: 'Redesign In Development',
    badgeVariant: 'warning',
    summary: 'Comprehensive brand modernization and web platform overhaul currently in active engineering.',
    statusNote: 'Note: The current website is live at kooijmanenkooijman.nl with its classic design while the modern redesign is being developed.',
    deliverables: ['Corporate Web Redesign', 'Mobile-First UX', 'Brand Modernization', 'Performance Optimization'],
    year: '2025–2026'
  },
  {
    id: 'tsvg',
    name: 'TSVG',
    url: 'https://tsvg.nl',
    category: 'Client Collaboration',
    badge: 'Redesign In Development',
    badgeVariant: 'warning',
    summary: 'Next-generation web presence and digital revamp focused on clarity, responsiveness, and speed.',
    statusNote: 'Note: The current site remains online at tsvg.nl with its original look while the complete design overhaul is underway.',
    deliverables: ['Platform Overhaul', 'UI/UX Redesign', 'Technical Architecture', 'Speed & Accessibility'],
    year: '2025–2026'
  }
];

const inHouseVentures = [
  {
    id: 'tornhost',
    name: 'Tornhost',
    url: 'https://tornhost.com',
    category: 'In-House Venture',
    badge: 'In Development',
    badgeVariant: 'cyan',
    summary: 'Next-gen cloud hosting and developer infrastructure platform engineered for fast deployments and zero complexity.',
    statusNote: 'Internal product build targeting high reliability, streamlined server onboarding, and effortless management.',
    deliverables: ['Cloud Hosting', 'Infrastructure Automation', 'Developer Tooling', 'Dashboard UI'],
    year: 'Active Build'
  },
  {
    id: 'n0tlink',
    name: 'n0t.link',
    url: 'https://n0t.link',
    category: 'In-House Venture',
    badge: 'Live',
    badgeVariant: 'success',
    summary: 'Lightning-fast, minimalist URL redirection and link management service with zero ads and total privacy.',
    statusNote: 'Live with instant link creation and sub-millisecond edge redirection.',
    deliverables: ['Edge Redirection', 'Ad-Free Experience', 'Link Analytics', 'Public Beta'],
    year: 'Live'
  }
];

const services = [
  {
    icon: 'mdi-code-braces',
    number: '01',
    title: 'Web & Product Engineering',
    description: 'Custom, high-performing websites and web applications built with modern frontend frameworks, rock-solid architectures, and responsive precision.',
    highlights: ['React / Modern Stacks', 'Responsive & Mobile-First', 'Blazing-Fast Page Speeds', 'Production Reliability']
  },
  {
    icon: 'mdi-palette-swatch-outline',
    number: '02',
    title: 'UI/UX & Design Systems',
    description: 'Intentional visual design, intuitive user flows, and cohesive design systems crafted to establish credible, memorable brand experiences.',
    highlights: ['Design System Architecture', 'High-Fidelity Prototyping', 'Interaction Design', 'Accessibility Standards']
  },
  {
    icon: 'mdi-refresh-auto',
    number: '03',
    title: 'Modernization & Full Redesigns',
    description: 'Elevating legacy web properties into polished, modern digital platforms with improved UX, updated visual language, and clean modern code.',
    highlights: ['Legacy Migration', 'Performance Audits', 'SEO & Structure Upgrades', 'Zero-Downtime Transitions']
  },
  {
    icon: 'mdi-cloud-outline',
    number: '04',
    title: 'Digital Platforms & Ventures',
    description: 'From developer infrastructure tools to internal SaaS products, we design, architect, and launch bespoke digital utilities from the ground up.',
    highlights: ['Cloud & Hosting Integrations', 'Bespoke Tooling', 'Scalable Backends', 'Continuous Delivery']
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Scope',
    description: 'We align on your objectives, understand user expectations, and define technical requirements before touching a single line of code.'
  },
  {
    step: '02',
    title: 'Architecture & Design',
    description: 'Crafting intentional visual direction, wireframes, and scalable component systems that reflect a true modern brand.'
  },
  {
    step: '03',
    title: 'Engineering & Polish',
    description: 'Building clean, maintainable code with strict attention to responsiveness, micro-interactions, speed, and cross-browser quality.'
  },
  {
    step: '04',
    title: 'Launch & Continuity',
    description: 'Executing smooth production deployments, performing post-launch validation, and supporting ongoing platform evolution.'
  }
];

const metrics = [
  { value: '8+', label: 'Years of Experience', detail: 'Building modern digital products & web experiences' },
  { value: '4', label: 'Active Projects & Labs', detail: 'Client redesigns & in-house venture platforms' },
  { value: '100%', label: 'Responsive Standards', detail: 'Pixel-perfect across all viewports & devices' },
  { value: '<50ms', label: 'Edge Latency Target', detail: 'Built for speed, lightweight assets & clean code' }
];

const capabilities = [
  {
    icon: 'mdi-lightning-bolt-outline',
    title: 'Performance Obsessed',
    text: 'Optimized asset delivery, minimal overhead, and lightning-fast load times on every device.'
  },
  {
    icon: 'mdi-devices',
    title: 'Fluid & Responsive',
    text: 'Tailored experiences across desktop, tablet, and mobile with consistent fidelity.'
  },
  {
    icon: 'mdi-shield-check-outline',
    title: 'Engineering Rigor',
    text: 'Modern web standards, accessible layouts, and clean code that teams can maintain.'
  },
  {
    icon: 'mdi-rocket-launch-outline',
    title: 'Direct Execution',
    text: 'No unnecessary layers or bureaucracy. Fast communication and predictable milestones.'
  }
];

const contactChannels = [
  {
    icon: 'mdi-email-outline',
    title: 'Email Inquiry',
    value: 'contact@damanmikey.me',
    href: 'mailto:contact@damanmikey.me',
    actionLabel: 'Send email'
  },
  {
    icon: 'mdi-github',
    title: 'GitHub Organization',
    value: '@DaDevMikey',
    href: 'https://github.com/DaDevMikey',
    actionLabel: 'View GitHub'
  },
  {
    icon: 'mdi-web',
    title: 'Ecosystem Hub',
    value: 'DaManMikey.me',
    href: 'https://damanmikey.me',
    actionLabel: 'Visit website'
  }
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    document.body.classList.toggle('menu-open', mobileMenuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return React.createElement(
    'div',
    { className: 'app-root' },
    React.createElement(Header, {
      mobileMenuOpen,
      setMobileMenuOpen,
      closeMenu
    }),
    React.createElement(
      'main',
      null,
      React.createElement(HeroSection),
      React.createElement(MetricsSection),
      React.createElement(ServicesSection),
      React.createElement(ProjectsSection, {
        activeTab,
        setActiveTab
      }),
      React.createElement(CapabilitiesSection),
      React.createElement(ProcessSection),
      React.createElement(AboutSection),
      React.createElement(ContactSection)
    ),
    React.createElement(Footer)
  );
}

function Header({ mobileMenuOpen, setMobileMenuOpen, closeMenu }) {
  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Work & Ventures' },
    { href: '#capabilities', label: 'Capabilities' },
    { href: '#process', label: 'Process' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ];

  return React.createElement(
    'header',
    { className: 'header-sticky' },
    React.createElement(
      'div',
      { className: 'header-container' },
      React.createElement(
        'a',
        { href: '#top', className: 'brand-badge', onClick: closeMenu },
        React.createElement('img', {
          src: 'logo-3A4v6HJTGP8k26BXcVrTNrnjRUV.png',
          alt: 'Nexas Studios logo',
          className: 'brand-badge__logo'
        }),
        React.createElement(
          'div',
          { className: 'brand-badge__text' },
          React.createElement('span', { className: 'brand-badge__title' }, 'NEXAS STUDIOS'),
          React.createElement('span', { className: 'brand-badge__subtitle' }, 'Digital Product & Web Studio')
        )
      ),
      React.createElement(
        'nav',
        { className: 'desktop-nav' },
        navLinks.map((link) =>
          React.createElement(
            'a',
            { key: link.href, href: link.href, className: 'desktop-nav__link' },
            link.label
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'header-actions' },
        React.createElement(
          'a',
          { href: '#contact', className: 'btn btn--primary btn--compact' },
          React.createElement('span', null, 'Start a Project'),
          React.createElement('i', { className: 'mdi mdi-arrow-right' })
        ),
        React.createElement(
          'button',
          {
            type: 'button',
            className: `hamburger-btn ${mobileMenuOpen ? 'is-active' : ''}`,
            'aria-label': 'Toggle navigation menu',
            'aria-expanded': mobileMenuOpen,
            onClick: () => setMobileMenuOpen(!mobileMenuOpen)
          },
          React.createElement('span', null),
          React.createElement('span', null),
          React.createElement('span', null)
        )
      )
    ),
    React.createElement(
      'div',
      { className: `mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}` },
      React.createElement(
        'div',
        { className: 'mobile-drawer__inner' },
        navLinks.map((link) =>
          React.createElement(
            'a',
            {
              key: link.href,
              href: link.href,
              className: 'mobile-drawer__link',
              onClick: closeMenu
            },
            link.label
          )
        ),
        React.createElement(
          'a',
          {
            href: '#contact',
            className: 'btn btn--primary btn--full',
            onClick: closeMenu
          },
          React.createElement('span', null, 'Start a Project'),
          React.createElement('i', { className: 'mdi mdi-arrow-right' })
        )
      )
    )
  );
}

function HeroSection() {
  return React.createElement(
    'section',
    { className: 'hero-section', id: 'top' },
    React.createElement('div', { className: 'hero-glow hero-glow--cyan' }),
    React.createElement('div', { className: 'hero-glow hero-glow--blue' }),
    React.createElement(
      'div',
      { className: 'container hero-container' },
      React.createElement(
        'div',
        { className: 'hero-status-pill' },
        React.createElement('span', { className: 'status-dot' }),
        React.createElement('span', { className: 'status-text' }, 'Independent Web & Digital Product Studio')
      ),
      React.createElement(
        'h1',
        { className: 'hero-title' },
        'Crafting modern, high-performance web products & digital experiences.'
      ),
      React.createElement(
        'p',
        { className: 'hero-lead' },
        'Nexas Studios partners with forward-thinking businesses and builds internal ventures through intentional UI/UX design, modern frontend engineering, and dependable execution.'
      ),
      React.createElement(
        'div',
        { className: 'hero-cta-group' },
        React.createElement(
          'a',
          { href: '#projects', className: 'btn btn--primary btn--large' },
          React.createElement('span', null, 'Explore Projects & Ventures'),
          React.createElement('i', { className: 'mdi mdi-arrow-right' })
        ),
        React.createElement(
          'a',
          { href: '#services', className: 'btn btn--secondary btn--large' },
          React.createElement('i', { className: 'mdi mdi-view-grid-outline' }),
          React.createElement('span', null, 'Our Services')
        )
      ),
      React.createElement(
        'div',
        { className: 'hero-feature-pills' },
        React.createElement(
          'div',
          { className: 'feature-pill' },
          React.createElement('i', { className: 'mdi mdi-check-decagram-outline' }),
          React.createElement('span', null, 'Production-Ready Code')
        ),
        React.createElement(
          'div',
          { className: 'feature-pill' },
          React.createElement('i', { className: 'mdi mdi-cellphone-link' }),
          React.createElement('span', null, '100% Mobile Responsive')
        ),
        React.createElement(
          'div',
          { className: 'feature-pill' },
          React.createElement('i', { className: 'mdi mdi-speedometer' }),
          React.createElement('span', null, 'Ultra-Fast Performance')
        )
      )
    )
  );
}

function MetricsSection() {
  return React.createElement(
    'section',
    { className: 'metrics-section' },
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { className: 'metrics-grid' },
        metrics.map((item) =>
          React.createElement(
            'div',
            { key: item.label, className: 'metric-card' },
            React.createElement('div', { className: 'metric-card__value' }, item.value),
            React.createElement('div', { className: 'metric-card__label' }, item.label),
            React.createElement('div', { className: 'metric-card__detail' }, item.detail)
          )
        )
      )
    )
  );
}

function ServicesSection() {
  return React.createElement(
    'section',
    { className: 'section services-section', id: 'services' },
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { className: 'section-header' },
        React.createElement('span', { className: 'section-eyebrow' }, 'Capabilities & Offerings'),
        React.createElement('h2', { className: 'section-title' }, 'Engineered for clarity, speed, and real results.'),
        React.createElement(
          'p',
          { className: 'section-lead' },
          'We bring modern web engineering and clean design together to build websites and platforms that perform effortlessly.'
        )
      ),
      React.createElement(
        'div',
        { className: 'services-grid' },
        services.map((service) =>
          React.createElement(
            'div',
            { key: service.title, className: 'service-card' },
            React.createElement(
              'div',
              { className: 'service-card__top' },
              React.createElement(
                'div',
                { className: 'service-card__icon-box' },
                React.createElement('i', { className: `mdi ${service.icon}` })
              ),
              React.createElement('span', { className: 'service-card__number' }, service.number)
            ),
            React.createElement('h3', { className: 'service-card__title' }, service.title),
            React.createElement('p', { className: 'service-card__desc' }, service.description),
            React.createElement(
              'ul',
              { className: 'service-card__highlights' },
              service.highlights.map((item) =>
                React.createElement(
                  'li',
                  { key: item },
                  React.createElement('i', { className: 'mdi mdi-check' }),
                  React.createElement('span', null, item)
                )
              )
            )
          )
        )
      )
    )
  );
}

function ProjectsSection({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'clients', label: 'Client Collaborations' },
    { id: 'ventures', label: 'In-House Ventures' }
  ];

  const showClients = activeTab === 'all' || activeTab === 'clients';
  const showVentures = activeTab === 'all' || activeTab === 'ventures';

  return React.createElement(
    'section',
    { className: 'section projects-section', id: 'projects' },
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { className: 'section-header section-header--with-tabs' },
        React.createElement(
          'div',
          null,
          React.createElement('span', { className: 'section-eyebrow' }, 'Featured Portfolio'),
          React.createElement('h2', { className: 'section-title' }, 'Client work & in-house ventures.'),
          React.createElement(
            'p',
            { className: 'section-lead' },
            'A selection of active client partnerships and studio-built platforms.'
          )
        ),
        React.createElement(
          'div',
          { className: 'tab-group' },
          tabs.map((tab) =>
            React.createElement(
              'button',
              {
                key: tab.id,
                type: 'button',
                className: `tab-btn ${activeTab === tab.id ? 'is-active' : ''}`,
                onClick: () => setActiveTab(tab.id)
              },
              tab.label
            )
          )
        )
      ),

      showClients &&
        React.createElement(
          'div',
          { className: 'projects-block' },
          React.createElement(
            'div',
            { className: 'projects-block__header' },
            React.createElement('span', { className: 'projects-block__title' }, 'Client Work & Modernizations'),
            React.createElement(
              'span',
              { className: 'projects-block__badge' },
              'Redesigns In Active Engineering'
            )
          ),
          React.createElement(
            'div',
            { className: 'projects-grid' },
            clientProjects.map((project) =>
              React.createElement(
                'article',
                { key: project.id, className: 'project-card project-card--client' },
                React.createElement(
                  'div',
                  { className: 'project-card__header' },
                  React.createElement(
                    'div',
                    null,
                    React.createElement('span', { className: 'project-card__category' }, project.category),
                    React.createElement('h3', { className: 'project-card__name' }, project.name)
                  ),
                  React.createElement(
                    'span',
                    { className: `badge badge--${project.badgeVariant}` },
                    React.createElement('span', { className: 'badge__dot' }),
                    project.badge
                  )
                ),
                React.createElement('p', { className: 'project-card__summary' }, project.summary),
                React.createElement(
                  'div',
                  { className: 'project-card__notice' },
                  React.createElement('i', { className: 'mdi mdi-information-outline' }),
                  React.createElement('span', null, project.statusNote)
                ),
                React.createElement(
                  'div',
                  { className: 'project-card__tags' },
                  project.deliverables.map((d) =>
                    React.createElement('span', { key: d, className: 'tag-pill' }, d)
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'project-card__footer' },
                  React.createElement(
                    'a',
                    {
                      href: project.url,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      className: 'btn btn--outline btn--compact'
                    },
                    React.createElement('span', null, 'Visit Current Live Site'),
                    React.createElement('i', { className: 'mdi mdi-arrow-top-right' })
                  ),
                  React.createElement('span', { className: 'project-card__year' }, project.year)
                )
              )
            )
          )
        ),

      showVentures &&
        React.createElement(
          'div',
          { className: 'projects-block' },
          React.createElement(
            'div',
            { className: 'projects-block__header' },
            React.createElement('span', { className: 'projects-block__title' }, 'In-House Studio Ventures'),
            React.createElement(
              'span',
              { className: 'projects-block__badge' },
              'Studio Lab Products'
            )
          ),
          React.createElement(
            'div',
            { className: 'projects-grid' },
            inHouseVentures.map((venture) =>
              React.createElement(
                'article',
                { key: venture.id, className: 'project-card project-card--venture' },
                React.createElement(
                  'div',
                  { className: 'project-card__header' },
                  React.createElement(
                    'div',
                    null,
                    React.createElement('span', { className: 'project-card__category' }, venture.category),
                    React.createElement('h3', { className: 'project-card__name' }, venture.name)
                  ),
                  React.createElement(
                    'span',
                    { className: `badge badge--${venture.badgeVariant}` },
                    React.createElement('span', { className: 'badge__dot' }),
                    venture.badge
                  )
                ),
                React.createElement('p', { className: 'project-card__summary' }, venture.summary),
                React.createElement(
                  'div',
                  { className: 'project-card__notice project-card__notice--venture' },
                  React.createElement('i', { className: 'mdi mdi-flask-outline' }),
                  React.createElement('span', null, venture.statusNote)
                ),
                React.createElement(
                  'div',
                  { className: 'project-card__tags' },
                  venture.deliverables.map((d) =>
                    React.createElement('span', { key: d, className: 'tag-pill' }, d)
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'project-card__footer' },
                  React.createElement(
                    'a',
                    {
                      href: venture.url,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      className: 'btn btn--outline btn--compact'
                    },
                    React.createElement('span', null, 'Launch Venture Link'),
                    React.createElement('i', { className: 'mdi mdi-arrow-top-right' })
                  ),
                  React.createElement('span', { className: 'project-card__year' }, venture.year)
                )
              )
            )
          )
        )
    )
  );
}

function CapabilitiesSection() {
  return React.createElement(
    'section',
    { className: 'section capabilities-section', id: 'capabilities' },
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { className: 'section-header' },
        React.createElement('span', { className: 'section-eyebrow' }, 'Engineering Standards'),
        React.createElement('h2', { className: 'section-title' }, 'Built with principles that endure.'),
        React.createElement(
          'p',
          { className: 'section-lead' },
          'Every project is crafted around foundational engineering principles: speed, responsiveness, security, and clarity.'
        )
      ),
      React.createElement(
        'div',
        { className: 'capabilities-grid' },
        capabilities.map((cap) =>
          React.createElement(
            'div',
            { key: cap.title, className: 'capability-card' },
            React.createElement(
              'div',
              { className: 'capability-card__icon' },
              React.createElement('i', { className: `mdi ${cap.icon}` })
            ),
            React.createElement('h3', { className: 'capability-card__title' }, cap.title),
            React.createElement('p', { className: 'capability-card__text' }, cap.text)
          )
        )
      )
    )
  );
}

function ProcessSection() {
  return React.createElement(
    'section',
    { className: 'section process-section', id: 'process' },
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { className: 'process-container' },
        React.createElement(
          'div',
          { className: 'section-header' },
          React.createElement('span', { className: 'section-eyebrow' }, 'How We Work'),
          React.createElement('h2', { className: 'section-title' }, 'Simple, transparent, and direct.'),
          React.createElement(
            'p',
            { className: 'section-lead' },
            'A structured four-step methodology that keeps communication clear and deliverables on schedule.'
          )
        ),
        React.createElement(
          'div',
          { className: 'process-grid' },
          processSteps.map((step) =>
            React.createElement(
              'div',
              { key: step.step, className: 'process-card' },
              React.createElement('span', { className: 'process-card__number' }, step.step),
              React.createElement('h3', { className: 'process-card__title' }, step.title),
              React.createElement('p', { className: 'process-card__desc' }, step.description)
            )
          )
        )
      )
    )
  );
}

function AboutSection() {
  return React.createElement(
    'section',
    { className: 'section about-section', id: 'about' },
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { className: 'about-card' },
        React.createElement(
          'div',
          { className: 'about-card__content' },
          React.createElement('span', { className: 'section-eyebrow' }, 'About Nexas Studios'),
          React.createElement(
            'h2',
            { className: 'about-card__title' },
            'An independent studio dedicated to digital excellence.'
          ),
          React.createElement(
            'p',
            { className: 'about-card__text' },
            'Nexas Studios was founded to bridge the gap between design vision and real frontend craftsmanship. We partner directly with clients to modernize their digital presence, while also designing and launching our own internal products.'
          ),
          React.createElement(
            'p',
            { className: 'about-card__text' },
            'Operating under the broader DaManMikey digital umbrella, Nexas is committed to shipping clean, reliable, and modern software.'
          ),
          React.createElement(
            'div',
            { className: 'about-card__bullets' },
            React.createElement(
              'div',
              { className: 'about-bullet' },
              React.createElement('i', { className: 'mdi mdi-check-circle-outline' }),
              React.createElement('span', null, 'Direct engineering collaboration')
            ),
            React.createElement(
              'div',
              { className: 'about-bullet' },
              React.createElement('i', { className: 'mdi mdi-check-circle-outline' }),
              React.createElement('span', null, 'Zero boilerplate bloat')
            ),
            React.createElement(
              'div',
              { className: 'about-bullet' },
              React.createElement('i', { className: 'mdi mdi-check-circle-outline' }),
              React.createElement('span', null, 'Full lifecycle project ownership')
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'about-card__visual' },
          React.createElement('img', {
            src: 'logo-3A4v6HJTGP8k26BXcVrTNrnjRUV.png',
            alt: 'Nexas Studios Emblem',
            className: 'about-visual-img'
          }),
          React.createElement(
            'div',
            { className: 'about-card__visual-tag' },
            React.createElement('strong', null, 'Nexas Studios'),
            React.createElement('span', null, 'Crafting digital products since 2018')
          )
        )
      )
    )
  );
}

function ContactSection() {
  return React.createElement(
    'section',
    { className: 'section contact-section', id: 'contact' },
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { className: 'contact-box' },
        React.createElement(
          'div',
          { className: 'contact-box__header' },
          React.createElement('span', { className: 'section-eyebrow' }, 'Get In Touch'),
          React.createElement(
            'h2',
            { className: 'contact-box__title' },
            'Ready to build or redesign your next web experience?'
          ),
          React.createElement(
            'p',
            { className: 'contact-box__desc' },
            'Whether you need a complete website redesign, custom product engineering, or want to discuss a new collaboration, we are here to help.'
          )
        ),
        React.createElement(
          'div',
          { className: 'contact-channels-grid' },
          contactChannels.map((channel) => {
            const isExternal = !channel.href.startsWith('mailto:');
            return React.createElement(
              'a',
              {
                key: channel.title,
                href: channel.href,
                target: isExternal ? '_blank' : undefined,
                rel: isExternal ? 'noopener noreferrer' : undefined,
                className: 'contact-channel-card'
              },
              React.createElement(
                'div',
                { className: 'contact-channel-card__icon' },
                React.createElement('i', { className: `mdi ${channel.icon}` })
              ),
              React.createElement(
                'div',
                { className: 'contact-channel-card__body' },
                React.createElement('span', { className: 'contact-channel-card__label' }, channel.title),
                React.createElement('strong', { className: 'contact-channel-card__val' }, channel.value)
              ),
              React.createElement(
                'span',
                { className: 'contact-channel-card__action' },
                React.createElement('span', null, channel.actionLabel),
                React.createElement('i', { className: 'mdi mdi-arrow-top-right' })
              )
            );
          })
        )
      )
    )
  );
}

function Footer() {
  return React.createElement(
    'footer',
    { className: 'site-footer' },
    React.createElement(
      'div',
      { className: 'container footer-container' },
      React.createElement(
        'div',
        { className: 'footer-main' },
        React.createElement(
          'div',
          { className: 'footer-brand' },
          React.createElement(
            'div',
            { className: 'footer-brand__lockup' },
            React.createElement('img', {
              src: 'logo-3A4v6HJTGP8k26BXcVrTNrnjRUV.png',
              alt: 'Nexas Studios',
              className: 'footer-brand__logo'
            }),
            React.createElement('strong', null, 'Nexas Studios')
          ),
          React.createElement(
            'p',
            { className: 'footer-brand__tagline' },
            'Digital Product & Web Studio engineering high-performance experiences.'
          )
        ),
        React.createElement(
          'div',
          { className: 'footer-links' },
          React.createElement(
            'div',
            { className: 'footer-nav-col' },
            React.createElement('h4', null, 'Navigation'),
            React.createElement('a', { href: '#services' }, 'Services'),
            React.createElement('a', { href: '#projects' }, 'Work & Ventures'),
            React.createElement('a', { href: '#capabilities' }, 'Capabilities'),
            React.createElement('a', { href: '#process' }, 'Process')
          ),
          React.createElement(
            'div',
            { className: 'footer-nav-col' },
            React.createElement('h4', null, 'Network'),
            React.createElement('a', { href: 'https://damanmikey.me', target: '_blank', rel: 'noopener noreferrer' }, 'DaManMikey.me'),
            React.createElement('a', { href: 'https://github.com/DaDevMikey', target: '_blank', rel: 'noopener noreferrer' }, 'GitHub Profile'),
            React.createElement('a', { href: 'https://tornhost.com', target: '_blank', rel: 'noopener noreferrer' }, 'Tornhost'),
            React.createElement('a', { href: 'https://n0t.link', target: '_blank', rel: 'noopener noreferrer' }, 'n0t.link')
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'footer-bottom' },
        React.createElement(
          'div',
          { className: 'footer-copyright' },
          '© 2018–2026 Nexas Studios. All rights reserved.'
        ),
        React.createElement(
          'div',
          { className: 'footer-status' },
          React.createElement('span', { className: 'status-dot status-dot--active' }),
          React.createElement('span', null, 'All Systems Operational')
        )
      )
    )
  );
}

createRoot(document.getElementById('root')).render(React.createElement(App));
