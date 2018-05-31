/**
 * @author CT by 2018/5/29
 * @type {Element}
 */
var c=document.getElementById("myCanvas");
var showStr = c.getAttribute("data-show");
var showStrs = showStr.split("|");
var r = c.hasAttribute("data-r")?Number(c.getAttribute("data-r")):15;
var ctx=c.getContext("2d");
var padding = c.hasAttribute("data-padding")?Number(c.getAttribute("data-padding")):10;//左右上的间隔
var space = (c.getAttribute("width")-2*r-2*padding)/(showStrs.length-1);
var speed = c.hasAttribute("data-speed")?Number(c.getAttribute("data-speed")):20;//动画速度
var fillColour = c.hasAttribute("data-fill-colour")?c.getAttribute("data-fill-colour"):"#ffff00";//填充色
var fontSize = c.hasAttribute("data-font-size")?Number(c.getAttribute("data-font-size")):15;

for(var i in showStrs)
{
    ctx.beginPath();
    ctx.fillStyle="#ffffff";
    ctx.arc(r+i*space+padding,r+padding,r,0,2*Math.PI);//前面两个参数为圆心坐标，第三个为半径，第四个为起始角。第五个为结束角
    ctx.fill();

    if(i!=0)
    {
        ctx.fillRect(r+(i-1)*space+padding,r/2+padding,space,r);//前面两个左上角坐标，后面两个宽高
    }

    ctx.beginPath();
    ctx.fillStyle="#333333";
    ctx.font=fontSize+"px Georgia";//一定要指定字体否则大小没有用
    ctx.fillText(showStrs[i],r+i*space-r+padding,r*2+fontSize+10+padding);//左下角为起点
    ctx.stroke();
}

var proW = 0;//进度长度
var progress = c.hasAttribute("dara-progress")?Number(c.getAttribute("dara-progress")):showStrs.length;//
var showW = space*progress;//计算应该显示的进度长度
var i=0,j;
var int = setInterval(function () {
    //清除
    //ctx.clearRect(0, 0, c.width, c.height);//不清除在原图上画了覆盖
    j=i;
    i = parseInt(proW/space);
    if(i>j)
    {
        ctx.beginPath();
        ctx.fillStyle=fillColour;
        ctx.fillRect(r+j*space+padding,r/2+padding,space,r);//前面两个左上角坐标，后面两个宽高

        //clearArc(ctx,r+j*space+padding,r+padding,r,1);//清除圆部
    }
    else
    {
        if(i<progress)
        {
            ctx.beginPath();
            ctx.fillStyle=fillColour;
            ctx.fillRect(r+i*space+padding,r/2+padding,proW-i*space,r);//前面两个左上角坐标，后面两个宽高
        }
    }

    //clearArc(ctx,r+i*space+padding,r+padding,r,1);//清除圆部
    ctx.beginPath();
    ctx.fillStyle=fillColour;
    ctx.arc(r+i*space+padding,r+padding,r,0,2*Math.PI);//前面两个参数为圆心坐标，第三个为半径，第四个为起始角。第五个为结束角
    ctx.fill();
    if(proW>=showW)
    {
        clearInterval(int);
    }
    proW+=speed;

}, 150);

// function clearArc(ctx,x,y,radius,stepClear){//圆心(x,y)，半径radius
//     var calcWidth=radius-stepClear;
//     var calcHeight=Math.sqrt(radius*radius-calcWidth*calcWidth);
//
//     var posX=x-calcWidth;
//     var posY=y-calcHeight;
//
//     var widthX=2*calcWidth;
//     var heightY=2*calcHeight;
//
//     if(stepClear<=radius){
//         ctx.clearRect(posX,posY,widthX,heightY);
//         stepClear+=1;
//         clearArc(ctx,x,y,radius,stepClear);
//     }
// }