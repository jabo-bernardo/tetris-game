var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var Game = {
	tileLanded: true,
	Tile: {
		onMoveLeft: false,
		onMoveRight: false
	},
}

/*
	Guide: (Shape)widthxheight
*/
function Choose() {
	selected = arguments[Math.floor(Math.random() * arguments.length)];
	return selected;
}
window.addEventListener('keydown', keydownHandler, false)
var Blocks = [];
var tileType = ["square32x32", "rectangle32x96", "rectangle96x32", "square64x64"];
var Block = {
	x: undefined,
	y: 0,
	width: undefined,
	height: undefined,
	vy: 2,
	color: undefined,
	stop: false,
	myID: undefined,
	type: undefined,
	updateMovement: function() {

		for(var i = 0; i < Blocks.length; i++) {
			var oblck = Blocks[i];
			if(this.myID != oblck.myID)
			{
				if(this.y + this.height >= oblck.y && 
					(this.x + this.width) > oblck.x && 
					this.x < (oblck.x + oblck.width)) {
					this.stop = true;
				}
			}	
		}

		if(this.y + this.height >= canvas.height) {
				this.stop = true; 
				Game.tileLanded = true 
		}
		if(this.y + this.height < canvas.height && !this.stop) {
			this.y += this.vy
		}
		if(this.stop) {
			Game.tileLanded = true;
		}	
	}
}


setInterval(dropBlock, 5000);

var _32x32img = new Image();
_32x32img.src = "src/32x32.png";
var _64x64img = new Image();
_64x64img.src = "src/64x64.png";
var _32x96img = new Image();
_32x96img.src = "src/32x96.png";
var _96x32img = new Image();
_96x32img.src = "src/96x32.png";

var id = 0
function dropBlock() {
	if(Game.tileLanded) {
		Game.tileLanded = false
		const selectedTile = tileType[Math.floor(Math.random() * tileType.length)];
		var newTile = Object.create(Block);
		if(selectedTile == "square32x32") {
			newTile.width = 32;
			newTile.height = 32;
			newTile.x = Choose(0,32,64,96,128,160,192,224,256,288,320,352,384)
			newTile.myID = id;
			newTile.type = "32x32"
			Blocks.push(newTile)
			Game.tileLanded = false;
			id++
		}
		if(selectedTile == "rectangle32x96") {
			newTile.width = 32;
			newTile.height = 96;
			newTile.x = Choose(0,32,64,96,128,160,192,224,256,288,320,352,384)
			newTile.myID = id;
			newTile.type = "32x96";
			Blocks.push(newTile)
			Game.tileLanded = false;
			id++
		}
		if(selectedTile == "square64x64") {
			newTile.width = 64;
			newTile.height = 64;
			newTile.x = Choose(0,32,64,96,128,160,192,224,256,288,320,352,384)
			newTile.myID = id;
			newTile.type = "64x64";
			Blocks.push(newTile)
			Game.tileLanded = false;
			id++
		}
		if(selectedTile == "rectangle96x32") {
			newTile.width = 96;
			newTile.height = 32;
			newTile.x = Choose(0,32,64,96,128,160,192,224,256,288,320,352,384)
			newTile.myID = id;
			newTile.type = "96x32";
			Blocks.push(newTile)
			Game.tileLanded = false;
			id++
		}
	}
}

function updateMovement() {
	for(var i = 0; i < Blocks.length; i++) {
		var select = Blocks[i];
		if(select.type == "32x32") {
			ctx.drawImage(_32x32img, select.x, select.y)
		}
		if(select.type == "64x64") {
			ctx.drawImage(_64x64img, select.x, select.y)
		}
		if(select.type == "96x32") {
			ctx.drawImage(_96x32img, select.x, select.y)
		}
		if(select.type == "32x96") {
			ctx.drawImage(_32x96img, select.x, select.y)
		}


		select.updateMovement();
		

		if(!select.stop) {
			var selectedTile = select;
			if(Game.Tile.onMoveLeft && selectedTile.x >= 0) {
				selectedTile.x -= 32
				Game.Tile.onMoveLeft = false;
			}
			if(Game.Tile.onMoveRight && selectedTile.x + selectedTile.width <= canvas.width) {
				selectedTile.x += 32
				Game.Tile.onMoveRight = false;
			}

			if(selectedTile.x < 0) {selectedTile.x = 0}
			if(selectedTile.x + selectedTile.width > canvas.width) {selectedTile.x = canvas.width - selectedTile.width}
		}	
	}

}

update();

function update() {
	requestAnimationFrame(update);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	updateMovement();
	check();
}

function check() {
	for(var i = 0; i < Blocks.length; i++) {
		myBlock = Blocks[i];
		if(myBlock.y <= 0) {
			console.log('hello')
			location.reload();
		} 
	}
}

function keydownHandler(evt) {
	if(evt.keyCode == 37 && !Game.Tile.onMoveLeft) {
		Game.Tile.onMoveLeft = true;
	}
	if(evt.keyCode == 39 && !Game.Tile.onMoveRight) {
		Game.Tile.onMoveRight = true;
	} 
}