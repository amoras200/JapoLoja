
import { apiClient } from './apiClient';

export const apiAuth = {
    
    solicitarCodigo: async (email) => {
        return await apiClient('/usuarios/solicitar-codigo', {
            method: 'POST',
            body: JSON.stringify({ email })
        });
    },

    
    validarCodigo: async (email, codigo) => {
        return await apiClient('/usuarios/validar-codigo', {
            method: 'POST',
            body: JSON.stringify({ email, codigo })
        });
    }
};