import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Image,
  Platform,
} from 'react-native';
import {useEffect, useState} from 'react';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser, registerUser} from '../../redux/actions/userAction';

type Props = {
  navigation: any;
};

const SignupScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const dispatch = useDispatch();
  const {error, isAuthenticated} = useSelector((state: any) => state.user);

  useEffect(() => {
    if (error) {
      if(Platform.OS === 'android'){
        ToastAndroid.show(error, ToastAndroid.LONG);
      } else{
        Alert.alert(error);
      }
    }
    if (isAuthenticated) {
      loadUser()(dispatch);
    }
  }, [error, isAuthenticated]);

  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
    }).then((image: ImageOrVideo | null) => {
      if (image) {
        setAvatar('data:image/jpeg;base64,' + image.data);
      }
    });
  };

  const submitHandler = (e: any) => {
   if(avatar === '' || name === '' || email === ''){
    if(Platform.OS === 'android'){
    ToastAndroid.show('Please fill the all fields and upload avatar', ToastAndroid.LONG);
    } else{
      Alert.alert('Please fill the all fields and upload avatar')
    }
   } else{
    registerUser(name, email, password, avatar)(dispatch);
   }
  };

  return (
    <View className="flex-[1] items-center justify-center">
      <View className="w-[70%]">
        <Text className="text-[25px] font-[600] text-center text-black">
          Sign Up
        </Text>
        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={text => setName(text)}
          placeholderTextColor={'#000'}
          className="w-full h-[35px] border text-black border-[#00000072] px-2 my-2"
        />
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={text => setEmail(text)}
          placeholderTextColor={'#000'}
          className="w-full h-[35px] border border-[#00000072] text-black px-2 my-2"
        />
        <TextInput
          placeholder="Enter your password"
          className="w-full h-[35px] border text-black border-[#00000072] px-2 my-2"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          placeholderTextColor={'#000'}
        />
        <TouchableOpacity
          className="flex-row items-center"
          onPress={uploadImage}>
          <Image
            source={{
              uri: avatar
                ? avatar
                : 'https://cdn-icons-png.flaticon.com/128/568/568717.png',
            }}
            className="w-[30px] h-[30px] rounded-full"
          />
          <Text className="text-black pl-2">upload image</Text>
        </TouchableOpacity>
        <TouchableOpacity className="mt-6" onPress={submitHandler}>
          <Text className="w-full text-[#fff] text-center pt-[8px] text-[20px] h-[40px] bg-black">
            Sign Up
          </Text>
        </TouchableOpacity>
        <Text
          className="pt-3 text-black"
          onPress={() => navigation.navigate('Login')}>
          Already have an account? <Text>Sign in</Text>
        </Text>
      </View>
    </View>
  );
};

export default SignupScreen;
