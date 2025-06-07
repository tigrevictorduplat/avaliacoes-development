import React, { useState } from 'react';
import {
	Modal,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import 'tailwindcss/tailwind.css';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { axiosLogin } from '../../services/axios';
import { RootStackParamList } from '../../utils/types/navigation';

// Define o tipo de navegação para o componente
type NavigationProp = StackNavigationProp<RootStackParamList>;

// Define os tipos das props do componente Option
type OptionProps = {
	option: string;
	index: number;
	selectedOption: number | null;
	setSelectedOption: (index: number) => void;
};

// Componente para renderizar uma opção de resposta
const Option: React.FC<OptionProps> = ({
	option,
	index,
	selectedOption,
	setSelectedOption,
}) => {
	const optionLabel = String.fromCharCode(65 + index); // Gera 'A', 'B', 'C', etc.
	return (
		<TouchableOpacity
			accessible={true}
			accessibilityLabel={`Opção ${optionLabel}`}
			className={`flex-row h-16 items-center rounded-lg my-2 w-96 ${selectedOption === index ? 'bg-yellow-400' : 'bg-yellow-500'}`}
			onPress={() => setSelectedOption(index)}
		>
			<View
				className={`rounded-xl h-10 w-10 justify-center items-center ml-5 ${selectedOption === index ? 'bg-black-500' : 'bg-gray-400'}`}
			>
				<Text
					style={{ fontFamily: 'poppins-semi-bold' }}
					className="text-red"
				>
					{optionLabel}
				</Text>
			</View>
			<View className="flex-1 mr-14 justify-center items-center">
				<Text
					style={{ fontFamily: 'poppins-semi-bold' }}
					className={`text-center text-base ${selectedOption === index ? 'text-gray-500' : 'text-white'}`}
				>
					{option}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

// Componente de alerta personalizado
const CustomAlert = ({
	visible,
	title,
	message,
	onClose,
}: {
	visible: boolean;
	title: string;
	message: string;
	onClose: () => void;
}) => (
	<Modal transparent={true} animationType="fade" visible={visible}>
		<View className="flex-1 justify-center items-center bg-black bg-opacity-50">
			<View className="bg-white rounded-lg p-6 w-80">
				<Text
					style={{ fontFamily: 'poppins-semi-bold' }}
					className="text-gray-500 text-lg mb-4 text-center"
				>
					{title}
				</Text>
				<Text
					style={{ fontFamily: 'poppins-semi-bold' }}
					className="text-black text-base mb-6 text-center"
				>
					{message}
				</Text>
				<TouchableOpacity
					className="bg-yellow-500 rounded-lg p-3"
					onPress={onClose}
				>
					<Text
						style={{ fontFamily: 'poppins-semi-bold' }}
						className="text-yellow text-center"
					>
						Fechar
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	</Modal>
);

type QuizScreenRouteProp = RouteProp<RootStackParamList, 'Quiz'>;

type QuizProps = {
	route: QuizScreenRouteProp;
};

// Componente principal do Quiz
const Quiz = ({ route }: QuizProps) => {
	const { user } = route.params;

	const questions = [
		{
			id: '1',
			question:
				'Qual o principal ingrediente ativo de um protetor solar?',
			option: ['Óleo de coco', 'Filtro UV', 'Ácido salicílico', 'Glicerina'],
			correctOption: 2,
		},
		{
			id: '2',
			question:
				'Qual é o objetivo do ácido hialurônico em cosméticos?',
			option: ["Hidratar a pele", "Esfoliar a pele", "Proteger contra o sol", "Clarear manchas"],
			correctOption: 1,
		},
		{
			id: '3',
			question:
				'O que a vitamina C promove na pele?',
			option: [
				"Elasticidade", "Redução de rugas", "Clareamento e antioxidante", "Secura"
			],
			correctOption: 3,
		},
		{
			id: '4',
			question: 'Qual cosmético é utilizado para limpeza profunda da pele?',
			option: ["Máscara de argila", "Base líquida", "Protetor solar", "Blush"],
			correctOption: 1,
		},

		{
			id: '5',
			question:
				'Qual dos ingredientes é mais comum em cremes antienvelhecimento?',
			option: [
				"Retinol", "Parafina", "Silício", "Manteiga de karité"
			],
			correctOption: 1,
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedOption, setSelectedOption] = useState<number | null>(null);
	let [score, setScore] = useState(0);
	const [alertVisible, setAlertVisible] = useState(false);
	const [resultAlertVisible, setResultAlertVisible] = useState(false);

	const navigation = useNavigation<NavigationProp>();

	const handleNextQuestion = () => {
		if (selectedOption === null) {
			setAlertVisible(true);
			return;
		}

		if (selectedOption === questions[currentQuestion].correctOption) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
			setSelectedOption(null);
		} else {
			setResultAlertVisible(true); // Mostra o alerta de resultado
		}
	};

	return (
		<SafeAreaView className="h-full">
			{/* Alerta de seleção de opção */}
			<CustomAlert
				visible={alertVisible}
				title="Atenção"
				message="Por favor, selecione uma opção antes de continuar."
				onClose={() => setAlertVisible(false)}
			/>

			{/* Alerta de resultado */}
			<CustomAlert
				visible={resultAlertVisible}
				title="Resultado"
				message={`Você acertou ${score} de ${questions.length} perguntas.`}
				onClose={async () => {
					setResultAlertVisible(false);
					try {
						if (score === 0) score += 1;

						const { data: message } = await axiosLogin.post('/api/usuario', {
							email: user.email,
							senha: user.password,
							nome: user.username,
							nivelConsciencia: score,
							isMonitor: true,
							tokens: `${Math.random()}`,
							telefone: '123232323',
						});

						if (message) navigation.navigate('QuizzResult', { score: score });
					} catch (error) {
						navigation.navigate('Register');
						alert('Erro ao criar usuário!');
						console.error(error);
					}
				}}
			/>

			<View className="items-center p-5">
				<Text
					style={{ fontFamily: 'poppins-semi-bold' }}
					className="text-yellow-500 text-2xl"
				>
					Quiz
				</Text>
				<Text
					style={{ fontFamily: 'poppins-semi-bold' }}
					className="text-black text-lg mt-10 ml-3"
				>
					{questions[currentQuestion].question}
				</Text>

				{/* Renderiza opções */}
				<View className="mt-10">
					{questions[currentQuestion].option.map((option, index) => (
						<Option
							key={index}
							option={option}
							index={index}
							selectedOption={selectedOption}
							setSelectedOption={setSelectedOption}
						/>
					))}
				</View>

				<TouchableOpacity
					className={`mt-10 ${selectedOption !== null ? 'bg-yellow-500' : 'bg-yellow-400'} rounded-2xl w-96 h-16 p-4`}
					onPress={handleNextQuestion}
				>
					<Text
						style={{ fontFamily: 'poppins-semi-bold' }}
						className="text-red text-center text-base"
					>
						Próxima Pergunta
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Quiz;