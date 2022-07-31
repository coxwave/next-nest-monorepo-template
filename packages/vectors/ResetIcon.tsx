interface Props {
  className?: string;
}

export default function Reset({ className }: Props) {
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
        d="M5.078 7.98927C6.05072 6.31048 7.60039 5.04241 9.43848 4.42117C11.2766 3.79993 13.2778 3.86786 15.0695 4.61231C16.8613 5.35676 18.3214 6.72699 19.178 8.46787C20.0347 10.2087 20.2294 12.2016 19.7261 14.0754C19.2227 15.9492 18.0556 17.5762 16.4419 18.6535C14.8282 19.7308 12.878 20.1849 10.9544 19.9314C9.03082 19.6778 7.26494 18.7338 5.98557 17.2751C4.70621 15.8164 4.00055 13.9425 4 12.0023"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.00195H5V4.00195"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
