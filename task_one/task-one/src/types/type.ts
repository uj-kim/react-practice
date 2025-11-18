type ButtonVariant = "primary" | "'secondary";

export interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
}
