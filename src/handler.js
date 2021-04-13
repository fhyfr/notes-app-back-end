const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title = 'untitled', tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updateAt
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status : 'success',
      message : 'Notes sucessfully created!',
      data: {
        noteId : id
      }
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status : 'failed',
    message : 'Notes failed to add!'
  });
  response.code(500);
  return response;
};

module.exports = { addNoteHandler };