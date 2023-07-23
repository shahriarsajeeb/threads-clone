import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PostDetailsCard from '../components/PostDetailsCard';
import {useSelector} from 'react-redux';

type Props = {
  navigation: any;
  route: any;
};

const PostDetailsScreen = ({navigation, route}: Props) => {
  let item = route.params.data;
  const {posts} = useSelector((state: any) => state.post);
  const [data, setdata] = useState(item);

  useEffect(() => {
    if (posts) {
      const d = posts.find((i: any) => i._id === item._id);
      setdata(d);
    }
  }, [posts]);

  return (
    <SafeAreaView>
      <View className="relative flex-col justify-between">
        <View className="h-[102%]">
          <View className="px-3">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/2223/2223615.png',
                }}
                height={25}
                width={25}
              />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <PostDetailsCard
              navigation={navigation}
              item={data}
              postId={data._id}
            />
            <View>
              {data?.replies?.map((i: any, index: number) => {
                return (
                  <PostDetailsCard
                    navigation={navigation}
                    item={i}
                    key={index}
                    isReply={true}
                    postId={item._id}
                  />
                );
              })}
              <View className="mb-[150px]"></View>
            </View>
          </ScrollView>
        </View>
        <View className="absolute bottom-8 flex-row w-full justify-center bg-white h-[70px] items-center">
          <TouchableOpacity
            className="w-[92%] bg-[#00000026] h-[45px] rounded-[40px] flex-row items-center"
            onPress={() =>
              navigation.replace('CreateReplies', {
                item: item,
                navigation: navigation,
              })
            }>
            <Image
              source={{uri: item.user.avatar.url}}
              width={30}
              height={30}
              borderRadius={100}
              className="ml-3 mr-3"
            />
            <Text className="text-[16px] text-[#0000009b]">
              Reply to {item.user.name}{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PostDetailsScreen;
