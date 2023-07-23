import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {loadUser, loginUser} from '../../redux/actions/userAction';
import {useDispatch, useSelector} from 'react-redux';

type Props = {
  navigation: any;
};

const LoginScreen = ({navigation}: Props) => {
  const {error, isAuthenticated} = useSelector((state: any) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const submitHandler = (e: any) => {
    loginUser(email, password)(dispatch);
  };

  useEffect(() => {
    if (error) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Email and password not matching!',
          ToastAndroid.LONG,
        );
      } else {
        Alert.alert('Email and password not matching!');
      }
    }
    if (isAuthenticated) {
      loadUser()(dispatch);
      if (Platform.OS === 'android') {
      ToastAndroid.show('Login successful!', ToastAndroid.LONG);
      } else{
        Alert.alert('Login successful!');
      }
    }
  }, [isAuthenticated, error]);

  return (
    <View className="flex-[1] items-center justify-center">
      <View className="w-[70%]">
        <Text className="text-[25px] font-[600] text-center text-black">
          Login
        </Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          placeholderTextColor={'#000'}
          onChangeText={text => setEmail(text)}
          className="w-full h-[35px] border border-[#00000072] px-2 my-2 text-black"
        />
        <TextInput
          placeholder="Enter your password"
          className="w-full h-[35px] border border-[#00000072] px-2 my-2 text-black"
          value={password}
          placeholderTextColor={'#000'}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity className="mt-6">
          <Text
            className="w-full text-[#fff] text-center pt-[8px] text-[20px] h-[40px] bg-black"
            onPress={submitHandler}>
            Login
          </Text>
        </TouchableOpacity>
        <Text
          className="pt-3 text-black"
          onPress={() => navigation.navigate('Signup')}>
          Don't have any account? <Text>Sign up</Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
