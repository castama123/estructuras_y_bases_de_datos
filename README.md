# Estructuras y Bases de Datos, Clases semanales

Sitio estático para publicar, semana a semana, las presentaciones del núcleo
**Estructuras y Bases de Datos** (Ingeniería de Sistemas).

## Actualizar una semana

1. Abre `js/weeks-data.js`.
2. Busca el objeto de la semana correspondiente (`n: 1` a `n: 8`).
3. Para insertar una presentación de Google Slides o Canva:
   - En Google Slides/Canva usa "Compartir" → "Insertar" y copia la URL del `<iframe>`.
   - Pega esa URL en el campo `embed` de la semana.
4. Para permitir descarga del archivo:
   - Sube el `.pdf` o `.pptx` a la carpeta `presentaciones/` (ej. `semana-03.pdf`).
   - Ajusta el campo `descarga` con esa ruta si el nombre cambia.
5. Guarda, haz commit y push. GitHub Pages se actualiza solo en 1-2 minutos.

```bash
git add .
git commit -m "Semana 3: presentación agregada"
git push
```

## Publicar con GitHub Pages

En el repositorio de GitHub: **Settings → Pages → Source → Deploy from a branch**,
elige la rama `main` y la carpeta `/site` (o `/root` si subes este contenido
directamente a la raíz del repo). El sitio quedará en:
`https://<tu-usuario>.github.io/<nombre-repo>/`

## Estructura

```
site/
├── index.html          # Landing con las 8 semanas
├── semana.html          # Plantilla dinámica de cada semana (usa ?n=1..8)
├── assets/style.css
├── js/weeks-data.js     # Único archivo a editar cada semana
├── presentaciones/      # PDFs/PPTX descargables
└── README.md
```
