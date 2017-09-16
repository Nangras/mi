/**
 * Created by e on 2017/9/8.
 */
var store = (function () {
  return{
    //获取数据
    get:function(key,defaultValue) {
      var val = localStorage.getItem(key);
      try{
        val = JSON.parse(val);
      }
      catch(error){
        val = null;
      }
      if(defaultValue&&val===null){
        val = defaultValue;
      }
      return val;
    },
    // 修改数据
    update:function (key,value) {
      if(value){
        localStorage.setItem(key,JSON.stringify(value));
      }
    },
  //添加数据
  add:function(key,value){
    this.update(key,value);
  },
  //删除数据
  remove:function(key){
    localStorage.removeItem(key);
  }
  };
})();
