$(function(){
	var flag1 = 1;
	var flag2 = 1;
	var flag3 = 1;
	//初始化数据
	ajaxload(1);
	//iscroll
		var wHeight = $(window).height();
		var hHeight = $('header').height();
		var fHeight = $('footer').height();
		var nHeight = $('.nav').height();
		var scroll = new iScroll("wrapper",{
			hScrollbar :false,
			vScrollbar:false,
			vScroll:true
		});
		$('#wrapper').height(wHeight - hHeight -fHeight - nHeight - 18);
		scroll.refresh();
		var myscroll = new iScroll('wrapper1');
		$('#wrapper1').height(wHeight - hHeight -fHeight - nHeight - 18);
		myscroll.refresh();
		var myscroll1 = new iScroll('wrapper2');
		$('#wrapper2').height(wHeight - hHeight -fHeight - nHeight - 18);
		myscroll1.refresh();
	//swiper
	var mySwiper = new Swiper('.swiper-container', {
		direction: 'horizontal',
		pagination: '.swiper-pagination',
		paginationType:'bullets',
		paginationClickable: true,
		onSlideChangeStart: function(swiper){
			var swiperind = swiper.activeIndex+1;
			if((swiperind == 1 && flag1 ==1 )||(swiperind == 2 && flag2 ==1 )||swiperind == 3 && flag3 ==1 ){
				ajaxload(swiper.activeIndex+1);
			}else {
				return false;	
			}
		}
	})
	//nav tab connect
//	var flag1 = 0;
//	var flag2 = 0;
//	var flag3 = 0;
//	$('.nav li a').on('tap',function(){
//		$(this).parent().siblings().find('a').removeClass('active');
//		$(this).addClass('active');
////		alert($(this).parent('li').index());
//		var ind = $(this).parent('li').index();
//		if(ind == 0){
//			$('.mainviewport').animate({'transform':'translate3d(0px, 0px, 0px)'},300);
//			flag1 = 1;
//			flag2 = 0;
//			flag3 = 0;
//		}else if(ind == 1){
//			$('.mainviewport').animate({'transform':'translate3d(-100%, 0px, 0px)'},300);
//			flag1 = 0;
//			flag2 = 1;
//			flag3 = 0;
//		}else if(ind == 2){
//			$('.mainviewport').animate({'transform':'translate3d(-200%, 0px, 0px)'},300);
//			flag1 = 0;
//			flag2 = 0;
//			flag3 = 1;
//		}
//	})
//	setInterval(function(){
//		if(flag1 == 1){
//			$('.nav li').eq(0).find('a').addClass('active');
//		}else if(flag2 == 1){
//			$('.nav li').eq(1).find('a').addClass('active');
//		}else if(flag3 == 1){
//			$('.nav li').eq(2).find('a').addClass('active');
//		}
//	},10)

//	var startPosition, endPosition, deltaX, deltaY, moveLength;
//	$(".mainviewport .tabunit").bind('touchstart', function(e) {
//		
//		var touch = e.touches[0];
//		startPosition = {
//			x: touch.pageX,
//			y: touch.pageY
//		}
//	}).bind('touchmove', function(e) {
//		var touch = e.touches[0];
//		endPosition = {
//			x: touch.pageX,
//			y: touch.pageY
//		};
//		deltaX = (endPosition.x - startPosition.x);
//		deltaY = (endPosition.y - startPosition.y);
//		moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
//	}).bind('touchend', function(e) {
//		if(deltaY >20 || deltaY <-20){
//			return;
//		}else if (deltaX <-50 ) { // 向左划动  
//				var ind = $(this).index();
//				console.log(ind);
//				console.log('left');
//				if(ind<2){
//					$('.nav li').find('a').removeClass('active');
//					$('.nav li').eq(ind).next().find('a').addClass('active');
//				}
//		} else if (deltaX > 50) { // 向右划动  
//			var ind = $(this).index();
//			console.log(ind);
//			console.log('right');
//			if(ind>0){
//				$('.nav li').find('a').removeClass('active');
//				$('.nav li').eq(ind).prev().find('a').addClass('active');
//			}
//		}	
//	});
	$('.swiper-pagination span').eq(0).html("足球现场");
	$('.swiper-pagination span').eq(1).html("足球生活");
	$('.swiper-pagination span').eq(2).html("足球美女");

	function ajaxload(k){
		$.ajax({
			url:"http://localhost:8080/Proxy/FootBall/tweet/json/query/hotspot.do",
			data:{
				"category":k
			},
			success:function(rsp){
//				console.log(rsp);
				console.log(typeof rsp);
				var rsp = JSON.parse(rsp);
				console.log(typeof rsp);
				for(var i = 0; i< rsp.data.tweetlist.length;i++){
					var str = "";
					str = "<dl><dt><img src='http://101.200.173.217:8080/FootBall"+ rsp.data.tweetlist[i].defaultFilePath + rsp.data.tweetlist[i].thumbnailname +"'></dt><dd>"+rsp.data.tweetlist[i].content+"</dd></dl>";
					if($('.tabunit').eq(k-1).find('.lunit'+k).height()<$('.tabunit').eq(k-1).find('.runit'+k).height()){
						$('.tabunit').eq(k-1).find('.unit').find('.lunit' + k).append(str);
					}else{
						$('.tabunit').eq(k-1).find('.unit').find('.runit' + k).append(str);
					}
				}
				$('img').load(function(){
					scroll.refresh();
					myscroll.refresh();
					myscroll1.refresh();
				})
			}
		})
		if(k == 1){
			flag1 =0;
		}else if( k == 2){
			flag2 =0;
		}else if( k == 3){
			flag3 =0;
		}
	}
});
