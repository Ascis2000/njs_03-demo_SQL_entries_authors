
const author = require('../models/authors.model'); // Importar el modelo de la BBDD

// GET http://localhost:3000/api/authors --> ALL
const getAllAuthors = async (req, res) => {
    let authors;

    try {
        authors = await author.getAllAuthors();
        res.status(200).json(authors); 
    } catch (error) {
        console.error('Error al obtener todos los autores:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// GET BY EMAIL
// http://localhost:3000/api/authors/email?email=jabier@thebridgeschool.es
// http://localhost:3000/api/authors/:email
const getAuthorByEmail = async (req, res) => {
    //const { email } = req.query;
    const email= req.query.email;

    try {
        const authorData = await author.getAuthorByEmail(email);
        if (authorData) {
            res.status(200).json(authorData);
        } else {
            res.status(404).json({ error: 'Autor no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener autor por email:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Crear autor
const createAuthor= async (req, res) => {
    const newAuthor = req.body; // {name,surname,email,image}
    const response = await author.createAuthor(newAuthor);

    res.status(201).json({
        "items_created": response,
        message: `Usuario creado: ${req.body.email}`,
        data: newAuthor
    });
}
// Actualizar Autor por email
const updateAuthorByEmail = async (req, res) => {
    const updatedAuthor = req.body; // {name, surname, image, email, currentEmail}
    const currentEmail = req.body.currentEmail; // current email como criterio de búsqueda de autor
    
    try {
        const response = await author.updateAuthorByEmail(updatedAuthor, currentEmail);
        if (response) {
            res.status(200).json({
                message: `Usuario actualizado: ${currentEmail}`,
                data: updatedAuthor
            });
        } else {
            res.status(404).json({ error: 'Autor no encontrado' });
        }
    } catch (error) {
        console.error('Error updating Author:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteAuthorByEmail = async (req, res) => {
    const authorToDelete = req.body.email; // {email} le pasaremos el email por el body del postman
    try {
        const response = await author.deleteAuthorByEmail(authorToDelete);
        if (response) {
            res.status(200).json({
                message: `Se ha borrado: ${authorToDelete}`,
                data: response
            });
        } else {
            res.status(404).json({ error: 'Autor con ese email no encontrado' });
        }
    } catch (error) {
        console.error('Error deleting author:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllAuthors,
    getAuthorByEmail,
    createAuthor,
    updateAuthorByEmail,
    deleteAuthorByEmail
}