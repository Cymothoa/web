var imgs = document.getElementsByTagName("img");

var scrollHei = document.body.clientHeight || document.documentElement.clientHeight ;
console.log(scrollHei);
var scrollWid = document.body.clientWidth || document.documentElement.clientWidth ;
console.log(scrollWid);

var gapX = (scrollWid-120*6)/7;
var gapY = (scrollHei-120*4)/5;

for(var i=0;i<imgs.length;i++){
    var row = Math.floor(i/6)+1;
    var col = i%6 + 1;
    imgs[i].style.top = gapY*row + (row - 1)*120 +'px';
    imgs[i].style.left = gapX*col + (col - 1)*120 +'px';
    imgs[i].style.transform = 'rotate('+ Math.random()*45 + 'deg)';
    imgs[i].style.transitionDelay = (23-i)*100 + 'ms';
}