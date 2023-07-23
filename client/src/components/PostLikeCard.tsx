 import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  followUserAction,
  unfollowUserAction,
} from '../../redux/actions/userAction';

type Props = {
  route: any;
  navigation: any;
};

const PostLikeCard = ({navigation, route}: Props) => {
  const data = route.params.item;

  const {user, users} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <View className="p-3">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/2223/2223615.png',
              }}
              height={25}
              width={25}
            />
          </TouchableOpacity>
          <Text className="pl-3 text-[20px] font-[600] text-[#000]">Likes</Text>
        </View>
        <FlatList
          data={data}
          renderItem={({item}) => {
            const handleFollowUnfollow = async (e: any) => {
              try {
                if (e.followers.find((i: any) => i.userId === user._id)) {
                  await unfollowUserAction({
                    userId: user._id,
                    users,
                    followUserId: e._id,
                  })(dispatch);
                } else {
                  await followUserAction({
                    userId: user._id,
                    users,
                    followUserId: e._id,
                  })(dispatch);
                }
              } catch (error) {
                console.log(error, 'error');
              }
            };
            return (
              <TouchableOpacity
                className="w-full py-3 flex-row justify-between"
                onPress={() =>
                  item.userId === user._id
                    ? navigation.navigate('Profile')
                    : navigation.navigate('UserProfile', {
                        item: users.find((i: any) =>
                          i._id === item.userId ? i : null,
                        ),
                      })
                }>
                <View className="flex-row">
                  <Image
                    source={{uri: item.userAvatar}}
                    width={40}
                    height={40}
                    borderRadius={100}
                  />
                  <View className="pl-3">
                    <View className='relative flex-row items-center'>
                    <Text className="text-[18px] text-black">
                      {item?.name ? item.name : user.name}
                    </Text>
                    {item.userId === '64ba059336147d4b13bc1a6e' && (
                      <Image
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828640.png',
                        }}
                        width={15}
                        height={15}
                        className="ml-1"
                      />
                    )}
                    </View>
                    
                    <Text className="text-[16px] text-[#000000ba]">
                      {item?.userName ? item.userName : user.userName}
                    </Text>
                  </View>
                </View>
                {user._id !== item.userId && (
                  <TouchableOpacity
                    className="rounded-[8px] w-[100px] flex-row justify-center items-center h-[35px] border border-[#0000004b]"
                    onPress={() =>
                      handleFollowUnfollow(
                        users.find((i: any) =>
                          i._id === item.userId ? i : null,
                        ),
                      )
                    }>
                    <Text className="text-black">
                      {users.find(
                        (i: any) =>
                          item.userId === i._id &&
                          i.followers.find((i: any) => i.userId === user._id),
                      )
                        ? 'Following'
                        : 'Follow'}
                    </Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PostLikeCard;
