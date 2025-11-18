import styled from "styled-components";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
}

const StyledButton = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.variant === "primary" ? "blue" : "white"};
  color: ${(props) => (props.variant === "primary" ? "white" : "black")};
  padding: 10px 20px;
  border: ${(props) =>
    props.variant === "secondary" ? "1px solid gray" : "none"};
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  &:focus-visible {
    outline: 2px solid #2684ff;
    outline-offset: 2px;
  }
`;
export const Button = (props: ButtonProps) => {
  return (
    <>
      <StyledButton {...props}></StyledButton>
    </>
  );
};
