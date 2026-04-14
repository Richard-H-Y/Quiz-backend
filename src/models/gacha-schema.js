module.exports = (db) =>
  db.model(
    'gachas',
    db.Schema({
      user_name: String,
      date: { type: Date, default: Date.now },
      is_win: Boolean,
      prize_name: String,
    })
  );
