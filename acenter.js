(function(){
	var tar = document.createElement("style");
	tar.type = "text/css";
	tar.innerHTML = '';
	var aniTag = 'i';

	//配置动画库
	var frameConfigs ={
			'type1':{
				'rules':"@keyframes loading{0%{transform: scaleY(1);}50%{transform: scaleY(0.5);}100%{transform: scaleY(1);}}",
				'animations':"loading 1s ease-in {!gap} infinite"
			},
			'type2':{
				'rules':"@keyframes loadingCircle{0%{transform: rotate(0deg);}50%{transform: rotate(180deg);}100%{transform:rotate(360deg);}}",
				'animations':"loadingCircle 1s ease-in {!gap} infinite"
			},
			'type3':{
				'rules':"@keyframes loadingColor{0%{opacity:0;}50%{opacity:0.5;}100%{opacity:0;}}",
				'animations':"loadingColor 1s linear {!gap} infinite"
			}
	};

	//动画样式库
	var styleConfigs ={
		
	}

	/**
	 * { 插件主函数 }
	 *
	 * @param      {string}  frames       动画关键帧设置
	 * @param      {string}  target       动画目标
	 * @param      {string}  animations   动画内容
	 */
	function newCssAnimation(){
		console.log(frameConfigs);
		var args = arguments[0];
		var type = args.type;
		var target = args.target;
		var gap = args.gap;
		var aniNum = args.num;

		if(args){
			if(type && frameConfigs.hasOwnProperty(type)){
				console.log(type);
				var frames = frameConfigs[type]['rules'];
				var animations = frameConfigs[type]['animations'];
			}else{
				throw new TypeError('type should be defined!');
				return;
			}
			
			if(!target){
				throw new TypeError('target should be defined!');
				return;
			}
		}else{
			throw new TypeError('Arguments should be defined!');
		}

		if(frames){
			var cssRules = frames;
			document.getElementsByTagName('head')[0].appendChild(tar);
			targetSheet = document.styleSheets[document.styleSheets.length-1];
			targetSheet.insertRule(cssRules,targetSheet.rules.length);
			
			var node = document.getElementById(target);

			var tags = createChildNodes(aniTag,aniNum,animations,gap);
			for(var i=0;i<tags.length;i++){
				node.appendChild(tags[i]);
			}
			
		}else{
			throw new TypeError('param1(frames) is undefined');
		}
	}

	/**
	 * 创建子节点，并绑定动画.
	 *
	 * @param      {<type>}  tag     
	 * @param      {number}  num     
	 * @return     {<type>}  
	 */

	function createChildNodes(tag,num,animation,gap=null){
		var tags=[];
		var gapTime = gap?gap:0; 
		for(var j =0;j<num;j++){
			var tempTag = document.createElement(tag);
			if(gapTime){
				var animationWithGap = animation.replace('{!gap}',gapTime/1000 +'s');
				tempTag.style.animation = animationWithGap;
				gapTime += gap;
			}else{
				tempTag.style.animation = animation;
			}
			tags.push(tempTag);
		}
		return tags;
	}

		window.newCssAnimation = newCssAnimation;
})(window);
