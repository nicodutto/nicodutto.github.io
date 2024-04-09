class Player {
    constructor() {
        //GRANDEZZA PLAYER
        this.r = 140; //RAGGIO BOX DEL PLAYER
        //POSIZIONE INIZILAE
        this.x = 150; 
        this.y = height - this.r - 65;
        //VELOCITA DEL SALTO
        this.vy = 0; 
        //GRAVITA
        this.gravity = 4;
        //VETTORE DEI PROIETTILI
        this.proiettili = [];
    }

    //METODO PER SPARARE I PROIETTILI
    sparare() {
        //CREO PROIETTILE CON LA POSIZIONE VICINO AL PLAYER
        let proiettile = new Proiettile(this.x + this.r, this.y + this.r / 2);
        this.proiettili.push(proiettile); //AGGIUNGO AL VETTORE DEI PORIETTLI
    }

    //METODO PER SALTO
    jump() {
        if (this.y === height - this.r - 65) { //CONTROLLO SE IL GIOCATORE E A YTERRA
            this.vy = -60; //CAMBIO VELOCITA VERTICALE PER IL SALTO, 60 PIXEL ALA VOLTA
        }
    }

    //CONTROLLO DELLE COLLISNIONI TRA I PROIETTILI E GLI OSTACOLI (I MOSTRI) MEMORIZZZANDOLI IN VARIABILI E CONFRONTANDO LE POSIZIONI
    checkCollisioni() {
        for (let i = this.proiettili.length - 1; i >= 0; i--) { //SCORRO I PROIETTILI
            let proiettile = this.proiettili[i];    
            for (let j = ostacolo.length - 1; j >= 0; j--) {    //SCORRO GLI OSTACOLI 
                let ost = ostacolo[j];
                if (proiettile.checkCollisione(ost)) {  //SE CE COLLISINE
                    this.proiettili.splice(i, 1); //RIMUOVO PROIETTILE DALLO SCHERMO
                    ostacolo.splice(j, 1); //RIMUOVO OSTACOLO DALLO SCHERMO
                    break; //ESCO DAL CICLO PERCHE CERCO SOLO LA PRIMA COLLISOONE
                }
            }
        }
    }

    //CONTROLLO LE COLLISIONI TRA PLAYER E OSTACOLI
    hits(ostacolo) {
        //VADO A TROVARE IL CENTRO DEL PLAYER E DELL'OSTACOLO
        let x1 = this.x + this.r * 0.5; 
        let y1 = this.y + this.r * 0.5;
        let x2 = ostacolo.x + ostacolo.r * 0.5; 
        let y2 = ostacolo.y + ostacolo.r * 0.5; 
        //CONTROLLO LA COLLISIONE TRA I DUE CERCHI
        return collideCircleCircle(x1, y1, this.r, x2, y2, ostacolo.r); 
    }

    //CONTROLLO COLLISIONI TRA GIOCATORE E GEMMA
    hits(gemma) {
        //CERCO IL CENTRO 
        let x1 = this.x + this.r * 0.5;
        let y1 = this.y + this.r * 0.5;
        let x2 = gemma.x + gemma.r * 0.5; 
        let y2 = gemma.y + gemma.r * 0.5; 
        //CONTROLLO COLLISIONE
        return collideCircleCircle(x1, y1, this.r, x2, y2, gemma.r); 
    }

    //MUOVO IL PLAYER
    move() {
        this.y += this.vy; //AGGIORNA Y DEL GIOCATORE SE SALTA 
        this.vy += this.gravity; //AGGIORNA ANCHE LA GRAVITA PER RIPORTARLO SUL TERRENO
        //LIMITA LE Y ALTRIMENTI FINIREBBE FUORI DAL CANVAS
        this.y = constrain(this.y, 0, height - this.r - 65);
    }

    //MMOSTRO GIOCATORE A SCHERMO E PROIETTILI 
    show() {
        image(playerImage, this.x, this.y, this.r, this.r);
        //MOSTRA I PROIETTILI SPARATI DAL GIOCATOEE
        for (let proiettile of this.proiettili) {
            proiettile.show();
        }
    }
}
