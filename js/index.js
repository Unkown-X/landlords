/*
	定义玩家对象
 */
function player(pokers,parentEle,seat,current_index){
	this.pokers = pokers;		// 玩家手牌
	this.parentEle = parentEle;	 	// 父元素，在此元素内生成各种子元素，如倒计时、出牌按钮等
	this.Poker = [];			// 手牌元素
	this.length = this.pokers.length;			// 手牌数量
	this.seat = seat;
	this.role = 0;
	this.current_index = current_index;
	this.next_index = (current_index == 2)? 0:(current_index + 1);

	this.createEle();
	this.dealPokers();
}

player.prototype = {
	constructor: player,

	// 生成按钮和倒计时等
	createEle: function(){
		// 倒计时
		this.timeEle = $('<div class="time" />');
		this.timeSpan = $('<span />');

		// 抢按钮父元素
		this.lordEle = $('<div class="lord_btns" />');

		// 叫地主按钮
		this.askBtn = $('<input type="button" value="叫地主">')
		this.noaskBtn = $('<input type="button" value="不叫">')

		// 抢地主按钮
		this.robBtn = $('<input type="button" value="抢地主">')
		this.norobBtn = $('<input type="button" value="不抢">')

		// 出牌按钮父元素
		this.playEle = $('<div class="play_btns" />');

		// 不要按钮
		this.passBtn = $('<input type="button" value="不要">')

		// 出牌按钮
		this.playBtn = $('<input type="button" value="出牌">')

		// 提示按钮
		this.tipBtn = $('<input type="button" value="提示">')

		// 添加元素
		this.timeEle.append(this.timeSpan);
		this.lordEle.append(this.noaskBtn).append(this.askBtn).append(this.norobBtn).append(this.robBtn)
		this.playEle.append(this.playBtn).append(this.passBtn).append(this.tipBtn)
		this.parentEle.append(this.timeEle).append(this.lordEle).append(this.playEle)

		this.hideAllBtn();	// 先隐藏所有元素
	},

	dealPokers: function(){
		this.putoutPokers();	// 在页面生成手牌
		this.judge();			// 判断哪种定位方式：如果是左右两边玩家，则垂直排列手牌
		this.backPoker()		// 收拢动画
	},

	// 手牌垂直排列
	rankPokers_v: function(){
		for(var i=0; i<this.length; i++){
			this.Poker[i].css('top',(-this.length/2+i)*30+'px')
		}
	},

	// 手牌水平排列
	rankPokers_h: function(){
		for(var i=0; i<this.length; i++){
			this.Poker[i].css('left',(-this.length/2+i)*30+'px')
		}
	},

	// 创建手牌
	makePoker: function(){
		for(var i=0; i<this.pokers.length; i++){
			if(this.pokers[i].src == poker_data[0].src || this.pokers[i].src == poker_data[1].src || this.pokers[i].src == poker_data[2].src){
				this.Poker.push($('<li class="on" index="'+this.pokers[i].index+'" level="'+this.pokers[i].level+'" style="background:url(./img/puke1/'+this.pokers[i].src+'.jpg)"></li>'))
			}else{
				this.Poker.push($('<li index="'+this.pokers[i].index+'" level="'+this.pokers[i].level+'" style="background:url(./img/puke1/'+this.pokers[i].src+'.jpg)"></li>'))
			}
			
		}
	},

	// 判断怎么排列手牌
	judge: function(){
		this.length = this.Poker.length
		if(this.seat == 'v'){
			this.rankPokers_v();
		}else{
			this.rankPokers_h();
		}
	},

	// 生成手牌
	putoutPokers: function(){
		this.makePoker();
		for(var i=0; i<this.pokers.length; i++){
			this.parentEle.append(this.Poker[i])
		}
	},

	// 排序手牌
	sortPoker: function(){
		this.pokers.sort(function(x,y){
			var x_arr = [x.index, x.level];
			var y_arr = [y.index, y.level];

			// 先判断牌的点数
			if(x_arr[0] != y_arr[0]){
				//点数不相同，使用点数进行排序
				return y_arr[0] - x_arr[0];
			}else{
				// 点数相同，使用花色排序
				return x_arr[1] - y_arr[1];
			}
		});
	},

	/*
		发牌后排序动画
	 */ 
	// 收拢动画
	backPoker: function(){
		if(this.seat == 'v'){
			for(var i=0; i<this.length; i++){
				this.Poker[i].animate({'top':(-this.length/2+0)*30+'px'},300)
			}
		}else{
			for(var i=0; i<this.length; i++){
				this.Poker[i].animate({'left':(-this.length/2+0)*30+'px'},300)
			}
		}
		this.clearPoker();
	},

	// 清空牌堆
	clearPoker: function(){
		var that = this;
		setTimeout(function(){
			for(var i=0; i<that.length; i++){
				that.Poker[i].remove()
			}
			that.Poker = []
			that.sortPoker();
			that.putoutPokers();
			that.judge_ani();
		},1000)
	},	

	// 收拢后定位
	// 垂直
	anisetPoker_v: function(){
		for(var i=0; i<this.length; i++){
			this.Poker[i].css({'top':(-this.length/2+0)*30+'px'})
		}
	},
	// 水平
	anisetPoker_h: function(){
		for(var i=0; i<this.length; i++){
			this.Poker[i].css({'left':(-this.length/2+0)*30+'px'})
		}
	},

	// 摊开动画
	// 垂直
	anmatPoker_v: function(){
		for(var i=0; i<this.length; i++){
			this.Poker[i].animate({'top':(-this.length/2+i)*30+'px'},300)
		}
	},
	// 水平
	anmatPoker_h: function(){
		for(var i=0; i<this.length; i++){
			this.Poker[i].animate({'left':(-this.length/2+i)*30+'px'},300)
		}
	},

	// 判断执行那个方向的动画
	judge_ani: function(){
		if(this.seat == 'v'){
			this.anisetPoker_v();
			this.anmatPoker_v();
		}else{
			this.anisetPoker_h();
			this.anmatPoker_h();
		}
	},

	// 隐藏所有按钮
	hideAllBtn: function(){
		this.timeEle.hide();
		this.lordEle.hide();
		this.askBtn.hide();
		this.noaskBtn.hide();
		this.norobBtn.hide();
		this.robBtn.hide();
		this.playEle.hide();
		clearInterval(this.int);
	},

	// 重置倒计时
	resetTime: function(){
		this.time = 30;
		this.timeEle.hide();
	},
	// 倒计时
	countDown: function(second){
		var that = this;
		that.timeEle.show();
		that.timeSpan.text(second)
		second--;
		that.int = setInterval(function(){
			that.timeEle.show();
			that.timeSpan.text(second)
			second--;
			if(second <0){
				clearInterval(that.int);
			}
		},1000)
	},

	// 叫地主
	askLord: function(){
		// 显示按钮
		this.lordEle.show();
		this.askBtn.show();
		this.noaskBtn.show();
		// 绑定事件
		this.askEvents();
		this.countDown(30)
	},

	// 抢地主
	robLord: function(){
		// 显示按钮
		this.lordEle.show();
		this.robBtn.show();
		this.norobBtn.show();
		// 绑定事件
		this.robEvents();
		this.countDown(30)
	},

	/*
		定义事件: 抢/叫地主，不要/出牌/提示等
	 */
	askEvents: function(){
		var that = this;
		//	叫地主
		that.askBtn.click(function(){
			that.role = 1;
			that.btnWork();
		})

		// 不叫地主
		that.noaskBtn.click(function(){
			that.role = 0;
			that.btnWork();
		})
	},
	robEvents: function(){
		var that = this;
		//	抢地主
		that.robBtn.click(function(){
			that.role = 1;
			that.btnWork();
		})

		// 不抢地主
		that.norobBtn.click(function(){
			that.role = 0;
			that.btnWork();
		})
	},

	// 牌点击事件
	pokerEvent: function(){
		for(var i=0; i<this.length; i++){
			this.Poker[i].click(function(){
				$(this).toggleClass('on')
			})
		}
	},

	// 点击按钮后的操作
	btnWork: function(){
		ask_lord++;
		this.hideAllBtn();
		this.checkLord();
	},

	// 抢得地主后发牌重新发牌
	reDealPoker: function(){
		for(var i=0; i<this.length; i++){
			this.Poker[i].remove()
		}
		this.length = this.pokers.length;
		this.Poker = []
		this.sortPoker();
		this.putoutPokers();
		this.judge();
	},

	// 判断是否已经有人叫了地主
	checkAsk: function(){
		for(var i=0; i<3; i++){
			if(all_player[i].role == 1) return true;
		}
		return false;
	},

	// 判断是开始叫地主还是抢地主
	onLord: function(){
		if(this.checkAsk()){
			this.robLord();
		}else{
			this.askLord();
		}
	},

	// 判断是否抢/叫地主成功
	checkLord: function(){
		if(ask_lord < 3){
			all_player[this.next_index].onLord();
		}
		if(ask_lord >= 3 && !(this.checkAsk())){
			alert('草拟吗！都不叫地主还玩个G2。')
			window.location.reload();
		}else if(ask_lord == 3 && this.checkAsk()){
			if(this.calAsk() == 1){
				this.giveLord();
				return;
			}
			if(this.calAsk() == 2 && all_player[random_play].role == 0){
				var pre_index = (this.current_index == 0)? 2:(this.current_index - 1);
				all_player[pre_index].onLord();
			}
			if(this.calAsk() == 2 && all_player[random_play].role == 1){
				all_player[this.next_index].onLord();
			}
			if(this.calAsk() == 3){
				all_player[this.next_index].onLord();
			}
		}else if(ask_lord > 3){
			if(this.role == 1){
				this.successLord();
			}else{
				this.backLord();
			}
		}
	},

	// 计算有多少人叫/抢地主
	calAsk: function(){
		cal_lord = 0;
		for(var i=0; i<3; i++){
			if(all_player[i].role == 1) cal_lord++;
		}
		return cal_lord;
	},

	// 单人叫地主时，直接给地主
	giveLord: function(){
		for(var i=0; i<3; i++){
			if(all_player[i].role == 1) all_player[i].successLord();
		}
	},

	// 颁发地主
	successLord: function(){
		this.pokers = this.pokers.concat(poker_data);	// 剩余的三张手牌给地主
		this.reDealPoker();			// 然后重新发牌
		this.showLordPoker();		// 在顶部显示地主获得的三张手牌

		// 出牌阶段
		this.playPoker();
	},

	// 第四次抢地主放弃时，返回一位是地主
	backLord: function(){
		var index = this.current_index;
		do{
			var pre_index = (index == 0)? 2:(index - 1);
			index = pre_index;
		}while(all_player[pre_index].role != 1);
		all_player[pre_index].successLord();
	},

	// 显示地主获得的三张手牌
	showLordPoker: function(){
		$('.poker_wrap li').each(function(index){
			$(this).css({background: 'url(./img/puke1/'+poker_data[index].src+'.jpg)'})
		})
	},

	/*
		出牌方法
	 */
	clearEvents: function(){
		for(var i=0; i<this.length; i++){
			this.Poker[i].unbind();
		}
		this.passBtn.unbind();
		this.playBtn.unbind();
	},

	playPoker: function(){
		// 显示出牌按钮
		this.countDown(30);
		this.showPlayBtn();
		
		// 添加出牌事件
		this.clearEvents();
		this.btnEvent();
		this.pokerEvent();

	},

	// 显示出牌按钮
	showPlayBtn: function(){
		this.playEle.show();
		this.passBtn.show();
		this.playBtn.show();
		this.tipBtn.show();
		this.correctBtn();
	},

	// 按钮点击事件
	btnEvent: function(){
		var that = this;
		play_count ++;
		// 出牌按钮
		that.playBtn.click(function(){
			that.playPokers();
		})

		// 不要按钮
		that.passBtn.click(function(){
			no_play++;
			that.hideAllBtn();
			that.resetPlay();
			all_player[that.next_index].playPoker();
		})
	},

	// 获取要打出的手牌点数
	getPokerIndex: function(){
		var that = this;
		var arr = [];
		that.Poker.forEach(function(item,index){
			if(item.hasClass('on')){
				arr.push(Number(item.attr('index')))
			}
		})
		return arr;
	},

	// 合法显示按钮：必须出牌时没有“不要”按钮
	correctBtn: function(){
		if(play_count == 0){
			this.passBtn.hide();
		}
	},

	// 当玩家出牌大于另外两家时，重置出牌
	resetPlay: function(){
		if(no_play == 2){
			play_count = 0;
		}
	},

	/*
		判断玩家操作是否合法
	 */
	// 三条 012
	thT: function(arr){
		if(arr.length !=3 ){
			return false
		}else{
			for(var i=0; i<arr.length-1; i++){
				if(arr[i] != arr[i+1]){ return false }
			}
			poker_max = parseInt(poker_max);
			arr[0] = parseInt(arr[0]);
			if(poker_max >= arr[0] && play_count > 1){ return false }
			poker_max = arr[0]
			return true
		}
	},
	// 连对
	liandui: function(arr){
		if(arr.length < 6 || arr.length%2!=0){//0 12 34 5
			return false;
		}else {
			for(var i=1; i<arr.length; i++){
				if(i%2 == 0 && (arr[i-1]-1) != arr[i]){
					return false;
				}
			}
			for(var i=0; i<arr.length; i++){
				if(i%2 == 0){
					if(arr[i] != arr[i+1]){ return false }
				}
			}
			poker_max = parseInt(poker_max);
			arr[0] = parseInt(arr[0]);
			if(poker_max >= arr[0] && play_count > 1){ return false }
			poker_max = arr[0]
			return true;
		}
	},
	// 顺子
	shunzi: function(arr){
		if(arr[0] == 15){
			return false;
		}
		if(arr.length < 5){
			return false;
		}else{
			arr.forEach(function(item){
				if(item>=16){
					return false
				}
			})
			for(var i=0; i<arr.length-1; i++){
				if((arr[i]-1) != arr[i+1]){ return false }
			}
			poker_max = parseInt(poker_max);
			arr[0] = parseInt(arr[0]);
			if(poker_max >= arr[0] && play_count > 1){ return false }
			poker_max = arr[0]
			return true;
		}
	},
	// 三带一
	thO: function(arr){
		if(arr.length!=4){
			return false;
		}else{
			if(arr[0] == arr[1] && arr[1] == arr[2] && arr[2] != arr[3] || arr[0] != arr[1] && arr[1] == arr[2] && arr[2] == arr[3]){
				poker_max = parseInt(poker_max);
				arr[1] = parseInt(arr[1]);
				if(poker_max >= arr[1] && play_count > 1){ return false }
				poker_max = arr[1]
				return true;
			}else{
				return false
			}
		}
	},
	// 三带一对
	thD: function(arr){
		if(arr.length!=5){
			return false;
		}else{
			if(arr[0] == arr[1] && arr[1] == arr[2] & arr[3] == arr[4] || arr[0] == arr[1] && arr[2] == arr[3] && arr[3] ==arr[4]){
				poker_max = parseInt(poker_max);
				arr[2] = parseInt(arr[2]);
				if(poker_max >= arr[2] && play_count > 1){
					console.log(poker_max,arr[2]);
					 return false 
				}
				poker_max = arr[2]
				return true;
			}else{
				return false;
			}
		}
	},
	// 炸弹
	Boom: function(arr){
		if(arr.length != 4){
			return false;
		}else{
			if(arr[0] == arr[1] && arr[1] == arr[2] && arr[2] == arr[3]){
				poker_max = parseInt(poker_max);
				arr[1] = parseInt(arr[1]);
				if(poker_max >= arr[1] && play_count > 1 && poker_type == 999){ return false }
				poker_max = arr[1]
				return true;
			}else{
				return false;
			}
		}
	},
	// 飞机
	plane: function(arr){
		if(arr.length == 6){
			if(arr[2] - 1 == arr[3]){
				if(arr[0] == arr[1] && arr[1] == arr[2] && arr[3] == arr[4] && arr[4] == arr[5]){
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
		}
		// aaabbb11, 11aaabbb 1aaabbb1
		if(arr.length == 8){
			if(arr[2] - 1 == arr[3] || arr[4] - 1 == arr[5] || arr[3] - 1 == arr[4]){
				if(arr[0] == arr[1] && arr[1] == arr[2] && arr[3] == arr[4] && arr[4] == arr[5] || arr[2] == arr[3] && arr[3] == arr[4] && arr[5] == arr[6] && arr[6] == arr[7] || arr[1] == arr[2] && arr[2] == arr[3] && arr[4] == arr[5] && arr[5] == arr[6]){
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
		}
		// aaabbb1122, 11aaabbb22, 1122aaabbb
		if(arr.length == 10){
			if(arr[2] - 1 == arr[3] || arr[4] - 1 == arr[5] || arr[6] - 1 == arr[7]){
				if(arr[0] == arr[1] && arr[1] == arr[2] && arr[3] == arr[4] && arr[4] == arr[5] && arr[6] == arr[7] && arr[8] == arr[9]){
					return true;
				}
				if(arr[0] == arr[1] && arr[2] == arr[3] && arr[3] == arr[4] && arr[5] == arr[6] && arr[6] == arr[7] && arr[8] == arr[9]){
					return true;
				}
				if(arr[0] == arr[1] && arr[3] == arr[2] && arr[4] == arr[5] && arr[5] == arr[6] && arr[7] == arr[8] && arr[8] == arr[9]){
					return true;
				}
				return false;
			}else{
				return false;
			}
		}
	},

	//判断出牌是否合法
	checkPoker: function(arr){
		if(arr.length == 2 || arr.length == 4){
			if(arr[0] == 17 && arr[1] == 16){
				poker_max = 110;
				return 110;
			}else if(this.Boom(arr)){
				return 999;
			}
		}
		if(arr.length != poker_length && play_count > 1){
			console.log('123'+play_count)
			return 0;
		}
		poker_length = arr.length;
		if(poker_length == 1){
			poker_max = parseInt(poker_max);
			arr[0] = parseInt(arr[0]);
			if(poker_max >= arr[0] && play_count > 1){ return 0 }
			poker_max = arr[0];
			return 1;
		}else if(poker_length == 2 && arr[0] == arr[1]){
			poker_max = parseInt(poker_max);
			arr[0] = parseInt(arr[0]);
			if(poker_max >= arr[0] && play_count > 1){ return 0 }
			poker_max = arr[0];
			return 2;
		}else if(poker_length == 2 && arr[0] == 17 && arr[1] == 16){
			poker_max = 110;
			return 110;
		}else if(poker_length >2 ){
			if(this.thT(arr)){
				return 3
			}else if(this.thO(arr)){
				return 4;
			}else if(this.thD(arr)){
				return 5;
			}else if(this.shunzi(arr)){
				return 6;
			}else if(this.liandui(arr)){
				return 7;
			}else if(this.plane(arr)){
				return 8;
			}else if(this.Boom(arr)){
				return 999;
			}else{
				return 0;
			}
		}
	},

	// 出牌操作
	playPokers: function(){
		var arr = this.getPokerIndex();		// 获取选中要出的手牌
		console.log(arr)
		if(arr.length == 0){ alert('出牌不合法！'); return; }
		var temp_type = this.checkPoker(arr);	// 判断要出的手牌是否合法，同时返回牌的类型
		console.log(temp_type)
		if(play_count > 1){
			if(temp_type != poker_type && temp_type != 110 && temp_type != 999){
				alert('出牌不合法！')
				return;
			}else{
				poker_type = temp_type;
			}
		}else{
			poker_type = temp_type;
		}

		if(poker_type){
			this.displayPoker();	// 显示打出的牌
			this.hideAllBtn();
			all_player[this.next_index].playPoker();
		}else{
			alert('出牌不合法！')
			return;
		}
		no_play=0;
	},

	// 打出的牌显示在页面上
	displayPoker: function(){
		$('.pokers').empty();
		var temp_poker = this.getSelect();
		for(var i=0; i<temp_poker.length; i++){
			temp_poker[i].css({'left':(-temp_poker.length/2+i)*30+'px'})
			$('.pokers').append(temp_poker[i])
		}
	},

	// 获取选中的手牌
	getSelect: function(){
		var that = this;
		var temp_poker = [];
		that.Poker.forEach(function(item,index){
			if(item.hasClass('on')){
				temp_poker.push(item);
			}
		})
		return temp_poker;
	}

}



// 定义玩家和牌堆
var poker_data = [];
var all_play = [];
all_play.push({poker:[]});
all_play.push({poker:[]});
all_play.push({poker:[]});

// 初始化函数
resetPokers()
function resetPokers(){
	// 初始化数据
	poker_data = [];
	ask_lord = 0;
	for(var i=0; i<3; i++){
		all_play[i].poker = [];
	}

	// 初始化54张牌
	for(var i=1; i<=54; i++){
		var index = i%13;
		var level = Math.ceil(i/13)
		if(index == 0){ index = 13 }
		if(index == 1 && level == 1){ index = 17 } // 大王
		if(index == 2 && level == 1){ index = 16 } // 小王
		if(index == 1 && level != 1){ index = 14 } // Ace
		if(index == 2 && level != 1){ index = 15 } // 2
		var temp = { src: i, index: index, level: level }
		// src:图片路径； index：牌的值； level：花色（1为黑桃，2为红桃，3为梅花，4为方块）
		poker_data.push(temp);
	}

	// 打乱牌堆顺序
	for(var i=0; i<3; i++){
		poker_data.sort(function(){
			return Math.random()-0.5;
		})
	}

	// 给玩家分发手牌
	for(var i=0; i<17; i++){
		all_play[0].poker.push(poker_data.pop());
		all_play[1].poker.push(poker_data.pop());
		all_play[2].poker.push(poker_data.pop());
	}
}

// 最后三张牌
function lastThreePoker(){
	for(var i=0; i<3; i++){
		$('.poker_wrap').append('<li class="back" style="left: 0"></li>');
	}
	for(var i=0; i<3; i++){
		$('.poker_wrap li').eq(i).animate({'left':(i-1)*120+'px'},500)
	}
}
setTimeout(function(){
	lastThreePoker()
},1000)

/*
	创建玩家对象
 */
var p1 = new player(all_play[0].poker,$('.player_1'),'v',0);
var p2 = new player(all_play[1].poker,$('.player_2'),'h',1);
var p3 = new player(all_play[2].poker,$('.player_3'),'v',2);
var all_player = [p1,p2,p3]

// 发牌后开始抢地主
var ask_lord = 0;
var cal_lord = 0;
var random_play = Math.round(Math.random()*2)
setTimeout(function(){
	all_player[random_play].onLord();
},1000)

// 出牌阶段
var play_count = 0;
var no_play = 0;
// 判断出牌的值是否合法，并返回相应的值
var poker_length = 0;	// 出牌的数量
// 出牌的类型：0为无效，1为单张，2为对子，3为三条，4为三带一，5为三带一，6为顺子，7为连对，8为飞机，999为炸弹，110为王炸
var poker_type = 0;		
var poker_max = 0;