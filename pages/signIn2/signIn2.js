// pages/signIn2/signIn2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newSignBtnState: false,  //按钮签到状态
    continuityDays7: false,  //连续7
    continuityDays3: false,  //连续3 
    myToday: '',           //周几
    newSignNum: 0,      //签到天数
    newSignIntegral:0,  //签到积分
    //签到数组
    newSignedArr: [
      {
        "day": "一",
        "isSigned": false
      },
      {
        "day": "二",
        "isSigned": false
      },
      {
        "day": "三",
        "isSigned": false
      },
      {
        "day": "四",
        "isSigned": false
      },
      {
        "day": "五",
        "isSigned": false
      },
      {
        "day": "六",
        "isSigned": false
      },
      {
        "day": "日",
        "isSigned": false
      }
    ],
  },

  //-------点击签到---------
  bindSignFn(e){
    var that = this,
        newSignNum = that.data.newSignNum,
        today = that.data.myToday;
    const arr = [],
          newSignArr = [...arr, ...that.data.newSignedArr];
    //
    today = today - 1 >= 0 ? today - 1 : 6;
    newSignArr[today].isSigned = true;
    
    //当前积分
    newSignNum++;
    var curFen = that.data.newSignIntegral + 1;

    that.setData({
      newSignBtnState: true,
      newSignNum: newSignNum,
      newSignIntegral: curFen,
      newSignedArr: newSignArr,
    })

    that.signAddFen();
  },

  //签到积分函数 
    //连续 天数-积分： 周三+3：周一，周二，周三（1+1+3=5）； 周六+7：周日到周六（1+1+3+1+1+1+7=15）
  signAddFen(e) {
    var that = this,
        oneIsSigned = that.data.newSignedArr[0].isSigned,
        twoIsSigned = that.data.newSignedArr[1].isSigned,
        threeIsSigned = that.data.newSignedArr[2].isSigned,
        fourIsSigned = that.data.newSignedArr[3].isSigned,
        fiveIsSigned = that.data.newSignedArr[4].isSigned,
        sixIsSigned = that.data.newSignedArr[5].isSigned,
        sevenIsSigned = that.data.newSignedArr[6].isSigned;
       
    // 另外加分-黄色小框显示 周三+3 , 周日+7
    if (oneIsSigned && twoIsSigned && that.data.myToday == 3) {
      that.setData({
        continuityDays3: true
      })
    } else if (oneIsSigned && twoIsSigned && threeIsSigned && fourIsSigned && fiveIsSigned && sixIsSigned && that.data.myToday == 0) {
      that.setData({
        continuityDays7: true
      })
    }

    //签到后执行
    if (that.data.newSignBtnState) {
      // 周三 ： 一 二 三
      if (oneIsSigned && twoIsSigned && threeIsSigned) {
        var fens = that.data.newSignIntegral + 3 - 1;
        that.setData({
          newSignIntegral: fens
        })
      }
      // 所有签了： 一 二 三 四 五 六 日
      if (oneIsSigned && twoIsSigned && threeIsSigned && fourIsSigned && fiveIsSigned && sixIsSigned && sevenIsSigned) {
        var fens = that.data.newSignIntegral + 7 - 1;
        that.setData({
          newSignIntegral: fens
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this,
        myDate = new Date(),
        myToday = myDate.getDay();  //周几   0 1 2 3 4 5 6
    that.setData({
      myToday: myToday
    })
    that.signAddFen();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})