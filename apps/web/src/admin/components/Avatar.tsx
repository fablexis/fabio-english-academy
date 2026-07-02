import React from 'react';
import s from '../styles/admin.module.scss';

/**
 * User avatar: the profile picture when set, otherwise the initial of the
 * display name (falling back to the email) on the lime brand circle.
 */
interface AvatarProps {
  email: string;
  name?: string | null;
  avatarUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
  /** Online dot overlay (used in the top bar). */
  dot?: boolean;
}

const SIZE_CLASS = { sm: 'avatarSm', md: 'avatar', lg: 'avatarLg' } as const;

const Avatar: React.FC<AvatarProps> = ({ email, name, avatarUrl, size = 'md', dot }) => {
  const display = name?.trim() || email;
  return (
    <span className={s[SIZE_CLASS[size]]}>
      {avatarUrl ? (
        <img src={avatarUrl} alt="" className={s.avatarImg} loading="lazy" />
      ) : (
        display[0]?.toUpperCase() ?? 'A'
      )}
      {dot && <span className={s.avatarDot} aria-hidden="true" />}
    </span>
  );
};

export default Avatar;
