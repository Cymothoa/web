var navList = document.querySelectorAll(".navBar-text ul li");
console.log(navList);

for(var i = 0;i<navList.length;i++){
    navList[i].ontouchstart = function(){
        for(var j = 0;j<navList.length;j++){
            navList[j].className = '';
        }
        this.className = 'active';
    }
}