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
