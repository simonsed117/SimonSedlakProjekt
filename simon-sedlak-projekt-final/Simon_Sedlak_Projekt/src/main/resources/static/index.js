const apiRoot = '/api/osoby';

async function nacti() {
  try {
    const data = await fetch(apiRoot).then(r => r.json());
    const tbody = document.querySelector('#tab tbody');
    tbody.innerHTML = '';

    data.forEach(o => {
      const adresyText = (o.adresy || []).map(a => `${a.ulice || ''} ${a.mesto || ''} ${a.psc || ''}`).join('<br>');
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${o.jmeno || ''} ${o.prijmeni || ''}</td>
        <td>${o.email || ''}</td>
        <td>${o.telefon || ''}</td>
        <td>${adresyText}</td>
        <td class="actions">
          <button onclick="edit(${o.id})">Editovat</button>
          <button onclick="smazat(${o.id})">Smazat</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error('Chyba při načítání seznamu', err);
  }
}

function edit(id) {
  window.location = `/formular.html?id=${id}`;
}

async function smazat(id) {
  if (!confirm('Opravdu smazat?')) return;
  try {
    await fetch(`${apiRoot}/${id}`, { method: 'DELETE' });
    await nacti();
  } catch (err) {
    console.error('Chyba při mazání', err);
  }
}

document.getElementById('novy').addEventListener('click', () => {
  window.location = '/formular.html';
});

nacti();