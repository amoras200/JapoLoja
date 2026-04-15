import { apiClient } from './apiClient';

export const apiProducts = {
    listarTodos: async () => {
        return await apiClient('/produtos', { method: 'GET' });
    },
    buscarPorId: async (id) => {
        return await apiClient(`/produtos/${id}`, { method: 'GET' });
    },
    buscarPorTermo: async (termo) => {
        return await apiClient(`/produtos/busca?q=${termo}`, { method: 'GET' });
    },
    deletar: async (id) => {
        return await apiClient(`/produtos/${id}`, { method: 'DELETE' });
    },
    criar: async (formData) => {
        // Agora só mandamos o formData direto!
        return await apiClient('/produtos', {
            method: 'POST',
            body: formData
        });
    },
    atualizar: async (id, formData) => {
        return await apiClient(`/produtos/${id}`, {
            method: 'PUT',
            body: formData
        });
    }
};