import { apiClient } from './apiClient';

export const apiOrders = {
    listarTodos: async () => {
        return await apiClient('/pedidos', { method: 'GET' });
    },
    atualizarStatus: async (id, status, rastreio = '') => {
        return await apiClient(`/pedidos/${id}/enviar`, {
            method: 'PUT',
            body: JSON.stringify({ status, codigoRastreio: rastreio })
        });
    }
};