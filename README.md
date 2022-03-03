# sprint-5.chat
chat amb sockets, mongoose, front i end separats

## Iniciar el server:

Connectar-se al servidor de mongodb

Anar a ./server

npm i

npm run start

## Iniciar el client

Obrir ./client/index.html al navegador.

## Funcionament del xat

Et registres amb nom únic, o inicies sessió. Aleshores veus quines sales hi ha disponibles, i quanta gent hi ha en aquell moment a cada sala. Pots triar una sala existent o crear-ne una de nova. Un cop a la sala, es carreguen els missatges antics. Pots enviar missatges, canviar de sala o tancar sessió. Si tanques la finestra es tanca la sessió.

## Problemes

Si inicies sessió a dues finestres diferents amb el mateix usuari, i a cada finestra entres a una sala de xat (sigui la mateixa o no) l'aplicació no funciona correctament. Una de les dues sales de xat deixarà de funcionar per aquell usuari. Se soluciona tancant aquella finestra.


