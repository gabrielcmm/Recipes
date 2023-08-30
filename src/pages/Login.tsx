import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { UserLocalStorage } from '../types';

const USER_LOCAL_STORAGE_KEY = 'user';

function Login() {
  const {
    setLocalStorage,
  } = useLocalStorage<UserLocalStorage>(USER_LOCAL_STORAGE_KEY, null);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [btnSubmitDisabled, setBtnSubmitDisabled] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    const email = emailInputRef.current?.value;
    if (email) {
      const user = { email };
      setLocalStorage(user);
      navigate('/meals');
    }
  }, [setLocalStorage, navigate]);

  const handleFormChange = useCallback(() => {
    const isValidEmail = (email: string) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    };

    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    if (email && password) {
      setBtnSubmitDisabled(!(isValidEmail(email) && password.length > 6));
    } else setBtnSubmitDisabled(true);
  }, []);

  return (
    <form onSubmit={ handleSubmit } onChange={ handleFormChange }>
      <input
        type="email"
        data-testid="email-input"
        aria-label="email input"
        ref={ emailInputRef }
      />
      <input
        type="password"
        data-testid="password-input"
        aria-label="password input"
        ref={ passwordInputRef }
      />
      <button
        data-testid="login-submit-btn"
        aria-label="login submit button"
        disabled={ btnSubmitDisabled }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
