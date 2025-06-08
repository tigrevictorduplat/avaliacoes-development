import * as React from 'react';
import { ScrollView, Button, SafeAreaView, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Screens from '../index';

const TestStack = createStackNavigator();

// Página chamada DevNavigatorScreen
function DevNavigatorScreen({ navigation }) {
  const screens = [
    { name: 'Register' },
    { name: 'Home' },
    { name: 'Explore' },
    { name: 'Upload' },
    { name: 'Profile' },
    { name: 'Quiz', params: { user: { username: 'dev', email: 'dev@teste.com', password: 'Dev@1234', confirmPassword: 'Dev@1234' } } },
    { name: 'QuizzResult', params: { score: 5 } },
    { name: 'PostDetails', params: { id: 42, titulo: 'Post mockado', conteudo: 'Conteúdo teste', imageUrl: 'https://via.placeholder.com/150' } },
    { name: 'Settings' },
    { name: 'Notifications' },
    { name: 'ForgotPassword' },
    { name: 'PrivacyPolicy' },
    { name: 'UserDetail' },
    { name: 'MoreOptions' },
    { name: 'PersonalData' },
    { name: 'ChangeName' },
    { name: 'ChangeUsername' },
    { name: 'ChangeEmail' },
    { name: 'ChangePassword' },
    { name: 'ChangeTelephone' },
    { name: 'Sobre' },
    { name: 'Help' },
    { name: 'LogOut' },
    { name: 'Wellcome' },
    { name: 'LogIn' },

  ];

  // Nomes que devem ter botão vermelho ENQUANTO não funcionarem
  const redButtons = ['PostDetails', 'Explore', 'Profile'];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 32,
        }}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {screens.map(({ name, params }) => (
            <View key={name} style={{ width: '48%', marginBottom: 12 }}>
              <Button
                title={`Ir para ${name}`}
                onPress={() => navigation.navigate(name, params)}
                color={redButtons.includes(name) ? 'red' : undefined}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


// FUNÇÃO/COMPONENTE PARA TESTES !
export default function TestAppNavigator() {
  return (
    <TestStack.Navigator initialRouteName="Dev">
      {/* Telas das abas no topo */}
      <TestStack.Screen name="Home" component={Screens.Home} options={{ headerShown: false }} />
      <TestStack.Screen name="Explore" component={Screens.Explore} options={{ headerShown: false }} />
      <TestStack.Screen name="Upload" component={Screens.Upload} options={{ headerShown: false }} />
      <TestStack.Screen name="Profile" component={Screens.Profile} options={{ headerShown: false }} />
      <TestStack.Screen name="Dev" component={DevNavigatorScreen} />
      <TestStack.Screen name="Wellcome" component={Screens.Wellcome} options={{ headerShown: false }} />
      <TestStack.Screen name="LogIn" component={Screens.LogIn} options={{ headerShown: false }} />
      <TestStack.Screen name="Register" component={Screens.Register} options={{ headerShown: false }} />
      <TestStack.Screen
        name="Quiz"
        component={Screens.Quiz}
        options={{ headerShown: false }}
        initialParams={{
          user: {
            email: 'teste@example.com',
            password: 'Password123!',
            username: 'testuser',
            confirmPassword: 'Password123!'
          }
        }}
      />
      <TestStack.Screen
        name='QuizzResult'
        component={Screens.QuizzResult}
        options={{ headerShown: false }}
        initialParams={{ score: 3 }}
      />
      <TestStack.Screen
        name="PostDetails"
        component={Screens.PostDetails}
        options={{ headerShown: false }}
        initialParams={{
          id: 1,
          imageUrl: 'https://via.placeholder.com/150',
          titulo: 'Título do Post Teste',
          conteudo: 'Este é o conteúdo do post de teste para visualização.'
        }}
      />
      <TestStack.Screen name="ForgotPassword" component={Screens.ForgotPassword} options={{ headerShown: false }} />
      <TestStack.Screen name="PrivacyPolicy" component={Screens.PrivacyPolicy} options={{ headerShown: false }} />
      <TestStack.Screen name="UserDetail" component={Screens.UserDetail} options={{ headerShown: false }} />
      <TestStack.Screen name="MoreOptions" component={Screens.MoreOptions} options={{ headerShown: false }} />
      <TestStack.Screen name="PersonalData" component={Screens.PersonalData} options={{ headerShown: false }} />
      <TestStack.Screen name="ChangeName" component={Screens.ChangeNameScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="ChangeUsername" component={Screens.ChangeUsernameScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="ChangeEmail" component={Screens.ChangeEmailScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="ChangePassword" component={Screens.ChangePasswordScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="ChangeTelephone" component={Screens.ChangeTelephoneScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="Sobre" component={Screens.Sobre} options={{ headerShown: false }} />
      <TestStack.Screen name="Help" component={Screens.Help} options={{ headerShown: false }} />
      <TestStack.Screen name="Notifications" component={Screens.Notifications} options={{ headerShown: false }} />
      <TestStack.Screen name="Settings" component={Screens.Settings} options={{ headerShown: false }} />
      <TestStack.Screen name="LogOut" component={Screens.LogOut} options={{ headerShown: false }} />
    </TestStack.Navigator>
  );
}
