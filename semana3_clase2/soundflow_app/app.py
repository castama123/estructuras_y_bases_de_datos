import os                                   # para leer las variables de entorno

from flask import Flask, render_template, request, redirect, url_for, session, flash
import mysql.connector                      # la librería que habla con MySQL
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv              # lee el archivo .env

load_dotenv()                               # carga las variables del .env

app = Flask(__name__)                       # crea la aplicación web
app.secret_key = os.getenv("SECRET_KEY")    # clave con la que Flask firma la sesión


def get_connection():
    """Abre una conexión nueva a soundflow_db con los datos del .env."""
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", "3306")),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", ""),
        database=os.getenv("DB_NAME", "soundflow_db"),
    )


@app.route("/")
def inicio():
    if "usuario_id" in session:
        return redirect(url_for("dashboard"))
    return redirect(url_for("login"))


@app.route("/registro", methods=["GET", "POST"])
def registro():
    if request.method == "POST":                 # el usuario envió el formulario
        nombre = request.form.get("nombre", "").strip()
        email = request.form.get("email", "").strip()
        password = request.form.get("password", "")

        if not nombre or not email or not password:
            flash("Todos los campos son obligatorios.")
            return redirect(url_for("registro"))

        conn = get_connection()
        cursor = conn.cursor()
        try:
            # 1. ¿Ya existe ese correo? El valor viaja aparte, con %s
            cursor.execute("SELECT idusuario FROM tbl_usuarios WHERE email = %s", (email,))
            if cursor.fetchone():
                flash("Ya existe una cuenta con ese correo.")
                return redirect(url_for("registro"))

            # 2. Guarda el HASH de la contraseña, nunca la contraseña
            password_hash = generate_password_hash(password)
            cursor.execute(
                "INSERT INTO tbl_usuarios (nombre, email, password_hash) VALUES (%s, %s, %s)",
                (nombre, email, password_hash),
            )
            conn.commit()                        # confirma el INSERT
            flash("Cuenta creada correctamente.")
            return redirect(url_for("login"))
        finally:
            cursor.close()
            conn.close()

    return render_template("registro.html")      # GET: solo muestra el formulario


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email", "").strip()
        password = request.form.get("password", "")

        conn = get_connection()
        cursor = conn.cursor(dictionary=True)    # las filas llegan como diccionarios
        try:
            # Busca al usuario SOLO por correo; la contraseña se verifica en Python
            cursor.execute(
                "SELECT idusuario, nombre, password_hash FROM tbl_usuarios WHERE email = %s",
                (email,),
            )
            usuario = cursor.fetchone()          # una fila, o None si no existe
        finally:
            cursor.close()
            conn.close()

        # Compara la contraseña escrita contra el hash guardado
        if usuario and check_password_hash(usuario["password_hash"], password):
            session["usuario_id"] = usuario["idusuario"]        # recuerda quién entró
            session["usuario_nombre"] = usuario["nombre"]
            return redirect(url_for("dashboard"))

        flash("Correo o contraseña incorrectos.")
        return redirect(url_for("login"))

    return render_template("login.html")


@app.route("/logout")
def logout():
    session.clear()                              # olvida la sesión
    return redirect(url_for("login"))


@app.route("/dashboard", methods=["GET", "POST"])
def dashboard():
    if "usuario_id" not in session:              # protege la página: sin sesión, al login
        return redirect(url_for("login"))

    mensaje_error = None

    if request.method == "POST":                 # el usuario envió una canción nueva
        titulo = request.form.get("titulo", "").strip()
        genero = request.form.get("genero", "").strip()
        duracion_seg = request.form.get("duracion_seg", "").strip()
        id_album = request.form.get("id_album", "").strip()

        conn = get_connection()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "INSERT INTO tbl_canciones (titulo, genero, duracion_seg, reproducciones, id_album) "
                "VALUES (%s, %s, %s, 0, %s)",
                (titulo, genero, duracion_seg, id_album),
            )
            conn.commit()
            flash(f'Canción "{titulo}" agregada.')
            return redirect(url_for("dashboard"))
        except mysql.connector.Error as err:     # por ejemplo, un id_album que no existe (FK)
            mensaje_error = f"No se pudo guardar la canción: {err}"
        finally:
            cursor.close()
            conn.close()

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            "SELECT titulo, genero, duracion_seg, id_album FROM tbl_canciones ORDER BY titulo"
        )
        canciones = cursor.fetchall()            # todas las filas, como lista
    finally:
        cursor.close()
        conn.close()

    return render_template("dashboard.html", nombre=session["usuario_nombre"],
                           canciones=canciones, mensaje_error=mensaje_error)


if __name__ == "__main__":
    app.run(debug=True)                     # arranca el servidor en http://127.0.0.1:5000