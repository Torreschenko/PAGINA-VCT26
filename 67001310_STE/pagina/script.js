

// ===================== FIREBASE CONFIG =====================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD5RUKm1eI607Sz1-DzkxFPKFln8cK9tWs",
  authDomain: "vct2026-5693c.firebaseapp.com",
  projectId: "vct2026-5693c",
  storageBucket: "vct2026-5693c.firebasestorage.app",
  messagingSenderId: "433685599853",
  appId: "1:433685599853:web:3c8782f63dbf3d1431d164"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ===================== AUTH FUNCTIONS =====================
function loginUser() {
  var email    = document.getElementById('input-email').value.trim();
  var password = document.getElementById('input-password').value;
  var errorDiv = document.getElementById('login-error');
  var errorDiv = document.getElementById("login-error");
  errorDiv.style.display = "none";

  if (!email || !password) {
    showError('Por favor ingresa tu correo y contraseña.');
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .catch(function(error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        showError('Correo o contraseña incorrectos.');
      } else if (error.code === 'auth/invalid-email') {
        showError('El correo no es válido.');
      } else {
        showError('Error al iniciar sesión. Intenta de nuevo.');
      }
    });
}

function registerUser() {
  var email    = document.getElementById('input-email').value.trim();
  var password = document.getElementById('input-password').value;
  var errorDiv = document.getElementById("login-error");
  errorDiv.style.display = "none";

  if (!email || !password) {
    showError('Por favor ingresa un correo y contraseña.');
    return;
  }
  if (password.length < 6) {
    showError('La contraseña debe tener al menos 6 caracteres.');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .catch(function(error) {
      if (error.code === 'auth/email-already-in-use') {
        showError('Este correo ya está registrado.');
      } else if (error.code === 'auth/invalid-email') {
        showError('El correo no es válido.');
      } else if (error.code === 'auth/weak-password') {
        showError('La contraseña es muy débil.');
      } else {
        showError('Error al crear la cuenta. Intenta de nuevo.');
      }
    });
}

function logoutUser() {
  signOut(auth);
}

function showError(msg) {
  var errorDiv = document.getElementById('login-error');
  errorDiv.textContent = msg;
  errorDiv.style.display = 'block';
}

// Detectar si hay sesión activa
onAuthStateChanged(auth, function(user) {
  if (user) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';
    document.getElementById('user-email-label').textContent = user.email;
    showPage('inicio');
  } else {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('main-app').style.display = 'none';
  }
});

// Hacer funciones accesibles desde el HTML
window.loginUser    = loginUser;
window.registerUser = registerUser;
window.logoutUser   = logoutUser;

// ===================== DATA VCT =====================
var data = {
  inicio: {
    titulo: "VCT 2026 — Ganadores del Kickoff",
    descripcion: "El Kickoff 2026 fue la primera fase de la temporada. Los campeones de cada region clasificaron a Masters Santiago como primer seed de su region.",
    ganadores: [
      { region: "Americas", equipo: "FURIA Esports",     pais: "Brasil"  },
      { region: "EMEA",     equipo: "BBL Esports",       pais: "Turquia" },
      { region: "Pacific",  equipo: "Nongshim RedForce", pais: "Korea"   },
      { region: "China",    equipo: "All Gamers (AG)",   pais: "China"   }
    ]
  },
  americas: {
    campeon: "FURIA Esports", pais: "Brasil",
    seed: "Seed #1 - Directo a playoffs en Masters Santiago",
    resultado: "Vencio a MIBR 3-2 en la Gran Final del Upper Bracket",
    jugadores: [
      { ign: "nerve",     nombre: "Michael Yerrow",      rol: "IGL"       },
      { ign: "artzin",    nombre: "Arthur Araujo",       rol: "Flex"      },
      { ign: "eeiu",      nombre: "Daniel Vucenovic",    rol: "Iniciador" },
      { ign: "koalanoob", nombre: "GianFranco Potestio", rol: "Duelista"  },
      { ign: "alym",      nombre: "Torogul Baidyldaev",  rol: "Centinela" }
    ],
    dato: "Primera victoria historica de FURIA en un Kickoff VCT."
  },
  emea: {
    campeon: "BBL Esports", pais: "Turquia",
    seed: "Seed #1 - Directo a playoffs en Masters Santiago",
    resultado: "Vencio a Gentle Mates 3-2 en la Gran Final del Upper Bracket",
    jugadores: [
      { ign: "Crewen", nombre: "Ali Sargin",    rol: "IGL"       },
      { ign: "Lar0k",  nombre: "Yusuf Kanber",  rol: "Duelista"  },
      { ign: "Loita",  nombre: "Utku Kart",     rol: "Iniciador" },
      { ign: "Rose",   nombre: "Eren Erzan",    rol: "Centinela" },
      { ign: "umu7",   nombre: "Umut Pekdogan", rol: "Flex"      }
    ],
    dato: "BBL ascendio desde Challengers ganando el Ascension 2025."
  },
  pacific: {
    campeon: "Nongshim RedForce", pais: "Korea",
    seed: "Seed #1 - Directo a playoffs en Masters Santiago",
    resultado: "Vencio a Rex Regum Qeon 3-2 en la Gran Final del Upper Bracket",
    jugadores: [
      { ign: "Effort",       nombre: "Lee Sang-ho",  rol: "IGL"       },
      { ign: "Seoldam",      nombre: "Seoldam",      rol: "Duelista"  },
      { ign: "Bazzi",        nombre: "Park Jun-ki",  rol: "Iniciador" },
      { ign: "K1Ng",         nombre: "K1Ng",         rol: "Centinela" },
      { ign: "Haunofficial", nombre: "Haunofficial", rol: "Flex"      }
    ],
    dato: "Primera clasificacion directa de Nongshim RedForce a un Masters internacional."
  },
  china: {
    campeon: "All Gamers (AG)", pais: "China",
    seed: "Seed #1 - Directo a playoffs en Masters Santiago",
    resultado: "Primer seed de China clasificado a Masters Santiago",
    jugadores: [
      { ign: "CHICHOO", nombre: "Wan Shunzhi",    rol: "IGL"       },
      { ign: "ZmjjKK",  nombre: "Zheng Yongkang", rol: "Duelista"  },
      { ign: "nobody",  nombre: "Wang Senxu",     rol: "Centinela" },
      { ign: "Smoggy",  nombre: "Zhang Zhao",     rol: "Iniciador" },
      { ign: "Jieni7",  nombre: "Zhang Juntai",   rol: "Flex"      }
    ],
    dato: "AG busca demostrar el nivel de China en el escenario internacional."
  }
};

// ===================== RENDER =====================
function renderPage(pageId) {
  var d  = data[pageId];
  var el = document.getElementById(pageId);

  if (pageId === 'inicio') {
    var rows = '';
    for (var i = 0; i < d.ganadores.length; i++) {
      var g = d.ganadores[i];
      rows += '<div class="winner-row">' +
        '<span class="region-lbl">' + g.region + '</span>' +
        '<span class="team-lbl">'   + g.equipo  + '</span>' +
        '<span class="pais-lbl">'   + g.pais    + '</span>' +
        '</div>';
    }
    el.innerHTML =
      '<div class="intro-card">' +
        '<h2>' + d.titulo + '</h2>' +
        '<p>'  + d.descripcion + '</p>' +
        '<h3>Campeones del Kickoff</h3>' +
        rows +
      '</div>';
  } else {
    var rows = '';
    for (var i = 0; i < d.jugadores.length; i++) {
      var j = d.jugadores[i];
      rows += '<tr>' +
        '<td class="ign">'  + j.ign    + '</td>' +
        '<td class="real">' + j.nombre + '</td>' +
        '<td><span class="rol">' + j.rol + '</span></td>' +
        '</tr>';
    }
    el.innerHTML =
      '<div class="region-card">' +
        '<h2>' + d.campeon + '</h2>' +
        '<div>' + d.pais + '</div>' +
        '<div class="seed-tag">' + d.seed + '</div>' +
        '<p class="resultado">' + d.resultado + '</p>' +
        '<h3>Roster</h3>' +
        '<table>' +
          '<thead><tr><th>IGN</th><th>Nombre Real</th><th>Rol</th></tr></thead>' +
          '<tbody>' + rows + '</tbody>' +
        '</table>' +
        '<div class="dato-box">' + d.dato + '</div>' +
      '</div>';
  }
}

function showPage(pageId) {
  var pages = document.querySelectorAll('.page');
  for (var i = 0; i < pages.length; i++) {
    pages[i].style.display = 'none';
  }
  var buttons = document.querySelectorAll('#navbar button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active');
  }
  renderPage(pageId);
  document.getElementById(pageId).style.display = 'block';
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].getAttribute('onclick') === "showPage('" + pageId + "')") {
      buttons[i].classList.add('active');
    }
  }
}

window.showPage = showPage;