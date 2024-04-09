class Gemma {
    constructor() {
        //INIZIALIZZO POSIZIONE E GRANDEZZA DELLA GEMMA
        this.r = 50; 
        this.x = 1300; 
        this.y = 250; 
    }

    //METODO CHE FA MUOVERE LA GEMMA
    move() {
        this.x -= 10; 
    }

    //METODO CHE MOSRRA LA GEMMA SULLO SCHERMO
    show() {
        image(gemmaImg, this.x, this.y, this.r, this.r);
    }
}
