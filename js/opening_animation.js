/*============斗地主JS样式表============*/ 
// moneys();
// 背景音乐控制
var player = $('audio')[0];
setTimeout(function(){
	player.play();
},2500);
setInterval(function(){
		moneys_left();
	},100)
// 铜币落下函数
function moneys_left(){
	//生成10个随机数
	// for(var i=0;i<20;i++){
		//随机生成一个距离左边的距离
		var random_num = Math.floor(Math.random()*400);
		//随机生成一个0~1的下落时间
		var down_time = 200+Math.floor(Math.random()*3000);
		//随机生成铜币下落的高度
		var down_height = 400+Math.floor(Math.random()*100);
		// 随机生成一张图片
		var img_num = 6+Math.floor(Math.random()*7);
		//图片大小的随机数
		var img_wid = 40+Math.floor(Math.random()*30)
		// 随机生成一个铜币
		var moneys = $('.moneys').append('<img src="images/1/money'+img_num+'.png" width="'+img_wid+'" style="position:absolute;top:-80px;left:'+random_num+'px;">' );
		// 铜币下落
		$('.moneys img').animate({top:down_height+'px',opacity:0},down_time);
		setTimeout(function(){
		},500)	
}
// 隔一段时间删除一个铜币
setInterval(function(){
			$('.moneys img:last').remove();
		},200)

/*========================*/ 
setInterval(function(){
		moneys_right();
	},100)
// 铜币落下函数
function moneys_right(){
	//生成10个随机数
	// for(var i=0;i<20;i++){
		//随机生成一个距离左边的距离
		var random_num = Math.floor(Math.random()*400);
		//随机生成一个0~1的下落时间
		var down_time = 200+Math.floor(Math.random()*3000);
		//随机生成铜币下落的高度
		var down_height = 400+Math.floor(Math.random()*100);
		// 随机生成一张图片
		var img_num = 6+Math.floor(Math.random()*7);
		//图片大小的随机数
		var img_wid = 40+Math.floor(Math.random()*30)
		// 随机生成一个铜币
		var moneys = $('.moneys').append('<img src="images/1/money'+img_num+'.png" width="'+img_wid+'" style="position:absolute;top:-80px;right:'+random_num+'px;">' );
		// 铜币下落
		$('.moneys img').animate({top:down_height+'px',opacity:0},down_time);
		setTimeout(function(){
		},500)	
}
// 隔一段时间删除一个铜币
setInterval(function(){
			$('.moneys img:last').remove();
		},200)
setInterval(function(){
			$('.moneys img').remove();
		},15000)

console.log($('.moneys img'));