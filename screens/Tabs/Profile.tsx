import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useTransition } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderMenu from '../../Components/buttons/HeaderMenu';
import PostList from '../../Components/profile/PostList';
import ProfileImagesSection from '../../Components/profile/ProfileImagesSection';
import ProfileInfo from '../../Components/profile/ProfileInfo';
import Spinner from '../../Components/spinner';
import { getApiAxios } from '../../services/axios';
import { getToken } from '../../utils/session/manager';
import { getUserDetails } from '../../utils/session/user-data';
import { NavigationProp } from '../../utils/types/navigation';
import { Post } from '../../utils/types/post';
import { UserResponse } from '../../utils/types/user-response';

const MOCK_MODE = true; // Altere para false para usar a API real

const mockUser: UserResponse = {
    id: 1,
    nome: 'Usuário Mock',
    email: 'mock@teste.com',
    username: 'mockuser',
    telefone: '11999999999',
    // Adicione outros campos necessários conforme seu tipo UserResponse
};

const mockPosts: Post[] = [
    {
        id: 101,
        idUsuario: 'mock@teste.com',
        dataCriacao: '2024-06-10T12:00:00Z',
        titulo: 'Primeiro post mock',
        tema: 'Saúde',
        subtemas: 'Bem-estar, Rotina',
        conteudo: 'Conteúdo do post mockado',
        fotos: [
            {
                uri: 'https://via.placeholder.com/150',
                name: 'mock-image-1.jpg',
                type: 'image/jpeg'
            }
        ],
    },
    {
        id: 102,
        idUsuario: 'mock@teste.com',
        dataCriacao: '2024-06-11T15:30:00Z',
        titulo: 'Segundo post mock',
        tema: 'Sustentabilidade',
        subtemas: 'Meio Ambiente, Consumo',
        conteudo: 'Outro conteúdo de teste',
        fotos: [
            {
                uri: 'https://via.placeholder.com/150',
                name: 'mock-image-2.jpg',
                type: 'image/jpeg'
            }
        ],
    },
];

const Profile = () => {
    const navigation = useNavigation<NavigationProp>();
    const [userProfile, setUserProfile] = useState<UserResponse | null>(null);
    const [userPostagens, setUserPostagens] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUserPosts = async (userEmail: string) => {
        try {
            const api = await getApiAxios();
            const response = await api.get('/api/Cosme/receitas');
            const userPosts = response.data.filter(
                (posts: Post) => posts.idUsuario === userEmail
            );
            setUserPostagens(userPosts);
            console.log('Postagens filtradas', userPosts)

        } catch (error) {
            console.error('Erro ao carregar as postagens:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');

        }
    };


    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            (async () => {
                if (MOCK_MODE) {
                    setUserProfile(mockUser);
                    setUserPostagens(mockPosts);
                    setLoading(false);
                    return;
                }
                const token = await getToken();
                const user = await getUserDetails();
                setUserProfile(user);

                if (user) {
                    console.log("Buscando postagens...");
                    await fetchUserPosts(user.email);
                }
                setLoading(false)

            })();
            return () => {
                setLoading(true);
            };
        }, []),
    );

    if (loading) return <Spinner />;

    return (
        <SafeAreaView className="flex-1 bg-[#FFFDE7]">
            <ScrollView
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{ paddingBottom: 45 }}
            >
                <View className="flex-row justify-end m-2">
                    <HeaderMenu />
                </View>

                <View className="mx-4 mt-2 mb-4 rounded-2xl" style={{ elevation: 2 }}>
                    <ProfileImagesSection user={userProfile} />
                    <ProfileInfo user={userProfile} />
                </View>

                <View
                    className="w-90 items-center"
                    style={{
                        marginTop: 24,
                        marginBottom: 8,
						marginHorizontal: 12,
                        paddingVertical: 14,
                        backgroundColor: '#FFF700',
                        borderBottomWidth: 2,
                        borderBottomColor: '#FFD600',
                        borderRadius: 16,
                    }}
                >
                    <Text
                        className="text-lg text-[#4A4A4A] "
                        style={{
                            fontFamily: 'Poppins-Medium',
                            letterSpacing: 1,
                        }}
                    >
                        Postagens
                    </Text>
                </View>

                <View className="mx-2 mt-2 mb-2 rounded-2xl bg-white" style={{ elevation: 1 }}>
                    <PostList posts={userPostagens} key={userPostagens.length} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
