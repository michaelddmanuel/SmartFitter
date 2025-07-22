-- Create document_signatures table
CREATE TABLE IF NOT EXISTS document_signatures (
  id SERIAL PRIMARY KEY,
  auth0_user_id TEXT NOT NULL REFERENCES profiles(auth0_user_id),
  document_id INTEGER NOT NULL REFERENCES documents(id),
  signed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(auth0_user_id, document_id)
);
