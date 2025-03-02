document.addEventListener("DOMContentLoaded", aggiornaTabella);

function creaNuovoConto() {
    let nome = prompt("Inserisci il nome del conto:");
    if (nome) {
        db.collection("conti").add({
            nome: nome,
            saldo: 0
        })
        .then(() => {
            console.log("Conto aggiunto con successo!");
            aggiornaTabella();
        })
        .catch(error => console.error("Errore nell'aggiunta del conto:", error));
    }
}

function aggiornaTabella() {
    let tbody = document.getElementById("tabella-conti");
    tbody.innerHTML = "";

    db.collection("conti").get().then(snapshot => {
        snapshot.forEach(doc => {
            let conto = doc.data();
            let id = doc.id;

            let riga = document.createElement("tr");
            riga.innerHTML = `
                <td>${conto.nome}</td>
                <td>€${conto.saldo.toFixed(2)}</td>
                <td>
                    <button onclick="preleva('${id}')">Preleva</button>
                    <button onclick="aggiungi('${id}')">Aggiungi</button>
                </td>
            `;
            tbody.appendChild(riga);
        });
    })
    .catch(error => console.error("Errore nel caricamento dei conti:", error));
}

function preleva(id) {
    let importo = parseFloat(prompt("Inserisci l'importo da prelevare:"));
    if (!isNaN(importo) && importo > 0) {
        db.collection("conti").doc(id).get().then(doc => {
            if (doc.exists) {
                let conto = doc.data();
                let nuovoSaldo = conto.saldo - importo;
                if (nuovoSaldo >= 0) {
                    db.collection("conti").doc(id).update({ saldo: nuovoSaldo })
                    .then(() => aggiornaTabella());
                } else {
                    alert("Saldo insufficiente!");
                }
            }
        });
    } else {
        alert("Importo non valido.");
    }
}

function aggiungi(id) {
    let importo = parseFloat(prompt("Inserisci l'importo da aggiungere:"));
    if (!isNaN(importo) && importo > 0) {
        db.collection("conti").doc(id).get().then(doc => {
            if (doc.exists) {
                let conto = doc.data();
                let nuovoSaldo = conto.saldo + importo;
                db.collection("conti").doc(id).update({ saldo: nuovoSaldo })
                .then(() => aggiornaTabella());
            }
        });
    } else {
        alert("Importo non valido.");
    }
}
