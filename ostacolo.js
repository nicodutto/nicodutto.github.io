class Ostacolo {
    constructor() {
          //DIAMETRO OSTACOLO
        this.r = 100; 
        //POSIZIONE DELL'OSTACOLO INIZILAEE
        this.x = width; 
        this.y = height - this.r - 65; 
    }

    //MUOVI OSTACOLO
    move() {
        this.x -= 10; 
    }

    //MOSTRA OSTACOLO
    show() {
        image(ostImg, this.x, this.y, this.r, this.r); 
    }
}
