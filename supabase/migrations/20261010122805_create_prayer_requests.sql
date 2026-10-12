/*
# Create prayer requests table

1. New Tables
- `prayer_requests`
- `id` (uuid, primary key)
- `name` (text, required visitor name)
- `email` (text, required contact email)
- `request` (text, required prayer request)
- `confidential` (boolean, whether the request should be treated confidentially)
- `created_at` (timestamptz, submission time)

2. Security
- Enable row level security on `prayer_requests`.
- Allow anonymous and authenticated visitors to submit prayer requests.
- Do not expose submitted prayer requests for browser reading or editing.

3. Important Notes
- This is a single-tenant public church website without sign-in.
- The browser only needs INSERT access; pastoral staff access remains outside this public form.
*/

CREATE TABLE IF NOT EXISTS prayer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  request text NOT NULL,
  confidential boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Visitors can submit prayer requests" ON prayer_requests;
CREATE POLICY "Visitors can submit prayer requests"
  ON prayer_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 320
    AND char_length(request) BETWEEN 1 AND 5000
  );
