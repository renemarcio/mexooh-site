interface BillboardIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
}

export default function BillboardIcon({
  size,
  style,
  ...props
}: BillboardIconProps) {
  return (
    <svg
      width="40.135"
      height="33.437"
      version="1.1"
      viewBox="0 0 10.619 8.8469"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <g transform="translate(-1.0405 -1.9265)" fill="none">
        <rect x="1.223" y="2.109" width="10.254" height="6.3276" ry=".68143" />
        <g stroke-linecap="round">
          <path d="m2.3001 8.67v1.9145" />
          <path d="m4.9717 8.67v1.9145" />
          <path d="m7.6433 8.6699v1.9145" />
          <path d="m10.315 8.67v1.9145" />
        </g>
      </g>
    </svg>
  );
}
