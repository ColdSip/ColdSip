import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://your-project-id.supabase.co' // Ersetzen!
const supabaseKey = 'your-anon-key' // Ersetzen!
const supabase = createClient(supabaseUrl, supabaseKey)

document.getElementById('login-button').addEventListener('click', async () => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { error, user } = await supabase.auth.signInWithPassword({ email, password })

  const status = document.getElementById('status')
  if (error) {
    status.textContent = 'Login fehlgeschlagen: ' + error.message
    status.style.color = 'red'
  } else {
    status.textContent = 'Erfolgreich eingeloggt!'
    status.style.color = 'green'
  }
})
