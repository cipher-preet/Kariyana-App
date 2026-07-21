import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
};

export const UserIcon = ({ size = 18, color = '#0B6B3A' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={8} r={3.5} stroke={color} strokeWidth={2} />
    <Path
      d="M5.5 20c.9-3.6 3.1-5.4 6.5-5.4s5.6 1.8 6.5 5.4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export const OrdersIcon = ({ size = 18, color = '#0B6B3A' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7 7.5h10M7 12h10M7 16.5h6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Rect x={4} y={3.5} width={16} height={17} rx={3} stroke={color} strokeWidth={2} />
  </Svg>
);

export const ChartIcon = ({ size = 18, color = '#0B6B3A' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 19V9m7 10V5m7 14v-7"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
    />
  </Svg>
);

export const AddressIcon = ({ size = 18, color = '#0B6B3A' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21s6.5-4.8 6.5-10.3a6.5 6.5 0 1 0-13 0C5.5 16.2 12 21 12 21Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={10.5} r={2} stroke={color} strokeWidth={2} />
  </Svg>
);

export const HelpIcon = ({ size = 18, color = '#0B6B3A' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={8} stroke={color} strokeWidth={2} />
    <Path
      d="M9.8 9.4A2.3 2.3 0 0 1 12.1 7c1.3 0 2.2.8 2.2 2 0 1.1-.6 1.7-1.5 2.3-.7.5-.9.9-.9 1.7"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Circle cx={12} cy={16.3} r={1} fill={color} />
  </Svg>
);

export const PartnerIcon = ({ size = 18, color = '#0B6B3A' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7 12.5 10 15l7-7"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 19.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export const FeedbackIcon = ({ size = 18, color = '#0B6B3A' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 17.5V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v5.5a3 3 0 0 1-3 3h-5.8L6.5 19c-.6.5-1.5.1-1.5-.7Z"
      stroke={color}
      strokeWidth={2}
      strokeLinejoin="round"
    />
  </Svg>
);

export const ShieldIcon = ({ size = 18, color = '#0B6B3A' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3.5 18.5 6v5.4c0 4-2.5 7-6.5 9.1-4-2.1-6.5-5.1-6.5-9.1V6L12 3.5Z"
      stroke={color}
      strokeWidth={2}
      strokeLinejoin="round"
    />
  </Svg>
);

export const ChevronIcon = ({ size = 17, color = '#9AA0A6' }: IconProps) => (
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
