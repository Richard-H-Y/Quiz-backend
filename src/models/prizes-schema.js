module.exports = (db) =>
  db.model(
    'prizes',
    db.Schema({
      name: String,
      quota: Number,
      remaining_quota: Number,
    })
  );
