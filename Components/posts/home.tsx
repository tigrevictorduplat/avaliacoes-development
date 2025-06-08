import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { getUserDetailsByEmail } from '../../utils/session/user-data';
import { Post } from '../../utils/types/post';
import { UserResponse } from '../../utils/types/user-response';

type PostProps = {
	post: Post;
};

const PostComponent = ({ post }: PostProps) => {
    const imageUrl =
        post.fotos && post.fotos.length > 0 ? post.fotos[0].uri : "";
    const [userPost, setUserPost] = useState<UserResponse | null>(null);

    const screenWidth = Dimensions.get('window').width;
    const imageSize = Math.min(screenWidth * 0.92, 340);

    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                const user = await getUserDetailsByEmail(post.idUsuario);
                setUserPost(user);
            })();
            return () => {};
        }, [post.idUsuario]),

    );

    return (
        <View className="bg-white rounded-xl shadow mb-4 mx-2">
            {/* Header do post */}
            <View className="flex-row items-center gap-x-3 px-4 py-3 rounded-t-xl bg-primaryGray">
                <Image
                    source={
                        userPost?.fotoUsu
                            ? { uri: userPost?.fotoUsu }
                            : require('../../assets/icons/user-pages-icons/user-photo/ex-user-photo.png')
                    }
                    style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#eee' }}
                    resizeMode="cover"
                />
                <Text className="font-medium text-base" numberOfLines={1} style={{ flexShrink: 1 }}>
                    {userPost?.nome || 'Autor desconhecido'}
                </Text>
            </View>

            {/* Imagem principal do post */}
            <View style={{ width: imageSize, height: imageSize }} className="self-center my-2 rounded-xl overflow-hidden bg-gray-200">
                {imageUrl ? (
                    <Image
                        source={{ uri: imageUrl }}
                        style={{ width: imageSize, height: imageSize }}
                        resizeMode="cover"
                    />
                ) : (
                    <Text className="text-center mt-10">Imagem não disponível</Text>
                )}
            </View>

            {/* Conteúdo do post */}
            <View className="px-4 pb-4">
                <Text className="font-semibold text-lg mb-1">
                    {post.titulo || 'Sem título'}
                </Text>
                <Text className="text-base text-gray-700">
                    {post.conteudo || 'Sem descrição'}
                </Text>
            </View>
        </View>
    );
};

export default PostComponent;
