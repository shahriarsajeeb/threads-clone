import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image} from 'react-native';
import getTimeDuration from '../common/TimeGenerator';
import {
  addLikes,
  getAllPosts,
  removeLikes,
} from '../../redux/actions/postAction';
import axios from 'axios';
import {URI} from '../../redux/URI';
import PostDetailsCard from './PostDetailsCard';

type Props = {
  navigation: any;
  item: any;
  isReply?: boolean | null;
  postId?: string | null;
  replies?: boolean | null;
};

const PostCard = ({item, isReply, navigation, postId, replies}: Props) => {
  const {user, token,users} = useSelector((state: any) => state.user);
  const {posts} = useSelector((state: any) => state.post);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: '',
    avatar: {
      url: 'https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png',
    },
  });
  const time = item?.createdAt;
  const formattedDuration = getTimeDuration(time);

  const profileHandler = async (e: any) => {
    await axios
      .get(`${URI}/get-user/${e._id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        if (res.data.user._id !== user._id) {
          navigation.navigate('UserProfile', {
            item: res.data.user,
          });
        } else {
          navigation.navigate('Profile');
        }
      });
  };

  const reactsHandler = (e: any) => {
    if (item.likes.length !== 0) {
      const isLikedBefore = item.likes.find((i: any) => i.userId === user._id);
      if (isLikedBefore) {
        removeLikes({postId: postId ? postId : e._id, posts, user})(dispatch);
      } else {
        addLikes({postId: postId ? postId : e._id, posts, user})(dispatch);
      }
    } else {
      addLikes({postId: postId ? postId : e._id, posts, user})(dispatch);
    }
  };

  const deletePostHandler = async (e: any) => {
    await axios
      .delete(`${URI}/delete-post/${e}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        getAllPosts()(dispatch);
      });
  };

  useEffect(() => {
   if(users){
    const updatedUsers = [...users, user];
    const userData = updatedUsers.find((user: any) =>
        user._id === item.user._id
     );
     setUserInfo(userData);
   }
  }, [users]);

  return (
    <View className="p-[15px] border-b border-b-[#00000017]">
      <View className="relative">
        <View className="flex-row w-full">
          <View className="flex-row w-[85%] items-center">
            <TouchableOpacity onPress={() => profileHandler(item.user)}>
              <Image
                source={{uri: userInfo?.avatar?.url}}
                width={40}
                height={40}
                borderRadius={100}
              />
            </TouchableOpacity>
            <View className="pl-3 w-[70%]">
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => profileHandler(userInfo)}>
                <Text className="text-black font-[500] text-[16px]">
                  {userInfo?.name}
                </Text>
                {userInfo?.role === 'Admin' && (
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828640.png',
                    }}
                    width={15}
                    height={15}
                    className="ml-1"
                  />
                )}
              </TouchableOpacity>
              <Text className="text-black font-[500] text-[13px]">
                {item.title}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <Text className="text-[#000000b6]">{formattedDuration}</Text>
            <TouchableOpacity
              onPress={() => item.user._id === user._id && setOpenModal(true)}>
              <Text className="text-[#000] pl-4 font-[700] mb-[8px]">...</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="ml-[50px] my-3">
          {item.image && (
            <Image
              source={{uri: item.image.url}}
              style={{aspectRatio: 1, borderRadius: 10, zIndex: 1111}}
              resizeMode="contain"
            />
          )}
        </View>
        {item.image ? (
          <View className="absolute top-12 left-5 h-[90%] w-[1px] bg-[#00000017]" />
        ) : (
          <View className="absolute top-12 left-5 h-[60%] w-[1px] bg-[#00000017]" />
        )}
        <View className="flex-row items-center left-[50px] top-[5px]">
          <TouchableOpacity onPress={() => reactsHandler(item)}>
            {item.likes.length > 0 ? (
              <>
                {item.likes.find((i: any) => i.userId === user._id) ? (
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/2589/2589175.png',
                    }}
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/2589/2589197.png',
                    }}
                    width={30}
                    height={30}
                  />
                )}
              </>
            ) : (
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/2589/2589197.png',
                }}
                width={30}
                height={30}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreateReplies', {
                item: item,
                navigation: navigation,
                postId: postId,
              });
            }}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/5948/5948565.png',
              }}
              width={22}
              height={22}
              className="ml-5"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3905/3905866.png',
              }}
              width={25}
              height={25}
              className="ml-5"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/10863/10863770.png',
              }}
              width={25}
              height={25}
              className="ml-5"
            />
          </TouchableOpacity>
        </View>
        {!isReply && (
          <View className="pl-[50px] pt-4 flex-row">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PostDetails', {
                  data: item,
                })
              }>
              <Text className="text-[16px[ text-[#0000009b]">
                {item?.replies?.length !== 0 &&
                  `${item?.replies?.length} replies ·`}{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                item.likes.length !== 0 &&
                navigation.navigate('PostLikeCard', {
                  item: item.likes,
                  navigation: navigation,
                })
              }>
              <Text className="text-[16px[ text-[#0000009b]">
                {item.likes.length} {item.likes.length > 1 ? 'likes' : 'like'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {replies && (
          <>
            {item?.replies?.map((i: any) => (
              <PostDetailsCard
                navigation={navigation}
                key={i._id}
                item={i}
                isReply={true}
                postId={item._id}
              />
            ))}
          </>
        )}
        {openModal && (
          <View className="flex-[1] justify-center items-center mt-[22]">
            <Modal
              animationType="fade"
              transparent={true}
              visible={openModal}
              onRequestClose={() => {
                setOpenModal(!openModal);
              }}>
              <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
                <View className="flex-[1] justify-end bg-[#00000059]">
                  <TouchableWithoutFeedback onPress={() => setOpenModal(true)}>
                    <View className="w-full bg-[#fff] h-[120] rounded-[20px] p-[20px] items-center shadow-[#000] shadow-inner">
                      <TouchableOpacity
                        className="w-full bg-[#00000010] h-[50px] rounded-[10px] items-center flex-row pl-5"
                        onPress={() => deletePostHandler(item._id)}>
                        <Text className="text-[18px] font-[600] text-[#e24848]">
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        )}
      </View>
    </View>
  );
};

export default PostCard;
