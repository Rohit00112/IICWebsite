'use client';

import React, { useEffect, useMemo, useState } from 'react';

const DEFAULT_DOMAIN_PARTS = ['iic', 'edu', 'np'];

type EmailState = {
  label: string;
  href: string;
  isReady: boolean;
};

type ObfuscatedEmailLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'> & {
  mailbox: string;
  domainParts?: string[];
  fallbackLabel?: string;
  subject?: string;
  children?: React.ReactNode | ((state: EmailState) => React.ReactNode);
};

type ObfuscatedEmailTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  mailbox: string;
  domainParts?: string[];
  fallbackLabel?: string;
};

const buildFallbackLabel = (mailbox: string, domainParts: string[]) =>
  `${mailbox} ${domainParts.join(' ')}`;

const useObfuscatedEmail = (
  mailbox: string,
  domainParts = DEFAULT_DOMAIN_PARTS,
  fallbackLabel?: string,
  subject?: string
): EmailState => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsReady(true), 0);

    return () => window.clearTimeout(timer);
  }, []);

  return useMemo(() => {
    const domain = domainParts.join('.');
    const email = `${mailbox}@${domain}`;
    const label = isReady ? email : fallbackLabel || buildFallbackLabel(mailbox, domainParts);
    const href = isReady
      ? `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
      : '/contact-us';

    return { label, href, isReady };
  }, [domainParts, fallbackLabel, isReady, mailbox, subject]);
};

export const ObfuscatedEmailText = ({
  mailbox,
  domainParts = DEFAULT_DOMAIN_PARTS,
  fallbackLabel,
  ...props
}: ObfuscatedEmailTextProps) => {
  const { label } = useObfuscatedEmail(mailbox, domainParts, fallbackLabel);

  return (
    <span suppressHydrationWarning {...props}>
      {label}
    </span>
  );
};

export const ObfuscatedEmailLink = ({
  mailbox,
  domainParts = DEFAULT_DOMAIN_PARTS,
  fallbackLabel,
  subject,
  children,
  ...props
}: ObfuscatedEmailLinkProps) => {
  const state = useObfuscatedEmail(mailbox, domainParts, fallbackLabel, subject);

  return (
    <a href={state.href} {...props}>
      {typeof children === 'function' ? children(state) : children || (
        <span suppressHydrationWarning>{state.label}</span>
      )}
    </a>
  );
};
