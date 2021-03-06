const { Schema, model } = require('mongoose');

const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  categories: [{ type: String, required: true, minlength: 2 }],
  bookmarks: [
    {
      recipe: { type: String, required: true },
      category: { type: String, required: true }
    }
  ],
  edits: [
    {
      recipeId: { type: String, required: true },
      edit: { type: Object, required: true }
    }
  ]
});

module.exports = model('User', User);
