import $ from "jquery";
import { AziendaManager } from "./managers/azienda";

let aziendaManager = new AziendaManager();
let idSedeDiCuiStoGestendoIVeicoli;

$(() => {
    aziendaManager.getSedi(1)
        .then(dati => htmlSedi(dati))
        .catch(err => console.log(err));


})

function aggiungiSede() {
    const inputNome = $("#nome");
    const inputIndirizzo = $("#indirizzo");
    const inputCapienza = $("#capienza");
    const inputFoto = $("#foto");

    aziendaManager.addSede(
        1,
        inputNome.val(),
        inputIndirizzo.val(),
        +inputCapienza.val(),
        inputFoto.val()
    )
        .then(sede => {
            inputNome.val("");
            inputIndirizzo.val("");
            inputCapienza.val(0);
            inputFoto.val("");

            return aziendaManager.getSedi(1);
        })
        .then(dati => htmlSedi(dati))
        .catch(err => console.log(err));
}
window.aggiungiSede = aggiungiSede;

function eliminaSede(id) {
    if (confirm("Sicuro sicurissimo?")) {
        aziendaManager.delSede(id)
            .then(() => aziendaManager.getSedi(1))
            .then(dati => htmlSedi(dati))
            .catch(err => console.log(err));
    }
}
window.eliminaSede = eliminaSede;

function htmlSedi(sedi) {
    let strHTML = "";
    for (const s of sedi) {
        strHTML += `
            <div class="col">
                <div class="card">
                    <img src="${s.foto}" class="card-img-top" alt="${s.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${s.nome}</h5>
                        <p class="card-text text-muted">${s.indirizzo}</p>
                        <button type="button" class="btn btn-danger" onclick="eliminaSede(${s.id})">Elimina</button>
                        <button type="button" class="btn btn-primary" onclick="gestioneVeicoli(${s.id}, '${s.nome}')">Gestione Veicoli</button>
                    </div>
                </div>
            </div>
        `;
    }

    $("#listaSedi").html(strHTML);
}

function gestioneSedi() {
    idSedeDiCuiStoGestendoIVeicoli = undefined;

    document.getElementById("gestioneVeicoli").style.display = "none";
    document.getElementById("formInserimentoSede").style.display = "block";
}
window.gestioneSedi = gestioneSedi;

function gestioneVeicoli(idSede, nomeSede) {
    idSedeDiCuiStoGestendoIVeicoli = idSede;

    document.getElementById("nomeSede").innerHTML = nomeSede;
    document.getElementById("gestioneVeicoli").style.display = "block";
    document.getElementById("formInserimentoSede").style.display = "none";

    aziendaManager.getVeicoli(idSede)
        .then(veicoli => htmlVeicoli(veicoli))
        .catch(err => console.log(err));;
}
window.gestioneVeicoli = gestioneVeicoli;

function htmlVeicoli(veicoli) {
    let strHTML = "";
    for (const v of veicoli) {
        strHTML += `
            <tr>
                <td>
                    <img src="${v.foto}" class="img-thumbnail" alt="${v.marca} ${v.modello}">
                </td>
                <td>
                    ${v.marca}
                </td>
                <td>
                    ${v.modello}
                </td>
                <td>
                    ${v.targa}
                </td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="eliminaVeicolo(${v.id})">Elimina</button>
                </td>
            </tr>
        `;
    }

    $("#listaVeicoli").html(strHTML);
}

function aggiungiVeicolo() {
    const inputMarca = $("#marca");
    const inputModello = $("#modello");
    const inputTarga = $("#targa");
    const inputFoto = $("#fotoVeicolo");
    const inputColore = $("#colore");
    const inputTariffa = $("#tariffa");

    aziendaManager.addVeicolo(
        idSedeDiCuiStoGestendoIVeicoli,
        inputMarca.val(),
        inputModello.val(),
        inputTarga.val(),
        inputFoto.val(),
        inputColore.val(),
        +inputTariffa.val()
    )
        .then(veicolo => {
            inputMarca.val("");
            inputModello.val("");
            inputTarga.val("");
            inputFoto.val("");
            inputColore.val("");
            +inputTariffa.val(0);

            return aziendaManager.getVeicoli(idSedeDiCuiStoGestendoIVeicoli);
        })
        .then(dati => htmlVeicoli(dati))
        .catch(err => console.log(err));
}
window.aggiungiVeicolo = aggiungiVeicolo;