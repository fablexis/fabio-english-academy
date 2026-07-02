import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import s from '../styles/admin.module.scss';

/** Password field with a show/hide toggle (eye icon). */
interface PasswordInputProps {
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  autoComplete,
  placeholder,
  required,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className={s.pwWrap}>
      <input
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
      />
      <button
        type="button"
        className={`${s.pwToggle} ${s.tip}`}
        data-tip={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        aria-pressed={visible}
        onClick={() => setVisible((v) => !v)}
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
};

export default PasswordInput;
