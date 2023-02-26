function CDuckSettings() {
    
        s_aDuckSpriteSheets = new Array();
    
        var oSprite = s_oSpriteLibrary.getSprite('duck_1');
        var oData = {
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: 200, height: 204, regX: 100, regY: 102}, 
                        animations: {  fly: [0,6,"fly"],hit: [7,15,"hit_stop"],hit_stop:[15],fall: [16,44,"fall"]}
                       
        };     
        
        var oSprite2 = s_oSpriteLibrary.getSprite('duck_2');
        var oData2 = {
                        images: [oSprite2], 
                        // width, height & registration point of each sprite
                        frames: {width: 200, height: 204, regX: 100, regY: 102}, 
                        animations: {  fly: [0,6,"fly"],hit: [7,15,"hit_stop"],hit_stop:[15],fall: [16,44,"fall"]}
                       
        };
        
        var oSprite3 = s_oSpriteLibrary.getSprite('duck_3');
        var oData3 = {
                        images: [oSprite3], 
                        // width, height & registration point of each sprite
                        frames: {width: 200, height: 204, regX: 100, regY: 102}, 
                        animations: {  fly: [0,6,"fly"],hit: [7,15,"hit_stop"],hit_stop:[15],fall: [16,44,"fall"]}
                       
        };
        
        var oSprite4 = s_oSpriteLibrary.getSprite('duck_4');
        var oData4 = {
                        images: [oSprite4], 
                        // width, height & registration point of each sprite
                        frames: {width: 200, height: 204, regX: 100, regY: 102}, 
                        animations: {  fly: [0,6,"fly"],hit: [7,15,"hit_stop"],hit_stop:[15],fall: [16,44,"fall"]}
                       
        };
    
    
        s_aDuckSpriteSheets[0] = new createjs.SpriteSheet(oData);
        s_aDuckSpriteSheets[1] = new createjs.SpriteSheet(oData2);
        s_aDuckSpriteSheets[2] = new createjs.SpriteSheet(oData3);
        s_aDuckSpriteSheets[3] = new createjs.SpriteSheet(oData4);
    
    
}

var s_aDuckSpriteSheets;