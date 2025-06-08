import { View, Text, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../utils/types/navigation';
import GoBackButton from '../../Components/GoBackButton';
import PersonalDataButton from '../../Components/PersonalData/PersonalDataButton';

export default function Settings() {
  const navigation = useNavigation<NavigationProp>();

  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir Conta',
      'Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            // Chame aqui sua API de exclusão de conta
            // await api.delete('/usuario');
            // Faça logout ou navegue para tela inicial
            navigation.navigate('LogIn');
          },
        },
      ]
    );
  };

  return (
    <ScrollView>
      <GoBackButton title="Configurações" />

      <View className="mt-10 items-center">
        <PersonalDataButton text="Dados Pessoais" onPress={() => navigation.navigate('PersonalData')} />
        <PersonalDataButton text="Notificações" onPress={() => navigation.navigate('Notifications')} />
        <PersonalDataButton text="Política de Privacidade" onPress={() => navigation.navigate('PrivacyPolicy')} />
        <PersonalDataButton text="Sobre" onPress={() => navigation.navigate('Sobre')} />
        <PersonalDataButton text="Ajuda" onPress={() => navigation.navigate('Help')} />
        <PersonalDataButton text="Sair" onPress={() => navigation.navigate('MoreOptions')} />
        <PersonalDataButton
          text="Excluir Conta"
          onPress={handleDeleteAccount}
        />
      </View>
    </ScrollView>
  );
}