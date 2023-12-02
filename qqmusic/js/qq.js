var navList = document.querySelectorAll(".nav-half a");
console.log(navList);

for(let i=0; i<navList.length;i++){
    navList[i].ontouchstart = function(a){
        a.preventDefault();
        for(let j=0;j<navList.length;j++){
            navList[j].className = '';
        }
        navList[i].className = 'navA-selected';
    }
}