import {
	RouteProp,
	useFocusEffect,
	useNavigation,
} from '@react-navigation/native';
import React from 'react';
import {
	Image,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { axiosLogin } from '../../services/axios';
import { getConsumerLevel } from '../../utils/getConsumerLevel';
import {
	NavigationProp,
	RootStackParamList,
} from '../../utils/types/navigation';

type QuizResultScreenRouteProp = RouteProp<RootStackParamList, 'QuizzResult'>;

type QuizResultProps = {
	route: QuizResultScreenRouteProp;
};

const QuizzResult = ({ route }: QuizResultProps) => {
	const { score } = route.params;
	const navigation = useNavigation<NavigationProp>();

	return (
		<SafeAreaView className="h-full">
			<View className="mt-5 items-center">
				<Text
					className="text-yellow-500 text-3xl"
					style={{ fontFamily: 'poppins-semi-bold' }}
				>
					Parabéns! Perfil criado com sucesso!
				</Text>
			</View>

			<View className="mr-2 mt-6 items-center ">
				<Text
					style={{ fontFamily: 'poppins-semi-bold' }}
					className="text-gray-500 text-xl"
				>
					{' '}
					Você é um{' '}
					<Text className="text-green-500 text-xl">
						{getConsumerLevel(score)}
					</Text>
					!
				</Text>
			</View>

			<View className="items-center mt-10">
				<Image
					source={require('../../assets/icons/IconsLevel/arvore1.png')}
					className="w-72 h-72"
				/>
			</View>

			<View className="items-center mt-8 px-4">
				<Text
					style={{ fontFamily: 'poppins-semi-bold' }}
					className="text-justify text-yellow-500 text-xl"
				>
					É importante cuidar do meio ambiente sempre, pois é com ele que conseguimos deixar o mundo melhor
				</Text>
			</View>
			<TouchableOpacity
				className="self-center justify-center rounded-2xl bg-gray-500 w-96 h-16 mt-4"
				onPress={() => navigation.navigate('LogIn')}
			>
				<Text
					style={{ fontFamily: 'poppins-semi-bold' }}
					className="text-center text-yellow text-xl"
				>
					Continuar
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default QuizzResult;