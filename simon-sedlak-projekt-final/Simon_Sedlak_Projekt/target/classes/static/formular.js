const api = '/api/osoby';
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const container = document.getElementById('adresyContainer');
const addBtn = document.getElementById('addAdres');

function createAdresRow(a = {}) {
  const div = document.createElement('div');
  div.className = 'adresy-row';

  const ulice = document.createElement('input');
  ulice.placeholder = 'Ulice';
  ulice.value = a.ulice || '';
  ulice.className = 'ulice';

  const mesto = document.createElement('input');
  mesto.placeholder = 'Město';
  mesto.value = a.mesto || '';
  mesto.className = 'mesto';

  const psc = document.createElement('input');
  psc.placeholder = 'PSC';
  psc.value = a.psc || '';
  psc.className = 'psc small';

  const remove = document.createElement('button');
  remove.type = 'button';
  remove.textContent = 'Odstranit';
  remove.addEventListener('click', () => div.remove());


  if (a.id != null) div.dataset.aid = a.id;
  else if (a.aid != null) div.dataset.aid = a.aid;

  div.appendChild(ulice);
  div.appendChild(mesto);
  div.appendChild(psc);
  div.appendChild(remove);

  return div;
}

addBtn.addEventListener('click', () => container.appendChild(createAdresRow()));

if (id) {
  fetch(`${api}/${id}`)
    .then(r => r.json())
    .then(osoba => {
      document.getElementById('jmeno').value = osoba.jmeno || '';
      document.getElementById('prijmeni').value = osoba.prijmeni || '';
      document.getElementById('email').value = osoba.email || '';
      document.getElementById('telefon').value = osoba.telefon || '';

      (osoba.adresy || []).forEach(a => container.appendChild(createAdresRow(a)));
    })
    .catch(err => console.error('Chyba při načítání osoby:', err));
} else {

  container.appendChild(createAdresRow());
}

document.getElementById('frm').addEventListener('submit', async e => {
  e.preventDefault();

  const osoba = {
    jmeno: document.getElementById('jmeno').value.trim(),
    prijmeni: document.getElementById('prijmeni').value.trim(),
    email: document.getElementById('email').value.trim(),
    telefon: document.getElementById('telefon').value.trim(),
    adresy: []
  };

  document.querySelectorAll('#adresyContainer .adresy-row').forEach(row => {
    const u = row.querySelector('.ulice').value.trim();
    const m = row.querySelector('.mesto').value.trim();
    const p = row.querySelector('.psc').value.trim();
    if (u || m || p) {
      const a = { ulice: u, mesto: m, psc: p };
      if (row.dataset.aid) a.id = Number(row.dataset.aid);
      osoba.adresy.push(a);
    }
  });

  try {
    if (id) {
      await fetch(`${api}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(osoba)
      });
    } else {
      await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(osoba)
      });
    }
    window.location = '/index.html';
  } catch (err) {
    console.error('Chyba při ukládání:', err);
    alert('Chyba při ukládání, koukni do konzole.');
  }
});

const backBtn = document.getElementById('back');
if (backBtn) {
    backBtn.addEventListener('click', () => {
    window.location.href = '/index.html';
    });
}


