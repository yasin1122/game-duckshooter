function CInterface(){
    var _iGlobIndex;
    var _oButExit;
    var _oHitPanel;
    var _oScoreNumber;
    var _oScoreNumberBack;
    var _oAmmoText;
    var _oLifeNum;    
    var _aHitIcon;
    var _aBullet;
    var _aDuckPane;
    
    var _oScoreTextBack;
    var _oScoreText;
    var _oTimeText;
    var _oHelpPanel;
    var _oTimeScore;
    var _oHitText;
    var _oAudioToggle;
    var _oLifePanel;
    var _oInfoContainer;
    var _oScoreContainer;
    var _oAmmoPanel;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosScore;
    var _pInfoContainer;
    var _pStartPosFullscreen;
    
    this._init = function(){
        _iGlobIndex=0;
        _aDuckPane = new Array();

        _pInfoContainer = {x:CANVAS_WIDTH/2 - 115, y:CANVAS_HEIGHT};
        _oInfoContainer = new createjs.Container();
        _oInfoContainer.x = _pInfoContainer.x;
        _oInfoContainer.y = _pInfoContainer.y;
        s_oStage.addChild(_oInfoContainer);

        var oSprite = s_oSpriteLibrary.getSprite('hit_panel');
        _oHitPanel = createBitmap(oSprite);
        _oHitPanel.regX = oSprite.width/2;
        _oHitPanel.regY = oSprite.height;
        _oInfoContainer.addChild(_oHitPanel);
        
        _oHitText = new createjs.Text(TEXT_HIT,"30px "+PRIMARY_FONT, "#ffffff");
        _oHitText.x = -213;
        _oHitText.y = -95;
        _oHitText.textAlign = "center";
        _oHitText.textBaseline = "middle";
        _oInfoContainer.addChild(_oHitText);
        
        _oTimeText = new createjs.Text(TEXT_BONUS,"22px "+PRIMARY_FONT, "#ffffff");
        _oTimeText.x = _oHitText.x + 133;
        _oTimeText.y = _oHitText.y - 2;
        _oTimeText.textAlign = "center";
        _oTimeText.textBaseline = "middle";
        _oInfoContainer.addChild(_oTimeText);
        
        _oTimeScore = new createjs.Text("0000","30px "+SECONDARY_FONT, "#ffffff");
        _oTimeScore.x = 70;
        _oTimeScore.y = -99;
        _oTimeScore.textAlign="right";
        _oTimeScore.textBaseline = "middle";
        _oInfoContainer.addChild(_oTimeScore);        
        
        var oSprite = s_oSpriteLibrary.getSprite('life');
        _oLifePanel = createBitmap(oSprite);
        _oLifePanel.regX = oSprite.width/2;
        _oLifePanel.regY = oSprite.height/2;
        _oLifePanel.x = 167;
        _oLifePanel.y = -96;
        _oInfoContainer.addChild(_oLifePanel);
        
        _oLifeNum = new createjs.Text("X "+PLAYER_LIVES,"22px "+PRIMARY_FONT, "#ffffff");
        _oLifeNum.x = _oLifePanel.x + 83;
        _oLifeNum.y = _oLifePanel.y;
        _oLifeNum.textAlign="right";
        _oLifeNum.textBaseline = "middle";
        _oLifeNum.shadow = new createjs.Shadow("#000", 2, 2, 2);
        _oInfoContainer.addChild(_oLifeNum);
        
        
        _aHitIcon = new Array();        
        var oSprite = s_oSpriteLibrary.getSprite('hit_icon');
        var oData = {   
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: 51, height: 43}, 
                        animations: {  nohit: [0], hit:[1]}
                   };
        
        var oObjSpriteSheet = new createjs.SpriteSheet(oData);
        
        var iX = -260;
        var iY = -52;
        
        for(var i=0; i<9; i++){
            var oIcon = createSprite(oObjSpriteSheet, "nohit",0,0,51,43);
            oIcon.x = iX;
            oIcon.y = iY;
            oIcon.visible=false;
            _oInfoContainer.addChild(oIcon);           
            
            _aHitIcon[i] = oIcon;            
            iX += 58;            
        }
        
        var oSprite = s_oSpriteLibrary.getSprite('shot_panel');
        _oAmmoPanel = createBitmap(oSprite);
        _oAmmoPanel.regX = oSprite.width/2;
        _oAmmoPanel.regY = oSprite.height;
        _oAmmoPanel.x = 380;
        _oInfoContainer.addChild(_oAmmoPanel);
        
        _oAmmoText = new createjs.Text(TEXT_NOAMMO,"30px "+PRIMARY_FONT, "#ffffff");
        _oAmmoText.x = _oAmmoPanel.x;
        _oAmmoText.y = _oAmmoPanel.y - 90;
        _oAmmoText.lineWidth = 60;
        _oAmmoText.textAlign="center";
        _oAmmoText.textBaseline = "middle";
        _oAmmoText.shadow = new createjs.Shadow("#000", 2, 2, 2);
        _oAmmoText.visible=false;
        _oInfoContainer.addChild(_oAmmoText);


        _aBullet = new Array();
        var iOffset = 30 - 1.5*NUM_BULLETS;
        var iX = _oAmmoPanel.x - 80;
        var iY = _oAmmoPanel.y - 85;
        for(var i=0; i<NUM_BULLETS; i++){
            var oIcon = createBitmap(s_oSpriteLibrary.getSprite('bullet'));
            oIcon.x = iX;
            oIcon.y = iY;       
            _oInfoContainer.addChild(oIcon);
            
            _aBullet[i] = oIcon;             
            iX += iOffset;            
        }
        
        _pStartPosScore = {x: 0, y: 0};
        _oScoreContainer = new createjs.Container();
        s_oStage.addChild(_oScoreContainer);

        _oScoreTextBack = new createjs.Text(TEXT_SCORE,"30px "+PRIMARY_FONT, "#000");
        _oScoreTextBack.x = 32;
        _oScoreTextBack.y = 12; 
        _oScoreContainer.addChild(_oScoreTextBack);
		
        _oScoreText = new createjs.Text(TEXT_SCORE,"30px "+PRIMARY_FONT, "#ffffff");
        _oScoreText.x = 30;
        _oScoreText.y = 10; 
        _oScoreContainer.addChild(_oScoreText);
        
        _oScoreNumberBack = new createjs.Text("0","30px "+PRIMARY_FONT, "#000");
        _oScoreNumberBack.x = 172;
        _oScoreNumberBack.y = 12;
        _oScoreContainer.addChild(_oScoreNumberBack);
		
        _oScoreNumber = new createjs.Text("0","30px "+PRIMARY_FONT, "#ffffff");
        _oScoreNumber.x = 170;
        _oScoreNumber.y = 10;
        _oScoreContainer.addChild(_oScoreNumber);

        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite,s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: _pStartPosExit.x - oSprite.width/2 - 10, y: _pStartPosExit.y};
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive,s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);   
            
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = {x:_pStartPosAudio.x - oSprite.width/2 - 10,y:_pStartPosAudio.y};
        }else{
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = {x: _pStartPosExit.x - oSprite.width/2 - 10, y: _pStartPosExit.y};
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }

        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,_pStartPosExit.y);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,_pStartPosAudio.y);
        }
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x - s_iOffsetX,_pStartPosFullscreen.y + s_iOffsetY);
        }
        
        _oScoreContainer.x = _pStartPosScore.x + iNewX;
        _oInfoContainer.y = _pInfoContainer.y - 2*iNewY;
    };
    
    this.unload = function(){
        _oButExit.unload();
        _oButExit = null;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.unload();
        }
        
        s_oInterface = null;
    
    };

    this.refreshScore = function(iScore){
		_oScoreNumberBack.text = iScore;
        _oScoreNumber.text = iScore;
    };
    
    this.refreshTime = function(iTime){
        _oTimeScore.text = iTime;
    };
    
    this.refreshLife= function(iLife){
        _oLifeNum.text="X "+iLife;
    };
    
    this.refreshBullets = function(iBullets){
        _aBullet[iBullets].visible=false;
    };
    
    this.reloadBullets = function(iBullets){
        for(var i=0; i<iBullets; i++)
            _aBullet[i].visible=true;
    };
    
    this.noAmmo = function(){
        _oAmmoText.visible=true;
        _oAmmoText.alpha=1;
        createjs.Tween.get(_oAmmoText, {override:true}).to({alpha:0}, 1000, createjs.Ease.quadIn);
    };
    
    this.noAmmoDelete = function(){
        _oAmmoText.visible=false;
        createjs.Tween.removeTweens(_oAmmoText);
    };
    
    this.setHit = function(){
        _aDuckPane.push(true);
        this._setVisibleDuck();
    };
    
    this.setNoHit = function(){
        _aDuckPane.push(false);        
        this._setVisibleDuck();
        
        
    };
    
    this._setVisibleDuck=function(){
        if(_iGlobIndex>8){
            for(var i=0; i<8; i++){
                if(_aDuckPane[_iGlobIndex-8+i]===true){
                    _aHitIcon[i].gotoAndPlay("hit");                    
                } else {
                    _aHitIcon[i].gotoAndPlay("nohit");
                }                       
            }
            if(_aDuckPane[_iGlobIndex]===true){
                _aHitIcon[8].gotoAndPlay("hit");
            } else {
                _aHitIcon[8].gotoAndPlay("nohit");
            }
            
        }else{
        
            if(_aDuckPane[_iGlobIndex]===true){
                _aHitIcon[_iGlobIndex].gotoAndPlay("hit");
                _aHitIcon[_iGlobIndex].visible=true;                
            } else if (_aDuckPane[_iGlobIndex]===false){
                _aHitIcon[_iGlobIndex].gotoAndPlay("nohit");
                _aHitIcon[_iGlobIndex].visible=true;
            }
        }
        _iGlobIndex++;
    };

     this._onKeyUpReleased = function(){
        s_oGame.onKeyUpReleased();
    };
    
     this._onKeyDownReleased = function(){
        s_oGame.onKeyDownReleased();
    };
   
    this._onKeyRightReleased = function(){
        s_oGame.onKeyRightReleased();
    };
   
    this._onKeyLeftReleased = function(){
        s_oGame.onKeyLeftReleased();
    };
    
    this._onLeftPressed = function(){
        s_oGame.onLeft();
    };
    
    
    this._onRightPressed = function(){
        s_oGame.onRight();
    };
    
    
    this._onDownPressed = function(){
        s_oGame.onDown();
    };
    
    
    this._onUpPressed = function(){
        s_oGame.onUp();
    };
    
   
    this._onShot = function(){
        s_oGame.onShot();
    };
    
    this.onExitFromHelp = function(){
        _oHelpPanel.unload();
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this.resetFullscreenBut = function(){
	if (_fRequestFullScreen && screenfull.enabled){
		_oButFullscreen.setActive(s_bFullscreen);
	}
    };


    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();

    };
    
    this._onExit = function(){
      s_oGame.onExit();  
    };
    
    s_oInterface = this;
    this._init();
    
    return this;
}

var s_oInterface = null;