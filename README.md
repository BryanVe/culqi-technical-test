# culqi-technical-test

Prueba técnica de Culqi utilizando AWS Lambdas con Serverless y TypeScript.

## Instalación

En tu terminal:

```sh
# Uno de los siguientes comandos
npm run install
pnpm install
yarn
```

Esto instalará todas las dependencias necesarias para poder correr la aplicación localmente.

También debes crear un archivo `.env` en la raíz del proyecto que contenga las variables de entorno necesarias para su ejecución.
Las variables necesarias son las siguientes:

```sh
# .env file
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
MONGODB_URI=
```

## Ejecución

En tu terminal:

```sh
# Uno de los siguientes comandos
npm run dev
pnpm dev
yarn dev
```

Esto iniciará la aplicación en modo desarrollo y escuchará a cambios de forma local.

## Despliegue

En tu terminal:

```sh
# Uno de los siguientes comandos
npm run deploy
pnpm run deploy
yarn deploy
```

Esto iniciará el despliegue de las funciones Lambda en AWS utilizando el script de serverless.
Recuerda que previamente debes configurar las variables de entorno con las que se autenticará
serverless para utilizar los servicios de AWS.
