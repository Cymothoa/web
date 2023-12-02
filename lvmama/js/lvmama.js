let linkicon_1 = document.querySelector(".lv_linkicon_display");
let linkicon_2 = document.querySelector(".lv_linkicon");
let linklist = document.querySelectorAll(".lv_linklist a");
let linklistboth = document.querySelector(".lv_linklist");
let link_first = document.querySelector("lv_link");

linklistboth.onmouseover = function(){
    for(let i=0;i<linklist.length;i++){
        linklist[i].style.display = 'block';
    }
    linkicon_1.className = 'lv_linkicon';
    linkicon_2.className = 'lv_linkicon_display';
}
linklistboth.onmouseout = function(){
    for(let i=1;i<linklist.length;i++){
        linklist[i].style.display = 'none';
    }
    linkicon_2.className = 'lv_linkicon';
    linkicon_1.className = 'lv_linkicon_display';
}

let wx_dropdown = document.querySelector(".wx_dropdown");
let wx_top_down = document.querySelector(".wx_dropdown .top_down");
wx_dropdown.onmouseover = function(){
    wx_top_down.style.display = 'block';
}
wx_dropdown.onmouseout = function(){
    wx_top_down.style.display = 'none';
}
let link_dropdown = document.querySelector(".link_dropdown");
let link_top_down = document.querySelector(".link_dropdown .top_down");
link_dropdown.onmouseover = function(){
    link_top_down.style.display = 'block';
}
link_dropdown.onmouseout = function(){
    link_top_down.style.display = 'none';
}

let call_dropdown = document.querySelector(".call_dropdown");
let call_top_down = document.querySelector(".call_dropdown .top_down");
call_dropdown.onmouseover = function(){
    call_top_down.style.display = 'block';
}
call_dropdown.onmouseout = function(){
    call_top_down.style.display = 'none';
}

let btn_hsmcity = document.querySelector(".btn_hsm-city");
let lv_all_city = document.querySelector(".lv_all_city");
btn_hsmcity.onmouseover = function(){
    lv_all_city.style.display = 'block';
}
lv_all_city.onmouseover = function(){
    lv_all_city.style.display = 'block';
}
btn_hsmcity.onmouseout = function(){
    lv_all_city.style.display = 'none';
}
lv_all_city.onmouseout = function(){
    lv_all_city.style.display = 'none';
}

let nmlist_li = document.querySelectorAll(".pnav_down");
let down_nav1= document.querySelector(".down_nav1");
let down_nav2= document.querySelector(".down_nav2");
console.log(nmlist_li);
for(let i=0;i<nmlist_li.length;i++){
    nmlist_li[i].onmouseover = function(){
        this.style.background = '#ff4499';
        if(i==10){
            down_nav1.style.display = 'block';
        }
        if(i==11){
            down_nav2.style.display = 'block';
        }
    }
    nmlist_li[i].onmouseout = function(){
        this.style.background = '#e38';
        if(i==10){
            down_nav1.style.display = 'none';
        }
        if(i==11){
            down_nav2.style.display = 'none';
        }
    }
}


var banner = document.getElementById("banner");
console.log(banner);
var picture = document.querySelectorAll(".banner #imgBox img");
console.log(picture);
var point = document.querySelectorAll(".banner #list li");
console.log(point);

var isNow = 0;

// 抽取函数
var jump = function (ind) {
    for (var i = 0; i < point.length; i++) {
        point[i].className = '';
        picture[i].className = '';
    }
    point[ind].className = 'active';
    picture[ind].className = 'selected';
}

// 点击序号
for (var i = 0; i < point.length; i++) {
    point[i].index = i;
    point[i].onclick = function () {
        isNow = this.index;
        jump(isNow);
    }
}

// 自动播放
var timer = setInterval(function(){
    isNow++;
    if(isNow>picture.length-1){
        isNow=0;
    }
    jump(isNow);
},2000)

// let bl_list = document.querySelectorAll(".bl-list");
// for(let i=0;i<bl_list.length;i++){
//     // bl_list[i].className = 'bll-normal';
//     bl_list[i].onclick = function(){
//         this.className = 'bll-active';
//     }
// }

let vertical_btn = document.querySelectorAll(".bl-list li");
let contentRight = document.querySelectorAll(".contentRight .contentMain");

for(let i = 0 ; i <vertical_btn.length ; i++){
    vertical_btn[i].onclick = function(){
        for(let j = 0 ; j <vertical_btn.length ; j++){
            vertical_btn[j].className = ' ';
            contentRight[j].style.display = 'none' ;
        }
        vertical_btn[i].className = 'bll-active';
        contentRight[i].style.display = 'block' ;
    }
}

let slipNav_btn = document.querySelectorAll(".slipNav_head ul li");
let slipNav_body_btn = document.querySelectorAll(".slipNav_Main .block");
let slipNav = document.querySelector(".slipNav");

for(let i = 0; i <slipNav_btn.length; i++){
    slipNav_btn[i].onmousemove = function(){
        for(let j = 0 ; j<slipNav_btn.length ; j++){
            slipNav_btn[j].className = '';
            slipNav_body_btn[j].style.visibility = 'hidden';

        }
        slipNav_btn[i].className = 'active';
        slipNav_body_btn[i].style.visibility = 'visible';
        if(i==0){
            slipNav.style.height = 640+"px";
        }
        if(i==1||i==2){
            slipNav.style.height = 350+"px";
        }
    }
}

let content_head_btn = document.querySelectorAll(".content_head ul li");

for(let i = 0 ; i < content_head_btn.length ; i++){
    content_head_btn[i].onclick = function(){
        for(let j = 0 ; j <  content_head_btn.length ; j++){
            content_head_btn[j].className = ' ';
        }
        content_head_btn[i].className = 'active';
    }
}
