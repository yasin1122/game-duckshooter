function CEndPanel(oSpriteBg){
    
    var _oBg;
    var _oScoreTextBack;
    var _oScoreText;
    var _oMsgText;
    var _oMsgTextBack;
    var _oGroup;
    var _oButRestart;
    var _oButHome;
    
    this._init = function(oSpriteBg){
        
        _oBg = createBitmap(oSpriteBg);

        _oMsgTextBack = new createjs.Text("","70px "+PRIMARY_FONT, "#000");
        _oMsgTextBack.x = CANVAS_WIDTH/2 +2;
        _oMsgTextBack.y = (CANVAS_HEIGHT/2)-170;
        _oMsgTextBack.textAlign = "center";

        _oMsgText = new createjs.Text("","70px "+PRIMARY_FONT, "#ffffff");
        _oMsgText.x = CANVAS_WIDTH/2;
        _oMsgText.y = (CANVAS_HEIGHT/2)-172;
        _oMsgText.textAlign = "center";
        
        _oScoreTextBack = new createjs.Text("","40px "+PRIMARY_FONT, "#000");
        _oScoreTextBack.x = CANVAS_WIDTH/2 +2;
        _oScoreTextBack.y = (CANVAS_HEIGHT/2) -68;
        _oScoreTextBack.textAlign = "center";
        
        _oScoreText = new createjs.Text("","40px "+PRIMARY_FONT, "#ffffff");
        _oScoreText.x = CANVAS_WIDTH/2;
        _oScoreText.y = (CANVAS_HEIGHT/2) -70;
        _oScoreText.textAlign = "center";
        
        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        
        _oGroup.addChild(_oBg, _oScoreTextBack,_oScoreText,_oMsgTextBack,_oMsgText);

        var oSprite = s_oSpriteLibrary.getSprite('but_restart');
        _oButRestart = new CGfxButton(CANVAS_WIDTH/2 + 140, 484, oSprite,_oGroup);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onRestart, this);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_home');
        _oButHome = new CGfxButton(CANVAS_WIDTH/2 - 140, 484, oSprite,_oGroup);
        _oButHome.addEventListener(ON_MOUSE_UP, this._onExit, this);

        s_oStage.addChild(_oGroup);
    };
    
    this.unload = function(){
        _oGroup.off("mousedown",this._onExit);
        _oButRestart.unload();
        _oButHome.unload();
    };
    
    this._initListener = function(){
        _oGroup.on("mousedown",function(){});
    };
    
    this.show = function(iScore){
        playSound("game_over",1,false);
        
        _oMsgTextBack.text = TEXT_GAMEOVER;
        _oMsgText.text = TEXT_GAMEOVER;
        
        _oScoreTextBack.text = TEXT_SCORE +": "+iScore;
        _oScoreText.text = TEXT_SCORE +": "+iScore;
        
        _oGroup.visible = true;
        
        var oParent = this;
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500).call(function() {oParent._initListener();});
        
        $(s_oMain).trigger("save_score",iScore);
        $(s_oMain).trigger("share_event",iScore);
    };
    
    this._onRestart = function(){
        _oGroup.off("mousedown",function(){});
        s_oStage.removeChild(_oGroup);
        
        s_oGame.onRestart();
    };
    
    this._onExit = function(){
        _oGroup.off("mousedown",function(){});
        s_oStage.removeChild(_oGroup);
        
        s_oGame.onExit();
    };
    
    this._init(oSpriteBg);
    
    return this;
}