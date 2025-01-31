interface PanelIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
}

export default function PanelIcon({ size, style, ...props }: PanelIconProps) {
  return (
    <svg
      width="31.237"
      height="40.225"
      version="1.1"
      viewBox="0 0 8.2647 10.643"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <g
        transform="translate(-2.2177 -1.0284)"
        fill="none"
        strokeLinecap="round"
      >
        <rect
          x="2.4032"
          y="1.2139"
          width="7.8937"
          height="4.8382"
          ry=".81584"
        />
        <path d="m6.35 6.2068v5.1866" />
        <path d="m5.1249 11.489h2.4501" />
      </g>
    </svg>
  );
}
