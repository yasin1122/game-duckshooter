function CGame(oData){
    var _iScore;
    var _iBullets;  
    var _iNumDuck;
    var _iCurTimeElaps;
    var _iDuckOnScreen;
    var _iPlayerLife;
    var _iCurStage;
    var _iMultiShot;
    var _iMaxDucks;
    var _iSegmentOffset;
    var _iRock1SxWidth;
    var _iRock1DxWidth;
   
    var _bStartGame=false;
    var _bTouchActive;
      
    var _aDucks;    
    var _aStart;
    var _aEndLeft;
    var _aEndRight;
    var _aRandStart;
    var _aRandEnd;
   
    var _oInterface;
    var _oEndPanel = null;
    var _oGrassContainer;
    var _oRockContainer;
    var _oDuckContainer;
    var _oHelpPanel;
    var _oEndPanel;   
    var _oScope;
    var _oJoypad = null;

    
    this._init = function(){
        _iScore = 0;
        _iNumDuck = 0;
        _iCurTimeElaps = BONUS_TIME;        
        _iBullets=NUM_BULLETS;
        _iDuckOnScreen=0;
        _iPlayerLife=PLAYER_LIVES;
        _iCurStage=0;
        _iMaxDucks=0;
	_iMultiShot=0;
        
        _iSegmentOffset = Math.PI / 8;
        
        _bTouchActive=false;
        
        _aStart = new Array();
        _aEndLeft = new Array();
        _aEndRight = new Array();
        _aRandStart = new Array();
        _aRandEnd = new Array();
        
        _oEndPanel = null;
        
        new CDuckSettings();        
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(oBg); 
        
 
        _oDuckContainer = new createjs.Container();
        s_oStage.addChild(_oDuckContainer);

        
        var oSprite = s_oSpriteLibrary.getSprite('grass');
        var oGrass = createBitmap(oSprite);
        _oGrassContainer = new createjs.Container();
        _oGrassContainer.x = CANVAS_WIDTH/2- oSprite.width/2;
        _oGrassContainer.y = CANVAS_HEIGHT- oSprite.height;
        s_oStage.addChild(_oGrassContainer);               
        _oGrassContainer.addChild(oGrass);


        _oRockContainer = new createjs.Container();
        s_oStage.addChild(_oRockContainer);
        _oRockContainer.on("mousedown", function(){});
        
        var oSprite = s_oSpriteLibrary.getSprite('rock_sx_1');
        _iRock1SxWidth = oSprite.width;
        var oRock1Sx = createBitmap(oSprite);
        _oRockContainer.addChild(oRock1Sx);

        var oSprite = s_oSpriteLibrary.getSprite('rock_sx_2');
        var oRock2Sx = createBitmap(oSprite);
        oRock2Sx.regY = oSprite.height;
        oRock2Sx.y = CANVAS_HEIGHT;
        oRock2Sx.x = _iRock1SxWidth;
        _oRockContainer.addChild(oRock2Sx);

        var oSprite = s_oSpriteLibrary.getSprite('rock_dx_1');
        _iRock1DxWidth = oSprite.width;
        var oRock1Dx = createBitmap(oSprite);
        oRock1Dx.regX = _iRock1DxWidth;
        oRock1Dx.x = CANVAS_WIDTH;
        _oRockContainer.addChild(oRock1Dx);

        var oSprite = s_oSpriteLibrary.getSprite('rock_dx_2');
        var oRock2Dx = createBitmap(oSprite);
        oRock2Dx.regX = oSprite.width;
        oRock2Dx.regY = oSprite.height;
        oRock2Dx.x = CANVAS_WIDTH - _iRock1DxWidth;
        oRock2Dx.y = CANVAS_HEIGHT;        
        _oRockContainer.addChild(oRock2Dx);


        _oScope = new CScope();
        
        
        _oInterface = new CInterface();

        
        
        this._initDucks();
        this._initPos();
        this.initDuckObj();
        

        _oHelpPanel = new CHelpPanel();
    

        setVolume("soundtrack", 0.5);
        
    };
    
	
    
    this.unload = function(){
        _bStartGame = false;
        
        _oScope.unload();
        _oInterface.unload();
        if(_oEndPanel !== null){
            _oEndPanel.unload();
        }
        
        for(var i=0;i<_aDucks.length;i++){
            _aDucks[i].unload();
        }
        _oRockContainer.off("mousedown", function(){});
        
        if(!s_bMobile) {
            //KEY LISTENER
            document.onkeydown   = null; 
            document.onkeyup   = null; 
 
        }
        
	s_oStage.removeAllChildren();
    };
    
    //Read the maximum ducks number between stages, inserted by user. 
    this._initDucks = function(){

        _iMaxDucks = 12;
        _aDucks = new Array();
        
        var iDuckColor;
        for(var i=0; i<_iMaxDucks; i++){
             iDuckColor = i%4;
            _aDucks.push(new CDuck(_oDuckContainer, iDuckColor));
        }
    };
    
    this._initPos = function(){
        var iOffset=_iRock1SxWidth;
        while(iOffset<CANVAS_WIDTH - _iRock1DxWidth){
            _aStart.push(new createjs.Point(iOffset,565));            
            iOffset+=CANVAS_WIDTH/20;
        }
        
        for(var i=0; i<_aStart.length; i++){
            _aRandStart.push(i);
        }
                
        //Set Standard End Position       
        _aEndLeft[0]= new createjs.Point(-120,400); //offset is set to 120 to be sure that the duck exit out the screen
        _aEndLeft[1]= new createjs.Point(-120,200);
        _aEndLeft[2]= new createjs.Point(250 + _iRock1SxWidth,-120);
        _aEndLeft[3]= new createjs.Point(500 + _iRock1SxWidth,-120);
        
        _aEndRight[0]= new createjs.Point(CANVAS_WIDTH+120,400);
        _aEndRight[1]= new createjs.Point(CANVAS_WIDTH+120,200);
        _aEndRight[2]= new createjs.Point(1000 - _iRock1DxWidth,-120);
        _aEndRight[3]= new createjs.Point(750 - _iRock1DxWidth,-120);
       
       
       
        for(var i=0; i<_aEndLeft.length; i++){
            _aRandEnd.push(i);
        }
        
        
        
    };
    
    
    
    this.initDuckObj = function(){
        playSound("duck_intro",1,false);
        
        //Set random start position
        if(_iCurStage===DUCK_ON_SCREEN.length){
            _iCurStage=0;                        
            for(var i=0; i<_aDucks.length; i++){
                _aDucks[i].increaseSpeed();
            }
        }
               
        shuffle(_aRandStart);
        shuffle(_aRandEnd);
        
        var aColorDuck = new Array();       
        for(var i=0; i<_iMaxDucks; i++){
            aColorDuck.push(i);
        }
        shuffle(aColorDuck);
                
        //Reset Ducks position, and check that other ducks don't start from same one        
        for (var i=0; i<DUCK_ON_SCREEN[_iCurStage]; i++){
            var iColor = aColorDuck[i];
            if (_aRandStart[i]<_aStart.length/2){
                    _aDucks[iColor].reset(_aStart[_aRandStart[i]],_aEndRight[_aRandEnd[i]]);
            }else {
                    _aDucks[iColor].reset(_aStart[_aRandStart[i]],_aEndLeft[_aRandEnd[i]]);
            }
        
            _iNumDuck++;
            _aDucks[iColor].show();
        }
        
        _iDuckOnScreen=DUCK_ON_SCREEN[_iCurStage];
        _iCurStage++;    
            
        this._refreshScreen();
        
    };
    
    
    
    this.checkDuck = function(){
        _iDuckOnScreen--;
        if(_iDuckOnScreen===0){
            this.initDuckObj();
        }
    };
    
    
    function onKeyUp(evt) { 
        //SPACEBAR
        evt.preventDefault();
        switch(evt.keyCode) {  
           // left  
           case 37: {
                   _oScope.leftStop();
                   break; 
               }
           //up  
           case 38: {
                   _oScope.upStop();
                   break; 
               }         
                
           // right  
           case 39: {
                   _oScope.rightStop();
                   break; 
               }
		   //down
           case 40: {
                   _oScope.downStop();
                   break; 
               }     
        }  
    }

    function onKeyDown(evt) { 
        if(!evt){ 
            evt = window.event; 
        } 
        evt.preventDefault();
        switch(evt.keyCode) {
           
            case 32:{                    
                        s_oGame.onShot();                    
                    break;
            }
            
           // left  
           case 37: {
                   s_oGame.onLeft();
                   break; 
               }
           //up  
           case 38: {
                   s_oGame.onUp();
                   break; 
               }         
                
           // right  
           case 39: {
                   s_oGame.onRight();
                   break; 
               }
		   //down
           case 40: {
                   s_oGame.onDown();
                   break; 
               }     
        }  
    }
    
    
    this.onKeyUpReleased = function(){
       _oScope.upStop();
    };
    
    this.onKeyDownReleased = function(){
       _oScope.downStop();
    };
    
    this.onKeyLeftReleased = function(){
       _oScope.leftStop();
    };
    
    this.onKeyRightReleased = function(){
       _oScope.rightStop();
    };
    
    this.onLeft = function(){
       _oScope.moveLeft();
    };
    
    this.onRight = function(){
        _oScope.moveRight();        
    };
       
    this.onUp = function(){
        _oScope.moveUp();
    };
      
    this.onDown = function(){
        _oScope.moveDown();
    };
    
    this.onShot = function(){
        if(_iBullets === 0){
            _oInterface.noAmmo();
            
            playSound("no_bullets",1,false);
            
        } else {
            _iBullets--;
            _oInterface.refreshBullets(_iBullets);
            _oScope.playShot();
            
            for(var i=0; i<_iMaxDucks; i++){
                this.checkCollision(_aDucks[i]);
            }
        }
    };
    
    this._reloadRifle = function(){
        _iBullets = NUM_BULLETS;
        _oInterface.reloadBullets(_iBullets);
    };
    
    this._showTime = function(){        
        _oInterface.refreshTime(_iCurTimeElaps);
    };
    
    this._checkIfDuckHit = function(oDuck){
        
        if(_oScope.bullsEye().x < _iRock1SxWidth || _oScope.bullsEye().x > CANVAS_WIDTH - _iRock1DxWidth){
            return false;
        }
        
        if(_oScope.bullsEye().x > oDuck.target().x){
            if(_oScope.bullsEye().x < (oDuck.target().x+oDuck.target().w)){
                if(_oScope.bullsEye().y > oDuck.target().y){
                    if(_oScope.bullsEye().y<(oDuck.target().y+oDuck.target().h)){
                        return true;                
                    }                                                            
                }                                        
            }                            
        }   
    };
    
    this.checkCollision = function(oDuck){
          //CHECK COLLISION BETWEEN DUCK AND SCOPE         
          if (this._checkIfDuckHit(oDuck) && oDuck.isVisible()&&!oDuck.isHit()) {  
            oDuck.onHit();
            
            var iTmpScore = (SCORE_HIT + _iCurTimeElaps);

            // Check if more then one duck is hit by one shot
            _iMultiShot++;
            if(_iMultiShot > 1){            
                    iTmpScore *= _iMultiShot;          
            }
            _iMultiShot=0;
			
            _iScore += iTmpScore;

            new CScoreText(iTmpScore,oDuck.getPos().x,oDuck.getPos().y);

            _oInterface.refreshScore(_iScore);
		
            playSound("duck_hit",1,false);
        }
    };
    
    this.setHitPane=function(){
        _oInterface.setHit();       
    };
    
    this.setNoHitPane=function(){
        _oInterface.setNoHit();
    };
    
    this.subtractLife=function(){
        _iPlayerLife--;
        
        if(_iPlayerLife <= 0){
            _iPlayerLife = 0;
            this.gameOver();
            _bStartGame=false;
        }
        _oInterface.refreshLife(_iPlayerLife);
    };
    
    this._refreshScreen = function(){
        this._reloadRifle();
        _iCurTimeElaps=BONUS_TIME;
        _oInterface.noAmmoDelete();                
    };

    this.onExit = function(){
        
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("end_level",1);
        $(s_oMain).trigger("show_interlevel_ad");
        this.unload();
        s_oMain.gotoMenu();
    };
    
    this.onRestart = function(){
        this.unload();
        s_oMain.gotoGame();
        
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("restart_level",1);
    };
    
    this._onExitHelp = function () {
         _bStartGame = true;
         //TOUCH EVENTS
        if(!s_bMobile) {
            //KEY LISTENER
            document.onkeydown   = onKeyDown; 
            document.onkeyup   = onKeyUp; 
 
        } else {
            var oJoypadSprite = s_oSpriteLibrary.getSprite('joypad');
            _oJoypad = new CJoypad(oJoypadSprite, 100, 700, s_oStage, false);
            _oJoypad.addFireButtonListener(ON_MOUSE_DOWN, this.onShot, this);
        }
    };
    
    this.gameOver = function(){  
        if(_oEndPanel === null){
            playSound("game_over",1,false);
        
            _oEndPanel = new CEndPanel(s_oSpriteLibrary.getSprite('msg_box'));
            _oEndPanel.show(_iScore);
        }
        
    };
    
    this.checkController = function(iDirection){
        
        if(iDirection === null){
            _oScope.resetAllDirection();
        } else {
            
            if(iDirection >= -_iSegmentOffset && iDirection < _iSegmentOffset ){
                //RIGHT;
                _oScope.moveRight();
            
                _oScope.downStop();
                _oScope.upStop();
                _oScope.leftStop();
                return;
                
            } else if(iDirection >= _iSegmentOffset && iDirection < _iSegmentOffset*3){
                //DOWNRIGHT;
                _oScope.moveDown();
                _oScope.moveRight();

                _oScope.upStop();
                _oScope.leftStop();
                return;
                
            } else if(iDirection >= _iSegmentOffset*3 && iDirection < _iSegmentOffset*5){
                //DOWN;
                _oScope.moveDown();
            
                _oScope.upStop();
                _oScope.rightStop();
                _oScope.leftStop();
                return;
            } else if(iDirection >= _iSegmentOffset*5 && iDirection < _iSegmentOffset*7){
                //DOWNLEFT;
                _oScope.moveDown();
                _oScope.moveLeft();

                _oScope.upStop();
                _oScope.rightStop();
                return;
                
            } else if(iDirection >= _iSegmentOffset*7 || iDirection < -_iSegmentOffset*7){
                //LEFT;
                _oScope.moveLeft();
            
                _oScope.downStop();
                _oScope.rightStop();
                _oScope.upStop();
                return;
                
            } else if(iDirection >= -_iSegmentOffset*7 && iDirection < -_iSegmentOffset*5){
                //LEFTUP;
                _oScope.moveUp();
                _oScope.moveLeft();

                _oScope.downStop();
                _oScope.rightStop();
                return;
                
            } else if(iDirection >= -_iSegmentOffset*5 && iDirection < -_iSegmentOffset*3){
                //UP;
                _oScope.moveUp();
            
                _oScope.downStop();
                _oScope.rightStop();
                _oScope.leftStop();
			
                return;
                
            } else if(iDirection >= -_iSegmentOffset*3 && iDirection < -_iSegmentOffset){
                //UPRIGHT;
                _oScope.moveUp();
                _oScope.moveRight();

                _oScope.downStop();
                _oScope.leftStop();
                return;
            }    
        }

    };
    
    this.update = function(){
        if(_bStartGame){      
            
            if(_oJoypad){
                this.checkController(_oJoypad.update());
            }

            for(var i=0; i<_iMaxDucks; i++){
                _aDucks[i].update();
            }

            _oScope.update();

            _iCurTimeElaps -= s_iTimeElaps;
            if(_iCurTimeElaps < 0){
                    _iCurTimeElaps = 0;
            }

            this._showTime();
           
        }
    };

    s_oGame=this;
    
	SCOPE_ACCELERATION = oData.scope_accelleration;
	SCOPE_FRICTION = oData.scope_friction;
	MAX_SCOPE_SPEED = oData.max_scope_speed;
	NUM_BULLETS = oData.num_bullets;
	SCORE_HIT = oData.hit_score;
	BONUS_TIME = oData.bonus_time;
	PLAYER_LIVES = oData.lives;
	DUCK_INCREASE_SPEED = oData.duck_increase_speed;
	DUCK_ON_SCREEN = oData.duck_occurence;

    this._init();
}

var s_oGame;
