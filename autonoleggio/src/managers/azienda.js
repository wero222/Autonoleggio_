import { Azienda, Sede, Veicolo } from "../models";
import $ from "jquery";

const BASE_URL = "http://localhost:3050/";

export class AziendaManager {
    addAzienda(nome) {
        // crea nuova azienda e POST sul server
        let azienda = new Azienda(nome);

        return fetch(BASE_URL + "aziende", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(azienda)
        })
            .then(res => {
                return res.json();
            });
    }

    getAziende() {
        return fetch(BASE_URL + "aziende")
            .then(res => res.json());
    }

    addSede(aziendaId, nome, indirizzo, capienza, foto) {
        // crea nuova sede e POST sul server
        let sede = new Sede(aziendaId, nome, indirizzo, capienza, foto);

        return fetch(BASE_URL + "sedi", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(sede)
        })
            .then(res => {
                return res.json();
            });
    }

    getSedi(aziendaId) {
        // GET http://localhost:3050/sedi?aziendaId=1
        return fetch(BASE_URL + "sedi?aziendaId=" + aziendaId)
            .then(res => res.json());
    }

    delSede(id) {
        // DELETE http://localhost:3050/sedi/1
        return fetch(BASE_URL + "sedi/" + id, {
            method: "DELETE"
        });
    }

    getVeicoli(sedeId) {
        // GET http://localhost:3050/veicoli?sedeId=1
        return fetch(BASE_URL + "veicoli?sedeId=" + sedeId)
            .then(res => res.json());
    }

    addVeicolo(sedeId, marca, modello, targa, foto, colore, tariffa) {
        // crea nuovo veicolo e POST sul server
        let veicolo = new Veicolo(sedeId, targa, marca, modello, colore, tariffa, foto);

        return fetch(BASE_URL + "veicoli", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(veicolo)
        })
            .then(res => {
                return res.json();
            });
    }




    getAziendeJQuery() {
        return new Promise((resolve, reject) => {
            $.get(BASE_URL + "aziende")
                .done(resolve)
                .fail(reject)
        });
    }
}