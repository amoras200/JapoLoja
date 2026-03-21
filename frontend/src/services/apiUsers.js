import { apiClient } from './apiClient';

export const apiUsers = {
    atualizarPerfil: async (dados) => {
        return await apiClient('/usuarios/perfil', {
            method: 'PUT',
            body: JSON.stringify(dados)
        });
    }
};