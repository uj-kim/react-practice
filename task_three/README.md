<!--

필요 타입
Phonenumber
인증 상태 (AuthStep)


1. 전화번호 입력 UI (input)
조건
 1. 010으로 시작할 것
 2. 제한 : 11자리.
 3. 숫자만 입력 가능
    - 문자 입력시 무시(정규식 활용).
 4. 자동 하이픈 포맷팅 적용
 5. 11자리 완료 -> "인증코드 보내기" button 활성화 (default 비활성화)

에러처리
1. 맨 앞이 010이 아닌 경우
2. 문자는 무시.

2. 인증코드 보내기 button
이벤트
1. 클릭 : 인증코드 입력 필드

2-1. 인증코드 입력 필드(input)
조건
1. 6자리
2. 숫자

2-2. "다음" button
이벤트 : alert("인증완료")

스타일
1. Container div : width 375px
2. 인증코드 입력창은 키보드 올라온 걸 고려해서 margin 처리
3. input focus -> outline 색상 #3182f6
4. 에러 text는 xs o sm (작게)

(styled-components, emotion, tailwind 중 택 1)




 -->

const PHONE_PREFIX = "010";
const MAX_SUFFIX_LENGTH = 8;

const sanitizeSuffix = (value?: string) => {
if (!value) {
return "";
}

const digitsOnly = value.replace(/\D/g, "");
const withoutPrefix = digitsOnly.startsWith(PHONE_PREFIX)
? digitsOnly.slice(PHONE_PREFIX.length)
: digitsOnly;

return withoutPrefix.slice(0, MAX_SUFFIX_LENGTH);
};

const formatWithHyphen = (suffixDigits: string) => {
const firstChunk = suffixDigits.slice(0, 4);
const secondChunk = suffixDigits.slice(4, 8);

if (!firstChunk && !secondChunk) {
return `${PHONE_PREFIX}-`;
}

return secondChunk
? `${PHONE_PREFIX}-${firstChunk}-${secondChunk}`
: `${PHONE_PREFIX}-${firstChunk}`;
};

export const PhoneInput = ({ phoneNumber }: PhoneInputProps) => {
const [suffixDigits, setSuffixDigits] = useState(
sanitizeSuffix(phoneNumber)
);

useEffect(() => {
setSuffixDigits(sanitizeSuffix(phoneNumber));
}, [phoneNumber]);

const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
setSuffixDigits(sanitizeSuffix(event.target.value));
};
