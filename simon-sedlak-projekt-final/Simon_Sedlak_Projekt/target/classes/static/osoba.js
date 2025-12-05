const params2 = new URLSearchParams(window.location.search);
const id2 = params2.get('id');
const apiRoot2 = '/api/osoby';

function render(osoba) {
  const d = document.getElementById('detail');
  d.innerHTML = `<h2>${osoba.jmeno || ''} ${osoba.prijmeni || ''}</h2>
                 <p>${osoba.email || ''} ${osoba.telefon || ''}</p>`;

  const ul = document.createElement('ul');
  (osoba.adresy || []).forEach(a => {
    const li = document.createElement('li');
    li.innerHTML = `${a.ulice || ''} ${a.mesto || ''} ${a.psc || ''} <button data-aid="${a.id || a.aid || ''}">Smazat</button>`;
    const btn = li.querySelector('button');
    btn.addEventListener('click', async () => {
      const aid = btn.dataset.aid;
      if (!aid) return;
      await fetch(`${apiRoot2}/${id2}/adresy/${aid}`, { method: 'DELETE' });
      location.reload();
    });
    ul.appendChild(li);
  });
  d.appendChild(ul);
}

if (id2) {
  fetch(`${apiRoot2}/${id2}`).then(r => r.json()).then(render).catch(err => console.error(err));
}

document.getElementById('back').addEventListener('click', () => { window.location.href = '/index.html';
});