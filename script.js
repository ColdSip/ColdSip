import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://sxksheckwhqwponaqtpr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4a3NoZWNrd2hxd3BvbmFxdHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMzc4MjEsImV4cCI6MjA2NDYxMzgyMX0.j2EH5bKHZYsaY2G0_groUrvhDyI_rUl1KfN0XiA5zJA'
const supabase = createClient(supabaseUrl, supabaseKey)

const status = document.getElementById('status')
const shop = document.getElementById('shop')
const cartList = document.getElementById('cart')

document.getElementById('login-button').addEventListener('click', async () => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    status.textContent = 'Login fehlgeschlagen: ' + error.message
    status.style.color = 'red'
  } else {
    status.textContent = 'Erfolgreich eingeloggt!'
    status.style.color = 'green'
    shop.classList.remove('hidden')
  }
})

document.getElementById('signup-button').addEventListener('click', async () => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    status.textContent = 'Registrierung fehlgeschlagen: ' + error.message
    status.style.color = 'red'
  } else {
    status.textContent = 'Registrierung erfolgreich! Bitte E-Mail bestätigen.'
    status.style.color = 'green'
  }
})

document.getElementById('add-to-cart').addEventListener('click', () => {
  const color = document.getElementById('color').value
  const size = document.getElementById('size').value
  const item = `ColdSip Bottle - ${color}, ${size}`
  const li = document.createElement('li')
  li.textContent = item
  cartList.appendChild(li)
})
