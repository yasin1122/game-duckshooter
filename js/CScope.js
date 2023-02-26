function CScope(){
    var _iHalfWidth;
    var _iHalfHeight;
    
    var _oSprite;
    var _oExplosion;
    
    var _bLeft=false;
    var _bRight=false;
    var _bUp=false;
    var _bDown=false;
    var _iXMove;
    var _iYMove;
    
    var _iXCenter;
    var _iYCenter;
    
    this._init = function(){                
        _iHalfWidth=88;
        _iHalfHeight=87.5;
        _iXMove=0;
        _iYMove=0;
        
       
        var oSprite = s_oSpriteLibrary.getSprite('scope');
        _oSprite = createBitmap(oSprite);
        _oSprite.x = CANVAS_WIDTH/2 - _iHalfWidth;
        _oSprite.y = CANVAS_HEIGHT/2 - _iHalfHeight;
        
        s_oStage.addChild(_oSprite);
        
        var oSpriteExplosion = s_oSpriteLibrary.getSprite('tap_shot');
        var oData = {   // image to use
                        images: [oSpriteExplosion], 
                        // width, height & registration point of each sprite
                        frames: {width: 200, height: 200, regX: 100, regY: 100}, 
                        animations: {  show: [0, 19,"hide"],hide:[20,21] }
                        
        };

        var oSpriteSheetExplosion = new createjs.SpriteSheet(oData);
        _oExplosion = createSprite(oSpriteSheetExplosion, "hide", 100,100,200, 200);
        
        var oParent = this;
        _oExplosion.addEventListener("animationend",oParent.onAnimationEnd);
        _oExplosion.stop();
        _oExplosion.visible = false;
        s_oStage.addChild(_oExplosion);
    };
    
    this.unload= function(){
        var oParent = this;
        _oExplosion.removeEventListener("animationend",oParent.onAnimationEnd);
    };
    
    this.resetAllDirection = function (){
        _bLeft=false;
        _bRight=false;
        _bUp=false;
        _bDown=false;
    };
    
    this.onAnimationEnd = function(){
	_oExplosion.visible = false;
    };
    
    this.playShot = function(){
        _oExplosion.x = _oSprite.x +_iHalfWidth;
        _oExplosion.y = _oSprite.y +_iHalfHeight;
        _oExplosion.visible = true;
        _oExplosion.gotoAndPlay("show");
        
        playSound("shot",1,false);
    };
    
    //Set canvas bound for the scope
    this._checkBoundary = function(){
        if( ((_oSprite.x + _iHalfWidth) > CANVAS_WIDTH-200)){  
            _oSprite.x = CANVAS_WIDTH - _iHalfWidth-200;
        }
     
        if( ((_oSprite.x + _iHalfWidth) < 200)){  
            _oSprite.x = -_iHalfWidth+200;
        }
     
        if( ((_oSprite.y + _iHalfHeight) > CANVAS_HEIGHT)){  
            _oSprite.y = CANVAS_HEIGHT - _iHalfHeight;
        }
     
        if( ((_oSprite.y + _iHalfHeight) < 0)){  
            _oSprite.y = -_iHalfHeight;
        };
    };
        
    this.bullsEye=function(){
        _iXCenter = _oSprite.x + _iHalfWidth;
        _iYCenter = _oSprite.y + _iHalfHeight;
        return{x:_iXCenter, y:_iYCenter};
    };    

    
    this.upStop = function(){
        _bUp=false;
    };
    
    this.downStop = function(){
        _bDown=false;   
    };
    
    this.leftStop = function(){
        _bLeft=false; 
    };
    
    this.rightStop = function(){
        _bRight=false;
       
    };
    
    this.moveLeft = function(){
        _bLeft=true;
        _bRight=false;
    };
    
    this.moveRight = function(){
        _bRight=true;
        _bLeft=false;
    };
       
    this.moveUp = function(){
        _bUp=true;
        _bDown=false;
    };
      
    this.moveDown = function(){
        _bDown=true;
        _bUp=false;
    };
    
    this.getSprite = function(){
        return _oSprite;
    };
    
    
    this.update = function(){ 
        //Set scope movements

        if(_bRight &&_bUp){
            _iXMove += SCOPE_ACCELERATION;
            _iYMove -= SCOPE_ACCELERATION;
        }else if(_bRight &&_bDown){
            _iXMove += SCOPE_ACCELERATION;
            _iYMove += SCOPE_ACCELERATION;
        } else if(_bLeft &&_bDown){
            _iXMove -= SCOPE_ACCELERATION;
            _iYMove += SCOPE_ACCELERATION;
        }else if(_bLeft &&_bUp){
            _iXMove -= SCOPE_ACCELERATION;
            _iYMove -= SCOPE_ACCELERATION;
        } else if(_bLeft){
            _iXMove -= SCOPE_ACCELERATION;
            
        }else if(_bRight){
           _iXMove += SCOPE_ACCELERATION;
        }else if(_bUp){
           _iYMove -= SCOPE_ACCELERATION;     
        }else if(_bDown){
           _iYMove += SCOPE_ACCELERATION;    
        }

        
        _oSprite.x += _iXMove;
        _oSprite.y += _iYMove;        
        _iXMove *= SCOPE_FRICTION;
        _iYMove *= SCOPE_FRICTION;
        
        if (_iXMove > MAX_SCOPE_SPEED) {
                _iXMove = MAX_SCOPE_SPEED;
        }
        
        if (_iXMove < -MAX_SCOPE_SPEED) {
                _iXMove = -MAX_SCOPE_SPEED;
        }
        
         if (_iYMove > MAX_SCOPE_SPEED) {
                _iYMove = MAX_SCOPE_SPEED;
        }
        
        if (_iYMove < -MAX_SCOPE_SPEED) {
                _iYMove = -MAX_SCOPE_SPEED;
        }
        
        if ( Math.abs(_iXMove) < 0.2 ) {
                _iXMove = 0;
        }
        
        if ( Math.abs(_iYMove) < 0.2 ) {
                _iYMove = 0;
        }
        
        this._checkBoundary();
    };
    this._init();
}