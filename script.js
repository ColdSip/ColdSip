import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🔐 Ersetze durch deine Supabase-URL und Public-Anon-Key
const supabaseUrl = 'https://sxksheckwhqwponaqtpr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4a3NoZWNrd2hxd3BvbmFxdHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMzc4MjEsImV4cCI6MjA2NDYxMzgyMX0.j2EH5bKHZYsaY2G0_groUrvhDyI_rUl1KfN0XiA5zJA'
const supabase = createClient(supabaseUrl, supabaseKey)

const status = document.getElementById('status')
const shop = document.getElementById('shop')
const productList = document.getElementById('product-list')
const cartList = document.getElementById('cart')
const cart = []

// Registrierung
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

// Login
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
    loadProducts()
  }
})

// Produkte laden
async function loadProducts() {
  const { data, error } = await supabase
    .from('product_variants')
    .select('*')

  if (error) {
    console.error('Fehler beim Laden der Produkte:', error)
    return
  }

  data.forEach(variant => {
    const div = document.createElement('div')
    div.className = 'product'
    div.innerHTML = `
      <img src="${variant.image_url}" alt="${variant.color} ${variant.size}" />
      <h3>ColdSip Bottle</h3>
      <p>Farbe: ${variant.color}</p>
      <p>Größe: ${variant.size}</p>
      <p>Preis: ${variant.price.toFixed(2)} €</p>
      <button onclick='addToCart("${variant.id}", "${variant.color}", "${variant.size}", ${variant.price})'>In den Warenkorb</button>
    `
    productList.appendChild(div)
  })
}

// In den Warenkorb
window.addToCart = function (id, color, size, price) {
  const itemText = `ColdSip Bottle – ${color}, ${size}, ${price.toFixed(2)} €`
  cart.push({ id, color, size, price })

  const li = document.createElement('li')
  li.textContent = itemText
  cartList.appendChild(li)

  // Zähler aktualisieren
document.getElementById('cart-count').textContent = cart.length
}
