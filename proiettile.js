class Proiettile {
    constructor(x, y) { //PASSO LE COORDINATE DEL PLAYER NEL COSTRUTTORE COSI CHE IL PROIETTILE PARTI DAL PLAYER
        //POSIZIONE INIZIALE PRIETTILE
        this.x = x; 
        this.y = y; 
        //VELOCITA MOVIMENTO PROIETTILE
        this.velocita = 5;
        //DIMENSIONI PROIETILE
        this.dimensione = 20; 
        //IMMAGINE PROIETTILE
        this.immagine = loadImage("img/proiettile.png"); 
    }

    //METODO PER MSTRARE PROIETTILE SULLO SCHERMO
    show() {
        image(this.immagine, this.x, this.y, this.dimensione, this.dimensione); 
    }
    
    //METODO PER MUOVERE PROIETTILE
    move() {
        this.x += this.velocita; //AGGIORNO X CON LA VARIABILE VELOCITA (5 PIXEL PER VOLTA)
    }

    //METODO CHE CONTROLLA LE COLLISINI TRA PROIETTILE E OSTACOLI 
    checkCollisione(ostacolo) {
        //CALCOLA LA DISTANZA TRAIL CENTRO DEL PROIETTILE E L'OSTACOLO
        let d = dist(this.x, this.y, ostacolo.x, ostacolo.y);
        return d < this.dimensione / 2 + ostacolo.r / 2;
    }
}
