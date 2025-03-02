function creaNuovoConto() {
    let nome = prompt("Inserisci il nome del conto:");
    if (nome) {
        db.collection("conti").add({
            nome: nome,
            saldo: 0
        }).then(() => aggiornaTabella());
    }
}

function aggiornaTabella() {
    let tbody = document.getElementById("tabella-conti");
    tbody.innerHTML = "";
    db.collection("conti").get().then(snapshot => {
        snapshot.forEach(doc => {
            let conto = doc.data();
            let riga = document.createElement("tr");
            riga.innerHTML = `
                <td>${conto.nome}</td>
                <td>€${conto.saldo.toFixed(2)}</td>
                <td>
                    <button onclick="modificaSaldo('${doc.id}', -prompt('Quanto prelevare?'))">Preleva</button>
                    <button onclick="modificaSaldo('${doc.id}', prompt('Quanto aggiungere?'))">Aggiungi</button>
                </td>
            `;
            tbody.appendChild(riga);
        });
    });
}

function modificaSaldo(id, importo) {
    if (!importo || isNaN(importo)) return alert("Importo non valido!");
    importo = parseFloat(importo);

    db.collection("conti").doc(id).get().then(doc => {
        let nuovoSaldo = doc.data().saldo + importo;
        db.collection("conti").doc(id).update({ saldo: nuovoSaldo }).then(() => aggiornaTabella());
    });
}

aggiornaTabella();
