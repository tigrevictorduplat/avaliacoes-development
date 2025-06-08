import React from 'react';
import { View, Text, ImageBackground, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserDetail = ({ route }) => {
  const navigation = useNavigation();

  // MOCK TEMPORÁRIO PARA VISUALIZAÇÃO
  const mockData = {
    username: 'usuario_teste',
    description: 'Esta é uma descrição de teste para o usuário.',
    useravatar: { uri: 'https://randomuser.me/api/portraits/men/1.jpg' },
    icon: { uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
    title: 'Título de Teste',
    CategoryIcon: { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' }
  };

  // Use os dados mockados ao invés dos parâmetros da rota
  const { username, description, useravatar, icon, title, CategoryIcon } = mockData;

  return (
    <View className='flex-1'>
      <View className='h-[100px] w-[100%] bg-white'>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className='absolute top-12 left-5 bg-white p-2 rounded-full'
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View className='items-center'>
          <View className='absolute top-12 bg-white p-2 px-6 rounded-full'>
            <Text className='text-[22px] text-[#767676] font-semibold' style={{ fontFamily: 'poppins-medium' }}>{title}</Text>
          </View>
        </View>
        <View className='absolute top-12 right-5 bg-white p-2 rounded-full'>
          <Image source={icon} className='h-6 w-6' />
        </View>
      </View>
      <ScrollView className='bg-white' contentContainerStyle={{
        paddingBottom: 200}}>
        <View>
        <Image
            source={CategoryIcon}
            className='h-[250px] w-[100%] top-0'
            style={{ resizeMode: 'cover' }}
          />
        </View>

        <View className='flex-1 mt-[-50px] bg-white rounded-t-3xl p-6'>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className='flex flex-row justify-between items-center mb-4'>
              <Text className='text-[14px] mt-3' style={{ fontFamily: 'poppins-medium' }}>{description}</Text>
            </View>
          </ScrollView>

        </View>
    </ScrollView>
        <View className='absolute bottom-1 left-0 right-0 bg-white p-5 flex-col items-start'>
          <Text className='text-[#767676] font-normal mb-2' style={{ fontFamily: 'poppins-medium' }}>Post Criado Por</Text>
          <View className='flex-row items-center'>
            <View className="bg-gray-200 rounded-full h-12 w-12 overflow-hidden mr-3">
              <Image
                source={useravatar}
                className='h-full w-full'
                style={{ resizeMode: 'cover' }}
              />
            </View>
            <Text className='text-[16px] font-bold' style={{ fontFamily: 'poppins-medium' }}>@{username}</Text>
          </View>
        </View>
    </View>
  );
}

export default UserDetail;