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
    //是否已签到 周一到周日都有这个是否已签到 isSigned
    isNewSignedArr: [
      {
        "day": "日",
        "isSigned": false
      },
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
      }
    ],
  },

  //-------新签到---------
  signNewFn: function (e) {
    var that = this;
    const arr = [],
      newSignArr = [...arr, ...that.data.isNewSignedArr];
    newSignArr[that.data.myToday].isSigned = true;
    that.setData({
      isNewSignedArr: newSignArr
    })
    //console.log(that.data.isNewSignedArr);

    //签到积分函数
    that.signAddFen();
  },

  //新签到积分 连续 天数-积分： 周三+3：周一，周二，周三（1+1+3=5）； 周日+7：周一到周日（1+1+3+1+1+1+7=15）
  signAddFen(e) {
    var that = this,
      num = that.data.newSignNum,
        oneIsSigned = that.data.isNewSignedArr[1].isSigned,
        twoIsSigned = that.data.isNewSignedArr[2].isSigned,
        threeIsSigned = that.data.isNewSignedArr[3].isSigned,
        fourIsSigned = that.data.isNewSignedArr[4].isSigned,
        fiveIsSigned = that.data.isNewSignedArr[5].isSigned,
        sixIsSigned = that.data.isNewSignedArr[6].isSigned,
        sevenIsSigned = that.data.isNewSignedArr[0].isSigned;

    //当前积分
    num++;
    var curFen = that.data.newSignIntegral + 1;
    that.setData({
      //signInPop: true,
      newSignBtnState: true,
      newSignNum: num,
      newSignIntegral: curFen,
    })

    //签到后执行
    if (that.data.newSignBtnState){
      // 周三 ： 一 二 三
      if (!fourIsSigned || !fiveIsSigned || !sixIsSigned || !sevenIsSigned){
        if (oneIsSigned && twoIsSigned && threeIsSigned) {
          var fens = that.data.newSignIntegral + 3 - 1;
          that.setData({
            newSignIntegral: fens
          })
          //console.log(that.data.newSignIntegral);
        }
      }
      // 所有签了： 日 一 二 三 四 五 六
      if (oneIsSigned && twoIsSigned && threeIsSigned && fourIsSigned && fiveIsSigned && sixIsSigned && sevenIsSigned) {
        var fens = that.data.newSignIntegral + 7 - 1;
        that.setData({
          newSignIntegral: fens
        })
        //console.log( that.data.newSignIntegral);
      }
    }

    // 另外加分 周三+3 , 周日+7 黄色小框显示
    if (oneIsSigned && twoIsSigned && that.data.myToday == 3) {
      that.setData({
        continuityDays3: true
      })
    } else if (oneIsSigned && twoIsSigned && threeIsSigned && fourIsSigned && fiveIsSigned && sixIsSigned && that.data.myToday == 0) {
      that.setData({
        continuityDays7: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var that = this,
      myDate = new Date(),
      myToday = myDate.getDay();  //周几   0 1 2 3 4 5 6
    that.setData({
      myToday: myToday
    })
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