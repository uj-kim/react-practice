import { useState, type ChangeEvent } from "react";
import styled from "styled-components";

const MAX_VALUE = 10_000_000;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 375px;
  margin: 0 auto;
  padding: 24px;
`;

const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  &:focus-visible {
    outline: 2px solid #2684ff;
    outline-offset: 2px;
    border-color: transparent;
  }
`;

const SubmitButton = styled.button`
  padding: 8px;
  background-color: #2684ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
export const Input = () => {
  const [enteredNum, setEnteredNum] = useState<string>("");

  // 입력값 변경 핸들러
  const changeEnteredNum = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    const sanitizedValue = value.replaceAll(",", "");

    if (sanitizedValue === "") {
      setEnteredNum("");
      return;
    }

    const removedCommaValue: number = Number(sanitizedValue);
    if (Number.isNaN(removedCommaValue)) {
      return;
    }

    const clampedValue = Math.min(removedCommaValue, MAX_VALUE);
    setEnteredNum(clampedValue.toLocaleString());
  };

  // 입력값이 0원 or 빈값일 때 송금버튼 비활성화
  const normalizedValue = enteredNum.replaceAll(",", "");
  const isDisabled = normalizedValue === "" || Number(normalizedValue) === 0;
  return (
    <Container>
      <StyledInput
        aria-label="amount"
        type="text"
        value={enteredNum}
        onChange={changeEnteredNum}
        max={MAX_VALUE}
      />
      <SubmitButton
        aria-label="transfer"
        disabled={isDisabled}
        onClick={() => alert("다음 단계로 이동")}
      >
        송금하기
      </SubmitButton>
    </Container>
  );
};
