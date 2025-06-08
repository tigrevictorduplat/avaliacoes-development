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
		<View className="flex-1 space-y-2 pt-4 bg-white">
			<FlatList
				data={posts}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderPost}
				ListHeaderComponent={<HomeHeader username="john.doe" />}
				contentContainerStyle={{ paddingBottom: 45 }}
			/>
		</View>
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
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Home;
