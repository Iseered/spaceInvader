
var nave;
var balas;
var tiempoEntreBalas=400;
var tiempo=0;
var malos;
var timer;
var puntos;
var txtpuntos;
var fondoJuego;

var Juego={
	preload: function () {
		juego.load.image('nave','img/nave2.png');
		juego.load.image('laser','img/laser.png');
		juego.load.image('malo','img/robot.png');
		juego.load.image('bg','img/bg.png');
	},

	create: function(){
		fondoJuego=juego.add.tileSprite(0,0,400,540,'bg');
     juego.physics.startSystem(Phaser.Physics.ARCADE);
     nave=juego.add.sprite(juego.width/2,485,'nave');
     juego.physics.arcade.enable(nave,true);

     juego.add.text(210,510,"Marlon Brian Ramírez Rueda",{font:"14px Arial", fill:"#f0f436"});
     nave.anchor.setTo(0.5);


     balas=juego.add.group();
     balas.enableBody=true;
     balas.setBodyType=Phaser.Physics.ARCADE;
     balas.createMultiple(50,'laser');
     balas.setAll('anchor.x',0.5);
      balas.setAll('anchor.y',0.5);
       balas.setAll('checkWorldBounds',true);
        balas.setAll('outOfBoundsKill',true);


 malos=juego.add.group();
     malos.enableBody=true;
     malos.setBodyType=Phaser.Physics.ARCADE;
     malos.createMultiple(30,'malo');
     malos.setAll('anchor.x',0.5);
      malos.setAll('anchor.y',0.5);
       malos.setAll('checkWorldBounds',true);
        malos.setAll('outOfBoundsKill',true);


        timer=juego.time.events.loop(2000,this.crearEnemigo,this);

        puntos=0;
        juego.add.text(20,20,"Puntos : " ,{font:"14px Arial", fill:"#FFF"});
           txtpuntos= juego.add.text(80,20,"0 " ,{font:"14px Arial", fill:"#FFF"});


           vidas=3;
           juego.add.text(310,20,"Vidas : " ,{font:"14px Arial", fill:"#FFF"});
           txtVidas= juego.add.text(360,20,"3 " ,{font:"14px Arial", fill:"#FFF"});

	},
	update: function(){

		fondoJuego.tilePosition.y+=1;
     nave.rotation=juego.physics.arcade.angleToPointer(nave)+Math.PI/2;

if(juego.input.activePointer.isDown){
	var audio = new Audio('musica/musica.mp3');
    audio.currentTime = 0.2;
    audio.playbackRate = 2.8;
    audio.play();
    
this.disparar();

}	
//aggregando colision
juego.physics.arcade.overlap(balas,malos,this.colision,null,this);
var end=juego.physics.arcade.overlap(nave,malos,this.colision,null,this);

//definiendo contador de vidas
malos.forEachAlive(function(m){
	if(m.position.y>520 &&  m.position.y<521){
		vidas -=1;
		txtVidas.text=vidas;

	}
});
if(vidas==0 || end ){

	juego.state.start('Terminado');
}

	},
	disparar:function(){

		if(juego.time.now>tiempo && balas.countDead()>0){

			tiempo=juego.time.now+tiempoEntreBalas;
			var bala= balas.getFirstDead();
			bala.anchor.setTo(0.5);
			bala.reset(nave.x,nave.y);
			bala.rotation=juego.physics.arcade.angleToPointer(bala)+Math.PI/2;
			juego.physics.arcade.moveToPointer(bala,200);
		}


	},

	crearEnemigo:function(){
		var enem=malos.getFirstDead();
		var num =Math.floor(Math.random()*10+1)
		enem.reset(num*38,0);
		enem.anchor.setTo(0.5);
		enem.body.velocity.y=100;
		enem.checkWorldBounds=true;
		enem.outOfBoundsKill=true;
	},
	colision:function(b,m){
	

    var audio = new Audio('musica/snd_Explosion_Tierra.wav');
    audio.currentTime = 0.2;
    audio.playbackRate = 2.8;
    audio.play();
         b.kill();
         m.kill();
         puntos++;
         txtpuntos.text=puntos;
	}


};