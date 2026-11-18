Antes de arrancar el proyecto instalar las siguientes dependencias:

Paso 1. Instalar Supabase en tu proyecto
Abrí una terminal en la carpeta raíz de proyecto-lectormo y ejecutá:
npm install @supabase/supabase-js


Esta es la librería oficial que nos permite comunicarnos con Supabase desde JavaScript.
Paso 2. Preparar las credenciales
Ahora necesitamos que tu backend conozca la dirección de tu proyecto Supabase y una clave para conectarse.

En Supabase, buscá la sección Project Settings → API Keys (también podés encontrar estos datos en el diálogo Connect).

Necesitamos dos valores:
- Project URL: la dirección de tu proyecto.
- Publishable key: la clave pública, que suele comenzar con sb_publishable_.
Para este primer ejercicio vamos a usar la clave publishable y una política RLS que permita consultar los manhwas. No vamos a utilizar la clave secret porque tiene privilegios elevados y no la necesitamos para una consulta pública. 
Supabase Docs+1

2.1. Crear el archivo .env
En la carpeta raíz de proyecto-lectormo, al mismo nivel que server.js y package.json, creá un archivo llamado .env.

Adentro colocá:

SUPABASE_URL=PEGAR_TU_PROJECT_URL
SUPABASE_PUBLISHABLE_KEY=PEGAR_TU_PUBLISHABLE_KEY



Reemplazá los valores de ejemplo por los datos de tu proyecto. No agregues comillas.

Muy importante: no compartas este archivo ni subas sus valores a GitHub.
2.2. Proteger las credenciales
Si todavía no tenés un .gitignore, crealo en la raíz del proyecto. Agregá:

.env
node_modules/



Así evitamos subir las credenciales y las dependencias a Git.
Paso 3. Instalar dotenv
dotenv nos permite leer las variables del archivo .env.

En la terminal ejecutá:
npm install dotenv