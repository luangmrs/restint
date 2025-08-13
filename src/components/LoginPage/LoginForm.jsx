import React, { useState } from 'react';
import styles from './LoginForm.module.css';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Preencha todos os campos.');
            return;
        }
        setError('');
        if (onLogin) {
            onLogin({ email, password });
        }
        // Aqui você pode adicionar lógica de autenticação
    };

    return (
        <form onSubmit={handleSubmit} className={styles.font}>
            <h2>LOGIN</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Senha:</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Entrar</button>
        </form>
    );
};

export default LoginForm;