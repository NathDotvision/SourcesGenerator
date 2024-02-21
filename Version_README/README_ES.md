# Generador de Fuentes

Si no hablas francés, puedes encontrar las versiones en otros idiomas de este archivo [aquí](./Version_README/).

## Explicación

Con el fin de recopilar fuentes y ser útil tanto para desarrolladores como para gestores.

Para ello, hemos desarrollado varios programas que permiten recopilar las fuentes de un proyecto.

### Archivos Python

Tienes un archivo (main.py)[./main.py] que permite iniciar el programa.
Sin embargo, ten en cuenta lo siguiente:

- No incluir más de 100 líneas de código en los archivos de referencia -> riesgo de saturar la memoria
- Este archivo tarda bastante en ejecutarse

Generará un archivo PDF llamado (data.pdf)[./data.pdf] que contendrá todas las fuentes de tu proyecto con los logotipos, enlaces y títulos de las diferentes páginas.

#### Inicio

No olvides ejecutar el comando para instalar las dependencias.

```shell
pip install -r requirements.txt
```

Después, ejecuta el archivo main.py.

### Interfaz web

Para iniciar la interfaz web, simplemente ejecuta el archivo (app.py)[./app.py].

Se encargará de instalar las dependencias necesarias para el correcto funcionamiento del programa mediante `npm install`.

## Próximos pasos

- Modificar la base de datos del sitio web
- Iniciar sesión con diferentes cuentas
- Implementación de proyectos en la base de datos
