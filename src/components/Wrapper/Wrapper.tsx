import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {container, wrapper} from '../../styles/styles';

interface WrapperProps {}

const Wrapper: React.FC<WrapperProps> = ({children}) => {
  return (
    <SafeAreaView style={container}>
      <ScrollView contentContainerStyle={wrapper}>{children}</ScrollView>
    </SafeAreaView>
  );
};
export default Wrapper;
