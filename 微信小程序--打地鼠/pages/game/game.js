//这个的定义是用来实现，值是一直不变的，这样就一直有一个初始化的内容
var dataMice = [
  {
    src: '../../assets/img/vendor_people00.png'
  },
  {
    src: '../../assets/img/vendor_people00.png'
  }, {
    src: '../../assets/img/vendor_people00.png'
  }, {
    src: '../../assets/img/vendor_people00.png'
  }, {
    src: '../../assets/img/vendor_people00.png'
  }, {
    src: '../../assets/img/vendor_people00.png'
  }, {
    src: '../../assets/img/vendor_people00.png'
  }, {
    src: '../../assets/img/vendor_people00.png'
  }, {
    src: '../../assets/img/vendor_people00.png'
  }, {
    src: '../../assets/img/vendor_people00.png'
  }, {
    src: '../../assets/img/vendor_people00.png'
  }, {
    src: '../../assets/img/vendor_people00.png'
  }
]
Page({
  /**
   * 页面的初始数据（初始化定义数据）
   */
  data: {
    mouse:[
      {
        src:'../../assets/img/vendor_people00.png'
      },
      {
        src: '../../assets/img/vendor_people00.png'
      }, {
        src: '../../assets/img/vendor_people00.png'
      }, {
        src: '../../assets/img/vendor_people00.png'
      }, {
        src: '../../assets/img/vendor_people00.png'
      }, {
        src: '../../assets/img/vendor_people00.png'
      }, {
        src: '../../assets/img/vendor_people00.png'
      }, {
        src: '../../assets/img/vendor_people00.png'
      }, {
        src: '../../assets/img/vendor_people00.png'
      }, {
        src: '../../assets/img/vendor_people00.png'
      }, {
        src: '../../assets/img/vendor_people00.png'
      }, {
        src: '../../assets/img/vendor_people00.png'
      }
    ],
    count:5,
    time:10,
    interval:null,
    currentIndex:0,
    score:0
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //间隔函数，完成倒计时和剩余次数之类的
    this.data.interval = setInterval(()=>{  //用箭头函数可以省去每次要绑定this的指向，箭头函数可以
                                            //帮助我们保留当下this的指向
      var num = parseInt(Math.random() * 12) //[0,12)整数parseInt向下取整，取0-11的12个数的随机数
      //为了保证不对它做任何的手脚，这里对他进行一下拷贝，JSON.parse最终转化为我们的内容，
      //JSON.stringify将他转化为字符串，这样我们就生成一个新的对象
      var list  = JSON.parse(JSON.stringify(dataMice))
      //每次随机生出出来的值，就是我们当前的index值
      //写在this.setData里面不会实时更新数值，但是会更新视图
      //但是写在外面会实时的更新数据，但不会更新视图
      this.data.currentIndex = num;
      //然后对他进行修改，list[num]就是这个对象的第num个为头伸出来的图片
      //实现在间隔函数里，每个1000毫秒就是一秒随机伸出一个头
      list[num] = { src:'../../assets/img/vendor_hole01.png'}
      this.setData({
        time:--this.data.time,
        //把上面修改的list放进来mouse数组里面，实现图片覆盖随机伸头效果
        mouse:list
      })
      //如果剩余时间为零，则清除这个间隔函数，不在计数了
      if (this.data.time == 0) {
        clearInterval(this.data.interval)
        //跳转结束页面
        wx.redirectTo({
          url: "/pages/endGame/endPage?score="+this.data.score,
        })
      }

    },1000)
  },
  clickMice(e){
    //<image src='{{item.src}}' data-index='{{index}}' ></image>
    //上面的和下面的index（是对应的）就是获取第几个的值，就是要知道点记得是第几个
    var index = e.target.dataset.index
    //判断一下index是不是等于当前的index值
    if(index == this.data.currentIndex){
      //点击正确的话，每一次score分数加上10
        this.data.score += 10;
        //点击正确更改图片，跟上面实现随机伸头方法一样
        var list = JSON.parse(JSON.stringify(dataMice))
        list[index] = { src: '../../assets/img/vendor_hole02.png'}
        //因为这是视图是要变更的，所以写在setData里面
        this.setData({
          mouse:list
        })

    }else{
      //这里实现判断等于零就跳出页面
      var num = this.data.count
      num--;
      if(num==0){
        clearInterval(this.data.interval)
        wx.redirectTo({
          //把得分传出去
          url: "/pages/endGame/endPage?score=" + this.data.score,
        })
      }
      this.setData({
        count:num
      })
    }
  }
  
})