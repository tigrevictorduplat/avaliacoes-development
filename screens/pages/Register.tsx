import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import 'tailwindcss/tailwind.css';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { axiosLogin } from '../../services/axios';
import { RegisterFormData } from '../../utils/types/form/formData';
import { NavigationProp } from '../../utils/types/navigation';
import { Alert } from 'react-native';


export default function Register() {
	/* Este código retorna exceção na pagina Register */
	const navigation = useNavigation<NavigationProp>();
	const { control, handleSubmit, getValues, formState } =
		useForm<RegisterFormData>();
	const { isSubmitting } = formState;


	/*/ -- ORIGINAL --
	const handleRegisterFormSubmit = async (data: RegisterFormData) => {
		navigation.navigate('Quiz', { user: data });
	};
	/*/

	const handleRegisterFormSubmit = async (data: RegisterFormData) => {
		try {
			console.log('Dados enviados (mock):', data);

			// Simula uma chamada assíncrona à API com delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Simula sucesso do cadastro e navegação
			navigation.navigate('Quiz', { user: data });
		} catch (error) {
			console.error('Erro no registro mockado:', error);
			Alert.alert('Erro', 'Falha ao simular registro. Tente novamente.');
		}
	};



	return (
		<KeyboardAvoidingView
			className="flex-1 bg-[#F9F9F9]"
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView
				className="bg-[#F9F9F9]"
				contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
			>
				<View
					className="flex-1 bg-[#F9F9F9] w-full"
					style={{
						minWidth: 425, // Garante que o conteúdo não fique muito estreito
						maxWidth: 700, // Limita a largura máxima do conteúdo
						width: '100%',
						alignSelf: 'center',
					}}
				>
					<View className="relative flex justify-center items-center w-full mb-6" style={{ aspectRatio: 1.5 }}>
						<Image
							source={require('../../assets/images/login/ImagemDeFundo.png')}
							style={{
								width: '100%',
								height: '100%',
								position: 'absolute',
							}}
							resizeMode="cover"
						/>
						<View className="justify-center items-center absolute w-full h-full">
							<Image
								source={require('../../assets/images/login/LogoDoApp.png')}
							/>
						</View>
					</View>

					<View className=" justify-center items-center bg-[#F9F9F9]">
						<Text
							style={{ fontFamily: 'poppins-semi-bold' }}
							className="text-[#DAA520] mb-3 font-bold text-3xl ml-2"
						>
							Seja Bem-vindo
						</Text>
						<Text className="text-base text-[#767676] mb-2 ">
							Crie sua conta
						</Text>

						<View className="w-4/5 mb-4">
							<View className="flex-row items-center mb-2 mr-5 ">
								<Ionicons name="person-sharp" size={20} />
								<Text className="font-bold ml-1 text-[#767676]">Usuário</Text>
							</View>

							<Controller
								control={control}
								name="username"
								rules={{
									required: 'Nome de Usuario é obrigatorio',
									minLength: {
										value: 3,
										message: 'Nome de Usuario deve ter no minimo 3 caracteres',
									},
									maxLength: {
										value: 51,
										message: 'Limite excedido de caracteres',
									},
									pattern: {
										value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
										message:
											'O nome só pode conter letras, acentos e espaços. Caracteres especiais são inválidos.',
									},
								}}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<>
										<TextInput
											className="bg-[#F8F8FF] border border-[#FFF700] shadow px-4 py-4 rounded-2xl "
											placeholder="Nome de Usuário"
											value={value}
											onChangeText={onChange}
											keyboardType="email-address"
											autoCapitalize="none"
										/>
										{error && (
											<Text
												style={{ fontFamily: 'poppins-semi-bold' }}
												className="text-[#ff375b] text-xs ml-2"
											>
												{error.message}
											</Text>
										)}
									</>
								)}
							/>
						</View>

						<View className="w-4/5 mb-4">
							<View className="flex-row items-center mb-2 mr-5 ">
								<Ionicons name="mail" size={20} />
								<Text className=" font-bold ml-1 text-[#767676]">Email</Text>
							</View>

							<Controller
								control={control}
								name="email"
								rules={{
									required: 'Email é obrigatorio',
									minLength: {
										value: 3,
										message: 'Email deve ter no minimo 3 caracteres',
									},
									maxLength: {
										value: 51,
										message: 'Limite excedido de caracteres',
									},
									pattern: {
										value:
											/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
										message: 'Email inválido',
									},
								}}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<>
										<TextInput
											className="bg-[#F8F8FF] border border-[#FFF700] shadow px-4 py-4 rounded-2xl "
											placeholder="Digite seu Email"
											value={value}
											onChangeText={onChange}
											keyboardType="email-address"
											autoCapitalize="none"
										/>
										{error && (
											<Text
												style={{ fontFamily: 'poppins-semi-bold' }}
												className="text-[#ff375b] text-xs ml-2"
											>
												{error.message}
											</Text>
										)}
									</>
								)}
							/>
						</View>
						<View className="w-4/5 mb-4">
							<View className="flex-row items-center mb-2 mr-5 ">
								<Ionicons name="lock-closed" size={20} />
								<Text className="font-bold ml-1 text-[#767676] ">Senha</Text>
							</View>

							<Controller
								control={control}
								name="password"
								rules={{
									required: 'A senha é obrigatoria',
									minLength: {
										value: 3,
										message: 'A senha deve ter pelo menos 3 caracteres',
									},
									maxLength: {
										value: 51,
										message: 'Limite excedido de caracteres',
									},
									pattern: {
										value:
											/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
										message:
											'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
									},
								}}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<>
										<TextInput
											className="bg-[#F8F8FF] border border-[#FFF700]  shadow rounded-2xl px-4 py-4 "
											placeholder="Digite sua senha"
											value={value}
											onChangeText={onChange}
											secureTextEntry={true}
											autoCapitalize="none"
										/>
										{error && (
											<Text
												style={{ fontFamily: 'poppins-semi-bold' }}
												className="text-[#ff375b] text-xs ml-2"
											>
												{error.message}
											</Text>
										)}
									</>
								)}
							/>
						</View>
						<View className="w-4/5 mb-4">
							<View className="flex-row items-center mb-2 mr-5 ">
								<Ionicons name="lock-closed" size={20} />
								<Text className="font-bold ml-1 text-[#767676] ">
									Confirmar senha
								</Text>
							</View>

							<Controller
								control={control}
								name="confirmPassword"
								rules={{
									required: 'Por favor, repita a senha',
									validate: (value) =>
										value === getValues('password') ||
										'As senhas não correspondem',
									minLength: {
										value: 3,
										message: 'A senha deve ter pelo menos 3 caracteres',
									},
									maxLength: {
										value: 51,
										message: 'Limite excedido de caracteres',
									},
								}}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<>
										<TextInput
											className="bg-[#F8F8FF] border border-[#FFF700]  shadow rounded-2xl px-4 py-4 "
											placeholder="Digite sua senha novamente"
											value={value}
											onChangeText={onChange}
											secureTextEntry={true}
											autoCapitalize="none"
										/>
										{error && (
											<Text
												style={{ fontFamily: 'poppins-semi-bold' }}
												className="text-[#ff375b] text-xs ml-2"
											>
												{error.message}
											</Text>
										)}
									</>
								)}
							/>
						</View>
						<TouchableOpacity
							className="w-4/5 bg-[#FFF700] shadow-lg py-4 mb-4 rounded-2xl"

							/*/onPress={handleSubmit(handleRegisterFormSubmit)}/*/
							onPress={() =>
								navigation.navigate('Quiz', {
									user: {
										username: 'MockUser',
										email: 'mock@example.com',
										password: 'senhaMock@123',
										confirmPassword: 'SenhaMock@123',
									},
								})
							}

							disabled={isSubmitting}
						>
							<Text className="text-center text-white text-lg">Registrar</Text>
						</TouchableOpacity>
					</View>

					<View className="flex-row justify-center items-center mb-4">
						<View className="flex-row justify-center items-center">
							<Text className="text-[#767676] ">Já tem uma Conta?</Text>
						</View>
						<TouchableOpacity
							className="shadow text-[#767676]"
							onPress={() => navigation.navigate('LogIn')}
						>
							<Text className="font-semibold text-sm text-[#FFA500] ml-1">
								Entrar
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}