interface Props {
  className?: string;
}

export default function GithubLogo({ className }: Props) {
  return (
    <svg
      className={className}
      width="344"
      height="344"
      viewBox="0 0 344 344"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M171.866 25.632C88.7883 25.5984 21.5 92.8531 21.5 175.863C21.5 241.505 63.593 297.305 122.214 317.797C130.109 319.779 128.899 314.169 128.899 310.339V284.304C83.3125 289.645 81.4648 259.478 78.4078 254.439C72.2266 243.891 57.6133 241.203 61.9805 236.164C72.3609 230.823 82.943 237.508 95.2047 255.615C104.073 268.75 121.374 266.533 130.142 264.349C132.057 256.455 136.155 249.4 141.799 243.924C94.5664 235.459 74.8805 206.635 74.8805 172.37C74.8805 155.741 80.3563 140.455 91.1063 128.127C84.2531 107.802 91.7445 90.4008 92.7524 87.8141C112.27 86.0672 132.561 101.789 134.14 103.032C145.226 100.042 157.891 98.4633 172.067 98.4633C186.311 98.4633 199.009 100.109 210.196 103.133C213.992 100.244 232.805 86.7391 250.945 88.3851C251.92 90.9719 259.243 107.97 252.793 128.026C263.677 140.388 269.22 155.808 269.22 172.47C269.22 206.803 249.4 235.66 202.033 243.991C206.09 247.981 209.311 252.74 211.509 257.988C213.707 263.237 214.836 268.871 214.832 274.562V312.355C215.101 315.378 214.832 318.368 219.871 318.368C279.366 298.312 322.198 242.11 322.198 175.897C322.198 92.8531 254.876 25.632 171.866 25.632V25.632Z"
        fill="black"
      />
    </svg>
  );
}
