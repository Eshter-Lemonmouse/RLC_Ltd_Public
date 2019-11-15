$(document).ready(function(){

	var lstArr = $('li').get();
	console.log(lstArr);

    $('.btn').click(function(){
        // alert("点击了哟~~");
		$('.lst').css({display: 'block'});

		
	});
	
	//这里还是有问题
	$('#l0').click(function(){
		$('#currentName').empty();
		$('#currentName').append(lstArr[0].textContent);
		
		console.log('执行');
	});
    
    $('.cName').mouseleave(function(){
        $('.lst').css({display: 'none'});
    });


});