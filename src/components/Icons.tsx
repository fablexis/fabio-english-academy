import React from 'react';

export const BookStackLogo: React.FC = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="4" y="8" width="22" height="4" rx="1" fill="#185C60" />
    <rect x="6" y="14" width="22" height="4" rx="1" fill="#C8E47C" />
    <rect x="4" y="20" width="22" height="4" rx="1" fill="#185C60" />
    <path d="M26 6L32 12L26 18" stroke="#185C60" strokeWidth="2" fill="none" />
    <circle cx="29" cy="4" r="3" fill="#C8E47C" />
  </svg>
);

export const SearchIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#0F172A" strokeWidth="2">
    <circle cx="9" cy="9" r="6" />
    <path d="M13.5 13.5L18 18" strokeLinecap="round" />
  </svg>
);

export const UserIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#0F172A" strokeWidth="1.8">
    <circle cx="10" cy="7" r="3.5" />
    <path d="M3 18c0-3.5 3-6 7-6s7 2.5 7 6" strokeLinecap="round" />
  </svg>
);

export const CartIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#0F172A" strokeWidth="1.8">
    <path d="M1 1h3l2 12h10l2-8H5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="17" r="1.5" fill="#0F172A" />
    <circle cx="15" cy="17" r="1.5" fill="#0F172A" />
  </svg>
);

export const MailIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.2">
    <rect x="1" y="2.5" width="12" height="9" rx="1" />
    <path d="M1 3.5L7 7.5L13 3.5" />
  </svg>
);

export const PhoneIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.2">
    <path d="M2 2.5C2 2.5 3.5 2 4 3.5L4.5 5.5C4.5 5.5 3.5 6.5 5 8.5C6.5 10.5 7.5 9.5 7.5 9.5L9.5 10C11 10.5 10.5 12 10.5 12C8 13 3 11 1.5 5.5C1 3.5 2 2.5 2 2.5Z" />
  </svg>
);

export const PeopleAddIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.2">
    <circle cx="5" cy="4" r="2" />
    <circle cx="9.5" cy="4" r="2" />
    <path d="M1 12c0-2.5 2-4 4-4s4 1.5 4 4" />
    <path d="M7 12c0-2.5 1.5-4 3-4s3 1.5 3 4" />
  </svg>
);

export const GroupUsersIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Back-left person */}
    <circle cx="14" cy="14" r="5.5" fill="#185C60" opacity="0.65" />
    <path d="M5 36c0-5 3.5-9 9-9s9 4 9 9" fill="#185C60" opacity="0.45" />
    {/* Back-right person */}
    <circle cx="34" cy="14" r="5.5" fill="#185C60" opacity="0.65" />
    <path d="M25 36c0-5 3.5-9 9-9s9 4 9 9" fill="#185C60" opacity="0.45" />
    {/* Front-center person (larger, more prominent) */}
    <circle cx="24" cy="12" r="6.5" fill="#185C60" />
    <path d="M13 36c0-6 4.5-10.5 11-10.5s11 4.5 11 10.5" fill="#185C60" opacity="0.75" />
  </svg>
);

export const SelfPacedIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    {/* Clock circle */}
    <circle cx="20" cy="20" r="16" fill="#185C60" opacity="0.10" stroke="#185C60" strokeWidth="2" />
    {/* Clock hands */}
    <path d="M20 12v8l5.5 3.5" stroke="#185C60" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Play triangle (self-paced) */}
    <path d="M28 30l6 4-6 4z" fill="#C8E47C" stroke="#185C60" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

export const OfflineContentIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Tablet/device body */}
    <rect x="10" y="4" width="28" height="40" rx="4" fill="#185C60" opacity="0.12" stroke="#185C60" strokeWidth="2.2" />
    {/* Screen area */}
    <rect x="14" y="9" width="20" height="26" rx="1.5" fill="#185C60" opacity="0.06" />
    {/* Download arrow */}
    <path d="M24 15v11" stroke="#185C60" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M19 22l5 5 5-5" stroke="#185C60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Offline line under arrow */}
    <path d="M18 30h12" stroke="#C8E47C" strokeWidth="2.2" strokeLinecap="round" />
    {/* Home button dot */}
    <circle cx="24" cy="40" r="1.5" fill="#185C60" opacity="0.4" />
  </svg>
);
