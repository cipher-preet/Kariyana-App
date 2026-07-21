import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
};

export const BackIcon = ({ size = 18, color = '#202124' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="m15 6-6 6 6 6"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const TruckIcon = ({ size = 18, color = '#0B6B3A' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 7h10v9H4V7Zm10 3h3.2l2.8 3v3h-6v-6Z"
      stroke={color}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Circle cx={8} cy={17} r={1.6} fill={color} />
    <Circle cx={17} cy={17} r={1.6} fill={color} />
  </Svg>
);

export const MicIcon = ({ size = 18, color = '#0B6B3A' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x={9} y={4} width={6} height={10} rx={3} stroke={color} strokeWidth={2} />
    <Path
      d="M6.5 11.5A5.5 5.5 0 0 0 12 17m5.5-5.5A5.5 5.5 0 0 1 12 17m0 0v3"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export const BellOffIcon = ({ size = 18, color = '#0B6B3A' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="m5 5 14 14M8 17h8M10 20h4M7.5 14.5V10a4.5 4.5 0 0 1 7.2-3.6M16.5 10v2.6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export const PhoneOffIcon = ({ size = 18, color = '#0B6B3A' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="m5 5 14 14M8.5 6.5l1.4 3.2-1.2 1.1c.8 1.7 2.1 3 3.8 3.8l1.1-1.2 3.2 1.4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
