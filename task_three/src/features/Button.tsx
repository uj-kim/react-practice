interface ButtonProps {
  disabled?: boolean;
  label?: string;
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  return (
    <button disabled={props.disabled} onClick={props.onClick}>
      {props.label}
    </button>
  );
}
