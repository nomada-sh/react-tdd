import { SignInForm } from '../components/SignInForm';

export function SignIn() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SignInForm
        onSubmit={({ email, password }) => {
          console.log(email, password);
        }}
      />
    </div>
  );
}
