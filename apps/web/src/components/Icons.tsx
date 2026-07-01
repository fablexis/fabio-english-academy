import React from 'react';
import {
  Languages,
  Clock,
  Download,
  Users,
} from 'lucide-react';

export const BookStackLogo: React.FC = () => (
  <Languages size={32} color="#185C60" strokeWidth={2} />
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
