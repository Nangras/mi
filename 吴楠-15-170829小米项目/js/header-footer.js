/**
 * Created by e on 2017/9/16.
 */
$(function () {
  $('[data-toggle=hover]').parent().on('mouseenter mouseleave', function () {
    $(this).toggleClass('open');
  });

//小米红米等的折叠
  var enterTimeout = [], leaveTimeout = [];
  $(document).off('click.bs.collapse.data-api', '[data-toggle="collapse"]');
  $('[data-collapse-trigger=hover]').hover(function () {
    var i = $(this);
    var index = Number(i.data('id'));
    clearTimeout(leaveTimeout[index]);
    clearTimeout(enterTimeout[index]);
    enterTimeout[index] = setTimeout(function () {
      var target = i.data('target');
      $(target).collapse('show');
    }, 350);
  }, function () {
    var i = $(this);
    var index = Number(i.data('id'));
    clearTimeout(enterTimeout[index]);
    clearTimeout(leaveTimeout[index]);
    leaveTimeout[index] = setTimeout(function () {
      var target = i.data('target');
      $(target).collapse('hide');
    }, 350);
  });
});
//购物车
$.ajax({
    type: "GET",
    url: "js/gouwuche.json",
    dataType: "json",
    success: function (data) {
      var $kk = $('.kk');
      var html = '';
      var num = 0;
      for (var i = 0; i < data.length; i++) {
        html += '<tr><td><img src="' + data[i].image + '"></td>';
        html += '<td>' + data[i].name + '</td><td class="dd">' + data[i].price + '</td><td><a class="delete" href="#">删除</a></tr>';
        num = num + parseInt(data[i].price);
      }
      aa = data.length;
      html += '<tr><td>共件<span class="bb">' + data.length + '</span>商品<br>共<span class="cc">' + num + '</span>元</td><td></td><td></td><td><button>结算</button></td></tr>';
      $kk.find($('tbody')).html(html);
      ($('.table')).find('.delete').on('click', function () {
        $(this).parents('tr').remove();
        aa--;
        $('.bb').text(aa);
        //alert(num);
        num = num - parseInt($(this).parents('tr').find('.dd').text());
        $('.cc').text(num);
      });
      $('.ul1').children().last().prev().mouseover(function () {
        $kk.show();
      });
      $('.ul1').children().last().prev().mouseout(function () {
        $kk.hide();
      });
    }
  }
);
//轮播图上浮动的ul
$(function () {
  var $oli = $('.list-right>li');
  var $ulleft = $('.list-left-ul');
  $ulright = $(".list-right");
  var timer = null;
  $ulleft.find('li').on('mouseover', function () {
    clearInterval(timer);
    $oli.hide();
    $oli.eq($(this).index()).show();
    $ulright.css('display', 'block');
  });
  $ulleft.find('li').on('mouseout', function () {
    timer = setTimeout(function () {
      $ulright.hide();
    }, 20)
  });
  $ulright.on('mouseover', function () {
    clearInterval(timer);
    $ulright.show();
  });
  $ulright.on('mouseout', function () {
    $ulright.hide();
  });
});
