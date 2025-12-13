import { Text, TextInput } from 'react-native';
import Typography from '../styles/typography';

export const applyGlobalTextStyle = () => {
  if (!Text.defaultProps) {
    Text.defaultProps = {};
  }

  Text.defaultProps.style = Typography.body;
  Text.defaultProps.allowFontScaling = false;

  if (!TextInput.defaultProps) {
    TextInput.defaultProps = {};
  }

  TextInput.defaultProps.style = Typography.body;
  TextInput.defaultProps.allowFontScaling = false;
};
