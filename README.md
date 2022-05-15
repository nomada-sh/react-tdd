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

## Ejemplos

### Pruebas a componentes

[SignInForm](./src/components/SignInForm.test.tsx)

### Pruebas a componentes con llamadas a API

En estas pruebas usamos [MSW (Mock Service Worker)](https://mswjs.io/docs/getting-started/install) para simular las llamadas a una API.

[GitHubRepos](./src/routes/GitHubRepos.test.tsx)

### Pruebas a hooks

[useCounter](./src/hooks/useCounter.test.ts)
