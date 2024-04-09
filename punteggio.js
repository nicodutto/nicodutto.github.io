class Punteggio {
    constructor() {
        //PUNTEGGIO A ZERO INIZILE
        this.punteggio = 0;
        //POSIZIONE DEL PUNTEGGIO E RAGGIO DEL TESTO
        this.r = 120; 
        this.x = 150; 
        this.y = height - this.r; 
    }

    //MEETODO CHE INCFEMENTA PYNTEGIO
    incrementa() {
        this.punteggio += 1; 
        return this.punteggio;
    }

    //METODO CHE RESTITUISCE IL PUNTEGGIO ATTUALE
    contaPunti() {
        return this.punteggio; 
    }

    //METODO CHE MOSTRA IL UPUNTEGGIO A SCHERMO
    show() {
        //MOSTRA L'IMMAGINE DELLA GEMMA E DI FIANCO ILA NUMERO DI GEMME RACCOLTE 
        textSize(24);
        fill(255, 204, 0); 
        text(this.punteggio, 1200, 150); 
        image(gemmaImg, 1110, 95, 70, 70); 
    }
}
