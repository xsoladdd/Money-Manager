import {Appearance, FlexStyle, TextStyle} from 'react-native';

const isDarkMode = Appearance.getColorScheme() === 'dark';

export const darkScheme = {
  background: '#0e153a',
  text: '#e2f3f5',
};

export const lightScheme = {
  background: '#e2f3f5',
  text: '#0e153a',
};

export const backgroundStyle = {
  backgroundColor: isDarkMode ? darkScheme.background : lightScheme.background,
};

export const textColor = {
  color: isDarkMode ? darkScheme.text : lightScheme.text,
};

export const textColorReverse = {
  color: isDarkMode ? lightScheme.text : darkScheme.text,
};

export const container: TextStyle[] = [
  backgroundStyle,
  {
    minHeight: '100%',
    alignContent: 'center',
  },
];

export const wrapper: FlexStyle = {
  flex: 1,
  width: '100%',
  alignItems: 'center',
  padding: 10,
  paddingTop: 30,
};
