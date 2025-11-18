// VerificationCodeModal.tsx
import { type ChangeEvent, useState } from "react";

interface VerificationCodeModalProps {
  isOpen: boolean;
  phone: string;
  onClose: () => void;
}

export const AuthModal = ({
  isOpen,
  phone,
  onClose,
}: VerificationCodeModalProps) => {
  const [code, setCode] = useState("");

  if (!isOpen) return null; // 안 열려 있으면 아무것도 렌더 X

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, "").slice(0, 6); // 6자리 인증번호
    setCode(digits);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: 24,
          borderRadius: 8,
          minWidth: 280,
        }}
      >
        <h2>인증번호 입력</h2>
        <p style={{ fontSize: 14, marginBottom: 8 }}>
          {phone} 로 전송된 인증번호 6자리를 입력해 주세요.
        </p>

        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={code}
          onChange={handleChange}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button type="button" onClick={onClose}>
            취소
          </button>
          <button type="button" disabled={code.length !== 6}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
