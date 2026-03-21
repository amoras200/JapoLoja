// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Quando o site abre, verifica se o cara já tinha feito login antes
    useEffect(() => {
        const storedToken = localStorage.getItem('japoloja-token');
        const storedUser = localStorage.getItem('japoloja-user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Função que será chamada quando o código do email estiver certo
    const login = (newToken, userData) => {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem('japoloja-token', newToken);
        localStorage.setItem('japoloja-user', JSON.stringify(userData));
    };

    // Função para o botão de "Sair"
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('japoloja-token');
        localStorage.removeItem('japoloja-user');
        // Você pode limpar o carrinho aqui também depois se quiser
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook customizado para facilitar o uso nos componentes
export const useAuth = () => useContext(AuthContext);