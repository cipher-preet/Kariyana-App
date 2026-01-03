import { Text, TextInput } from 'react-native';
import Typography from '../styles/typography';

export const applyGlobalTextStyle = () => {
  const apply = (Component: any) => {
    Component.defaultProps = Component.defaultProps || {};
    Component.defaultProps.style = Typography.body;
    Component.defaultProps.allowFontScaling = false;
  };

  apply(Text);
  apply(TextInput);
};
