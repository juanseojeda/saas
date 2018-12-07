function log() {
    for (var i=0;i<arguments.length;i++)
        console.log("%s:%s",Date(),arguments[i]);
}
log ("one","two","three");

var c1= new Object();
c1.name= "John";
c1.phone=697953590;



var c2 =new Object();
c2={"name":"Paul","phone":1234};

c2.log=function () {
    console.log("%s %s",this.name,this.phone);
}
c2.log();

var numbers= new Array();
numbers.push(1);
numbers.push(2);
numbers.push(3);
numbers.push(4);


var letters=[1,2,3,"a","b","c"];

function printElement(e) {
    console.log(e);
}
for (var i=0; i<letters.length;i++)
    printElement(letters[i]);
    
numbers.forEach(printElement);

numbers.forEach(function(e) {
    console.log(e);
});
    
console.log("------------------");

numbers
    .map(n => n+2).forEach( (e)=> {
    console.log(e);
});
    
console.log("------------------");

numbers.forEach( (e)=> {
    console.log(e);
});
    

log(numbers.reduce((acc,value) => {
        return acc+value; 
}));
console.log("------------------");
numbers
    .filter((e) => {
        return(e>2);
    }).forEach( (e)=> {
    console.log(e);
});

