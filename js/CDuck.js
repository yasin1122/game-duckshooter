function CDuck(oContainer, iDuckColor){
    var TIME_HIT_STOP = 300;
    
    var _iSpeedY;
    var _iHalfHeight;
    var _iHalfWidth;
    var _iCntFrames;
    var _iStepSpeed;
    var _iMaxFrames;
    var _iInterpolationType;
    var _iCurTimeElaps;
    
    var _bUpdate;
    var _bHit;

    var _aTrajectoryPoint;
    var _aObjSpriteSheet;
    
    
    var _oContainer;
    var _oSprite;
    var _oRect;
    
    var _pStartPoint;
    var _pEndPoint;
 
    this._init = function(oContainer, iDuckColor){
        _iCntFrames=0;
        _iStepSpeed=DUCK_START_SPEED;
        _iMaxFrames=200;        
        _iHalfWidth = 100;
        _iHalfHeight =102;
        _iCurTimeElaps = TIME_HIT_STOP;
        
        _bHit=false;
        
        _aObjSpriteSheet = new Array();
        
        _oContainer = oContainer;

        
        
        _oRect = new createjs.Rectangle(0,0, 160, 80);

        
        _oSprite = createSprite(s_aDuckSpriteSheets[iDuckColor], "fly",100,102,200,204);
        _oSprite.visible=false;
      
        _oSprite.stop();
        _oContainer.addChild(_oSprite);
        
    };
   
    this._changeSprite = function(){
        var variable = Math.floor(Math.random()*4);
        _oSprite.spriteSheet=s_aDuckSpriteSheets[variable];
        
    };
   
    
    this._calculateMid = function(){
        var t0;
       
         if (_pStartPoint.x > _pEndPoint.x ){
                t0 = new createjs.Point(_pStartPoint.x + ((_pStartPoint.x - _pEndPoint.x) * 0.2), _pEndPoint.y - _iHalfHeight/2);
        }else{
                t0 = new createjs.Point(_pEndPoint.x - ((_pEndPoint.x-_pStartPoint.x)*0.2), _pEndPoint.y - _iHalfHeight/2);
        }
        
        _aTrajectoryPoint = {start:_pStartPoint,end:_pEndPoint,traj:t0};
        
    };
    
    this._selectInterpolation = function(){
        _iInterpolationType = Math.floor(Math.random() * 2);
    };
    
    
    this.reset = function(pStart,pEnd){
        //this._changeSprite();
        createjs.Tween.removeTweens(_oSprite);        
        _oSprite.x = pStart.x;
        _oSprite.y = pStart.y;
        _pStartPoint = pStart;
        _pEndPoint = pEnd;
        _bHit=false;
        _iCurTimeElaps = TIME_HIT_STOP;
        
      this._calculateMid();
      this._selectInterpolation();  
    };
    
    this.increaseSpeed= function(){
        _iStepSpeed += DUCK_INCREASE_SPEED; //Double duck speed
    };
       
    this.unload = function(){
        _oContainer.removeChild(_oSprite);        
    };
    
    this.show = function(){
        if(_pStartPoint.x<CANVAS_WIDTH/2){
            _oSprite.scaleX=-1;
        }
        if(_pStartPoint.x>CANVAS_WIDTH/2){
            _oSprite.scaleX=1;
        }
        
        _oSprite.visible=true;
        _oSprite.gotoAndPlay("fly");              
        _bUpdate = true;
    };
    
    this.unShow = function(){
        _oSprite.visible=false;
    };
    
    this._updateRect=function(){
        _oRect.x=_oSprite.x -80; 
        _oRect.y=_oSprite.y -40; 
    };
    
    this.target=function(){
        return {x:_oRect.x, y:_oRect.y, w:_oRect.width, h:_oRect.height};
    };
    
    this.setVisible = function(){
        _oSprite.visible=true;
        
    };
    
    this.isVisible = function(){
        return _oSprite.visible;
    };
    
    this.onHit = function(){
        _oSprite.alpha = 1;                      
        _iSpeedY = 1;

        _oSprite.gotoAndPlay("hit");   
        _iCntFrames = 0;
        _bHit = true;
        _bUpdate = true;
    };
            
    this.getSprite = function(){
        return _oSprite;
    };
    
    this.getPos = function(){
        return { x: _oSprite.x, y: _oSprite.y};
    };
    
    this.isHit=function(){
        return _bHit;
    };
    
    this._updateFly = function(){
           _iCntFrames += _iStepSpeed;
           
            if (_iCntFrames > _iMaxFrames) {
                    _iCntFrames = 0;
                    _oSprite.visible=false; //this is to resolve an issue when ducks respawn
                    _bUpdate = false;
                    s_oGame.setNoHitPane();
                    s_oGame.checkDuck();
                    s_oGame.subtractLife();
            }

            var fLerp; 
            
            
            switch(_iInterpolationType) {
                    case 0: {
                            fLerp=easeLinear( _iCntFrames, 0, 1, _iMaxFrames);//LINEAR
                            break;
                    }
                    case 1: {
                            fLerp=easeInSine( _iCntFrames, 0, 1, _iMaxFrames);
                              
                    }       break;
            }
            
            var pPos = getTrajectoryPoint(fLerp, _aTrajectoryPoint);
            _oSprite.x = pPos.x;
            _oSprite.y = pPos.y;

            
            this._updateRect();
    };

    this._updateFall = function(){
        createjs.Tween.get(_oSprite).to({y:CANVAS_HEIGHT}, 1000, createjs.Ease.quadIn).call(function(){s_oGame.checkDuck()}).call(function(){s_oGame.setHitPane()});
    };
    
    this.update = function(){
        if(_bUpdate){
            switch(_oSprite.currentAnimation){
                case "fly":{
                        this._updateFly();
                }break;
                case "hit_stop":{
                        _iCurTimeElaps -= s_iTimeElaps;
                        if(_iCurTimeElaps<0){
                            _iCurTimeElaps = TIME_HIT_STOP;
                            _oSprite.gotoAndPlay("fall");
                        } 
                }break; 
                case "fall":{
                        this._updateFall();
                        _bUpdate = false;
                }break;            
            }         
        } 
    };
    
    
    this._init(oContainer, iDuckColor);
}    
   