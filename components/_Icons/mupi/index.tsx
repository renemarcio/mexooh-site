interface MUPIIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
}

export default function MUPIIcon({ size, style, ...props }: MUPIIconProps) {
  return (
    <svg
      width="19.78"
      height="34.813"
      version="1.1"
      viewBox="0 0 5.2334 9.2109"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <g transform="translate(-3.5563 -1.5676)" fill="none">
        <rect
          x="3.7388"
          y="1.7501"
          width="4.8684"
          height="7.8773"
          ry=".68143"
        />
        <rect x="4.3336" y="2.3308" width="3.7108" height="6.716" ry=".21739" />
        <path d="m8.0709 9.705v0.89095" />
        <path d="m4.3161 9.705v0.89095" />
      </g>
    </svg>
  );
}
