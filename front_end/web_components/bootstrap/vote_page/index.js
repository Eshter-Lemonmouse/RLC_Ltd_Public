/**************************************************************************/
/*							模拟外部获取的数据								*/
/**************************************************************************/
//模拟json加载初始数据
//title: ["赞成","反对","弃权"]
var list = [{
	"candidate": "Ann",
	"data": [0, 5, 10]
},
{
	"candidate": "Bob",
	"data": [7, 0, 8]
},
{
	"candidate": "Cindy",
	"data": [12, 3, 0]
},
{
	"candidate": "Daisy",
	"data": [28, 7, 1]
}];

/************************************************************************/
/*								Echarts设置								*/
/************************************************************************/
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('barChart'));

// 指定图表的配置项和数据v1.1
// 有不明白的地方搜Echarts官方文档，写得很详细
var option = {
	title: {
		show: false,
		text: '投票结果',
		textAlign: 'center',
		textVerticalAlign: 'center',
		left: '50%',
		top: '10%',
	},
	tooltip: {
		show: false,					//关闭浮窗
	},
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
		axisLabel: {
			color: 'rgba(255,255,255,0.8)',
			fontWeight: 'bold',
			fontSize: '16',
		},
	},
	yAxis: {
		show: false,
		max: 60,						//y轴上限，省的图自己跳来跳去
	},
	series: [{
		name: '票数',
		type: 'bar',
		//data: [],
		barWidth: '20%',
		label: {
			show: true,
			position: 'top',
			distance: 0,
			color: '#F9D520',
			fontStyle: 'oblique',
			fontWeight: 'bold',
			fontSize: '16',
		},
		animation: false,
		//animationEasing: 'linear',
	}],
	color: ['rgba(255,255,255,0.6)',],
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

//模拟json初始化加载数据
myChart.setOption({
	series: [{
		data: list[0].data,
	}]
});

/**************************************************************************/
/*							模拟数据实时更新								*/
/**************************************************************************/
var counter = 0;							//用来做停止intID的flag，当counter到达阈值时停止intID更新
//setInterval可以实现重复执行指令，使用clearInterval关闭。具体用法和含义自行document搜索就好
var intID = setInterval(() => {
	list[0].data[0]++;						//list[1]增加赞成票
	list[1].data[1]++;						//list[2]增加反对票
	list[2].data[2]++;						//list[3]增加弃权票
	counter ++;								//数据每更新一次，counter就加一
}, 1000);									//每1s数据更新一次（只是模拟）

/****************************************************************************/
/*							jQuery部分（也不全是jq							*/
/****************************************************************************/
//关于jq的部分，忘记了的话可以查jQuery中文文档（英文的当然更好
$(document).ready(function () {
	//自定义函数update，用来更新显示投票数据的函数
	var update = () => {
		myChart.setOption({
			series: [{
				data: list[ind].data,
			}]
		});
		//console.log(list[ind].data);/////////////////////测试用显示
	}

	//一些初始化的设置：打开页面时显示的时候是json数据的首位的详情
	for(var i = 0; i < list.length; i++){
		let dom = document.createElement('li');
		dom.innerHTML = list[i].candidate;
		document.getElementById('lst').appendChild(dom);
	}
	//给每一项添加id和class
	$('li').each(function(lstIndex) {
		$(this).addClass('item');
		$(this).attr('id', 'i'+lstIndex);
	});

	document.getElementById('currentName').innerHTML = $('#i0').html();	//候选人栏名字抓取
	var ind = 0;														//初始化时id为0
	$('#ctn').attr('disabled','disabled');								//禁用"继续"按钮

	//初始化投票结果显示更新
	var upd = setInterval(update, 1000);								//每1s显示更新一次

	//鼠标移动到候选人栏时光标变为手型
	$('.lstBtn').hover(function () {
		$(this).css({cursor: 'pointer'});
	});

	//点击候选人栏弹出可切换的列表
	$('.lstBtn').click(function () {
		$('.lst').css({ display: 'block' });
	});

	//列表class下点击当前候选人姓名后触发的事件（需要用on函数设置
	$('.item').on("click", function () {
		clearInterval(upd);												//停止前一位票数结果的显示更新
		let detail = $(this).html();
		$('#currentName').empty();										//清除前一位候选人姓名
		$('#currentName').append(detail);								//显示当前候选人姓名
		ind = $(this).index();											//更新当前候选人在数组中的id
		//如果投票结果显示在更新中，就更换更新的候选人；如果暂停更新，就只读取当前候选人票数，不更新显示（写得啥我自己也看不懂吧）
		($('#pause').attr('disabled')==undefined) ? (upd = setInterval(update, 1000)) : (update());
	});

	//鼠标移开后列表自动消失
	$('.lst').mouseleave(function () {
		$(this).css({ display: 'none' });
	});

	//点击"停止"按钮后，启用"继续"按钮
	$('#pause').click(function () {
		clearInterval(upd);
		$('#ctn').removeAttr('disabled');								//启用"继续"按钮
		$('#pause').attr('disabled','disabled');						//禁用"停止"按钮
	});

	//点击"继续"按钮后，启用"停止"按钮
	$('#ctn').click(function(){
		upd = setInterval(update,1000);
		$('#pause').removeAttr('disabled');								//启用"停止"按钮
		$('#ctn').attr('disabled','disabled');							//禁用"继续"按钮
	});

	//模拟增加的数据设置一个增加上限，每3s检查一遍是否到达（我设了50左右
	setInterval(()=>{
		if(counter > 55){		
			clearInterval(intID);										//到达上限后，模拟数据增加的过程停止
			console.log("已到达设置上限");////////////////////测试用
		}else{
			console.log("未到达设置上限");////////////////////测试用
		}
	},3000);

});