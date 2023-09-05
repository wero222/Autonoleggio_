export class Veicolo {
    constructor(sedeId, targa, marca, modello, colore, tariffa, foto) {
        this.sedeId = sedeId;
        this.targa = targa;
        this.marca = marca;
        this.modello = modello;
        this.colore = colore;
        this.tariffa = tariffa;
        this.foto = foto;
    }
}

export class Sede {
    constructor(aziendaId, nome, indirizzo, capienza, foto) {
        this.aziendaId = aziendaId;
        this.nome = nome;
        this.indirizzo = indirizzo; // class Indirizzo
        this.capienza = capienza;
        // this.veicoli = []; // class Veicolo
        this.foto = foto;
    }
}

export class Indirizzo {
    constructor(via, cap, citta) {
        this.via = via;
        this.cap = cap;
        this.citta = citta;
    }
}

export class Utente {
    constructor(nome, cognome, indirizzo, cf) {
        this.nome = nome;
        this.cognome = cognome;
        this.indirizzo = indirizzo;
        this.cf = cf;
    }
}

export class Azienda {
    constructor(nome) {
        this.nome = nome;
        // this.sedi = []; // class Sede
    }
}
