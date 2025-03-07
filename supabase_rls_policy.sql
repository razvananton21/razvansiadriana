-- Enable RLS on the table (it's probably already enabled)
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" 
ON rsvp_responses 
FOR INSERT 
TO anon
WITH CHECK (true);

-- If you also want to allow reading the responses from the admin page
CREATE POLICY "Allow anonymous reads" 
ON rsvp_responses 
FOR SELECT 
TO anon
USING (true); 