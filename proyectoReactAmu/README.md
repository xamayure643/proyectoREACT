# Mi lista de juegos - Gestor de Videojuegos

## Descripción
Es una aplicación web diseñada para gestionar una colección personal de videojuegos. El propósito es resolver la necesidad de algunas personas de llevar un seguimiento detallado de los títulos que posee, permitiendo registrar la plataforma, las horas jugadas, la carátula y hacer un seguimiento del estado de cada juego (Pendiente, Jugando o Completado).

El proyecto implementa una arquitectura basada en componentes y un **CRUD completo** (Create, Read, Update, Delete) con persistencia de datos en la nube a través de Firebase Firestore.

## Tecnologías
Para el diseño de la interfaz de usuario, se ha optado por utilizar Estilos en línea integrados directamente en los componentes de React. Esto lo hice por que:

* **Encapsulación:** Mantiene la estructura (HTML), la lógica (JS/TS) y el diseño (CSS) unificados en el mismo archivo, facilitando la reutilización del componente.
* **Dinamismo:** Permite cambiar estilos en tiempo real basándose en el estado de React (por ejemplo el color de las etiquetas según si el juego está "Completado" o "Pendiente").
* **Independencia:** Evita la colisión de clases globales sin necesidad de instalar librerías externas.

## Despliegue en Vercel

**(https://proyecto-react-qjgl.vercel.app/)**