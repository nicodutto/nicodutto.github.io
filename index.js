let cont = 0;
let vite = 5;
let numProiettili = 10;
let schermata = 0;

let player;
let carlImg;
let ostImg;
let sfondoImg;
let moImg;
let gameOverImg;
//IMMAGINI
let vitaImg;
let inizioImg;
let proImg;
let pausaImg;
let livelliImg;
let gemmaImg;
let vittoriaImg;
let playerImage; 
//SUONI
let suonoGem;
let suonoSott;
let suonoLose;
let suonoSalto;
let suonoVittoria;

//ARRAY OSTACOLI E EGEMME
let ostacolo = [];
let gemme = [];


function preload(){
    //IMMAGNI
    carlImg = loadImage("img/carl.png");
    ostImg = loadImage("img/ostacolo.png");
    sfondoImg = loadImage("img/sfondo.png");
    gemmaImg = loadImage("img/gemma.png");
    gameOverImg = loadImage("img/gameover.jpg");
    vitaImg = loadImage("img/vita.gif");
    inizioImg = loadImage("img/start.png");
    pausaImg = loadImage("img/pausa.png");
    livelliImg = loadImage("img/livelli.png");
    vittoriaImg = loadImage("img/vittoria.png");
    proImg = loadImage("img/proiettile.png");
    sceltaImg = loadImage("img/scelta.png");
    //SUONI
    suonoGem = loadSound('musica/gemma.mp3');
    suonoSott = loadSound('musica/sottofondo.mp3');
    suonoLose = loadSound('musica/gameover.mp3');
    suonoSalto = loadSound('musica/salto.mp3');
    suonoPro = loadSound('musica/proiettile.mp3');
    suonoVittoria = loadSound("musica/vittoria.mp3");
}

function setup(){
    //CREO CANVAS E OGGETTI CHE SERVONO 
    createCanvas(1300, 700);
    playerImage = carlImg;
    player = new Player();
    punteggio = new Punteggio();
    //IMPOSTO SUONI
    suonoSott.play();
    suonoSott.setVolume(0.5);
    suonoSalto.setVolume(0.060);
    suonoGem.setVolume(0.080);
}


//FUNZIONE CHE GESTISCE LA PRESSIONE DELLE COORDINATE CHE CORRISPONDONO AI PULSANTI NELLE DIVERSE SCHERMATE
function mousePressed(){
    //SCHERMATA PERSONAGGI
    if(schermata == 0){   
        if(mouseX >= 789 && mouseX <= 1000 && mouseY >=  349  && mouseY <= 409){
            schermata = 4;
            screen4(); //SCHERMATA DI SCELTA DEI PERSONAGGI
        }
    }

    //PULSANTE DEI LIVELLI
    if(schermata == 0){
        if(mouseX >= 782 && mouseX <= 1029 && mouseY >=  454  && mouseY <= 511){
            schermata = 5;
            screen5(); //SCHERMATA DI SCELTA DEL LIVELLO (FACILE O FIFFICILE)
        }
    }

    //PULSANTE BACK
    if(schermata == 5){
        if(mouseX >= 17 && mouseX <= 133 && mouseY >=  21  && mouseY <= 61){
            schermata = 0;
            screen1(); //VISUALIZZO LA SCERMATA INIZIALE
        }
        
    }

    //SE IL GIOCO E NELLA SCELTA DEL PERSONAGGIO
    if (schermata === 4) {
        //SE VIENE SCELTO PULSANTE IN ALTO A SINISTRA CAMBIO IMAGINE PERSONAGGIO
        if (mouseX >= 55 && mouseX <= 200 && mouseY >= 100 && mouseY <= 200) {
            playerImage = loadImage("img/carlTemerario.png");
            console.log("alto sx");
        }
        //SE VIENE SCELTO PULSANTE IN ALTO A DESTRA CAMBIO IMAGINE PERSONAGGIO
        else if (mouseX >= 1100 && mouseX <= 1200 && mouseY >= 100 && mouseY <= 200) {
            playerImage = loadImage("img/carlYoshi.png");
            console.log("alto dx");
        }
        //SE VIENE SCELTO PULSANTE IN BASSO A SINISTRA CAMBIO IMAGINE PERSONAGGIO
        else if (mouseX >= 55 && mouseX <= 200 && mouseY >= 500 && mouseY <= 600) {
            playerImage = loadImage("img/carlSurf.png");
            console.log("basso sx");
        }
        //SE VIENE SCELTO PULSANTE IN BASSO A DESTRA CAMBIO IMAGINE PERSONAGGIO
        else if (mouseX >= 1100 && mouseX <= 1200 && mouseY >= 500 && mouseY <= 600) {
            playerImage = loadImage("img/carl.png");
            console.log("basso dx");
        }
        //SE VIENE SCELTO PULSANTE AL CENTRO TORNO AL MENU
        else if (mouseX >= width / 2 - 65 && mouseX <= width / 2 + 65 && mouseY >= height / 2 - 50 && mouseY <= height / 2 + 50) {
            schermata = 0;
            screen1(); //VISUALIZZO SCHERMATA INIZIALE
        }
    }
    

    //PULSANTE RIPRENDI GIOCO PAUSA
    if(schermata == 3){
        if(mouseX >= 442 && mouseX <= 543 &&mouseY >= 381 && mouseY <= 447){
            schermata = 1;
            screen1(); //VISUALIZZO SCHERMATA DEL GIOCO 
        }
    }

    //PULSANTE RITORNA AL MENU
    if(schermata == 3){
        if(mouseX >= 730 && mouseX <= 830 && mouseY >= 405 && mouseY <= 501){
            location.reload();  //RICARICO LA PAGINA 
        }
    }
}



function keyPressed() {
    //PREMI SPAZIO PER SALTARE
    if(key === " ") {
        player.jump();
        suonoSalto.play();
    }
    //PREMI D PER SPARARE, VALIDO SOLO QUANDO LA SCHERMATA E' LA 2 (CORRISPONDE AL LIVELLO 2)
    else if (key === "d" && schermata === 2 && numProiettili > 0) {
        player.sparare();
        suonoPro.play();
        numProiettili--;
    }
    //PREMI ESC PER METTERE LA SCHERMATA 3 (CORRISPNDE ALLA PAUISA)
    else if (keyCode === ESCAPE){
        schermata = 3;
    }
}


//SCHERMATA INIZALE DEL GICOO 
function screen1(){
    background(inizioImg);
}

//SCHERMATA CHE CORRISPONDE AL LIVELLO 1
function screen2() {
    //SFONDO LIVELLO 
    background(sfondoImg);

    //AGGIUNGO  GLI OSTACOLI CASUALMENTE 
    if (random(1) < 0.0090) { 
        ostacolo.push(new Ostacolo()); 
    }
    //AGGIUNGOHGEMME CASUALMENTE
    if (random(1) < 0.015) { 
        gemme.push(new Gemma()); 
    }

    //MOSTRO PLAYER E PUNTEGGIO
    player.show();
    player.move(); 
    punteggio.show();

    //MOSTROLE VITE DE L GIOCATORE
    for (let i = 0; i < vite; i++) { 
        let x = width / 2 - 35 + i * 40; 
        let y = 20; 
        image(vitaImg, x, y, 30, 30); 
    }

    //GESTIONE DELLE GEMME
    for (let gemma of gemme) {
        //MUOVO LE GEMME E LE MOSTRO SULLO SCHERMO 
        gemma.move(); 
        gemma.show();
        //SE IL GIOCATORE COLPISCE UNA GEMMA SALTANDO
        if (player.hits(gemma)) { 
            suonoGem.play(); 
            gemme.splice(gemme.indexOf(gemma), 1); //RIMUOVO LA GEMMA
            punteggio.incrementa();
        } 
    }

    //GESTIONE DEI MOSTRI (OSTACOLI )
    for (let i = ostacolo.length - 1; i >= 0; i--) { //PER OGNI OSTACOLO PRESENTE NEL VETTORE
        let ost = ostacolo[i]; 
        ost.move(); //VISUALIZZOE SPOSTO OSTACOLO SULLO SCJERmo
        ost.show();
        //SE PLAYER COLPISCE OSTACOLO
        if (player.hits(ost)) { 
            vite--; //DIMINUISCO VITA
            if (vite < 1) { //SE VITE FINITE
                suonoSott.stop(); 
                suonoSalto.setVolume(0); 
                suonoLose.play(); 
                schermata = 6; //SCHERMATA DEL GAME OVER
            } 
            ostacolo.splice(i, 1); 
            cont++; 
        } 
    }

    //CONTROLLO SE IL GIOCATORE HA VINTO 
    if (punteggio.contaPunti() >= 20) { 
        schermata = 7; 
        suonoVittoria.play(); 
    } 
}

//LIVELLO 2 DEL GIOCO
function screen3() {

    //SFONDO GIOCO 
    background(sfondoImg);

    //AGGIUNGO OSTACOLI 
    if (random(1) < 0.0090) { 
        ostacolo.push(new Ostacolo()); 
    }

    //AGGIUNTA DELLEGEMME
    if (random(1) < 0.015) { 
        gemme.push(new Gemma()); 
    }

    //MOSTRA PLAYER E PUNTEGGIO
    player.show();
    player.move(); 
    //MOSTRA PROIETTILI SULLO SCHERMO
    for (let proiettile of player.proiettili) {
        proiettile.move();
        proiettile.show();
    }
    //MOSTRA PUNTEGGIO
    punteggio.show();
    //MOSTRA VITE GIOCATORE
    for (let i = 0; i < vite; i++) { 
        let x = width / 2 - 35 + i * 40; 
        let y = 20; 
        image(vitaImg, x, y, 30, 30); 
    }

    //GESTIONE GEMME
    for (let gemma of gemme) { 
        gemma.move(); 
        gemma.show();
        if (player.hits(gemma)) { 
            if (vite < 1) { 
                suonoSott.stop(); 
                suonoSalto.setVolume(0); 
                suonoLose.play(); 
                schermata = 6; 
            }
            suonoGem.play(); 
            gemme.splice(gemme.indexOf(gemma), 1); 
            //punteggio.incrementa(); 
        } 
    }
    //GESTIONE MOSTRI
    for (let i = ostacolo.length - 1; i >= 0; i--) { 
        let ost = ostacolo[i]; 
        ost.move(); 
        ost.show();
        if (player.hits(ost)) { 
            vite--; 
            if (vite < 1) { 
                suonoSott.stop(); 
                suonoSalto.setVolume(0); 
                suonoLose.play(); 
                schermata = 6; 
            } 
            ostacolo.splice(i, 1); 
            cont++; 
        } 
    }
    //GESTIONE DELLE COLLISIONI
    for (let i = player.proiettili.length - 1; i >= 0; i--) {   //SCORRO I VETTORI DI PROIETTILI E OSTACOLI
        let proiettile = player.proiettili[i];
        for (let j = ostacolo.length - 1; j >= 0; j--) {
            let ost = ostacolo[j];
            if (proiettile.checkCollisione(ost)) {  //SE IL PROIETTILE COLPISCE L'OSTACOLO
                player.proiettili.splice(i, 1); //RIMOZIONE
                ostacolo.splice(j, 1);
                break;
            }
        }
    }
    
    //CONTROLLO VITTORIA GIOCATORE
    if (punteggio.contaPunti() >= 20) { 
        schermata = 7; 
        suonoVittoria.play(); 
    } 
}


//SCHERMATA DI PAUSA
function screen4(){
    background(pausaImg);
}

//SCHERMATA SCELTA GIOCATORE
function screen5() {
    background(sceltaImg); 
}

//SCHERMATA SCELTA LIVELLO
function screen6() {
    background(livelliImg);
}

//SCHERMATA DI GAMEOVER
function screen7(){
    background(gameOverImg);
    punteggio.show();

    //FUNZIONE PER ASPETTARE 5 SECONDI
    setTimeout(function() {
        location.reload();
    }, 5000);
}

//SCHERMATA DI VITTORIA
function screen8(){
    background(vittoriaImg);
    suonoSott.stop();
    suonoSalto.setVolume(0);

    //FUNZIONE PER ASPETTARE 5 SECONDI
    setTimeout(function() {
        location.reload();
    }, 5000);
}


function mouseClicked() {
    //SE LA SCHERMATA E QUELLA DEI LIVELLI
    if (schermata === 5) {
        //SE CLICK SU OUKSANTE LVELLO 1
        if (mouseX >= 300 && mouseX <= 450 && mouseY >= 300 && mouseY <= 350) {
            schermata = 1;
            screen2(); //CHIAMO FUNZIONE GIOCO LIVELLO 1
        }
        //SE CLICK SU PULSANTE LIVLLO 2
        else if (mouseX >= 800 && mouseX <= 950 && mouseY >= 300 && mouseY <= 350) {
            schermata = 2;
            screen3(); //CHIAMO FUNZIONE GIOCO LIVLLO 2
        }
    }
}

//FUNZIONE DRAW CHE RAPPRESENTA IL GIOCO E VIENE SEMPRE ESEGUITA IN LOOP
function draw(){
    let funz = "screen" + (schermata + 1);  //CONTIENE LA STRINGA SCREEN + NUMERO SCHERMATA +1
    if (typeof window[funz] === 'function') {   //VERIFICO SE ESISTE UNA FUNZIONE CON IL NOME NELLA VARIABILE FUNZ
        window[funz](); //SE ESISTE LA ESEGUE
    }
}
