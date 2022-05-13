import { useState } from 'react';

export interface SignInFormProps {
  onSubmit: (params: { email: string; password: string }) => void;
}

export function SignInForm({ onSubmit }: SignInFormProps) {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <form
      style={{
        maxWidth: 300,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onSubmit={(e) => {
        e.preventDefault();

        const email = values.email;
        const password = values.password;

        let valid = true;

        if (/^[^@]+@[^@]+$/.test(email) === false) {
          setEmailError('Email is not valid.');
          valid = false;
        } else {
          setEmailError(null);
        }

        if (password.length < 6) {
          setPasswordError('Password must be at least 6 characters.');
          valid = false;
        } else {
          setPasswordError(null);
        }

        if (valid) onSubmit({ email, password });
      }}
    >
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <input
          style={{
            width: '100%',
          }}
          onChange={onChange}
          type="text"
          name="email"
          placeholder="Email"
        />

        {emailError !== null ? (
          <p style={{ color: 'red' }}>{emailError}</p>
        ) : null}
      </div>

      <div
        style={{
          marginBottom: 10,
        }}
      >
        <input
          style={{
            width: '100%',
          }}
          onChange={onChange}
          type="password"
          name="password"
          placeholder="Password"
        />

        {passwordError !== null ? (
          <p style={{ color: 'red' }}>{passwordError}</p>
        ) : null}
      </div>

      <button type="submit">Sign In</button>
    </form>
  );
}
