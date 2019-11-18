// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('barChart'));

// 指定图表的配置项和数据
var option = {
	title: {
		show: false,
		text: '投票结果',
		textAlign: 'center',
		textVerticalAlign: 'center',
		left: '50%',
		top: '10%',
	},
	tooltip: {},
	legend: {
		data: ['票数'],
		show: false,
	},
	xAxis: {
		data: ["赞成", "反对", "弃权"],
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},
	},
	yAxis: {
		show: false,
	},
	series: [{
		name: '票数',
		type: 'bar',
		data: [30,5,10],
		barWidth: '20%',
		animationEasing: 'linear',
		animationDelayUpdate: function(idx) {
			return idx * 10;
		},		
		animationDurationUpdate: function (idx) {
			return idx * 3000;
		},
	}],
	color: ['rgba(255,255,255,0.6)',],
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);


// jQuery部分
$(document).ready(function () {

	//测试抓取//////////////////////////////////////////
	var items = new Array();
	$('.item').each(function (index) {
		items[index] = $(this).html();
	});
	console.log(items);
	///////////////////////////////////////////////////

	$('.btn').click(function () {
		// alert("点击了哟~~");
		$('.lst').css({ display: 'block' });
	});

	//这个方法(指绑定事件)好棒棒~
	$('.item').on("click", function () {
		var detail = $(this).html();
		$('#currentName').empty();
		$('#currentName').append(detail);
	});

	$('.lst').mouseleave(function () {
		$(this).css({ display: 'none' });
	});

});