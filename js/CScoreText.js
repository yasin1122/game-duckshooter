function CScoreText (iScore,x,y){
    
    var _oScoreHit;
    
    
    this._init = function(iScore,x,y){

      _oScoreHit = new createjs.Text("00000","30px "+SECONDARY_FONT, "#ffffff");
      _oScoreHit.textAlign="right";
	  
	   _oScoreHit.text = iScore;
       _oScoreHit.x=x;
       _oScoreHit.y=y;
	   _oScoreHit.alpha = 0;
	   _oScoreHit.shadow = new createjs.Shadow("#000000", 2, 2, 2);
       s_oStage.addChild(_oScoreHit);
        
	   var oParent = this;
       createjs.Tween.get(_oScoreHit).to({alpha:1}, 400, createjs.Ease.quadIn).call(function(){oParent.moveUp();});  
    };
	
	this.moveUp = function(){
		var iNewY = _oScoreHit.y-100;
		var oParent = this;
		createjs.Tween.get(_oScoreHit).to({y:iNewY}, 1000, createjs.Ease.sineIn).call(function(){oParent.unload()});
	};
	
	this.unload = function(){
		s_oStage.removeChild(_oScoreHit);
    };
	
    this._init(iScore,x,y);
    
}