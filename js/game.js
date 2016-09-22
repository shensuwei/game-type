function game(sence){
	// 场景
	this.sence=sence;

	// 装所有字母的数组
	this.letter=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	
	// 装几个随机字母的数组
	this.letterArr=[];

	// 屏幕中显示的字母个数
	this.num=5;

	// 字母掉落的速度
	this.speed=5;

	// 分数
	this.score=10;

	// 等级
	this.level=1;

	this.flag=false;

	this.t=null;

	// 浏览器窗口的宽度和高度
	this.cw=document.documentElement.clientWidth;
	this.ch=document.documentElement.clientHeight;

	// 调用方法
	// this.play();
	// this.key();
}


// 从字母集合中随机获取字母
game.prototype.getLetter=function(num){
	var that=this;

	for(var i=0;i<num;i++){

		// 创建元素节点(添加到文档中)
		var imgs=document.createElement("img");

		// let里面放着26个英文字母中的任意一个[A-Z]
		var let=that.letter[Math.floor(Math.random()*26)];

		while(check(let)){
			let=that.letter[Math.floor(Math.random()*26)];
		}

		// 设置图片路径
		imgs.src="images/"+let+".jpg";

		imgs.style.cssText="width:200px;height:100px;position:absolute;top:"+(Math.random()*300-200)+"px;left:"+(Math.random()*(that.cw-300)+50)+"px;";
		imgs.className=let;
		that.sence.appendChild(imgs);
		that.letterArr.push(let);
	}

	function check(let){
		for(var i=0;i<that.letterArr.length;i++){
			if(let==that.letterArr[i]){
				return true;
			}
		}
		return false;
	}
}

game.prototype.play=function(num){
	var that=this;
	t=setInterval(diao,50)

	function diao(){
		if(that.letterArr.length<that.num){
			that.getLetter(that.num-that.letterArr.length);
		}
		var l=document.getElementsByTagName('img');
		for (var i = 0; i < l.length; i++) {
			var lt=l[i].offsetTop+that.speed;
			l[i].style.top= lt+"px";
			if(lt>that.ch-100){
				for (var j = 0; j < that.letterArr.length; j++) {
					if(that.letterArr[j]==l[i].className){
						that.letterArr.splice(j,1)
					}
				}
				that.sence.removeChild(l[i]);
				l[i]==null;
			}
		}
	}

	stop.onclick=function(){
		if(!that.flag){
			clearInterval(t);
			that.flag=true;
		}else{
			t=setInterval(diao,50);
			that.flag=false;
		}
	}


}

game.prototype.key=function(num){
	var that=this;
	document.onkeydown=function(e){
		if(!that.flag){
			var ev=e||window.event;
			var k= String.fromCharCode(ev.keyCode);
			var now=that.sence.getElementsByClassName(k);
			if(now.length>0){
				for (var i = 0; i < now.length; i++) {
					if(k=now[0].className){
						that.letterArr.splice(i,1);
					}
				}
				that.sence.removeChild(now[0]);
				now[0]=null;
			}
		}
	}
}