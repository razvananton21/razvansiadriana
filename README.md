# Wedding Invitation Template

A beautiful, responsive wedding invitation website with RSVP functionality built with Next.js and Supabase.

## Features

- Responsive design for all devices
- Event details with location maps
- RSVP form with database storage
- Beautiful animations
- Admin page to view and manage RSVP responses

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a free account at [supabase.com](https://supabase.com/)
2. Create a new project
3. Get your project URL and anon key from the API settings
4. Create a table for RSVP responses with the following SQL:

```sql
CREATE TABLE rsvp_responses (
  id SERIAL PRIMARY KEY,
  last_name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  vegetarian_menu BOOLEAN DEFAULT FALSE,
  bringing_plus_one BOOLEAN DEFAULT FALSE,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

5. Update your `.env.local` file with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 4. Build for Production

```bash
npm run build
```

## Viewing RSVP Responses

There are two ways to view RSVP responses:

### 1. Supabase Dashboard

1. Log in to your Supabase dashboard
2. Go to the Table Editor
3. Select the `rsvp_responses` table
4. You can view, filter, and export all responses

### 2. Admin Page

The site includes a simple admin page to view and manage RSVP responses:

1. Navigate to `/admin` on your site
2. Enter the password (default: `wedding2025`)
3. View all responses, statistics, and manage RSVPs

To change the admin password, edit the `src/app/admin/page.tsx` file and update the password in the `handleLogin` function.

## Customization

- Update event details in `src/components/EventDetails.tsx`
- Modify colors in `tailwind.config.js`
- Replace images in the `public/images` directory
- Change the admin password in `src/app/admin/page.tsx`
