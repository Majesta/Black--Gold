BlackGold .Game = function() {
    this.amo = 20;
    //to keep track of how often you can shoot
    this.shootTimer = 0;
    //  will have to wait 100 microseconds before you can shoot again. adds a buffer to time
    this.shootRate = 500;
    this.score=0
    this.move=1;
}

BlackGold.Game.prototype = {
    
    create: function() {
        this.background = this.add.sprite(0,0,'background');
        this.background.scale.setTo(5);
        this.add.text(16, 16, "Current State: Game.", { font: "16px Arial", fill: "#ffffff" });
        
        this.amoLabel = this.add.text(16, 100, "Amo left: " +this.amo, { font: "16px Arial", fill: "#ffffff" });
        this.scoreLabel = this.add.text(16, 200, "score: " +this.score, { font: "16px Arial", fill: "#ffffff" });
        
        this.player = this.add.sprite(this.game.width/2, 100 , 'player');
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.anchor.setTo(0.5);
        this.player.body.collideWorldBounds = true;

        this.basket = this.add.sprite(this.game.width/2, this.game.height-100, 'basket');
        this.physics.enable(this.basket, Phaser.Physics.ARCADE);
        this.basket.anchor.setTo(.5);
        this.basket.scale.setTo(0.4)
        this.player.scale.setTo(0.2)
        //this.basket.body.collideWorldBounds=true;
        
        this.jumpKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
        this.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.A);
        this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.D);
        this.shootKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        this.papers= this.game.add.group();
        
    },
    
    update: function() {
        this.amoLabel.text= "Amo left: " + this.amo;
        this.scoreLabel.text= "score: " + this.score;
        this.player.body.velocity.x=0;
        this.changeDirection();
        if (this.move==1){
            this.basket.body.velocity.x=200;
        }else{
            this.basket.body.velocity.x=-200;
        }
            
        if(this.rightKey.isDown){
            console.log('infinity');
            this.player.body.velocity.x = 500;
        }
        
        3
        if(this.leftKey.isDown){
            this.player.body.velocity.x = -500;
        }
        
        
        if(this.shootKey.isDown){
            if( this.shootTimer<this.game.time.now && this.amo> 0){
                console.log('this is running')
                this.createPaper();
                this.amo-=1;
                this.shootTimer = this.game.time.now + this.shootRate;
            }
        }
        this.game.physics.arcade.overlap(this.basket,this.papers,this.paperscore,null,this); 
    
    
    },
    
     createPaper: function () {
        var x = this.player.body.x;
        var y = this.player.body.y;
        var paper = this.papers.getFirstExists(false);
        if (!paper) {
            paper = new Paper(this.game, 0,0);
            this.papers.add(paper);
        }
        paper.reset(x, y);
        paper.revive();
     },
    
    changeDirection: function(){
        if(this.basket.body.x>=this.game.height){
            this.move=0;
        }else if(this.basket.body.x <=0){
            this.move=1;
        }
    },
    
    paperscore: function (basket,paper){
        paper.kill();    
        this.score+=1;
    
    }
    
        
        
}
