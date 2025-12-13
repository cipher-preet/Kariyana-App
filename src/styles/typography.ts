import Colors from './color';
import { textScale } from './responsiveStyles';
import { TextStyle } from 'react-native';
import { Fonts } from './fonts';

type TypographyStyle = TextStyle;

const Typography: Record<string, TypographyStyle> = {
  h1: {
    fontSize: textScale(3.2),
    fontFamily: Fonts.bold,
    color: Colors.gray900,
  },
  h2: {
    fontSize: textScale(2.6),
    fontFamily: Fonts.semibold,
    color: Colors.gray900,
  },
  h3: {
    fontSize: textScale(2.3),
    fontFamily: Fonts.semibold,
    color: Colors.gray800,
  },
  body: {
    fontSize: textScale(2.2),
    fontFamily: Fonts.regular,
    color: Colors.gray700,
  },
  bodyBold: {
    fontSize: textScale(2.2),
    fontFamily: Fonts.medium,
    color: Colors.gray800,
  },
  caption: {
    fontSize: textScale(1.9),
    fontFamily: Fonts.regular,
    color: Colors.gray500,
  },
  button: {
    fontSize: textScale(2.2),
    fontFamily: Fonts.semibold,
    color: Colors.white,
  },
};

export default Typography;
