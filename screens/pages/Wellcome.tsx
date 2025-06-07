import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import 'tailwindcss/tailwind.css';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { checkIsRemember } from '../../utils/async-storage/user-data';
import { getToken } from '../../utils/session/manager';
import { NavigationProp } from '../../utils/types/navigation';

export default function Wellcome() {
	const navigation = useNavigation<NavigationProp>();

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			(async () => {
				const isRemember = await checkIsRemember();
				const token = await getToken();
				if (isRemember && token) navigation.navigate('Main');
			})();
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, []),
	);

	return (
		<View className="flex-1 bg-[#F9F9f9]  items-center">
			<View className="justify-center items-center mt-[-30] w-full h-64 mb-10">
				<Image
					source={require('../../assets/images/login/ImagemDeWellcome.png')}
					className="absolute shadown top-0 left-0 w-full h-100 object-cover "
				/>
				<View className="justify-center items-center mt-[200]">
					<Image source={require('../../assets/images/login/LogoDoApp.png')} />
				</View>
			</View>

			<TouchableOpacity
				className="w-4/5 bg-[#FFD750] shadow-lg py-3.5 mb-4 mt-[230] rounded-2xl"
				onPress={() => navigation.navigate('Register')}
			>
				<Text className="text-center text-[#FFFFFF] text-xl">
					Crie seu Perfil
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				className="border border-[#FFF] w-4/5 bg-[#FFd750] shadow-lg py-3.5 mb-4 rounded-2xl"
				onPress={() => navigation.navigate('LogIn')}
			>
				<Text className=" text-center border-[#F9F9F9] text-[#FFF] text-xl">
					Entrar
				</Text>
			</TouchableOpacity>
			<View className="justify-center items-center">
				<TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
					<Text className="font-semibold ml-1 mt-[150] text-[#09090b]">
						Politica de privacidade | Termos e condições
					</Text>
				</TouchableOpacity>

				<Text className="ml-1 mt-[0] text-[#09090b]">
					2024 consumo inteligente
				</Text>
			</View>
		</View>
	);
}
