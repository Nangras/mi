
//修改地址数据
$('.big').on('click','.update',function () {
  var id=$(this).parents('.a').data('num');
  for(var i=0;i<addressList.length;i++){
    if(addressList[i].id == id){
      address = addressList[i];
      break;
    }
  }
//初始化
  $('#address-name2').val(address.addname);
  $('#address-tel2').val(address.tel);
  $('#address-county2').val(address.province);
  $('#address-city2').val(address.city);
  $('#address-country2').val(address.county);
  $('#address-details2').val(address.details);
  $('#address-tip2').val(address.tip);
  $('#address-pc2').val(address.pc);
});
//保存被修改的数据
$('#xiugai').on('click',function () {
    var r=confirm("确定修改吗？");
    if (r==true)
    {
      address.addname =  $('#address-name2').val();
      address.tel =   $('#address-tel2').val();
      address.province =  $('#address-county2').val();
      address.city =   $('#address-city2').val();
      address.county =   $('#address-country2').val();
      address.details =  $('#address-details2').val();
      address.tip = $('#address-tip2').val();
      address.pc =   $('#address-pc2').val();

      store.update('addresskey',addressList);

      var html = "";
      html += '<dt>';
      html += '<span class="uname">' + address.addname + '</span>';
      html += '</dt><dd class="utel">' + address.tel + '</dd>';
      html += '<dd class="uaddress">' + address.province+ address.city + address.county + '</dd>';
      html += '<dd class="uaddress">' + address.details + '/' + address.tip + '</dd>';
      html += '<dd class="uaddress">' + address.pc + '</dd>' +
        '<dd class="onchange">'+ '<div>' + '<button class="btn btn-default update" id="myModalLabel2" href="#motaikuang2" data-toggle="modal">修改</button>' +
        '<button class="btn btn-default delete">删除</button>' +
        '</div></dd>';
      if($('#address-name2').hasClass('success') && $('#address-tel2').hasClass('success') && $('#address-pc2').hasClass('success')){
        $('[data-num='+ address.id + ']').html(html);
        $("#motaikuang2").modal('hide');
        }
        else {
          alert("输入有误！");
          return false;
        }

  }
  else
  {
    return;
  }
});

//  姓名、手机号、邮编验证

$('#address-name').blur(function () {
  if($(this).val().match(/^([a-zA-Z0-9\u4e00-\u9fa5\·]{2,10})$/)){
    $(this).removeClass("error");
    $(this).addClass("success");
  }else{
    $(this).removeClass("success");
    $(this).addClass("error");
  }
});
$('#address-tel').blur(function () {
  if($(this).val().match(/^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/)){
    $(this).removeClass("error");
    $(this).addClass("success");
  }else{
    $(this).removeClass("success");
    $(this).addClass("error");
  }
});
$('#address-pc').blur(function () {
  if($(this).val().match(/^[0-9]{6}$/)){
    $(this).removeClass("error");
    $(this).addClass("success");
  }else{
    $(this).removeClass("success");
    $(this).addClass("error");
  }
});
//  222姓名、手机号、邮编验证

$('#address-name2').blur(function () {
  if($(this).val().match(/^([a-zA-Z0-9\u4e00-\u9fa5\·]{2,10})$/)){
    $(this).removeClass("error");
    $(this).addClass("success");
  }else{
    $(this).removeClass("success");
    $(this).addClass("error");
  }
});
$('#address-tel2').blur(function () {
  if($(this).val().match(/^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/)){
    $(this).removeClass("error");
    $(this).addClass("success");
  }else{
    $(this).removeClass("success");
    $(this).addClass("error");
  }
});
$('#address-pc2').blur(function () {
  if($(this).val().match(/^[0-9]{6}$/)){
    $(this).removeClass("error");
    $(this).addClass("success");
  }else{
    $(this).removeClass("success");
    $(this).addClass("error");
  }
});
