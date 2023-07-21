import React from 'react';
import {Center, HStack, NativeBaseProvider, Spinner} from 'native-base';

type Props = {};

const Loader = (props: Props) => {
  return (
    <HStack flex={1} justifyContent="center" alignItems="center">
      <Spinner size="lg" />
    </HStack>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Loader />
      </Center>
    </NativeBaseProvider>
  );
};
