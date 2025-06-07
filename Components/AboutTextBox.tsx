import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface AboutTextBoxProps {
	iconName: string;
	iconSize: number;
	boxTitle: string;
	boxTextContent: string;
}

interface Developer {
	name: string;
	linkedInUrl: string;
}

const developers: Developer[] = [
	{
		name: 'Allan Oliveira Teran Jaime',
		linkedInUrl: 'https://www.linkedin.com/in/allanteran/',
	},
	{
		name: 'Amanda Márcia Sales da Silva',
		linkedInUrl: 'https://www.linkedin.com/in/amanda-silva-80613a28b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
	},
	{
		name: 'Douglas Barros Andrade Costa',
		linkedInUrl: 'https://www.linkedin.com/in/hanspeterdietiker/',
	},
	{
		name: 'Jadson Mendes Barbosa',
		linkedInUrl: 'https://www.linkedin.com/in/jadsonbarbosa1/',
	},
	{
		name: 'Leonardo Calheira Marchesini',
		linkedInUrl: 'http://www.linkedin.com/in/leomarchesiini',
	},
	{
		name: 'Marx Lenin Muniz Vigas',
		linkedInUrl: 'https://www.linkedin.com/in/marx-vigas-84a58928a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
	},
	{
		name: 'Ian Davi Menezes Alves Bomfim',
		linkedInUrl: 'https://www.linkedin.com/in/ianmenezesss',
	},
	{
		name: 'Arthur Souza Lima Ra',
		linkedInUrl: 'https://www.linkedin.com/in/arthur-souza-24453a269/',
	}
];

const DeveloperItem = ({ name, linkedInUrl }: Developer) => {
	const handlePress = () => {
		Linking.openURL(linkedInUrl).catch();
	};

	return (
		<View className="flex-row items-center my-1">
			<Text
				className="text-base text-[#455A64]"
				style={{ fontFamily: 'poppins-medium' }}
			>
				• {name}
			</Text>
			<TouchableOpacity onPress={handlePress} className="ml-2">
				<Ionicons name="logo-linkedin" size={20} color="fff700" />
			</TouchableOpacity>
		</View>
	);
};

export const AboutDevsBox = () => {
	return (
		<View className="bg-white w-11/12 p-3 rounded-lg shadow-md mb-4">
			<View className="flex-row items-center gap-2">
				<Ionicons name="code-slash" size={30} color={'#ffd750'} />
				<Text
					className="text-xl text-[#]"
					style={{ fontFamily: 'poppins-medium' }}
				>
					Desenvolvedores
				</Text>
			</View>

			<View className="mt-2.5 px-2">
				{developers.map((dev, index) => (
					<DeveloperItem
						key={index}
						name={dev.name}
						linkedInUrl={dev.linkedInUrl}
					/>
				))}
			</View>
		</View>
	);
};

export const AboutTextBox = ({
	iconName,
	iconSize,
	boxTitle,
	boxTextContent,
}: AboutTextBoxProps) => {
	return (
		<View className="bg-white w-11/12 p-3 rounded-lg shadow-md mb-4">
			<View className="flex-row items-center gap-2">
				<Ionicons name={iconName} size={iconSize} color={'#ffd750'} />
				<Text
					className="text-xl text-[#1F3B4] "
					style={{ fontFamily: 'poppins-medium' }}
				>
					{boxTitle}
				</Text>
			</View>
			<Text
				className="w-full text-justify self-start text-base px-2 my-2 text-[#455A64] mt-2.5"
				style={{ fontFamily: 'poppins-medium' }}
			>
				{boxTextContent}
			</Text>
		</View>
	);
};
