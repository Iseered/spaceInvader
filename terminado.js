

var empezar;
var Terminado ={
	preload: function () {
juego.load.image('fondo','img/fin.jpg'); 




	},

	create: function(){
		juego.add.tileSprite(0,0,400,540,'fondo');
		juego.stage.backgroundColor="#990000";
juego.add.text(120,410,"Presione Barra ",{font:"20px Arial", fill:"#f44336"});
juego.add.text(80,430,"Espaciadora para continuar",{font:"20px Arial", fill:"#f44336"});
empezar=juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	update: function(){
     if(empezar.isDown){

	juego.state.start('Juego');
}
	}

};