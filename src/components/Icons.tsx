import React from 'react';
import {
  Languages,
  Search,
  User,
  ShoppingCart,
  Clock,
  Download,
  Users,
} from 'lucide-react';

export const BookStackLogo: React.FC = () => (
  <Languages size={32} color="#185C60" strokeWidth={2} />
);

export const SearchIcon: React.FC = () => (
  <Search size={20} color="#0F172A" strokeWidth={2} />
);

export const UserIcon: React.FC = () => (
  <User size={20} color="#0F172A" strokeWidth={1.8} />
);

export const CartIcon: React.FC = () => (
  <ShoppingCart size={20} color="#0F172A" strokeWidth={1.8} />
);

export const SelfPacedIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <Clock size={size} color="#185C60" strokeWidth={2} />
);

export const OfflineContentIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <Download size={size} color="#185C60" strokeWidth={2} />
);

export const GroupUsersIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <Users size={size} color="#185C60" strokeWidth={2} />
);
