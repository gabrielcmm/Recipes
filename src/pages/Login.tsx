import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { Eye, EyeClosed } from '@phosphor-icons/react';
import useLocalStorage from '../hooks/useLocalStorage';
import { UserLocalStorage } from '../types';
import logoSvg from '../assets/logo.svg';

const USER_LOCAL_STORAGE_KEY = 'user';

function Login() {
  const {
    setLocalStorage,
  } = useLocalStorage<UserLocalStorage>(USER_LOCAL_STORAGE_KEY, null);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [btnSubmitDisabled, setBtnSubmitDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
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

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prevState) => !prevState);
  }, []);

  return (
    <form
      onSubmit={ handleSubmit }
      onChange={ handleFormChange }
      className="flex flex-col items-center justify-center h-screen w-screen gap-2"
    >
      <img src={ logoSvg } alt="logo" className="mb-20" />
      <p
        className="mb-3 font-medium
        font-poppins text-black"
      >
        Insira seus dados para entrar
      </p>
      <input
        type="email"
        data-testid="email-input"
        aria-label="email input"
        placeholder="E-mail"
        ref={ emailInputRef }
        className={ inputVariant() }
      />
      <div className="relative">
        <input
          type={ showPassword ? 'text' : 'password' }
          data-testid="password-input"
          aria-label="password input"
          ref={ passwordInputRef }
          placeholder="Senha"
          className={ inputVariant() }
        />
        <button
          className="absolute right-2 top-2 cursor-pointer
          focus:outline-none leading-none"
          onClick={ toggleShowPassword }
        >
          {showPassword ? <Eye size={ 24 } /> : <EyeClosed size={ 24 } />}
        </button>
      </div>
      <button
        data-testid="login-submit-btn"
        aria-label="login submit button"
        disabled={ btnSubmitDisabled }
        className="bg-primary-button py-2 w-64 rounded-md text-white
        disabled:opacity-50 disabled:cursor-not-allowed font-poppins font-medium mt-5"
      >
        Entrar
      </button>
    </form>
  );
}

const inputVariant = tv({
  base: `border border-accent-light-200
  px-3 py-2 rounded-md w-64
  text-bg-dark-100
  focus:outline-accent-light-200
  dark:border-accent-dark-200 dark:focus:outline-accent-dark-200
  `,
});

export default Login;
