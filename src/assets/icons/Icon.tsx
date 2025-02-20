import { icons } from "lucide-react";
import { HTMLAttributes } from "react";

export interface IconProps extends HTMLAttributes<HTMLOrSVGElement> {
  name: keyof typeof icons;
  size?: number;
  strokeWidth?: number;
}

export default function Icon({
  name,
  size,
  strokeWidth,
  className,
  ...props
}: IconProps) {
  const SelectIcon = icons[name];

  return (
    <SelectIcon
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
}
