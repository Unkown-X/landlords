$(function(){
	//初始化牌堆
	for(var i=1;i<=54;i++){
		$('.all_poker').append('<li class="back"></li>');
		$('.back').eq(i-1).css('top',-(i-1)+'px');
	}
	//初始化牌堆数据
	/*
		由于每张扑克牌含有两个数据，所以我们设计数据结构时需要把一个数据看成两个值
		例如：黑桃a 14_3,红心a 14_2 梅花a 14_1 方砖a 14_0 点数_花色
		joker=16 2=15 啊=14；
	 */
	var all_poker_data = ['16_1','16_0'];
	for(var i=3;i<16;i++){
		for(var j=0;j<4;j++){
			all_poker_data.push(i+'_'+j);
		}
	}
	// console.log(all_poker_data);
	//初始化玩家数据
	// var all_play = [];
	// var player1 = {name:'玩家1',integtal:1000,role:0,poker:[]};
	// all_player.push(player1);
	// // name=>用户昵称; intergarl =>积分; role =>角色  0 代表农民，1代表地主；poker=>玩家当前牌的数据
	// var player2 = {name:'玩家2',integtal:1000,role:0,poker:[]};
	// all_player.push(player2);
	// var player3 = {name:'玩家3',integtal:1000,role:0,poker:[]};
	// all_player.push(player3);
	// 
	var all_play=[];
	all_play.push({name:'刀光剑影',integtal:1000,role:0,poker:[]});
	all_play.push({name:'日穿钢板',integtal:1000,role:0,poker:[]});
	all_play.push({name:'见女就怼',integtal:1000,role:0,poker:[]});
	var skin=1;//'换肤'的
	var not=0;//'不要'的变量
	var rob = 0;//定义一个变量来切换抢地主的音频
	var temp_stauts = -1;//定义一个变量用来存储临时身份;
	var ready_poker = {poker:[],type:0,max:0};//初始化准备出的牌型
	var desktop_poker = {poker:[],type:0,max:0}; //初始化桌面上的牌型
	var count = 15;//初始化倒计时时间,单位是秒
	var click_num = 0;//定义点击次数
	//绑定洗牌事件
	$('.all_poker').on('click','.start',function(){
		if(click_num==0){
			//洗牌阶段
			
			deal(0);//发牌阶段
			setTimeout(function(){
				getBoss();
			},3500);	
			
			$('.start').remove()//清除发牌按钮
		}else{
			return;
		}
		click_num++;
	});
	
	// //洗牌函数(待优化)
	// function clearPoker(){
	// 	var alpha = setInterval(function(){
	// 		for(var i=0;i<54;i++){
	// 			var rad_l=Math.floor(Math.random()*100)-50; 
	// 			$('.back').eq(i).animate({left:-rad_l+'px'},20).css('transform','rotate('+i*30+'deg)');
	// 		}
	// 	},20)
	// 	setTimeout(function(){
	// 		clearInterval(alpha);
	// 		for(var i=0;i<54;i++){
	// 			$('.back').eq(i).animate({left:'0px'},10);
	// 		}
	// 	},1500)
	// 	for(var i=0;i<2;i++){
	// 		all_poker_data.sort(function(){return 0.5-Math.random();});//牌堆数据打乱
	// 	}
	// 	// console.log(all_poker_data);
	// }
shuffle();
function shuffle(){
	// 生成牌堆
	for(var i=0;i<4;i++){
		$('.box').append('<ul class="ul"></ul>');
		for(var j=0;j<=14;j++){
			$('.ul').append('<li style="top:-'+j+'px;"></li>')
		}
	}	
	for(var i=0;i<2;i++){
		all_poker_data.sort(function(){return 0.5-Math.random();});//牌堆数据打乱
	}
	var num1 = 0;
	var num2 = 0;
	setTimeout(function(){
		setTimeout(function(){animation2()},1800);
		setTimeout(function(){animation3()},4650);
		anination1();
	},1000)
	// 动画1 生成牌堆 添加出场效果
	function anination1(){
		if(num1>14){
			return;
		}
		setTimeout(function(){
			$('.ul:eq(0) li').eq(num1).addClass('li1');		
			$('.ul:eq(1) li').eq(num1).addClass('li2');		
			$('.ul:eq(2) li').eq(num1).addClass('li1');		
			$('.ul:eq(3) li').eq(num1).addClass('li2');		
			num1++
			anination1();
		},50)		
	}
	// 动画2 4堆牌混合 删除原有的四个牌堆 新建一个整的牌堆
	function animation2(){
		if(num2>14){
			$('.box ul').animate({opacity:0},1000)
			setTimeout(function(){
				$('.box ul').remove();
			},1200)		
			return;
		}
		setTimeout(function(){
			$('.ul:eq(0) li').eq(num2).animate({left:'-300px',top:'160px'},200).animate({left:'400px'},400);	
			$('.ul:eq(1) li').eq(num2).animate({left:'300px',top:'160px'},200).animate({left:'-420px'},400);	
			$('.ul:eq(2) li').eq(num2).animate({left:'-300px',top:'-180px'},200).animate({left:'400px'},400);	
			$('.ul:eq(3) li').eq(num2).animate({left:'300px',top:'-180px'},200).animate({left:'-420px'},400);	
			num2++
			animation2();
		},100)
	}
	// 动画3 删除原来牌堆 新建一堆54张牌的新牌堆 人物把牌堆扔出去
	var num3=54;
	function animation3(){
		$('.box').append('<ul class="ul" style="top:125px;left:438px;"></ul>')
		for(var i=0;i<54;i++){
			$('.ul').append('<li class="li" style="top:-'+i+'px;"></li>');
		}
		$('.box').append('<div class="throw"></div>')
		$('.ul li').css('z-index','3')
		$('.ul li').addClass('li3')
		setTimeout(function(){
			animation4();
		},700);
		setTimeout(function(){
			$('.throw').css('display','none');
		},800);
	}		
	// 扔出去的牌随机散开
	function animation4() {
		if(num3<0){	
				setTimeout(function(){
					animation5();
				},1500)				
				return;		
			}
			var x = -1000+Math.floor(Math.random()*2000);
			var y = -400+Math.floor(Math.random()*800);
			var z = -300+Math.floor(Math.random()*600);
			var rotate = Math.floor(Math.random()*7200);
			$('.ul li').removeClass('li3')
			$('.ul li').eq(num3).css({'transform':'translateX('+x+'px) translateY('+y+'px) translateZ('+z+'px)','transition':'0.5s'});
			num3--;
			animation4();
	}
	var num4 = 54;
	// 散开出去的牌位置再随机更换一次
	function animation5() {		
		if(num4<0){
			// 随机更换一次位置后，所有扑克牌归位
			setTimeout(function(){
				$('.ul li').css({'transform':'translateX(0px) translateY(0px) translateZ(0px)','transition':'1s'});
				setTimeout(function(){
					animation6();
				},500)			
			},2000);		
			return;	
		}
		var x = -1000+Math.floor(Math.random()*2000);
		var y = -400+Math.floor(Math.random()*800);
		var z = -300+Math.floor(Math.random()*600);
		var rotate = Math.floor(Math.random()*7200);
		$('.ul li').eq(num4).css({'transform':'translateX('+x+'px) translateY('+y+'px) translateZ('+z+'px)','transition':'1.5s'});
		num4--;
		animation5();
	}
	var num5 = 54;
	// 所有扑克牌网上移动一定距离
	function animation6() {
		if(num5<0){
			setTimeout(function(){
				$('.box').remove();
				$('.all_poker ').css('display','block');
				$('.Box').remove();
				$('.star').css('display','block');	
			},1500);
					
			return;	
		}
		setTimeout(function(){
			$('.ul li').eq(num5).animate({top:(-120-num5)+'px'},500);
			num5--;
			animation6();
			},20);
		}
	}
	$('.star').click(function(){
		$(this).css('display','none');
		deal(0);
		setTimeout(function(){
			getBoss();
		},4000);	
	})
	//派牌动画
	function deal(num){
		//往左边玩家1发牌
		$('.all_poker li:last').animate({left:'-500px',top:'200px'},20);
		setTimeout(function(){
			$('.all_poker li:last').remove();
			all_play[0].poker.push(all_poker_data.pop());
			makePoker(1,all_play[0].poker[all_play[0].poker.length-1],num,skin);
		},30);
		//往中间玩家2发牌
		setTimeout(function(){
			$('.all_poker li:last').animate({top:'400px'},20);
			setTimeout(function(){
				$('.all_poker li:last').remove();
				all_play[1].poker.push(all_poker_data.pop());
				makePoker(2,all_play[1].poker[all_play[1].poker.length-1],num,skin);
			},30);	
		},40);
		//往右边玩家3发牌
		setTimeout(function(){
			$('.all_poker li:last').animate({left:'500px',top:'200px'},20);
			setTimeout(function(){
				$('.all_poker li:last').remove();
				all_play[2].poker.push(all_poker_data.pop());
				makePoker(3,all_play[2].poker[all_play[2].poker.length-1],num,skin);
				num++;	
				if(num<17){
					deal(num);
				}else{
					$('.all_poker li').each(function(i){
						$(this).animate({'left':-150+i*150+'px'},100).css('transform','rotate(0deg)');
						all_play[0].poker = sortPoker(all_play[0].poker);
						all_play[1].poker = sortPoker(all_play[1].poker);
						all_play[2].poker = sortPoker(all_play[2].poker);
						//等一秒后，整理扑克牌翻转整理扑克牌
						setTimeout(function(){
							$('.p1 li').attr('class','back').css('background-image','');
							$('.p2 li').attr('class','back').css('background-image','');
							$('.p3 li').attr('class','back').css('background-image','');
							setTimeout(function(){
								$('.p1 li').remove();
								$('.p2 li').remove();
								$('.p3 li').remove();
								for(var i=0;i<all_play[0].poker.length;i++){
									makePoker(1,all_play[0].poker[i],i,skin);
								}
								for(var i=0;i<all_play[1].poker.length;i++){
									makePoker(2,all_play[1].poker[i],i,skin);
								}
								for(var i=0;i<all_play[2].poker.length;i++){
									makePoker(3,all_play[2].poker[i],i,skin);
								}
							},500);
						},1000);
						// 设置一个换肤按钮，在翻牌后改变牌的图片
						$('body').on('click','.change',function(poker){
							setTimeout(function(){
								$('.p1 li').attr('class','back').css('background-image','');
								$('.p2 li').attr('class','back').css('background-image','');
								$('.p3 li').attr('class','back').css('background-image','');
								setTimeout(function(){
									$('.p1 li').remove();
									$('.p2 li').remove();
									$('.p3 li').remove();
									for(var i=0;i<all_play[0].poker.length;i++){
										makePoker(1,all_play[0].poker[i],i,skin);
									}
									for(var i=0;i<all_play[1].poker.length;i++){
										makePoker(2,all_play[1].poker[i],i,skin);
									}
									for(var i=0;i<all_play[2].poker.length;i++){
										makePoker(3,all_play[2].poker[i],i,skin);
									}
									//更换背景
									$('body').css({'background':'url(./images/'+skin+'/bg.jpg)no-repeat center ','background-size':'100%'});
								},500);
							},1000);
							skin=(++skin>4)? 1:skin;
						})
					})
				}
			},30);
		},80);
	}
	//定义一个生成牌面的方法
	function makePoker(pokername,poker,num,pic){
		if(pokername==2 ||pokername==0 ){
			$('.p'+pokername).append('<li data-value="'+poker+'"></li>').css({left:-40*num+'px'});
			$('.p'+pokername+' li:last').css({left:40*num+'px',"background-image":'url(./images/'+pic+'/'+poker+'.jpg)'});
		}else{
			$('.p'+pokername).append('<li data-value="'+poker+'"></li>').css({top:-30*num+'px'});
			$('.p'+pokername+' li:last').css({top:30*num+'px',"background-image":'url(./images/'+pic+'/'+poker+'.jpg)'});
		}	
	}
	//定义一个扑克牌数据整理函数
	function sortPoker(poker){
		poker = poker.sort(function(x,y){
			var x_arr = x.split('_');
			var y_arr = y.split('_');
			//判断牌的点数
			if(x_arr[0] != y_arr[0]){
				//点数不相同，使用点数排序
				return y_arr[0] - x_arr[0];

			}else{
				//点数相同，使用花色排序
				return y_arr[1] - x_arr[1];
			}
		});
		return poker;
	}
	//定义一个抢地主的方法	2 为要 5为不要;
	/*  code   含义
		255    第一个为地主   
		525    第二个为地主
		552    第三个为地主
		225    第二个为地主
		252    第三个为地主
		522    第三个为地主
		2222   第一个为地主
		2225   第三个为地主
	 */
	function getBoss(start,cancle,code,num){
		num = num || 0
		code = code || 0;
		console.log('code:'+code);
		cancle = cancle || 0;
		$('.getBoss').remove();
		num = (num == 0 || num == 1) ? 1:2;//1 叫地主 2 抢地主
		for(var i=1;i<4;i++){
			$('.p'+i).after('<p class="getBoss"><input class="jiao'+num+'" type="button"  data-value="'+i+'"><input class="nojiao" type="button"></p>');
		}
		console.log('cancle'+cancle);
		if(cancle >= 3){
			alert('扑街都不抢地主，不玩了~');
			window.location.reload();
			return false;
		}
		if(start == undefined){
			start = Math.round(Math.random()*2);
		}
		//判断谁是地主
		switch(code){
			case 255:
				Boss(start);
			break;

			case 525:
				start = (++start >2) ? 0 : start;
				Boss(start);
			break;

			case 552:
				start = (--start <0) ? 2 : start;
				Boss(start);
			break;

			case 225:
				start = (++start >2) ? 0 : start;
				Boss(start);
			break;

			case 252:
				start = (--start <0) ? 2 : start;
				Boss(start);
			break;

			case 522:
				start = (--start <0) ? 2 : start;
				Boss(start);
			break;

			case 2222:
				start = (--start <0) ? 2 : start;
				Boss(start);
			break;

			case 2225:
				start = (++start >2) ? 0 : start;
				Boss(start);
			break;
		}

		// 先把所有玩家叫地主的组件隐藏
		$('.getBoss').hide();

		// 把开始叫地主的人的页面组件显示
		$('.getBoss').eq(start).show();
		//绑定叫地主的按钮方法
		$('.getBoss').eq(start).find('input').eq(0).click(function(){
			code = 2+10*code;
			num = 3;
			if(code <= 20){
				$('body').append('<audio src="./music/Woman_Order.ogg" autoplay="autoplay" ></audio>')
			}else{
				rob = (++rob>3)? 1:rob;
				console.log(rob)
				$('body').append('<audio src="./music/Woman_Rob'+rob+'.ogg" autoplay="autoplay" ></audio>')//抢地主的音频
			}
			start = (++start >2) ? 0 : start;
			getBoss(start,cancle,code,num);
		});
			
		//绑定不叫地主的按钮
		$('.getBoss').eq(start).find('input').eq(1).click(function(){
			code = 5+10*code;
			start = (++start >2) ? 0 : start;
			getBoss(start,cancle+1,code,num);
			$('body').append('<audio src="./music/Woman_NoOrder.ogg" autoplay="autoplay" ></audio>')
		});
	}
	//定义一个当地主的方法
	function Boss(start){
		//通过点击得到的那个玩家抢地主的值来判断谁当地主
		var value = Number($('.getBoss').eq(start).find('input').eq(0).attr('data-value'));
		//当地主的玩家相关的值要更改;
		all_play[start].role = 1;
		//生成玩家信息
		var role = ['农民','地主'];
		for(var i=1;i<4;i++){
			$('.p'+i).after('<div class="info"><h2>'+role[all_play[i-1].role]+'</h2><h3>'+all_play[i-1].name+'</h3></div>');
		}
		//把剩余的三张牌翻开
		$('.all_poker li').remove();
		for(var i=0;i<3;i++){
			 	makePoker(0,all_poker_data[i],i*4,skin);

			};
		all_play[start].poker=all_play[start].poker.concat(all_poker_data);
		//卡牌插入
		setTimeout(function(){
			$('.p'+value+' li').remove();
			all_play[start].poker = sortPoker(all_play[start].poker);
			for(var j=0;j<all_play[start].poker.length;j++){
						makePoker(value,all_play[start].poker[j],j,skin);
			}
			// console.log($('.p1 li').length);
			$('.p0 li').remove();
			//得到地主后删除抢地主按钮
			$('.getBoss').remove();
			//结束抢地主阶段进入游戏开始阶段
			startGame(value-1);
		},500);
	}
	//绑定选择事件
	function selectPoker(num){
		for(var i=1;i<4;i++){
			$('.p'+i).off('click','li');
		}
		$('.p'+num).on('click','li',function(){	
			switch(num){
				case 1:
					var left = $(this).css('left');
					if(left != '15px'){
						$(this).css({left:'15px'});
						ready_poker.poker.push($(this).attr('data-value'));
						console.log(ready_poker.poker);
					}else{
						$(this).css({left:'0px'});
						//找到牌的数据
						var index = ready_poker.poker.indexOf($(this).attr('data-value'));
						//删除这条数据
						ready_poker.poker.splice(index,1);
						console.log(ready_poker.poker);
					}
				break;

				case 2:
					var top = $(this).css('top');
					if(top != '-15px'){
						$(this).css({top:'-15px'});
						ready_poker.poker.push($(this).attr('data-value'));
						console.log(ready_poker.poker);
					}else{
						$(this).css({top:'0px'});
						//找到牌的数据
						var index = ready_poker.poker.indexOf($(this).attr('data-value'));
						//删除这条数据
						ready_poker.poker.splice(index,1);
						console.log(ready_poker.poker);
					}
				break;

				case 3:
					var left = $(this).css('left');
					if(left != '-15px'){
						$(this).css({left:'-15px'});
						ready_poker.poker.push($(this).attr('data-value'));
						console.log(ready_poker.poker);
					}else{
						$(this).css({left:'0px'});
						//找到牌的数据
						var index = ready_poker.poker.indexOf($(this).attr('data-value'));
						//删除这条数据
						ready_poker.poker.splice(index,1);
						console.log(ready_poker.poker);
					}
				break;
			}
		});
	}
	//定义一个游戏开始的方法
	function startGame(num){

		selectPoker(num+1);
		console.log('num:'+num);
		$('.left').append('<p class="action"><input class="chu" type="button" value=""><input class="buchu" type="button" value=""></p><div class="countdown">16</div>');
		$('.right').append('<p class="action"><input class="chu" type="button" value=""><input class="buchu" type="button" value=""></p><div class="countdown">16</div>');
		$('.mid_down').append('<p class="action"><input class="chu" type="button" value=""><input class="buchu" type="button" value=""></p><div class="countdown">16</div>');
		$('.action').hide();
		$('.action').eq(num).show();
		$('.countdown').hide();
		$('.countdown').eq(num).show();
		console.log('临时值'+temp_stauts);
		//倒计时功能
		if(count == 0){
			return;
		}
		var Int = setInterval(function(){
			$('.countdown').text(''+count+'');
			console.log('count:'+count);
			count--;
		},1000);
		var int = setTimeout(function(){
			clearInterval(Int);
			Pass();
		},17000);
		//绑定出牌事件
		$('.action').eq(num).find('input').eq(0).click(function(){
			// 在判断牌型前需要进行数据排序
			ready_poker.poker = sortPoker(ready_poker.poker);
			//调用一个函数专门用来判断是否能出牌
			if(temp_stauts == num){
				desktop_poker = {poker:[],type:0,max:0};
			}
			if(!checkPokers(ready_poker)){
				alert('你的牌不符合出牌规则，请重新发牌');
				return false;
			}else if(!pokerVS()){
				alert('你的牌打不过!');
				console.log('手牌类型:'+ready_poker.type+'手牌最大值:'+ready_poker.max);
				return false;
			}else{
				//出牌的完整流程
				//1.把桌面的牌换成玩家选择出的牌
				desktop_poker.type = ready_poker.type;
				desktop_poker.max = ready_poker.max;
				desktop_poker.poker = [];
				console.log('桌面牌类型:'+desktop_poker.type+'桌面牌最大值:'+desktop_poker.max);
				//2.保存是出牌的玩家
				temp_stauts = num;
				//3.调用出牌方法
				discard(ready_poker.poker,num);
			}
			clearTimeout(int);
			clearInterval(Int);
			count = 15;//初始化计数时间
			$('.countdown').remove();
			$('.action').remove();
			num = (++num>2)? 0:num;
			startGame(num);
		});
		//绑定不出事件
		$('.action').eq(num).find('input').eq(1).click(function (){
			clearTimeout(int);
			Pass();
			//设置定时器 在出牌后的1.5s清除音频和火箭动画
			setTimeout(function(){
				$('audio').remove();
				$('#rocket').remove()
			},1500)
		});
		//封装不出牌方法
		function Pass(){
			clearInterval(Int);
			if(temp_stauts == -1 || temp_stauts == num){
				alert('你必须要出牌!');
				return;
			}
			count = 15;//初始化计数时间
			$('.countdown').remove();
			//根据不要的次数给出不同的音频
			not = (++not>4)? 1:not;
			$('body').append('<audio src="./music/Woman_buyao'+not+'.ogg" autoplay="autoplay"></audio>');
			$('.action').remove();
			clearSelect(num);
			num = (++num>2)? 0:num;
			startGame(num);
		}
	}
	//判断牌型的方法
	/*
		牌型代号说明
		0 	无效牌型
		1   单张
		2 	对子
		3 	三张
		31 	三带一 三张相同带1张三张相同带一对
		11	单顺 五张或更多数值连续的单牌(如： 45678 或 78910JQK )。不包括 2 和双王。
		22	双顺 三对或更多数值连续的对牌(如：334455 、7788991010JJ )。不包括 2 和双王
		33	三顺 二个或更多数值连续的三张牌(如：333444 、555666777888 )。不包括 2 和双王。
		666	飞机带翅膀：三顺+同数量的任意单牌(或同数量的任意对牌)。(如：44455579 或 3334445557799JJ)
		42	四带二：任意数值相同的四张牌 + 两张数值不相同的单牌 或者 + 任意两对对牌。(如：555579或55557799)
		888	炸弹：任意数值相等的4张牌
		999	火箭：大王+小王
	 */
	//定义一个检查扑克牌的方法
	function checkPokers(poker){
		var len = poker.poker.length;
		var poker_data = [];
		for(var i=0;i<len;i++){
			poker_data.push(poker.poker[i].split('_'));
		}
		if(len==1){
			poker.type = 1;
			if(poker_data[0][0] == 16){
				poker.max = poker_data[0][0] + poker_data[0][1];
			}else{
				poker.max = poker_data[0][0];
			}
			return true;
			// alert('单张');
		}else if(double(len,poker_data)){
			poker.type = 2;
			poker.max = poker_data[0][0];
			return $('body').append('<audio src="./music/duizi.mp3" autoplay="autoplay"></audio>');
			return true;
			// alert('对子');
		}else if(rocket(len,poker_data)){
			poker.type = 999;
			poker.max = 14;
			return $('body').append('<audio src="./music/Man_wangzha.ogg" autoplay="autoplay"></audio><div id="rocket"><audio src="./music/Special_Bomb_New.ogg" autoplay="autoplay"></audio></div>')
			return true;
			// alert('火箭');
		}else if(triple(len,poker_data)){
			poker.type = 3;
			poker.max = poker_data[0][0];
			return true;
			// alert('三张');
		}else if(checkStraight(len,poker_data)){
			poker.type = 11;
			poker.max = poker_data[0][0];
			return $('body').append('<audio src="./music/Man_shunzi.ogg" autoplay="autoplay"></audio>');
			return true;
			// alert('单顺');
		}else if(doubleStraight(len,poker_data)){
			poker.type = 22;
			poker.max = poker_data[0][0];
			return $('body').append('<audio src="./music/Man_liandui.ogg" autoplay="autoplay"></audio>');
			return true;
			// alert('双顺');
		}else if(tripleStraight(len,poker_data)){
			poker.type = 33;
			poker.max = poker_data[0][0];
			return $('body').append('<audio src="./music/Man_feiji.ogg" autoplay="autoplay"></audio>');
			return true;
			// alert('三顺');
		}else if(bomb(len,poker_data)){
			poker.type = 888;
			poker.max = poker_data[0][0];
			return $('body').append('<audio src="./music/Man_zhadan.ogg" autoplay="autoplay"></audio>');
			return true;
			// alert('炸弹');
		}else if(AAAB(len,poker_data)){
			poker.type = 31;
			poker.max = poker_data[2][0];
			return $('body').append('<audio src="./music/Man_sandaiyi.ogg" autoplay="autoplay"></audio>');
			return true;
			// alert('三带一');
		}else if(AAAABB(len,poker_data)){
			poker.type = 42;
			poker.max = poker_data[2][0];
			return $('body').append('<audio src="./music/Woman_sidaier.ogg" autoplay="autoplay"></audio>');
			return true;
			// alert('四带二');
		}else if(poker.max = planeWing(len,poker_data)){
			poker.type = 666;
			alert(1);
			return $('body').append('<audio src="./music/Woman_sidaier.ogg" autoplay="autoplay"></audio>');
			return true;
		}else{
			poker.type = 0;
			return false;
		}
	}
	//判断对子的方法
	function double(len,poker_data){
		if(len != 2){
			return false;
		}else{
			if(poker_data[0][0]==poker_data[1][0]&&poker_data[0][0]!=16){
				return true;
			}
		}
	}
	//判断火箭的方法
	function rocket(len,poker_data){
		if(len !=2){
			return false;
		}else{
			if(poker_data[0][0]==16&&poker_data[1][0]==16){
				return true;
			}
		}
	}
	//判断三张的方法
	function triple(len,poker_data){
		if(len !=3){
			return false;
		}else{
			if(poker_data[0][0]==poker_data[1][0]&&poker_data[1][0]==poker_data[2][0]){
				return true;
			}
		}
	}
	//判断单顺的方法
	function checkStraight(len,poker_data){
		if(len<5){
			return false;
		}else{
			if(poker_data[0][0]==16||poker_data[0][0]==15){
				return false;
			}else{
				for(var i=0;i<len-1;i++){
					if(poker_data[i][0]-1!=poker_data[i+1][0]){
						return false;
					}
				}
				return true;
			}
		}
		return;	
	}
	//判断双顺的方法
	function doubleStraight(len,arr){
		if(len<6 ){
			return false;
		}else{
			if(arr[0][0]==16||arr[0][0]==15){
				return false;
			}else{
				for(var i=0;i<arr.length-3;i+=2){
					if(arr[i][0] != arr[i+1][0] && arr[i+1][0]-1 !=arr[i+2][0]){
					return false;
					}
				}
			return $('body').append('<audio src="./music/Man_liandui.ogg" autoplay="autoplay"></audio>')
			return true;
			}
		}
		return;
	}
	//判断三顺的方法 
	function tripleStraight(len,arr){
		if(len<6){
			return false;
		}else{
			if(arr[0][0]==16||arr[0][0]==15){
				return false;
			}else{
				for(var i=0;i<len-4;i+=3){
					if(arr[i][0] !=arr[i+2][0] || arr[i][0]-1 !=arr[i+3][0]){
						return false;
					}
				}
				return $('body').append('<audio src="./music/Man_liandui.ogg" autoplay="autoplay"></audio>')
				return true;
			}
		}
		return;
	}
	//判断炸弹的方法
	function bomb(len,poker_data){
		if(len!=4){
			return false;
		}else{
			if(poker_data[0][0]==poker_data[1][0]&&poker_data[2][0]==poker_data[0][0]&&poker_data[3][0]==poker_data[0][0]){
				return true;
			}else{
				return false;
			}
		}
	}
	//判断三带一的方法
	function AAAB(len,poker_data){
		if(len==4){
			if(poker_data[0][0]==poker_data[1][0]&&poker_data[1][0]==poker_data[2][0]||poker_data[3][0]==poker_data[1][0]&&poker_data[1][0]==poker_data[2][0]){
				return true;
			}
		}else if(len==5){
			if(poker_data[0][0]==poker_data[1][0]&&poker_data[1][0]==poker_data[2][0]&&poker_data[3][0]==poker_data[4][0]||poker_data[2][0]==poker_data[3][0]&&poker_data[4][0]==poker_data[2][0]&&poker_data[0][0]==poker_data[1][0]){
				return true;
			}
		}else{
			return false;
		}
	}
	//判断四带二的方法
	function AAAABB(len,poker_data){
		if(len == 6){
			if(poker_data[0][0]==poker_data[1][0]&&poker_data[1][0]==poker_data[2][0]&&poker_data[3][0]==poker_data[0][0]||poker_data[1][0]==poker_data[2][0]&&poker_data[3][0]==poker_data[1][0]&&poker_data[3][0]==poker_data[1][0]||poker_data[2][0]==poker_data[3][0]&&poker_data[4][0]==poker_data[2][0]&&poker_data[5][0]==poker_data[2][0]){
				return true;
			}
		}else if(len == 8){
			if(poker_data[0][0]==poker_data[1][0]&&poker_data[0][0]==poker_data[2][0]&&poker_data[3][0]==poker_data[0][0]&&poker_data[4][0]==poker_data[5][0]&&poker_data[6][0]==poker_data[7][0]||poker_data[2][0]==poker_data[3][0]&&poker_data[4][0]==poker_data[2][0]&&poker_data[5][0]==poker_data[2][0]&&poker_data[0][0]==poker_data[1][0]&&poker_data[6][0]==poker_data[7][0]||poker_data[4][0]==poker_data[5][0]&&poker_data[6][0]==poker_data[4][0]&&poker_data[7][0]==poker_data[4][0]&&poker_data[0][0]==poker_data[1][0]&&poker_data[2][0]==poker_data[3][0]){
				return true;
			}
		}else{
			return false;
		}
	}
	//判断飞机带翅膀
	function planeWing(len,arr){
		var max = false;
		if(arr[0][0] == 16|| arr[0][0] == 15){
			return false;
		}else{
			switch(len){
				case 8:
					if(arr[0][0] == arr[2][0] && arr[2][0]-1 == arr[3][0] && arr[3][0] == arr[5][0]){
						max = arr[2][0];
					}else if(arr[1][0] == arr[3][0] && arr[3][0]-1 == arr[4][0] && arr[4][0] == arr[6][0]){
						max = arr[2][0];
					}else if(arr[2][0] == arr[4][0] && arr[4][0]-1 == arr[5][0] && arr[5][0] == arr[7][0]){
						max = arr[2][0];
					}
				break;

				case 10:
					if(arr[0][0] == arr[2][0] && arr[2][0]-1 == arr[3][0] && arr[3][0] == arr[5][0] && arr[6][0] == arr[7][0] && arr[8][0] == arr[9][0]){
						max = arr[0][0];
					}else if(arr[0][0] == arr[1][0] && arr[8][0]==arr[9][0] && arr[2][0] == arr[4][0] && arr[4][0]-1 == arr[5][0] && arr[5][0] == arr[7][0]){
						max = arr[2][0];
					}else if(arr[0][0] == arr[1][0] && arr[2][0]==arr[3][0] && arr[4][0] == arr[6][0] && arr[6][0]-1 == arr[7][0] && arr[7][0] == arr[9][0]){
						max = arr[4][0];
					}
				break;

				case 12:
					if(arr[0][0] == arr[2][0] && arr[2][0]-1 == arr[3][0] && arr[3][0] == arr[5][0] && arr[5][0]-1 == arr[6][0] && arr[6][0] == arr[8][0]){
						max = arr[0][0];
					}else if(arr[1][0] == arr[3][0] && arr[3][0]-1 == arr[4][0] && arr[4][0] == arr[6][0] && arr[6][0]-1 == arr[7][0] && arr[7][0] == arr[9][0]){
						max = arr[1][0];
					}else if(arr[2][0] == arr[4][0] && arr[4][0]-1 == arr[5][0] && arr[5][0] == arr[7][0] && arr[7][0]-1 == arr[8][0] && arr[8][0] == arr[10][0]){
						max = arr[2][0];
					}else if(arr[3][0] == arr[5][0] && arr[5][0]-1 == arr[6][0] && arr[6][0] == arr[8][0] && arr[8][0]-1 == arr[9][0] && arr[9][0] == arr[11][0]){
						max = arr[3][0];
					}
				break;

				case 15:
					if(arr[0][0] == arr[2][0] && arr[2][0]-1 == arr[3][0] && arr[3][0] == arr[5][0] && arr[5][0]-1 == arr[6][0] && arr[6][0] == arr[8][0] && arr[9][0] == arr[10][0] && arr[11][0] == arr[12][0] && arr[13][0] == arr[14][0]){
						max = arr[0][0];
					}else if(arr[2][0] == arr[4][0] && arr[4][0]-1 == arr[5][0] && arr[5][0] == arr[7][0] && arr[7][0]-1 == arr[8][0] && arr[8][0] == arr[10][0] && arr[11][0] == arr[12][0] && arr[13][0] == arr[14][0] && arr[0][0] == arr[1][0]){
						max = arr[2][0];
					}else if(arr[4][0] == arr[6][0] && arr[6][0]-1 == arr[7][0] && arr[7][0] == arr[9][0] && arr[9][0]-1 == arr[10][0] && arr[10][0] == arr[12][0] && arr[13][0] == arr[14][0] && arr[2][0] == arr[3][0] && arr[0][0] == arr[1][0]){
						max = arr[4][0];
					}else if(arr[6][0] == arr[8][0] && arr[8][0]-1 == arr[9][0] && arr[9][0] == arr[11][0] && arr[11][0]-1 == arr[12][0] && arr[12][0] == arr[14][0] && arr[4][0] == arr[5][0] && arr[2][0] == arr[3][0] && arr[0][0] == arr[1][0]){
						max = arr[6][0];
					}
				break;

				case 16:
					if(arr[0][0] == arr[2][0] && arr[2][0]-1 == arr[3][0] && arr[3][0] == arr[5][0] && arr[5][0]-1 == arr[6][0] && arr[6][0] == arr[8][0] && arr[8][0]-1 == arr[9][0] && arr[9][0] == arr[11][0]){
						max = arr[0][0];
					}else if(arr[1][0] == arr[3][0] && arr[3][0]-1 == arr[4][0] && arr[4][0] == arr[6][0] && arr[6][0]-1 == arr[7][0] && arr[7][0] == arr[9][0] && arr[9][0]-1 == arr[10][0] && arr[10][0] == arr[12][0]){
						max == arr[1][0];
					}else if(arr[2][0] == arr[4][0] && arr[4][0]-1 == arr[5][0] && arr[5][0] == arr[7][0] && arr[7][0]-1 == arr[8][0] && arr[8][0] == arr[10][0] && arr[10][0]-1 == arr[11][0] && arr[11][0] == arr[13][0]){
						max == arr[2][0];
					}else if(arr[3][0] == arr[5][0] && arr[5][0]-1 == arr[6][0] && arr[6][0] == arr[8][0] && arr[8][0]-1 == arr[9][0] && arr[9][0] == arr[11][0] && arr[11][0]-1 == arr[12][0] && arr[12][0] == arr[14][0]){
						max == arr[3][0];
					}else if(arr[4][0] == arr[6][0] && arr[6][0]-1 == arr[7][0] && arr[7][0] == arr[9][0] && arr[9][0]-1 == arr[10][0] && arr[10][0] == arr[12][0] && arr[12][0]-1 == arr[13][0] && arr[13][0] == arr[15][0]){
						max == arr[4][0];
					}
				break;

				case 20:
					if(arr[0][0] == arr[2][0] && arr[2][0]-1 == arr[3][0] && arr[3][0] == arr[5][0] && arr[5][0]-1 == arr[6][0] && arr[6][0] == arr[8][0] && arr[8][0]-1 == arr[9][0] && arr[9][0] == arr[11][0] && arr[12][0] == arr[13][0] && arr[14][0] == arr[15][0] && arr[16][0] == arr[17][0] && arr[18][0] == arr[19][0]){
						max == arr[0][0];
					}else if(arr[2][0] == arr[4][0] && arr[4][0]-1 == arr[5][0] && arr[5][0] == arr[7][0] && arr[7][0]-1 == arr[8][0] && arr[8][0] == arr[10][0] && arr[10][0]-1 == arr[11][0] && arr[11][0] == arr[13][0] && arr[0][0] == arr[1][0] && arr[14][0] == arr[15][0] && arr[16][0] == arr[17][0] && arr[18][0] == arr[19][0]){
						max == arr[2][0];
					}else if(arr[4][0] == arr[6][0] && arr[6][0]-1 == arr[7][0] && arr[7][0] == arr[9][0] && arr[9][0]-1 == arr[10][0] && arr[10][0] == arr[12][0] && arr[12][0]-1 == arr[13][0] && arr[13][0] == arr[15][0] && arr[0][0] == arr[1][0] && arr[2][0] == arr[3][0] && arr[16][0] == arr[17][0] && arr[18][0] == arr[19][0]){
						max == arr[4][0];
					}else if(arr[6][0] == arr[8][0] && arr[8][0]-1 == arr[9][0] && arr[9][0] == arr[11][0] && arr[11][0]-1 == arr[12][0] && arr[12][0] == arr[14][0] && arr[14][0]-1 == arr[15][0] && arr[15][0] == arr[17][0] && arr[0][0] == arr[1][0] && arr[2][0] == arr[3][0] && arr[4][0] == arr[5][0] && arr[18][0] == arr[19][0]){
						max == arr[6][0];
					}else if(arr[8][0] == arr[10][0] && arr[10][0]-1 == arr[11][0] && arr[11][0] == arr[13][0] && arr[13][0]-1 == arr[14][0] && arr[14][0] == arr[16][0] && arr[16][0]-1 == arr[17][0] && arr[17][0] == arr[19][0] && arr[0][0] == arr[1][0] && arr[2][0] == arr[3][0] && arr[4][0] == arr[5][0] && arr[6][0] == arr[7][0]){
						max == arr[8][0];
					}
				break;
			}
		}
	$('body').append('<audio src="./music/Man_feiji.ogg" autoplay="autoplay"></audio>')
	return max;
	}
	//定义一个出牌方法
	function discard(arr,x){
		$('.p0 li').remove();
		for(var i=0;i<arr.length;i++){
			desktop_poker.poker.push(ready_poker.poker[i]);
			makePoker(0,arr[i],i,skin);
			$('.p0 li').eq(i).css({width:'100px',height:'148px','background-size':'100%'});
			var del_index = all_play[x].poker.indexOf(arr[i]);
			all_play[x].poker.splice(del_index,1);
			// console.log('下标：'+del_index);
		}
		//玩家出牌后出牌数据初始化
		ready_poker = {poker:[],type:0,max:0};
		// console.log(all_play[0].poker);
		$('.p'+(x+1)+' li').remove();
		//设置定时器 在出牌后的1.5s清除音频和火箭动画
		setTimeout(function(){
			$('audio').remove();
			$('#rocket').remove()
		},1500)

		for(var j=0;j<all_play[x].poker.length;j++){
			makePoker((x+1),all_play[x].poker[j],j,skin);
		}
		if(all_play[x].poker.length == 0){
			alert('玩家'+(x+1)+'赢了');
			window.location.reload();
		}
	}
	//定义一个牌型对决方法
	function pokerVS(){
		// 桌面上没有牌，任何牌型都可以出
		if(desktop_poker.type == 0){
			return true;
		}else if(ready_poker.type == 888){//出牌的是王炸可以直接出
			return true;
		}else if(desktop_poker.type !=999 && desktop_poker.type !=888 && ready_poker.type == 999){
			//桌面上的牌不是炸弹和王炸，那玩家的牌只要是炸弹就可以出
			return true;
		}else if(desktop_poker.type == ready_poker.type && ready_poker.poker.length == desktop_poker.poker.length && ready_poker.max-0 > desktop_poker.max-0){
			//普通类型判断
			return true;
		}else{
			return false;
		}
	}
	//定义一个点击不要按钮时初始卡牌和卡牌数据的方法
	function clearSelect(x){
		ready_poker = {poker:[],type:0,max:0};
		console.log(x);
		if(x==1){
			$('.p'+(x+1)+' li').css({top:'0'});
		}else{
			$('.p'+(x+1)+' li').css({left:'0'});
		}
		
	}	
})