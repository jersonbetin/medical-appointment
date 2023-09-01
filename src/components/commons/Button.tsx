interface ButtonProps {
  label: string;
  type?: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  className?: string;
  size?: 'lg' | 'sm' | 'xs';
  color?:
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'ghost'
    | 'link'
    | 'active';
  loading?: boolean;
  disabled?: boolean;
}

const Button = ({
  label,
  type = 'button',
  onClick,
  color = 'primary',
  size,
  className = '',
  loading,
  disabled = false,
}: ButtonProps) => {
  const variant = `${className} btn-${color} ${size ? `btn-${size}` : ''}`;

  return (
    <button
      disabled={disabled}
      className={`btn ${variant}`}
      type={type}
      onClick={onClick}
    >
      {loading && <span className="loading loading-spinner"></span>}
      {label}
    </button>
  );
};

export default Button;
