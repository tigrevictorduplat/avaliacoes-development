import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GoBackButton from '../../Components/GoBackButton';

// Tipo de notificação (ajustar conforme o back-end)
type Notification = {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  type: 'dica' | 'lembrete' | 'conquista' | 'atualizacao' | 'social';
};

// MOCK: Substituir por dados vindos da API futuramente
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Nova dica disponível!',
    description: 'Confira como economizar água no dia a dia.',
    date: '2024-06-10',
    read: false,
    type: 'dica',
  },
  {
    id: '2',
    title: 'Lembrete de saúde',
    description: 'Vacinação contra gripe disponível na sua região.',
    date: '2024-06-09',
    read: true,
    type: 'lembrete',
  },
  {
    id: '3',
    title: 'Parabéns!',
    description: 'Você completou o Quiz de Consumo Consciente.',
    date: '2024-06-08',
    read: false,
    type: 'conquista',
  },
];

const iconByType = {
  dica: 'leaf',
  lembrete: 'medkit',
  conquista: 'trophy',
  atualizacao: 'notifications',
  social: 'chatbubble-ellipses',
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // TODO: INTEGRAÇÃO BACK-END
  // 1. Buscar notificações do usuário autenticado ao carregar a tela
  useEffect(() => {
    // Exemplo de chamada à API:
    // fetch('/api/notifications')
    //   .then(res => res.json())
    //   .then(data => setNotifications(data));
    setNotifications(mockNotifications); // Remover quando integrar com a API
  }, []);

  // 2. Marcar notificação como lida (chamar endpoint de update)
  const markAsRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    // Exemplo de chamada à API:
    // await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' });
  };

  // 3. (Opcional) Marcar todas como lidas
  // const markAllAsRead = async () => {
  //   setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  //   // await fetch(`/api/notifications/read-all`, { method: 'PATCH' });
  // };

  // 4. (Opcional) Remover notificação
  // const removeNotification = async (id: string) => {
  //   setNotifications(prev => prev.filter(n => n.id !== id));
  //   // await fetch(`/api/notifications/${id}`, { method: 'DELETE' });
  // };

  return (
    <View className="flex-1 bg-[#F9F9F9]">
      <GoBackButton title="Notificações" />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Text className="text-center text-[#767676] mt-10">
            Você está em dia! Nenhuma notificação.
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`bg-white rounded-xl shadow p-4 mb-3 flex-row items-center ${!item.read ? 'border-l-4 border-[#FFD700]' : ''}`}
            onPress={() => markAsRead(item.id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={iconByType[item.type]}
              size={28}
              color={item.read ? '#B0B3C5' : '#FFD700'}
              style={{ marginRight: 16 }}
            />
            <View className="flex-1">
              <Text className={`font-semibold text-base ${item.read ? 'text-[#767676]' : 'text-[#FFD700]'}`}>
                {item.title}
              </Text>
              <Text className="text-[#767676] text-sm">{item.description}</Text>
              <Text className="text-xs text-[#B0B3C5] mt-1">{item.date}</Text>
            </View>
            {!item.read && (
              <Ionicons name="ellipse" size={12} color="#FFD700" style={{ marginLeft: 8 }} />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default Notifications;

/*
COMENTÁRIOS PARA O BACK-END:

1. Criar endpoint para listar notificações do usuário autenticado.
   - GET /api/notifications
   - Retornar lista com: id, title, description, date, read, type

2. Criar endpoint para marcar notificação como lida.
   - PATCH /api/notifications/:id/read

3. (Opcional) Endpoint para marcar todas como lidas.
   - PATCH /api/notifications/read-all

4. (Opcional) Endpoint para remover notificação.
   - DELETE /api/notifications/:id

5. (Opcional) Permitir envio de notificações push ou em tempo real (WebSocket/Firebase).

6. O front-end espera receber os campos: id, title, description, date, read (boolean), type (string).

7. O campo "type" pode ser: dica, lembrete, conquista, atualizacao, social (ou outros que fizerem sentido).

*/