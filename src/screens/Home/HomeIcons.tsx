import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
};

export const LocationIcon = ({ size = 18, color = '#FFFFFF' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21s7-5.15 7-11a7 7 0 1 0-14 0c0 5.85 7 11 7 11Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={10} r={2.4} stroke={color} strokeWidth={2} />
  </Svg>
);

export const ClockIcon = ({ size = 14, color = '#60736A' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={8} stroke={color} strokeWidth={2} />
    <Path
      d="M12 7.8v4.7l3.1 1.9"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const StarIcon = ({ size = 13, color = '#0F8A43' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="m12 3 2.55 5.18 5.72.83-4.14 4.04.98 5.69L12 16.05l-5.11 2.69.98-5.69-4.14-4.04 5.72-.83L12 3Z"
      fill={color}
    />
  </Svg>
);

export const BoltIcon = ({ size = 14, color = '#0F8A43' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M13 2 5.8 13.1h5.4L10.8 22 18.2 9.7h-5.5L13 2Z"
      fill={color}
    />
  </Svg>
);

export const ChevronRightIcon = ({
  size = 18,
  color = '#0F8A43',
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="m9 6 6 6-6 6"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
