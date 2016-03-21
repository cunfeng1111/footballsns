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
            //��ʼ��ˢ����ʾ����״̬
            scrollStart = true;
        },
        onScrollMove: function(e){
            _this.changeLdStatus();
            if(!_this.inited){ //�������ݳ�ʼ�����߶��趨
                this.maxScrollY = startingMaxY - 40;
            }else{
                this.maxScrollY = startingMaxY - 10;
            }
            var y = this.y,
                maxY = this.maxScrollY,
                diff = -(y - maxY);
            if(y > 0 || (y <= 0 && (y - pointY) >= 0)){//���»�������ˢ����ʾ�����б��Ϸ�
                _this.$refresh.prependTo(_this.$wrapper);
                scrollDown = true;
            }else{//���ϻ�������ˢ����ʾ�����б��·�
                _this.$refresh.appendTo(_this.$wrapper);
                scrollDown = false;
            }
            console.log(diff);
            if(diff >= 40 || diff >= -40){ //�������ײ�
                isBtm = true;
            }else{
                isBtm = false;
            }
            pointY = y;
        },
        onScrollEnd: function(){
            //���ݼ��سɹ�����ִ�лص����������ӳټ�������
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
                    _this.transferring = false;//��ʶ�����Ѿ��������
                };
            //�������������,���������
            if((this.y == 0 && scrollStart) || (this.y < 0 && scrollDown)){
                isBtm = false;
                _this.pageIndex = 1;
                //����������ڴ��䣬������������
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