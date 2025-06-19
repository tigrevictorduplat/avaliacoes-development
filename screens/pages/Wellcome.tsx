import * as React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import "tailwindcss/tailwind.css";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { checkIsRemember } from "../../utils/async-storage/user-data";
import { getToken } from "../../utils/session/manager";
import { NavigationProp } from "../../utils/types/navigation";

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

		// COR BONITA 826313
	return (
		<View className=" justify-center items-center ">
			<View className="relative flex justify-center items-center  w-full h-64 mb-6">
				<div style={{ backgroundColor: '#F1CB00', 
				borderBottomLeftRadius: 100, 
				borderBottomRightRadius: 100,  }} 
				className="absolute w-full h-full rounded-b-3xl"/>
			<View className="justify-center items-center">
				<Image
					source={require('../../assets/images/login/LogoDoApp.png')}
				/>
			</View>
			</View>
			<TouchableOpacity
				className="w-4/5 bg-[#FFD750] shadow-lg py-3.5 mb-4 mt-[230] rounded-2xl"
				onPress={() => navigation.navigate('Register')}
			>
				<Text className="text-center text-[#000000] text-xl">
					Crie seu Perfil
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				className="w-4/5 bg-[#FFd750] shadow-lg py-3.5 mb-4 rounded-2xl"
				onPress={() => navigation.navigate('LogIn')}
			>
				<Text className=" text-center border-[#F9F9F9] text-[#000000] text-xl"> 
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
