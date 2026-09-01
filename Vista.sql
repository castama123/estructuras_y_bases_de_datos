CREATE VIEW vista_catalogo_completo AS
SELECT c.titulo, al.titulo_album, ar.nombre_artista
FROM tbl_canciones c
INNER JOIN tbl_albumes al ON c.id_album = al.id_album
INNER JOIN tbl_artistas ar ON al.id_artista = ar.id_artista;

-- Y a partir de ahora, en vez de repetir el JOIN, solo escribes:
SELECT * FROM vista_catalogo_completo WHERE nombre_artista = 'Maná';