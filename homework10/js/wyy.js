var topLi = document.querySelectorAll(".topUl li");
var topUl = document.querySelector(".topUl");

topUl.onmouseover = function(event){
    if(event.target.tagName == 'LI'){
        event.target.style.background = '#000';
        event.target.style.color = '#fff';
    }
}
topUl.onmouseout = function(event){
    if(event.target.tagName == 'LI'){
        event.target.style.background = ' #242424';
        event.target.style.color = '#eee';
    }
}

var navLi = document.querySelectorAll(".navUl li");
var navUl = document.querySelector(".navUl");
navUl.onmouseover = function(event){
    if(event.target.tagName == 'LI'){
        event.target.style.background = '#9B0909';
    }
}
navUl.onmouseout = function(event){
    if(event.target.tagName == 'LI'){
        event.target.style.background = ' #C20C0C';
    }
}

var prev = document.querySelector(".prev");
var next = document.querySelector(".next");
prev.onmouseover = function(){
    prev.style.background = 'rgba(0, 0, 0, 0.4)';
}
prev.onmouseout = function(){
    prev.style.background = 'none';
}
next.onmouseover = function(){
    next.style.background = 'rgba(0, 0, 0, 0.4)';
}
next.onmouseout = function(){
    next.style.background = 'none';
}

var bannerMain = document.querySelector(".bannerMain");
console.log(bannerMain);
var picture = document.querySelectorAll(".bannerMain img");
console.log(picture);
var point = document.querySelectorAll(".bannerMain li");
console.log(point);
var prev = document.querySelector(".prev");
console.log(prev);
var next = document.querySelector(".next");
console.log(next);

var isNow = 0;

// 抽取函数
var jump = function (ind) {
    for (var i = 0; i < point.length; i++) {
        point[i].className = '';
        picture[i].className = '';
    }
    point[ind].className = 'now';
    picture[ind].className = 'sele';
}

// 点击序号
for (var i = 0; i < point.length; i++) {
    point[i].index = i;
    point[i].onclick = function () {
        isNow = this.index;
        jump(isNow);
    }
}

// 上一页
prev.onclick=function(){
    isNow--;
    if(isNow<0){
        isNow=picture.length-1;
    }
    jump(isNow);
}

// 下一页
next.onclick=function(){
    isNow++;
    if(isNow>picture.length-1){
        isNow=0;
    }
    jump(isNow);
}

// 自动播放
var timer = setInterval(function(){
    next.onclick();
},2000)

// 鼠标滑过
bannerMain.onmouseover = function(){
    clearInterval(timer);
}

// 鼠标移开
bannerMain.onmouseout = function(){
    timer = setInterval(function(){
        next.onclick();
    },2000)
}

var icon = document.querySelectorAll(".iconList .img");
console.log(icon);
icon[0].onmouseover = function(){
    this.style.backgroundPosition = -5+"px "+ -115 +"px";
}
icon[0].onmouseout = function(){
    this.style.backgroundPosition = -170+"px "+ -5 +"px";
}

icon[1].onmouseover = function(){
    this.style.backgroundPosition = -60+"px "+ -170 +"px";
}
icon[1].onmouseout = function(){
    this.style.backgroundPosition = -5+"px "+ -170 +"px";
}

icon[2].onmouseover = function(){
    this.style.backgroundPosition = -60+"px "+ -5 +"px";
}
icon[2].onmouseout = function(){
    this.style.backgroundPosition = -5+"px "+ -60 +"px";
}

icon[3].onmouseover = function(){
    this.style.backgroundPosition = -5+"px "+ -115 +"px";
}
icon[3].onmouseout = function(){
    this.style.backgroundPosition = -170+"px "+ -5 +"px";
}

icon[4].onmouseover = function(){
    this.style.backgroundPosition = -115+"px "+ -5 +"px";
}
icon[4].onmouseout = function(){
    this.style.backgroundPosition = -60+"px "+ -60 +"px";
}

icon[5].onmouseover = function(){
    this.style.backgroundPosition = -5+"px "+ -5 +"px";
}
icon[5].onmouseout = function(){
    this.style.backgroundPosition = -115+"px "+ -115 +"px";
}

icon[6].onmouseover = function(){
    this.style.backgroundPosition = -60+"px "+ -170 +"px";
}
icon[6].onmouseout = function(){
    this.style.backgroundPosition = -5+"px "+ -170 +"px";
}

icon[7].onmouseover = function(){
    this.style.backgroundPosition = -60+"px "+ -115 +"px";
}
icon[7].onmouseout = function(){
    this.style.backgroundPosition = -170+"px "+ -115 +"px";
}
