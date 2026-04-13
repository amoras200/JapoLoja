import { apiClient } from './apiClient';

export const apiOrders = {
    listarTodos: async () => {
        return await apiClient('/pedidos', { method: 'GET' });
    },
    atualizarStatus: async (id, status) => {
        return await apiClient(`/pedidos/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        });
    }
};