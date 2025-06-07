import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { TokenData } from '../types/token';
import SecureStoreWeb from './secureStoreWeb'; // <--- NOVA LINHA: Importe o mock para web
import { Platform } from 'react-native';     // <--- NOVA LINHA: Importe Platform para detecção de SO

// Determine qual implementação de SecureStore usar baseado na plataforma
// Se a plataforma for 'web', usa o mock; caso contrário, usa o SecureStore real.
const currentSecureStore = Platform.OS === 'web' // <--- NOVA LINHA: Detecção da plataforma
    ? SecureStoreWeb                             // <--- NOVA LINHA: Usa o mock para web
    : SecureStore;                               // <--- NOVA LINHA: Usa o SecureStore real para mobile

export const saveToken = async (token: string) => {
    // Agora, 'currentSecureStore' será a implementação correta para a plataforma
    await currentSecureStore.setItemAsync('token-session', token);
};

export const getToken = async () => {
    // Agora, 'currentSecureStore' será a implementação correta para a plataforma
    const token = await currentSecureStore.getItemAsync('token-session');
    return token;
};

export const removeToken = async () => {
    // Agora, 'currentSecureStore' será a implementação correta para a plataforma
    await currentSecureStore.deleteItemAsync('token-session');
};

export async function decryptToken(
    token: string | undefined,
): Promise<TokenData | null> {
    try {
        if (token) {
            const payload = jwtDecode(token);
            return payload as TokenData;
        }

        return null;
    } catch (error) {
        console.error(error);
        alert('Erro na sessão');
        await removeToken();

        return null;
    }
}