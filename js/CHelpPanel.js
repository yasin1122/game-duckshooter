function CHelpPanel(){
    var _oText1;
    var _oText1Back;
    var _oText2;
    var _oText2Back;
    var _oText3;
    var _oText3Back;
    var _oHelpBg;
    var _oGroup;
    var _oImage1;
    var _oImage2;

    this._init = function(){
        
        _oGroup = new createjs.Container();
        s_oStage.addChild(_oGroup);

        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        _oHelpBg = createBitmap(oSprite);
        s_oStage.addChild(_oHelpBg);
        
        var pTextPos = {x:470, y:224};        
        
        _oText1Back = new createjs.Text("","22px "+PRIMARY_FONT, "#000000");
        _oText1Back.textAlign = "left";
        _oText1Back.lineWidth = 360;
        _oText1Back.textBaseline = "middle";
        _oText1Back.x = pTextPos.x+2;
        _oText1Back.y = pTextPos.y+22;

        _oText1 = new createjs.Text("","22px "+PRIMARY_FONT, "#ffffff");
        _oText1.textAlign = "left";
        _oText1.lineWidth = 360;
        _oText1.textBaseline = "middle";
        _oText1.x = pTextPos.x ;
        _oText1.y = pTextPos.y +20;

        _oImage1 = createBitmap(s_oSpriteLibrary.getSprite('keys'));
        _oImage1.x = pTextPos.x + 435;
        _oImage1.y = pTextPos.y;

        _oText2Back = new createjs.Text("","22px "+PRIMARY_FONT, "#000000");
        _oText2Back.textAlign = "left";
        _oText2Back.textBaseline = "middle";
        _oText2Back.lineWidth = 300;
        _oText2Back.x = pTextPos.x+2;
        _oText2Back.y = pTextPos.y + 142;

        _oText2 = new createjs.Text("","22px "+PRIMARY_FONT, "#ffffff");
        _oText2.textAlign = "left";
        _oText2.lineWidth = 300;
        _oText2.textBaseline = "middle";
        _oText2.x = pTextPos.x;
        _oText2.y = pTextPos.y + 140;
        
        _oImage2 = createBitmap(s_oSpriteLibrary.getSprite('space_bar'));
        _oImage2.x = pTextPos.x + 375;
        _oImage2.y = pTextPos.y + 145;
        
        _oText3Back = new createjs.Text(TEXT_HELP3,"22px "+PRIMARY_FONT, "#000000");
        _oText3Back.textAlign = "left";
        _oText3Back.lineWidth = 440;
        _oText3Back.textBaseline = "middle";
        _oText3Back.x = pTextPos.x+2;
        _oText3Back.y = pTextPos.y + 277;
		
        _oText3 = new createjs.Text(TEXT_HELP3,"22px "+PRIMARY_FONT, "#ffffff");
        _oText3.textAlign = "left";
        _oText3.lineWidth = 440;
        _oText3.textBaseline = "middle";
        _oText3.x = pTextPos.x;
        _oText3.y = pTextPos.y + 275;
	
        _oGroup.addChild(_oHelpBg,_oText1Back,_oText1,_oText2Back,_oText2,_oText3Back,_oText3, _oImage1, _oImage2);
        
        if(s_bMobile=== false){
            
            _oText1Back.text = TEXT_HELP1;
            _oText1.text = TEXT_HELP1;
            _oText2Back.text = TEXT_HELP2;
            _oText2.text = TEXT_HELP2;
            
   
        } else {
            
            _oText1Back.text = TEXT_HELP_MOB1;
            _oText1Back.lineWidth = 290;
            _oText1Back.textAlign = "center";
            _oText1Back.x = 594;
            _oText1.text = TEXT_HELP_MOB1;
            _oText1.lineWidth = 290;
            _oText1.textAlign = "center";
            _oText1.x = 592;
    
            _oText2Back.text = TEXT_HELP_MOB2;
            _oText2Back.x = 902;
            _oText2Back.y = _oText1Back.y;            
            _oText2Back.lineWidth = 290;
            _oText2Back.textAlign = "center";
            
            _oText2.text = TEXT_HELP_MOB2;
            _oText2.x = 900;
            _oText2.y = _oText1.y;
            _oText2.lineWidth = 290;
            _oText2.textAlign = "center";
            
            _oText1.scaleX = _oText1.scaleY = _oText1Back.scaleX = _oText1Back.scaleY = _oText2.scaleX = _oText2.scaleY = _oText2Back.scaleX = _oText2Back.scaleY = 0.8;
            
            var oSprite = s_oSpriteLibrary.getSprite('dividing_line');
            var oDivide = createBitmap(oSprite);
            oDivide.regX = oSprite.width/2;
            oDivide.x = CANVAS_WIDTH/2;
            oDivide.y = 210;
            _oGroup.addChild(oDivide);
            
            var xPos = 550;
            var yPos = 380;
            var oSprite = s_oSpriteLibrary.getSprite('swift_hand');
            _oImage1.regY = oSprite.height/2;
            _oImage1.x = xPos;
            _oImage1.y = yPos;
            _oImage1.image = oSprite;
            createjs.Tween.get(_oImage1, {loop:true}).to({x:_oImage1.x+50}, 1000, createjs.Ease.cubicIn).to({x:xPos}, 1000, createjs.Ease.cubicIn);
            createjs.Tween.get(_oImage1, {loop:true}).to({y:_oImage1.y+30}, 500, createjs.Ease.sinOut).to({y:yPos}, 500, createjs.Ease.sinIn);

            var oSprite = s_oSpriteLibrary.getSprite('touch_hand');
            _oImage2.regX = oSprite.width/2;
            _oImage2.regY = oSprite.height/2;
            _oImage2.x = 900;
            _oImage2.y = yPos;
            _oImage2.image = oSprite;
            
            createjs.Tween.get(_oImage2, {loop:true}).to({scaleX:0.9, scaleY:0.9}, 250, createjs.Ease.cubicIn).to({scaleX:1, scaleY:1}, 250, createjs.Ease.cubicIn);
            
        }
        
        
        
	
        var iBulletWindow = 120;
        var iBulletOffset = iBulletWindow/NUM_BULLETS;
        var pBulletPos = {x:970, y:pTextPos.y + 275};
        
        for(var i=0; i<NUM_BULLETS; i++){
            var oBullet = createBitmap(s_oSpriteLibrary.getSprite('bullet'));
            oBullet.x = pBulletPos.x - iBulletWindow/2 + i*iBulletOffset;
            oBullet.y = pBulletPos.y;
            _oGroup.addChild(oBullet);        
        }

        
        var oParent = this;
        _oGroup.on("pressup",function(){oParent._onExitHelp()});
        
        
    };

    this.unload = function(){
        s_oStage.removeChild(_oGroup);

        var oParent = this;
        _oGroup.off("pressup",function(){oParent._onExitHelp()});
    };

    this._onExitHelp = function(){
        this.unload();
        s_oGame._onExitHelp();
    };

    this._init();

}