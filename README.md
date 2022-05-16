# React pruebas unitarias

## Requerimientos

Antes de hacer pruebas con React, debes de tener instaladas las siguientes dependencias:

- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)
- [@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom)
- [@testing-library/user-event](https://testing-library.com/docs/user-event/intro)
- [msw](https://mswjs.io/docs/getting-started/install)

## Instalacion con `create-react-app`

Si usaste `create-react-app` no requieres ninguna configuración adicional.

Escribe el siguiente comando en la consola para instalar las dependencias faltantes:

```bash
yarn add msw
```

Una vez que las dependencias se hayan instalado, podemos empezar a hacer pruebas.

Escribe el siguiente comando en la consola:

```bash
yarn test
```

Esto ejecutará las pruebas en modo `watch`, es decir, se ejecutarán cada vez que se haga un cambio en el código.

## Pruebas a componentes

Ejemplos:

- [SignInForm](./src/components/SignInForm.test.tsx)

Pasos para hacer tu primera prueba a un componente:

1. Definir criterios de aceptación, es decir, lo que debe de pasar para que la prueba se cumpla.

```txt
When an invalid email is entered and the form is submitted:
  It should render an error message.
  It should not call onSubmit.
```

2. Crear archivo de prueba, este archivo normalmente se llama `ComponentName.test.tsx` y se guarda al mismo nivel que el componente (Esto depende de la estructura de tu proyecto).

3. Escribir el código de prueba, es decir, el código que se ejecutará para verificar que el componente cumpla con los criterios de aceptación.

```tsx
import { SignInForm } from './SignInForm';
import { fireEvent, render, screen } from '@testing-library/react';

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
```

## Pruebas a componentes con llamadas a API

En estas pruebas usamos [MSW (Mock Service Worker)](https://mswjs.io/docs/getting-started/install) para simular las llamadas a una API.

Ejemplos:

- [GitHubRepos](./src/routes/GitHubRepos.test.tsx)

## Pruebas a hooks

Ejemplos:

- [useCounter](./src/hooks/useCounter.test.ts)
