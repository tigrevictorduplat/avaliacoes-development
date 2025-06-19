import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostComponent from '../../Components/posts/home';
import { getApiAxios } from '../../services/axios';
import { getToken } from '../../utils/session/manager';
import { NavigationProp } from '../../utils/types/navigation';
import { Post } from '../../utils/types/post';
import Spinner from '../../Components/spinner';

const MOCK_MODE = true; // Altere para false para usar a API real

const mockPosts: Post[] = [
	{
		id: 1,
		idUsuario: 'mock@teste.com',
		dataCriacao: '2024-06-10T12:00:00Z',
		titulo: 'Primeiro post mock',
		tema: 'Saúde',
		subtemas: 'Bem-estar, Rotina',
		conteudo: 'Conteúdo do post mockado',
		fotos: [
			{
				uri: 'https://via.placeholder.com/400x400',
				name: 'mock-image-1.jpg',
				type: 'image/jpeg',
			},
		],
	},
	{
		id: 2,
		idUsuario: 'mock@teste.com',
		dataCriacao: '2024-06-11T15:30:00Z',
		titulo: 'Segundo post mock',
		tema: 'Sustentabilidade',
		subtemas: 'Meio Ambiente, Consumo',
		conteudo: 'Outro conteúdo de teste',
		fotos: [
			{
				uri: 'https://via.placeholder.com/400x400',
				name: 'mock-image-2.jpg',
				type: 'image/jpeg',
			},
		],
	},
];

const Home = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation<NavigationProp>();

	const fetchPosts = async () => {
		try {
			if (MOCK_MODE) {
				setPosts(mockPosts);
				return;
			}
			const api = await getApiAxios();
			const response = await api.get('/api/Cosme/receitas');

			setPosts(response.data);
		} catch (error) {
			console.error('Erro ao buscar posts:', error);
			Alert.alert('Erro', 'Não foi possível carregar as Postagens');
		} finally {
			setLoading(false);
		}
	};
	
	const logout = async () => {
            // Remove apenas os dados de sessão, mantendo os dados do usuário
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('@currentUserEmail');
        await AsyncStorage.removeItem('@tokenExpiration');
        await AsyncStorage.removeItem('@quizScore');
        
        console.log('Usuário deslogado');
        navigation.navigate('LogIn');
	}

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			(async () => {
				const token = await getToken();
				/*
if (!token) {
					alert('Você precisa realizar o login para acessar!');
					navigation.navigate('LogIn');
					return;
				}
*/ 

				fetchPosts();
			})();
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, []),
	);

	const renderPost = ({ item }: { item: Post }) => (
		<View className="mb-8">
			<PostComponent post={item} />
		</View>
	);

	if (loading) return <Spinner />;

	return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Receitas')} />
        <TouchableOpacity onPress={() => navigation.navigate('Settings')} />
        <TouchableOpacity onPress={() => navigation.navigate('Quiz')} />
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} />
        <TouchableOpacity onPress={logout} />
      </View>
    </SafeAreaView>
  );
};

type HomeHeaderProps = {
	username: string;
};

const HomeHeader = ({ username }: HomeHeaderProps) => {
	const navigation = useNavigation<NavigationProp>();

	return (
		<SafeAreaView>
			<View className="px-4 flex flex-row my-6 items-center gap-x-3 mb-5 ">
				<View className=" h-full w-full">
					<View>
						<Image
							source={require('../../assets/images/login/LogoAppHome.png')}
						/>
						borderBottomLeftRadius: 100, 
						borderBottomRightRadius: 100,  }} 
						className="absolute w-full h-full rounded-b-3xl"/>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Home;
