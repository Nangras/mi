/**
 * Created by Administrator on 2017/8/15.
 */
(function () {
  'use strict';
  var products = [
    {
      id:1,
      image:'images/1.jpg',
      name:'小米6',
      quantity:12,
      price:2499.00,
      key:'耍猴',
      spec:''
    },
    {
      id:2,
      image:'images/2.jpg',
      name:'小米6',
      quantity:1,
      price:1999.00,
      key:'全网通',
      spec:''
    },
    {
      id:3,
      image:'images/3.jpg',
      name:'小米4',
      quantity:2,
      price:1200.00,
      key:'',
      spec:''
    },
    {
      id:4,
      image:'images/4.jpg',
      name:'小米3',
      quantity:5,
      price:1200.00,
      key:'',
      spec:''
    },
    {
      id:5,
      image:'images/4.jpg',
      name:'小米2',
      quantity:3,
      price:1200.00,
      key:'',
      spec:''
    }
  ];
  function toCurrency(value) {
    return '$'+value.toFixed(2);
  }

  $(function () {
    var $tbody = $('#cart tbody');
    function prepareArray(array) {
      for(var i= 0, len = array.length; i < len ; i++){
        array[i].subTotal = array[i].price * array[i].quantity;
        array[i].fullName = array[i].name + ' ' + array[i].key;
      }
    }

    function createRows(array) {
      var html = '';
      var template = $('#tr-template').text();
      array.forEach(function (item,index) {
        //console.log(arguments);
        html +=$.czb.format(template,
          item.image,
          item.name + ' ' + item.key,
          item.spec,
          toCurrency(item.price),
          item.quantity,
          $.czb.toCurrency(item.subTotal),
          item.id
        );
      });
      $tbody.html(html);
    }
    function updateFoot(array) {
      var total = $.czb.sum(array,function (item,index) {
        return item.quantity;
      });
      var total1 = $.czb.sum(array,function (item,index) {
        return item.subTotal;
      });
      $('tfoot tr td:nth-child(6)').text(total);
      $('tfoot tr td:nth-child(7)').text($.czb.toCurrency(total1));
    }
    prepareArray(products);
    createRows(products);
    updateFoot(products);
    $('#cart th').slice(2,7).on('click',function () {
      var direction = 1;
      var $th = $(this);
      if($th.hasClass('sort-asc')){
        direction = -1;
      }
      $th.siblings().removeClass('sort-asc sort-desc');
      $th.removeClass('sort-asc sort-desc');
      if(direction==1){
        $th.addClass('sort-asc');
      }
      else{
        $th.addClass('sort-desc');
      }
      var key = $th.data('sort');
      products.sort(function (a, b) {
        if(a[key] < b[key]){
          return -direction;
        }
        if(a[key] > b[key]){
          return direction;
        }
        return 0;
      });
      createRows(products);
    });
    /*
     * 全选
     * */
    $('#all').on('click',function () {
      var selected = $(this).prop('checked');
      $('#cart input[name=productID]').each(function () {
        this.checked = selected;
      });
    });
    // $("#allcheck").click(function(){
    //   var selected2=$(this).prop('checked');
    //   $('#cart input[name=productID]').each(function () {
    //     this.checked = selected;
    //   });
    // });
    /*
     * 一件商品的选中和取消选中，每行的checkbox的单击，
     * */
    $tbody.on('click','input[type=checkbox]',function (event) {
      if(this.checked){
        if($('#cart input[name=productID]:checked').length==products.length){
          $('#all').prop('checked',true);
        }
      }
      else{
        $('#all').prop('checked',false);
      }
    });
   /* $tbody.on('click','tr button:nth-child(1)',function () {
      console.log('button1');
    });
    $tbody.on('click','tr button:nth-child(3)',function () {
      console.log('button2');
    });*/
    $tbody.on('click','tr button:nth-of-type(1)',function () {
      //console.log('button1');
      var $input = $(this).next();
      var num = $input.val();
      if(num > 1){
        //--num;
        //$input.val(num);
       /* $input.val(--num);
        $input.trigger('change');*/
        $input.val(--num).trigger('change');
        //$input.change();
      }
    });
    $tbody.on('click','tr button:nth-of-type(2)',function () {
      //console.log('button2');
      var $input = $(this).prev();
      var num = $input.val();
      $input.val(++num).trigger('change');
    });

    $tbody.on('change','input[type=text]',function () {
      //var quantity = $(this).val();
      var $input = $(this);
      var quantity = Number(this.value);

      var id = $input.parent().parent().data('pid');
      var result = products.find(function (item,index) {
        return item.id == id;
        /*if(item.id == id){
          return true;
        }
        else {
          return false;
        }*/
      });
      result.quantity = quantity;
      result.subTotal =  result.quantity * result.price;
      $input.parent().next().text($.czb.toCurrency(result.subTotal));
      updateFoot(products);
    });
    $tbody.on('click','a',function (event) {
      var $tr = $(this).parent().parent();
      var id = $tr.data('pid');
      $(this).parent().parent().remove();

      for(var i=0, len = products.length; i<len; i++){
        if(products[i].id==id){
          products.splice(i,1);
          updateFoot(products);
          break;
          //return false;
        }
      }
     /* products.forEach(function (item,index) {
        if(item.id == id){
          products.splice(index,1);
          updateFoot(products);
          return false;
        }
      });*/

      return false;
      //event.preventDefault()
    });
    $('#cart tfoot a').on('click',function () {
      if($('#all').prop('checked')){
        $tbody.empty();
        //$tbody.html('');
        products = [];
        updateFoot(products);
      }
      else{
        $tbody.children().each(function (index,item) {
          var $tr = $(item);
          if($tr.find('input[name=productID]').prop('checked')){
            $tr.find('a').trigger('click');
          }
        });

      }

    });
  });
})();
