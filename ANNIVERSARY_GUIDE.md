# Happy Week Anniversary - Adding Moments Guide

## Overview
The Anniversary page celebrates your first week together with a beautiful cake-cutting theme. Moments are organized into 6 categories:

1. **Funny Moments** - Laughs and giggles
2. **Romantic Moments** - Sweet and loving exchanges
3. **Oops Moments** - Mistakes and silly mishaps
4. **Surprise Moments** - Unexpected and delightful things
5. **Emotional Moments** - Deep feelings and vulnerability
6. **Game Moments** - Fun games you played together

## How to Add Moments

### Option 1: Using Supabase Dashboard (Easiest)

1. Go to your Supabase project dashboard
2. Navigate to the "Table Editor"
3. Select the `anniversary_moments` table
4. Click "Insert row"
5. Fill in the fields:
   - **category**: Choose from: `funny`, `romantic`, `mistakes`, `surprise`, `emotional`, `games`
   - **title**: A short title (e.g., "The Emoji Confusion")
   - **description**: The full story or moment
   - **emoji**: A relevant emoji (e.g., "😂", "💕", "🙈")
   - **date**: Optional - when it happened (e.g., "Feb 20, 2026")
   - **order_index**: Optional - number for custom sorting (0 by default)

### Option 2: Using SQL

Run this in the SQL Editor:

```sql
INSERT INTO anniversary_moments (category, title, description, emoji, date, order_index)
VALUES
  ('funny', 'The Emoji Confusion', 'Nee emojis ardam cheskovadam rombha kastam guru 😅 - when I tried to decode your cryptic emoji messages!', '😂', 'Feb 20, 2026', 1),
  ('romantic', 'First Compliment', 'Actually you''re so cute in the photo - the moment that started it all 💕', '💕', 'Feb 19, 2026', 1),
  ('mistakes', 'Forgot to Charge Phone', 'Areyyyyyy nen charge petti padkunna 8 paina cheyna? Bayataki velthuna! - That panic moment 😅', '🙈', 'Feb 21, 2026', 1),
  ('surprise', 'Sudden Plan', 'Noice ra telidhu nen epud instant ga plan eskoni ekkestha 🤣', '🎉', 'Feb 22, 2026', 1),
  ('emotional', 'Deep Talk', 'Life long therapy teeskuntava 😢 anni baadhal em unnai - when we opened up', '🥺', 'Feb 23, 2026', 1),
  ('games', 'First Game Together', 'Add your game moment here!', '🎮', 'Feb 24, 2026', 1);
```

## Example Moments by Category

### Funny Moments
- "When you sent 20 emojis and I had no clue what you meant"
- "The time I called you Dr. Psycho and you actually liked it"
- "Nuv ala walking chestu vunte akkada couples ki godava aidi emo"

### Romantic Moments
- "Actually you're so cute in the photo - first words that made my heart flutter"
- "Have a great day andi - simple but made me smile"
- "Future Dr. Sathwika ki preparation phase - believing in your dreams"

### Oops Moments
- "Forgot to charge my phone before our call"
- "Sent a message to the wrong chat"
- "Nuv musko - when I said something I shouldn't have"

### Surprise Moments
- "You replied when I thought you wouldn't"
- "Sudden plan that made my day"
- "That unexpected voice note"

### Emotional Moments
- "When we talked about our struggles"
- "Opening up about our feelings"
- "oka vishyam cheppana manam ela vunn sare self love anedi vundli"

### Game Moments
- "First time playing [game name]"
- "That time you beat me completely"
- "Late night gaming session"

## Tips

1. Be specific - Include details that make the moment special
2. Use actual quotes when possible - It's more personal
3. Add dates if you remember them - Creates a timeline
4. Choose emojis that match the mood
5. Order_index helps you control the display order (lower numbers show first)

## Current Status

The page is ready! It will:
- Show "More Moments Coming Soon" if the database is empty
- Display moments organized by category
- Let users filter by category or view all
- Show a beautiful cake-cutting themed design
- Celebrate your one-week anniversary (Feb 19-26, 2026)

Visit `/anniversary` to see the page live!
