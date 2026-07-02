import React, { useMemo, useState } from 'https://esm.sh/react@18.3.1';
import { createRoot } from 'https://esm.sh/react-dom@18.3.1/client';

const collaborators = [
  {
    name: 'Kooijman En Kooijman BV',
    href: 'https://kooijmanenkooijman.nl',
    category: 'Collaboration',
    status: 'Live website',
    description: 'A featured collaboration that represents the shift toward a sharper, client-first digital presence.'
  },
  {
    name: 'TSVG',
    href: 'https://tsvg.nl',
    category: 'Collaboration',
    status: 'Live website',
    description: 'A live partner website showcased as part of the studio’s current collaboration-focused direction.'
  }
];

const ventures = [
  {
    name: 'Tornhost',
    href: 'https://tornhost.com',
    category: 'In-house venture',
    status: 'Upcoming launch',
    description: 'An upcoming budget game, Discord bot, and website hosting platform built for accessible launches.'
  },
  {
    name: 'n0t-link',
    href: 'https://n0tlink.vercel.app',
    category: 'In-house venture',
    status: 'Temporary live home',
    description: 'A growing in-house product currently hosted on Vercel while the main domain rollout is being prepared.'
  }
];

const quickStats = [
  { value: '4', label: 'featured brands' },
  { value: '2', label: 'live collaborations' },
  { value: '2', label: 'owned ventures' }
];

const contactLinks = [
  {
    icon: 'mdi-web',
    title: 'Main website',
    href: 'https://damanmikey.me',
    label: 'DaManMikey.me'
  },
  {
    icon: 'mdi-discord',
    title: 'Discord',
    href: 'https://discord.gg/4CgUqedFX5',
    label: 'Join the server'
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

  const featuredBrands = useMemo(() => [...collaborators, ...ventures], []);

  const closeMenu = () => setMenuOpen(false);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { className: 'site-shell' },
      React.createElement(Header, { menuOpen, setMenuOpen, closeMenu }),
      React.createElement(
        'main',
        null,
        React.createElement(Hero, { featuredBrands }),
        React.createElement(QuickStats),
        React.createElement(BrandGridSection, {
          id: 'partners',
          eyebrow: 'Worked with',
          title: 'Partners already in the story.',
          description: 'The public face of the studio starts with the names and launches that matter most.',
          items: collaborators
        }),
        React.createElement(BrandGridSection, {
          id: 'ventures',
          eyebrow: 'Built in-house',
          title: 'Ventures we are actively shaping.',
          description: 'These internal products carry the same visual ambition as the studio itself.',
          items: ventures
        }),
        React.createElement(ContactSection)
      ),
      React.createElement(
        'footer',
        { className: 'site-footer' },
        React.createElement('p', null, '2018-2026 Nexas Studios')
      )
    )
  );
}

function Header({ menuOpen, setMenuOpen, closeMenu }) {
  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#partners', label: 'Collaborators' },
    { href: '#ventures', label: 'Ventures' },
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
          React.createElement('span', null, 'Collaborations & ventures')
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
        React.createElement('h1', null, 'A creative studio building collaborations and in-house ventures.'),
        React.createElement(
          'p',
          null,
          'We partner with brands and build our own products — from live client websites to independently launched platforms.'
        ),
        React.createElement(
          'div',
          { className: 'hero-actions' },
          React.createElement(
            'a',
            { className: 'button button--primary', href: '#partners' },
            React.createElement('i', { className: 'mdi mdi-account-group' }),
            'See who we work with'
          ),
          React.createElement(
            'a',
            { className: 'button button--secondary', href: '#ventures' },
            React.createElement('i', { className: 'mdi mdi-rocket-launch' }),
            'Explore ventures'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'hero-panel glass-card' },
        React.createElement(
          'div',
          { className: 'hero-panel__heading' },
          React.createElement('span', { className: 'eyebrow' }, 'Current focus'),
          React.createElement('h2', null, 'Featured names on this chapter of the site')
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
      React.createElement('span', { className: 'eyebrow' }, 'Next move'),
      React.createElement('h2', null, 'Want to follow the work or reach out?'),
      React.createElement(
        'p',
        null,
        'Use the main website for the broader personal presence, or jump into Discord and GitHub from here.'
      ),
      React.createElement(
        'div',
        { className: 'contact-grid' },
        contactLinks.map((item) =>
          React.createElement(
            'a',
            {
              key: item.title,
              className: 'contact-link',
              href: item.href,
              target: '_blank',
              rel: 'noreferrer'
            },
            React.createElement('i', { className: `mdi ${item.icon}` }),
            React.createElement(
              'div',
              null,
              React.createElement('strong', null, item.title),
              React.createElement('span', null, item.label)
            )
          )
        )
      )
    )
  );
}

createRoot(document.getElementById('root')).render(React.createElement(App));
