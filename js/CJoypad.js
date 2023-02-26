function CJoypad(oSprite, iX, iY, oParentContainer, bFixedPosition){
    
    var _iJoypadRadius;
    var _iCurRadius;
    var _iCurAngle;
    var _iActivationTolerance;
    
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams = [];
    
    var _oStick;
    var _oJoypad;
    
    this._init = function(oSprite, iX, iY, oParentContainer, bFixedPosition){
        
        _iJoypadRadius = oSprite.height/2;
        _iCurRadius = 0;
        _iCurAngle = 0;
        _iActivationTolerance = oSprite.height/30;
        
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oJoypad = new createjs.Container();
        _oJoypad.x = iX;
        _oJoypad.y = iY;
        oParentContainer.addChild(_oJoypad);
        
        
        
        var oData = {   
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: oSprite.width/2, height: oSprite.height, regX: (oSprite.width/2)/2, regY: oSprite.height/2}, 
                        animations: {bg:[0],stick:[1]}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        var oBg = createSprite(oSpriteSheet, "bg",(oSprite.width/2)/2,oSprite.height/2,oSprite.width/2,oSprite.height);

        _oStick = createSprite(oSpriteSheet, "stick",(oSprite.width/2)/2,oSprite.height/2,oSprite.width/2,oSprite.height);

        _oJoypad.addChild(oBg, _oStick);        

        if(!bFixedPosition){            
            _oJoypad.visible = false;
        }
        
        oParentContainer.on('mousedown', this.onPressStart);
        oParentContainer.on('pressmove', this.onPressMove);
        oParentContainer.on('pressup', this.onPressRelease);

    };
    
    this.addFireButtonListener = function(iEvent,cbCompleted, cbOwner,aParams){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams = aParams;
    };
    
    
    this.unload = function(){
        
        oParentContainer.off('mousedown', this.onStageStart);
        oParentContainer.off('pressmove', this.onStageMove);
        oParentContainer.off('pressup', this.onStageRelease);
        
        oParentContainer.removeChild(_oJoypad);
    };
    
    this.onPressStart = function(evt){
        if(evt.primary){
            if(evt.stageX < CANVAS_WIDTH/2){
                
                if(!bFixedPosition){
                    _oJoypad.visible = true;
                    _oJoypad.x = evt.stageX;
                    _oJoypad.y = evt.stageY;

                    _oStick.x = 0;
                    _oStick.y = 0;
                }
                
            } else {
                //FIRE BUTTON
                if(_aCbCompleted[ON_MOUSE_DOWN]){
                    _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN],_aParams);
                }
            }
            
        } else {
            //FIRE BUTTON
            if(_aCbCompleted[ON_MOUSE_DOWN]){
                _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN],_aParams);
            }
        }
        
    };    

    this.onPressMove = function(evt){
        
        if(evt.primary){
        
            if(_oJoypad.visible){

                _oStick.x = evt.stageX - _oJoypad.x;
                _oStick.y = evt.stageY - _oJoypad.y;

                _iCurAngle =  Math.atan2(_oStick.y,_oStick.x);
                _iCurRadius = Math.abs( _oStick.x / Math.cos(_iCurAngle) );

                if(Math.pow(_oStick.x,2) + Math.pow(_oStick.y,2) > Math.pow(_iJoypadRadius,2)){
                    _oStick.x = _iJoypadRadius * Math.cos(_iCurAngle);
                    _oStick.y = _iJoypadRadius * Math.sin(_iCurAngle);            
                }              
            }
          
        }    
    };
    
    this.onPressRelease = function(evt){
        
        if(!evt.primary){
            return;
        }
      
        if(bFixedPosition){
            new createjs.Tween(_oStick).to({x:0, y:0}, 200).call(function(){
                _iCurRadius = 0;
                _iCurAngle = 0;            
            });
        } else {
            
            _oJoypad.visible = false;
            _iCurRadius = 0;
            _iCurAngle = 0;
        }
        
    };    
    
    this.update = function(){
        
        if(_iCurRadius > _iActivationTolerance){
            return _iCurAngle;
        } else {
            return null;
        } 
        
    };
    
    
    this._init(oSprite, iX, iY, oParentContainer, bFixedPosition);
}


