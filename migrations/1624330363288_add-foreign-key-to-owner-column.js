exports.up = (pgm) => {
  // create new user
  pgm.sql("INSERT INTO users(id, username, password, fullname) VALUES ('old_notes', 'old_notes', 'old_notes', 'old notes')");

  // change owner where owner note equal to NULL
  pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner=null");

  // add constraint foreign key to owner
  pgm.addConstraint('notes', 'fk_notes.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // delete constraint fk_notes.owner_users.id on notes table
  pgm.dropConstraint('notes', 'fk_notes.owner_users.id');

  // update owner old_notes value to NULL
  pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old_notes'");

  // delete new user
  pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};
