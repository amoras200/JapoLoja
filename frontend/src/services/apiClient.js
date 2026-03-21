
const BASE_URL = 'http://localhost:3000/api';

export async function apiClient(endpoint, options = {}) {
    
    const token = localStorage.getItem('japoloja-token');
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    
    if (!response.ok) {
        throw new Error(data.erro || data.mensagem || 'Erro na requisição');
    }

    return data;
}