import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
// Use caminhos relativos para os assets
import logo from '../../assets/JapoSports.png';

export function Login({ onLoginSuccess, onBack }) {
    const [step, setStep] = useState('email');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setStep('code');
        }
    };

    const handleCodeSubmit = (e) => {
        e.preventDefault();
        if (code) {
            // Se onLoginSuccess não for passado via props, isso pode dar erro. 
            // Adicione uma verificação simples:
            if (onLoginSuccess) onLoginSuccess(email);
            setStep('email');
            setEmail('');
            setCode('');
        }
    };

    return (
        // MUDANÇA AQUI: De <Login> para <main> ou <div>
        <div className="min-h-screen bg-gradient-to-r from-black via-gray-800 to-black flex items-center justify-center p-4">
            <button
                onClick={onBack}
                className="absolute top-8 left-8 text-white hover:text-[#39d639] transition-colors flex items-center gap-2"
            >
                <ArrowLeft size={20} />
                <span>
                    <a href="/">
                        Voltar
                    </a>
                </span>
            </button>

            <div className="bg-gray-900 rounded-lg border border-gray-950 shadow-xl max-w-md w-full p-8">
                <div className="flex justify-center mb-8">
                    <img src={logo} alt="JAPO Sports" className="h-14" />
                </div>

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
                                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#4a4a4a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39d639] focus:border-transparent text-white placeholder-gray-500"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#39d639] text-white py-3 rounded-lg hover:bg-[#2bc42b] transition-colors uppercase font-medium"
                            >
                                Continuar
                            </button>
                        </form>
                        <p className="text-center text-gray-400 text-sm mb-8 mt-4">

                            Faça login ou <a href="/redefinicao" className="text-[#39d639] hover:underline"> atualize seu email </a>
                        </p>
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
                                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#4a4a4a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39d639] focus:border-transparent text-white text-center text-2xl tracking-[0.5em] placeholder-gray-600"
                                    maxLength={6}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#39d639] text-white py-3 rounded-lg hover:bg-[#2bc42b] transition-colors uppercase font-medium"
                            >
                                Entrar
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep('email')}
                                className="w-full text-[#39d639] text-sm hover:underline mt-4"
                            >
                                Fazer login com outro e-mail
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}