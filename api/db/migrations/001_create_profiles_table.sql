-- Create user_status enum type
CREATE TYPE user_status AS ENUM (
  'prospect',
  'nda_signed',
  'booked_session',
  'accepted',
  'member_contract_signed',
  'active_member',
  'rejected',
  'disabled'
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  auth0_user_id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone_number TEXT,
  user_status user_status NOT NULL DEFAULT 'prospect',
  nda_document_version_signed TEXT,
  member_contract_document_version_signed TEXT,
  referred_by_user_id TEXT REFERENCES profiles(auth0_user_id),
  upline_manager_id TEXT REFERENCES profiles(auth0_user_id),
  digital_card_tagline TEXT,
  unique_share_slug TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create update_updated_at function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on profiles table to auto-update updated_at
CREATE TRIGGER profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
