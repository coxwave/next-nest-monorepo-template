interface Props {
  className?: string;
}

export default function KakaoLogo({ className }: Props) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3.14355C6.4772 3.14355 2 6.65955 2 10.9968C2 14.2002 3.58 15.729 5.7444 17.123L5.7544 17.1268L5.3377 21.6649C5.34447 21.7085 5.36225 21.7497 5.38934 21.7845C5.41644 21.8194 5.45197 21.8468 5.49258 21.8641C5.53319 21.8814 5.57755 21.8881 5.62146 21.8836C5.66538 21.879 5.70741 21.8634 5.7436 21.8381L10.5507 18.7881L10.6594 18.8009C11.1045 18.8501 11.5525 18.8666 12 18.8502C17.523 18.8502 22 15.3341 22 10.9972C22 6.66025 17.523 3.14355 12 3.14355Z"
        fill="black"
      />
    </svg>
  );
}