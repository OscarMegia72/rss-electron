# RSS MODOS DE RENDER + ELECTRON
Pruebas de integración de distintos modo de render y de caching de contenidos.

    npm install
    npm start

### arranque por separado
### solo api
    npm run api
### api con depuracion
    npm run api-d
### solo webpack
    npm run webpack

### solo electron
    npm run electron

## Directorio de carga de contenidos
    src/api/core
    feed-noticias.js
    feed-radios.js

### Direcciones de consulta
http://localhost:3100/rss?tipo=feed-radios&modo=vue
http://localhost:3100/rss?tipo=feed-radios&modo=ssr
http://localhost:3100/rss?tipo=feed-radios&modo=rest

http://localhost:3100/rss?tipo=feed-noticias&modo=vue
http://localhost:3100/rss?tipo=feed-noticias&modo=ssr
http://localhost:3100/rss?tipo=feed-noticias&modo=rest


EL MODO VUE ESTA SIN MAQUETAR SOLO PARA ENTRADA DE DATOS