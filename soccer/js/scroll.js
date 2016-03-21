function(){
    var _this = this,
        scrollStart = false,
        isBtm = false,
        scrollDown = false,
        startingMaxY,
        pointY = 0;
    _this.v_scroll = new iScroll(_this.scrollId, {
        hScrollbar: false,
        onScrollStart: function(){
            pointY = this.y;
            startingMaxY = this.maxScrollY;
            //初始化刷新提示条的状态
            scrollStart = true;
        },
        onScrollMove: function(e){
            _this.changeLdStatus();
            if(!_this.inited){ //滚动数据初始滑动高度设定
                this.maxScrollY = startingMaxY - 40;
            }else{
                this.maxScrollY = startingMaxY - 10;
            }
            var y = this.y,
                maxY = this.maxScrollY,
                diff = -(y - maxY);
            if(y > 0 || (y <= 0 && (y - pointY) >= 0)){//向下滑动，将刷新提示放在列表上方
                _this.$refresh.prependTo(_this.$wrapper);
                scrollDown = true;
            }else{//向上滑动，将刷新提示放在列表下方
                _this.$refresh.appendTo(_this.$wrapper);
                scrollDown = false;
            }
            console.log(diff);
            if(diff >= 40 || diff >= -40){ //划动到底部
                isBtm = true;
            }else{
                isBtm = false;
            }
            pointY = y;
        },
        onScrollEnd: function(){
            //数据加载成功后，先执行回调函数，再延迟加载数据
            var beforeAppend = function(){
                    _this.changeLdStatus("finish");
                },
                AfterAppend = function(){
                    if(!_this.loadingMore && !scrollDown){
                        _this.v_scroll.scrollTo(0, -40, 300, true);
                    }
                    _this.changeLdStatus();
                    _this.$refresh.hide();
                    _this.loadingMore = false;
                    _this.transferring = false;//标识数据已经传输完成
                };
            //如果下拉到顶部,则加载数据
            if((this.y == 0 && scrollStart) || (this.y < 0 && scrollDown)){
                isBtm = false;
                _this.pageIndex = 1;
                //如果数据正在传输，则不再请求数据
                if(!_this.transferring){
                    _this.transferring = true;
                    if(this.y < 0 && scrollDown){
                        scrollDown = false;
                        _this.v_scroll.scrollTo(0, 0, 300, false);
                    }
                    _this.loadData(beforeAppend, 300, AfterAppend);
                }
            }else if(this.y == this.maxScrollY){
                isBtm = true;
            }
            
            if(isBtm && scrollStart){
                if(!_this.transferring){
                    _this.inited = true;
                    _this.transferring = true;
                    _this.pageIndex += 1;
                    _this.loadData(beforeAppend, 300, AfterAppend);
                }
            }
            isBtm = false;
            scrollStart = false;
            pointY = this.y;
        }
    });
    startingMaxY = this.maxScrollY;
}