/* eslint-disable testing-library/no-render-in-setup */
import { SignInForm } from './SignInForm';
import { fireEvent, render, screen } from '@testing-library/react';

describe('When component is mounted', () => {
  beforeEach(() => {
    render(<SignInForm onSubmit={jest.fn()} />);
  });

  it('should render a form with a email input', () => {
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  it('should render a form with a password input', () => {
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should render a form with a submit button', () => {
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });
});

describe('When error prop is passed', () => {
  it('should render an error message when is an string', () => {
    render(<SignInForm error="Error message" onSubmit={jest.fn()} />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should render an error message when instance of Error', () => {
    render(
      <SignInForm error={new Error('Error message')} onSubmit={jest.fn()} />
    );
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should not render an error message when is null', () => {
    render(<SignInForm error={null} onSubmit={jest.fn()} />);
    expect(screen.queryByText('Error message')).not.toBeInTheDocument();
  });
});

describe('When an invalid email is entered and form is submitted', () => {
  it('should render an error message', async () => {
    render(<SignInForm onSubmit={jest.fn()} />);

    changeEmail('invalid');
    clickSubmit();

    expect(screen.getByText('Email is not valid.')).toBeInTheDocument();
  });

  it('should not call onSubmit', async () => {
    const onSubmit = jest.fn();
    render(<SignInForm onSubmit={onSubmit} />);

    changeEmail('invalid');
    clickSubmit();

    expect(onSubmit).not.toHaveBeenCalled();
  });
});

describe('When and invalid password is entered and form is submitted', () => {
  it('should render an error message', async () => {
    render(<SignInForm onSubmit={jest.fn()} />);

    changePassword('123');
    clickSubmit();

    expect(
      screen.getByText('Password must be at least 6 characters.')
    ).toBeInTheDocument();
  });

  it('should not call onSubmit', async () => {
    const onSubmit = jest.fn();
    render(<SignInForm onSubmit={onSubmit} />);

    changePassword('123');
    clickSubmit();

    expect(onSubmit).not.toHaveBeenCalled();
  });
});

describe('When a valid email and password are entered and form is submitted', () => {
  it('should call onSubmit with the correct email and password', async () => {
    const onSubmit = jest.fn();
    render(<SignInForm onSubmit={onSubmit} />);

    changeEmail('valid@valid.com');
    changePassword('123456');
    clickSubmit();

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'valid@valid.com',
      password: '123456',
    });
  });
});

/**
 * Helper functions
 */

const clickSubmit = () => {
  const signInButton = screen.getByRole('button', { name: 'Sign In' });
  fireEvent.click(signInButton);
};

const changeEmail = (email: string) => {
  const emailInput = screen.getByPlaceholderText('Email');
  fireEvent.change(emailInput, { target: { value: email } });
};

const changePassword = (password: string) => {
  const passwordInput = screen.getByPlaceholderText('Password');
  fireEvent.change(passwordInput, { target: { value: password } });
};
