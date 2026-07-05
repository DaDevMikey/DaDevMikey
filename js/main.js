import React, { useEffect, useMemo, useState } from 'https://esm.sh/react@18.3.1';
import { createRoot } from 'https://esm.sh/react-dom@18.3.1/client';

const collaborators = [
  {
    name: 'Kooijman En Kooijman BV',
    href: 'https://kooijmanenkooijman.nl',
    category: 'Client Delivery',
    status: 'Production',
    description: 'Built and launched a cleaner brand presentation with a reliable, mobile-first experience.'
  },
  {
    name: 'TSVG',
    href: 'https://tsvg.nl',
    category: 'Client Delivery',
    status: 'Production',
    description: 'Delivered a focused website experience centered on clarity, speed, and practical maintenance.'
  }
];

const ventures = [
  {
    name: 'Tornhost',
    href: 'https://tornhost.com',
    category: 'Internal Product',
    status: 'In development',
    description: 'A hosting platform in active build, designed for fast setup and straightforward onboarding.'
  },
  {
    name: 'n0t.link',
    href: 'https://n0t-link.vercel.app',
    category: 'Internal Product',
    status: 'Live beta',
    description: 'Fast short links with no ads and a clean, straightforward experience.'
  }
];

const quickStats = [
  { value: '8+', label: 'years building online projects' },
  { value: '4', label: 'active brands in this ecosystem' },
  { value: '2', label: 'client collaborations live now' },
  { value: '2', label: 'in-house ventures in progress' }
];

const services = [
  {
    icon: 'mdi-monitor-dashboard',
    title: 'Web Product Design',
    description: 'Interface direction, structured layouts, and polished UX details for product-led websites.'
  },
  {
    icon: 'mdi-code-tags',
    title: 'Frontend Development',
    description: 'High-quality implementation focused on responsiveness, maintainability, and performance.'
  },
  {
    icon: 'mdi-rocket-launch-outline',
    title: 'Launch Support',
    description: 'Practical release support, from final QA to post-launch fixes and evolution planning.'
  }
];

const credibilityPoints = [
  {
    icon: 'mdi-shield-check-outline',
    title: 'Reliable delivery',
    description: 'Structured handoffs, predictable timelines, and production-ready output.'
  },
  {
    icon: 'mdi-cellphone-link',
    title: 'Responsive by default',
    description: 'Design and implementation that stays consistent across desktop, tablet, and mobile.'
  },
  {
    icon: 'mdi-speedometer',
    title: 'Performance-focused',
    description: 'Built for fast load times and smooth interaction from first launch.'
  }
];

const processSteps = [
  {
    title: 'Discover',
    description: 'Define goals, users, and constraints before touching implementation.'
  },
  {
    title: 'Design',
    description: 'Craft an intentional visual system and a structure that reads like a real brand.'
  },
  {
    title: 'Deliver',
    description: 'Ship stable code, test across devices, and iterate with measurable improvements.'
  }
];

const changeHighlights = [
  'Redesigned the site as a true company presence with clear services, process, and credibility sections.',
  'Refined the legacy handoff into a cleaner first impression that keeps the studio story clear.',
  'Kept Nexas Studios as its own website instead of sunsetting it, while still connecting to the wider DaManMikey ecosystem.'
];

function getCookie(name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = document.cookie.match(new RegExp(`(?:^|; )${escapedName}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value, maxAgeSeconds) {
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax`;
}

const decisions = [
  'Nexas now stays online as the dedicated studio identity.',
  'The legacy experience remains available as a reference at /legacy-site.',
  'DaManMikey.me continues as the broader personal and ecosystem hub.'
];

const contactLinks = [
  {
    icon: 'mdi-web',
    title: 'Main website',
    href: 'https://damanmikey.me',
    label: 'DaManMikey.me'
  },
  {
    icon: 'mdi-email-outline',
    title: 'Email',
    href: 'mailto:contact@damanmikey.me',
    label: 'contact@damanmikey.me'
  },
  {
    icon: 'mdi-github',
    title: 'GitHub',
    href: 'https://github.com/DaDevMikey',
    label: '@DaDevMikey'
  }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [introRevealing, setIntroRevealing] = useState(false);
  const [changesVisible, setChangesVisible] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(false);

  const featuredBrands = useMemo(() => [...collaborators, ...ventures], []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromLegacy = params.get('from') === 'legacy' || sessionStorage.getItem('nexas_from_legacy') === '1';
    const introDismissed = getCookie('nexas_intro_played_v1') === 'true';
    const changesDismissed = localStorage.getItem('nexas_changes_dismissed_v3') === 'true';

    setPendingChanges(fromLegacy || !changesDismissed);

    if (!introDismissed) {
      setIntroVisible(true);
    }

    if (fromLegacy) {
      sessionStorage.removeItem('nexas_from_legacy');
      params.delete('from');
      const next = params.toString();
      const targetUrl = `${window.location.pathname}${next ? `?${next}` : ''}${window.location.hash}`;
      window.history.replaceState({}, '', targetUrl);
    }
  }, []);

  useEffect(() => {
    if (!introVisible && pendingChanges) {
      setChangesVisible(true);
    }
  }, [introVisible, pendingChanges]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen || introVisible || changesVisible);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen, introVisible, changesVisible]);

  const closeMenu = () => setMenuOpen(false);

  const finishIntro = () => {
    setCookie('nexas_intro_played_v1', 'true', 60 * 60 * 24 * 365);
    setIntroRevealing(true);
    window.setTimeout(() => {
      setIntroVisible(false);
      setIntroRevealing(false);
    }, 1200);
  };

  const closeChanges = (remember) => {
    if (remember) {
      localStorage.setItem('nexas_changes_dismissed_v3', 'true');
    }
    setPendingChanges(false);
    setChangesVisible(false);
  };

  return React.createElement(
    React.Fragment,
    null,
    introVisible &&
      React.createElement(IntroOverlay, {
        revealing: introRevealing,
        onEnter: finishIntro
      }),
    changesVisible && React.createElement(ChangesModal, { onClose: closeChanges }),
    React.createElement(
      'div',
      { className: `site-shell ${introVisible ? 'site-shell--intro' : ''}` },
      React.createElement(Header, { menuOpen, setMenuOpen, closeMenu }),
      React.createElement(
        'main',
        null,
        React.createElement(Hero, { featuredBrands }),
        React.createElement(QuickStats),
        React.createElement(CredibilitySection),
        React.createElement(ServicesSection),
        React.createElement(ProcessSection),
        React.createElement(BrandGridSection, {
          id: 'work',
          eyebrow: 'Client Work',
          title: 'Recent collaborations we are proud of.',
          description: 'We focus on practical outcomes: stronger presentation, cleaner UX, and dependable delivery.',
          items: collaborators
        }),
        React.createElement(BrandGridSection, {
          id: 'ventures',
          eyebrow: 'Internal Ventures',
          title: 'Products we are building from inside the studio.',
          description: 'Our own products let us test new ideas and keep improving our delivery quality.',
          items: ventures
        }),
        React.createElement(DecisionsSection),
        React.createElement(ContactSection)
      ),
      React.createElement(
        'footer',
        { className: 'site-footer' },
        React.createElement('p', null, '2018-2026 Nexas Studios. All rights reserved.'),
        React.createElement('p', null, 'Digital product and web studio.')
      )
    )
  );
}

function Header({ menuOpen, setMenuOpen, closeMenu }) {
  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#work', label: 'Work' },
    { href: '#ventures', label: 'Ventures' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ];

  return React.createElement(
    'header',
    { className: 'site-header' },
    React.createElement(
      'div',
      { className: 'nav-wrap' },
      React.createElement(
        'a',
        { className: 'brand-lockup', href: '#home', onClick: closeMenu },
        React.createElement('img', {
          src: 'logo-text-sqaure-transparent.png',
          alt: 'Nexas Studios logo'
        }),
        React.createElement(
          'div',
          null,
          React.createElement('strong', null, 'Nexas Studios'),
          React.createElement('span', null, 'Digital Product & Web Studio')
        )
      ),
      React.createElement(
        'button',
        {
          className: `menu-toggle ${menuOpen ? 'is-open' : ''}`,
          type: 'button',
          'aria-expanded': menuOpen,
          'aria-label': 'Toggle navigation',
          onClick: () => setMenuOpen(!menuOpen)
        },
        React.createElement('span', null),
        React.createElement('span', null),
        React.createElement('span', null)
      ),
      React.createElement(
        'nav',
        { className: `site-nav ${menuOpen ? 'is-open' : ''}` },
        navItems.map((item) =>
          React.createElement(
            'a',
            { key: item.href, href: item.href, onClick: closeMenu },
            item.label
          )
        ),
        React.createElement(
          'a',
          { href: '#contact', className: 'site-nav__cta', onClick: closeMenu },
          'Start a project'
        )
      )
    )
  );
}

function Hero({ featuredBrands }) {
  return React.createElement(
    'section',
    { className: 'hero-section', id: 'home' },
    React.createElement('div', { className: 'hero-glow hero-glow--primary' }),
    React.createElement('div', { className: 'hero-glow hero-glow--secondary' }),
    React.createElement(
      'div',
      { className: 'hero-layout section-shell' },
      React.createElement(
        'div',
        { className: 'hero-copy glass-card' },
        React.createElement('span', { className: 'eyebrow' }, 'Nexas Studios'),
        React.createElement('h1', null, 'A digital studio for modern websites teams can trust.'),
        React.createElement(
          'p',
          null,
          'Nexas Studios helps teams launch polished digital experiences through intentional design, frontend craftsmanship, and practical delivery.'
        ),
        React.createElement(
          'div',
          { className: 'hero-actions' },
          React.createElement(
            'a',
            { className: 'button button--primary', href: '#services' },
            React.createElement('i', { className: 'mdi mdi-account-group' }),
            'Explore services'
          ),
          React.createElement(
            'a',
            { className: 'button button--secondary', href: '#work' },
            React.createElement('i', { className: 'mdi mdi-rocket-launch' }),
            'View collaborations'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'hero-panel glass-card' },
        React.createElement(
          'div',
          { className: 'hero-panel__heading' },
          React.createElement('span', { className: 'eyebrow' }, 'Current Portfolio'),
          React.createElement('h2', null, 'Brands and products in the current Nexas chapter')
        ),
        React.createElement(
          'div',
          { className: 'hero-stack' },
          featuredBrands.map((brand) =>
            React.createElement(
              'a',
              {
                key: brand.name,
                className: 'hero-brand-card',
                href: brand.href,
                target: '_blank',
                rel: 'noreferrer'
              },
              React.createElement(
                'div',
                null,
                React.createElement('strong', null, brand.name),
                React.createElement('span', null, brand.category)
              ),
              React.createElement(
                'span',
                { className: 'hero-brand-card__status' },
                brand.status
              )
            )
          )
        )
      )
    )
  );
}

function QuickStats() {
  return React.createElement(
    'section',
    { className: 'quick-stats section-shell' },
    quickStats.map((item) =>
      React.createElement(
        'div',
        { key: item.label, className: 'glass-card quick-stat' },
        React.createElement('strong', null, item.value),
        React.createElement('span', null, item.label)
      )
    )
  );
}

function CredibilitySection() {
  return React.createElement(
    'section',
    { className: 'section-shell credibility-section' },
    React.createElement(
      'div',
      { className: 'section-heading' },
      React.createElement('span', { className: 'eyebrow' }, 'Why teams choose Nexas'),
      React.createElement('h2', null, 'Professional standards from first brief to launch.'),
      React.createElement(
        'p',
        null,
        'We keep communication clear, delivery reliable, and quality high throughout the full project cycle.'
      )
    ),
    React.createElement(
      'div',
      { className: 'credibility-grid' },
      credibilityPoints.map((item) =>
        React.createElement(
          'article',
          { key: item.title, className: 'glass-card credibility-card' },
          React.createElement('i', { className: `mdi ${item.icon}` }),
          React.createElement('h3', null, item.title),
          React.createElement('p', null, item.description)
        )
      )
    )
  );
}

function ServicesSection() {
  return React.createElement(
    'section',
    { className: 'section-shell services-section', id: 'services' },
    React.createElement(
      'div',
      { className: 'section-heading' },
      React.createElement('span', { className: 'eyebrow' }, 'Services'),
      React.createElement('h2', null, 'What we deliver for brands and teams.'),
      React.createElement('p', null, 'Every engagement is shaped for clarity, quality, and launch confidence.')
    ),
    React.createElement(
      'div',
      { className: 'services-grid' },
      services.map((service) =>
        React.createElement(
          'article',
          { key: service.title, className: 'glass-card service-card' },
          React.createElement('i', { className: `mdi ${service.icon}` }),
          React.createElement('h3', null, service.title),
          React.createElement('p', null, service.description)
        )
      )
    )
  );
}

function ProcessSection() {
  return React.createElement(
    'section',
    { className: 'section-shell process-section' },
    React.createElement(
      'div',
      { className: 'glass-card process-wrap' },
      React.createElement(
        'div',
        { className: 'section-heading' },
        React.createElement('span', { className: 'eyebrow' }, 'Process'),
        React.createElement('h2', null, 'Simple process. Serious execution.'),
        React.createElement('p', null, 'A lightweight flow that keeps decisions clear and momentum high.')
      ),
      React.createElement(
        'div',
        { className: 'process-grid' },
        processSteps.map((step, index) =>
          React.createElement(
            'article',
            { key: step.title, className: 'process-card' },
            React.createElement('span', { className: 'process-card__index' }, `0${index + 1}`),
            React.createElement('h3', null, step.title),
            React.createElement('p', null, step.description)
          )
        )
      )
    )
  );
}

function BrandGridSection({ id, eyebrow, title, description, items }) {
  return React.createElement(
    'section',
    { className: 'brand-section section-shell', id },
    React.createElement(
      'div',
      { className: 'section-heading' },
      React.createElement('span', { className: 'eyebrow' }, eyebrow),
      React.createElement('h2', null, title),
      React.createElement('p', null, description)
    ),
    React.createElement(
      'div',
      { className: 'brand-grid' },
      items.map((item) =>
        React.createElement(
          'article',
          { key: item.name, className: 'glass-card brand-card' },
          React.createElement(
            'div',
            { className: 'brand-card__meta' },
            React.createElement('span', { className: 'pill' }, item.category),
            React.createElement('span', { className: 'pill pill--muted' }, item.status)
          ),
          React.createElement('h3', null, item.name),
          React.createElement('p', null, item.description),
          React.createElement(
            'a',
            {
              href: item.href,
              target: '_blank',
              rel: 'noreferrer',
              className: 'inline-link'
            },
            'Visit website',
            React.createElement('i', { className: 'mdi mdi-arrow-top-right' })
          )
        )
      )
    )
  );
}

function ContactSection() {
  return React.createElement(
    'section',
    { className: 'section-shell contact-section', id: 'contact' },
    React.createElement(
      'div',
      { className: 'glass-card contact-card' },
      React.createElement('span', { className: 'eyebrow' }, 'Get in touch'),
      React.createElement('h2', null, "Let's build your next digital experience."),
      React.createElement(
        'p',
        null,
        'Use the main profile for broader context, or email contact@damanmikey.me and connect on GitHub to discuss your goals.'
      ),
      React.createElement(
        'div',
        { className: 'contact-grid' },
        contactLinks.map((item) => {
          const isExternal = !item.href.startsWith('mailto:');
          return (
          React.createElement(
            'a',
            {
              key: item.title,
              className: 'contact-link',
              href: item.href,
              target: isExternal ? '_blank' : undefined,
              rel: isExternal ? 'noreferrer' : undefined
            },
            React.createElement('i', { className: `mdi ${item.icon}` }),
            React.createElement(
              'div',
              null,
              React.createElement('strong', null, item.title),
              React.createElement('span', null, item.label)
            )
          )
          );
        })
      )
    )
  );
}

function DecisionsSection() {
  return React.createElement(
    'section',
    { className: 'section-shell decisions-section', id: 'about' },
    React.createElement(
      'div',
      { className: 'glass-card decisions-card' },
      React.createElement('span', { className: 'eyebrow' }, 'Direction Update'),
      React.createElement('h2', null, 'Why Nexas stayed as its own website'),
      React.createElement(
        'p',
        null,
        'We considered retiring the Nexas domain. Instead, we kept it as the dedicated studio home so the brand has a clear identity and story.'
      ),
      React.createElement(
        'ul',
        { className: 'decision-list' },
        decisions.map((item) =>
          React.createElement(
            'li',
            { key: item },
            React.createElement('i', { className: 'mdi mdi-check-circle-outline' }),
            React.createElement('span', null, item)
          )
        )
      ),
      React.createElement(
        'a',
        { className: 'inline-link', href: 'legacy-site/index.html' },
        'Open legacy site',
        React.createElement('i', { className: 'mdi mdi-arrow-right' })
      )
    )
  );
}

function IntroOverlay({ revealing, onEnter }) {
  return React.createElement(
    'section',
    { className: `intro-overlay ${revealing ? 'intro-overlay--reveal' : ''}` },
    React.createElement('iframe', {
      className: 'intro-overlay__legacy',
      src: 'legacy-site/index.html?embed=1',
      title: 'Nexas legacy website preview'
    }),
    React.createElement('div', { className: 'intro-overlay__scrim' }),
    React.createElement('div', { className: 'intro-overlay__orb intro-overlay__orb--one' }),
    React.createElement('div', { className: 'intro-overlay__orb intro-overlay__orb--two' }),
    React.createElement(
      'div',
      { className: 'intro-overlay__sheet-wrap' },
      React.createElement(
        'article',
        { className: 'intro-overlay__sheet' },
        React.createElement('span', { className: 'intro-overlay__eyebrow' }, 'Nexas Evolution'),
        React.createElement('h2', null, 'From legacy layout to a full company website'),
        React.createElement(
          'p',
          null,
          'Nexas now has a clearer studio identity, stronger structure, and a professional presentation built for long-term growth.'
        ),
        React.createElement(
          'ul',
          { className: 'intro-overlay__highlights' },
          changeHighlights.map((item) =>
            React.createElement(
              'li',
              { key: item },
              React.createElement('i', { className: 'mdi mdi-star-four-points-outline' }),
              React.createElement('span', null, item)
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'intro-overlay__actions' },
          React.createElement(
            'button',
            { type: 'button', className: 'button button--primary intro-overlay__enter', onClick: onEnter },
            React.createElement('i', { className: 'mdi mdi-arrow-right-thin-circle-outline' }),
            'Enter new Nexas'
          )
        )
      )
    )
  );
}

function ChangesModal({ onClose }) {
  const [rememberChoice, setRememberChoice] = useState(true);

  return React.createElement(
    'div',
    { className: 'changes-modal', role: 'dialog', 'aria-modal': true, 'aria-labelledby': 'changes-modal-title' },
    React.createElement(
      'article',
      { className: 'changes-modal__card' },
      React.createElement('span', { className: 'changes-modal__eyebrow' }, 'What Changed'),
      React.createElement('h2', { id: 'changes-modal-title' }, 'Nexas is staying.'),
      React.createElement(
        'p',
        null,
        'Instead of shutting this site down, we decided to keep Nexas Studios as the dedicated company website and evolve it properly.'
      ),
      React.createElement(
        'ul',
        { className: 'changes-modal__list' },
        changeHighlights.map((item) => React.createElement('li', { key: item }, item))
      ),
      React.createElement(
        'label',
        { className: 'changes-modal__remember' },
        React.createElement('input', {
          type: 'checkbox',
          checked: rememberChoice,
          onChange: (event) => setRememberChoice(event.target.checked)
        }),
        React.createElement('span', null, 'Do not show this again')
      ),
      React.createElement(
        'div',
        { className: 'changes-modal__actions' },
        React.createElement(
          'button',
          { type: 'button', className: 'button button--primary', onClick: () => onClose(rememberChoice) },
          'Continue'
        )
      )
    )
  );
}

createRoot(document.getElementById('root')).render(React.createElement(App));
