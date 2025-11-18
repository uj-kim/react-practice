interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PREFIX = "010";
const MAX_LENGTH = 11;

const formatWithHyphen = (value: string) => {
  if (value.length <= 4) {
    // 010-1234
    return `${PREFIX}-${value}`;
  }

  return `${PREFIX}-${value.slice(0, 4)}-${value.slice(4)}`;
};

export const PhoneInput = ({ value, onChange }: PhoneInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, ""); // 숫자 이외의 문자 제거
    if (digits.length > MAX_LENGTH) {
      return; // 최대 길이 초과 시 무시
    }
    let rest = digits.startsWith(PREFIX) ? digits.slice(PREFIX.length) : digits;
    rest = rest.slice(0, MAX_LENGTH); // 최대 길이까지 자르기

    const formatted = formatWithHyphen(rest);
    onChange(formatted);
  };
  return (
    <input
      type="tel"
      inputMode="numeric" // 최신 iOS 버전에서 숫자키패드만 보이도록
      pattern="[0-9]*" // 최신 iOS 버전 외에도 지원(안정성)
      value={value}
      maxLength={13}
      onChange={handleChange}
      placeholder="010-0000-0000"
    />
  );
};
