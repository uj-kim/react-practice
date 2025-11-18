import { useState } from "react";
import Button from "./Button";
import { PhoneInput } from "./PhoneInput";
import { AuthModal } from "./AuthModal";

export const Wrapper = () => {
  const [nums, setNums] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 하이픈 없이 숫자만 입력받아 포맷팅하는 함수
  const digits = nums.replace(/\D/g, "");
  const isCompleted = digits.length === 11;

  const handleClickAuthModal = () => {
    if (!isCompleted) return;
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <PhoneInput value={nums} onChange={setNums} />
      <Button
        disabled={!isCompleted}
        label="인증번호 보내기"
        onClick={handleClickAuthModal}
      />
      <AuthModal isOpen={isModalOpen} phone={nums} onClose={handleCloseModal} />
    </div>
  );
};
