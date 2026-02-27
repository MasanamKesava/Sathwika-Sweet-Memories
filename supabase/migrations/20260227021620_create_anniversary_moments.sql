/*
  # Create Anniversary Moments Table

  1. New Tables
    - `anniversary_moments`
      - `id` (uuid, primary key)
      - `category` (text) - funny, romantic, mistakes, surprise, emotional, games
      - `title` (text) - short title for the moment
      - `description` (text) - detailed description
      - `emoji` (text) - emoji representing the moment
      - `date` (text) - when it happened (optional)
      - `created_at` (timestamptz)
      - `order_index` (integer) - for custom sorting

  2. Security
    - Enable RLS on `anniversary_moments` table
    - Add policies for public read access (since it's a personal romantic site)
    - No insert/update/delete policies (you'll manage via Supabase dashboard)
*/

CREATE TABLE IF NOT EXISTS anniversary_moments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('funny', 'romantic', 'mistakes', 'surprise', 'emotional', 'games')),
  title text NOT NULL,
  description text NOT NULL,
  emoji text DEFAULT '💕',
  date text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE anniversary_moments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view anniversary moments"
  ON anniversary_moments
  FOR SELECT
  TO public
  USING (true);
