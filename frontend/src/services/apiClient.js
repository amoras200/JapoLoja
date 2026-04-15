const BASE_URL = 'http://localhost:3000/api';

export async function apiClient(endpoint, options = {}) {
    const token = localStorage.getItem('japoloja-token');
    
    // Pega os cabeçalhos que vieram, ou cria um objeto vazio
    const headers = { ...options.headers };

    // A MÁGICA: Se o que estamos enviando NÃO for um FormData (arquivos), usamos JSON.
    // Se for FormData, deixamos o navegador criar o cabeçalho correto automaticamente!
    if (!(options.body instanceof FormData)) {
        if (!headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }
    } else {
        // Garante que o Content-Type não seja forçado
        delete headers['Content-Type'];
    }

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