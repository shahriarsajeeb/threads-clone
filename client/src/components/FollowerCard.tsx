import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  followUserAction,
  loadUser,
  unfollowUserAction,
} from '../../redux/actions/userAction';

type Props = {
  route: any;
  navigation: any;
};

const FollowerCard = ({navigation, route}: Props) => {
  const followers = route.params.followers;
  const item = route.params.item;
  const following = route.params.following;
  const [data, setData] = useState(followers);
  const [active, setActive] = useState(0);
  const {user, users} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users) {
      if (followers) {
        const updatedUsers = [...users, user];
        const fullUsers = updatedUsers.filter((user: any) =>
          followers.some((item: any) => item.userId === user._id),
        );
        setData(fullUsers);
      }
      if (active === 1) {
        if (following) {
          const updatedUsers = [...users, user];
          const fullUsers = updatedUsers.filter((user: any) =>
            following.some((item: any) => item.userId === user._id),
          );
          setData(fullUsers);
        }
      }
    }
  }, [followers, following, active, users]);

  return (
    <SafeAreaView>
      <View className="p-3 relative mb-2">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/2961/2961937.png',
              }}
              height={25}
              width={25}
            />
          </TouchableOpacity>
          <Text className="pl-3 text-[20px] font-[600] text-[#000]">
            {item?.name}
          </Text>
        </View>
        <View className="w-[80%] pt-5 m-auto flex-row justify-between">
          <TouchableOpacity onPress={() => setActive(0)}>
            <Text
              className="text-[18px] pl-3 text-[#000]"
              style={{opacity: active === 0 ? 1 : 0.6}}>
              Followers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActive(1)}>
            <Text
              className="text-[18px] pl-3 text-[#000]"
              style={{opacity: active === 1 ? 1 : 0.6}}>
              Following
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActive(2)}>
            <Text
              className="text-[18px] pl-3 text-[#000]"
              style={{opacity: active === 2 ? 1 : 0.6}}>
              Pending
            </Text>
          </TouchableOpacity>
        </View>

        {active === 0 ? (
          <View className="w-[40%] absolute h-[1px] bg-black left-[-10px] bottom-0" />
        ) : active === 1 ? (
          <View className="w-[30%] absolute h-[1px] bg-black right-[31%] bottom-0" />
        ) : (
          <View className="w-[32%] absolute h-[1px] bg-black right-[0%] bottom-0" />
        )}
      </View>

      {active === 0 && (
        <Text className="py-2 text-center text-black text-[16px]">
          {followers?.length} followers
        </Text>
      )}

      {active === 1 && (
        <Text className="py-2 text-center text-black text-[16px]">
          {following?.length} following
        </Text>
      )}

      {active !== 2 && (
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
              loadUser()(dispatch);
            };

            return (
              <TouchableOpacity
                className="w-[95%] m-auto py-3 flex-row justify-between"
                onPress={() =>
                  navigation.navigate('UserProfile', {
                    item,
                  })
                }>
                <View className="flex-row">
                  <Image
                    source={{uri: item?.avatar?.url}}
                    width={40}
                    height={40}
                    borderRadius={100}
                  />
                  <View className="pl-3">
                    <View className="flex-row items-center relative">
                      <Text className="text-[18px] text-black">
                        {item?.name}
                      </Text>
                      {item.role === 'Admin' && (
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
                      {item?.userName}
                    </Text>
                  </View>
                </View>
                {user._id !== item._id && (
                  <TouchableOpacity
                    className="rounded-[8px] w-[100px] flex-row justify-center items-center h-[35px] border border-[#0000004b]"
                    onPress={() => handleFollowUnfollow(item)}>
                    <Text className="text-black">
                      {item?.followers?.find((i: any) => i.userId === user._id)
                        ? 'Following'
                        : 'Follow'}
                    </Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            );
          }}
        />
      )}

      {active === 2 && (
        <Text className="text-[18px] text-center pt-10 text-black">No Pending</Text>
      )}
    </SafeAreaView>
  );
};

export default FollowerCard;
