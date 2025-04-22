
// js/supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

export const supabase = createClient(
  'https://ihqieqpynnamsfayczhv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlocWllcXB5bm5hbXNmYXljemh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NTYwODIsImV4cCI6MjA2MDIzMjA4Mn0.84brtyH5RH07QhJ5bHslFvReMxqYJW9a9C8jbheP654'
)
