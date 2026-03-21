import { useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/JapoSports.png';
import { apiAuth } from '../../services/apiAuth'; 
import { useAuth } from '../../context/AuthContext'; 

export function Login() {
    const [step, setStep] = useState('email');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    
    
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');

    const { login } = useAuth(); 
    const navigate = useNavigate(); 

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setErro(''); 

        try {
           
            await apiAuth.solicitarCodigo(email);
            setStep('code');
        } catch (error) {
            setErro(error.message || 'Erro ao enviar o código. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleCodeSubmit = async (e) => {
        e.preventDefault();
        if (!code) return;

        setLoading(true);
        setErro('');

        try {
            
            const dados = await apiAuth.validarCodigo(email, code);
            
            
            login(dados.token, dados.usuario);
            
           
            navigate('/');
        } catch (error) {
            setErro(error.message || 'Código inválido ou expirado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-black via-gray-800 to-black flex items-center justify-center p-4">
            <Link
                to="/"
                className="absolute top-8 left-8 text-white hover:text-[#39d639] transition-colors flex items-center gap-2"
            >
                <ArrowLeft size={20} />
                <span>Voltar</span>
            </Link>

            <div className="bg-gray-900 rounded-lg border border-gray-950 shadow-xl max-w-md w-full p-8">
                <div className="flex justify-center mb-8">
                    <img src={logo} alt="JAPO Sports" className="h-14" />
                </div>

                
                {erro && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 text-sm p-3 rounded-lg mb-4 text-center">
                        {erro}
                    </div>
                )}

                {step === 'email' ? (
                    <div>
                        <h2 className="text-2xl text-center mb-2 text-white font-bold">Fazer login</h2>

                        <form onSubmit={handleEmailSubmit} className="space-y-5">
                            <div>
                                <input
                                    type="email"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#4a4a4a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39d639] focus:border-transparent text-white placeholder-gray-500 disabled:opacity-50"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center bg-[#39d639] text-black py-3 rounded-lg hover:bg-[#2bc42b] transition-colors uppercase font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Continuar'}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl text-center mb-2 text-white font-bold">Inserir código</h2>
                        <p className="text-center text-gray-400 text-sm mb-8">
                            Insira o código que foi enviado para<br />
                            <span className="text-white font-semibold">{email}</span>
                        </p>

                        <form onSubmit={handleCodeSubmit} className="space-y-5">
                            <div>
                                <input
                                    type="text"
                                    placeholder="000000"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    disabled={loading}
                                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#4a4a4a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39d639] focus:border-transparent text-white text-center text-2xl tracking-[0.5em] placeholder-gray-600 disabled:opacity-50"
                                    maxLength={6}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center bg-[#39d639] text-black py-3 rounded-lg hover:bg-[#2bc42b] transition-colors uppercase font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Entrar'}
                            </button>

                            <button
                                type="button"
                                onClick={() => { setStep('email'); setErro(''); }}
                                disabled={loading}
                                className="w-full text-[#39d639] text-sm hover:underline mt-4 disabled:opacity-50"
                            >
                                Voltar e corrigir e-mail
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}