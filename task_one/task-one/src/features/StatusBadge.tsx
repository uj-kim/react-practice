import styled from "styled-components";

export type Status = "online" | "offline" | "busy";

interface StatusBadgeProps {
  status: Status;
}

const StyledBadge = styled.div<StatusBadgeProps>`
  padding: 5px 10px;
  border-radius: 12px;
  color: ${(props) =>
    props.status == "online"
      ? "green"
      : props.status == "busy"
      ? "orange"
      : "gray"};
`;
export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <>
      <ul>
        <li>
          <StyledBadge status={status}>{status}</StyledBadge>
        </li>
      </ul>
    </>
  );
};
