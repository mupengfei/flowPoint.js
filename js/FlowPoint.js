/**
 * Created by mupengfei on 2014/8/27.
 */
var FlowPoint = function () {

}
FlowPoint.init = function (srcArr) {
    var sc = document.getElementById('stepsChart');
    if (!sc) {
        alert('id为stepsChart的div木有找到~');
        return;
    }
//        for(var i=1;i<srcArr.length;i++){
//        }
    alert(FlowPoint._getDivHeight(sc));
    FlowPoint._init();
}

FlowPoint._getDivHeight = function (tar) {
    return tar.offsetHeight;
}

FlowPoint._createNode = function (text) {
    var div = document.createElement('div');
    div.style.position = 'relative';
    div.style.width = '100%';
    div.style.height = '160px';
    var imgJ = document.createElement('img');
    imgJ.src = 'img/GRAY_HAND.png';
    imgJ.id = 'imgJ';
    imgJ.style.width = '20px';
    imgJ.style.height = '80px';
    imgJ.style.position = 'absolute';
    imgJ.style.left = '50px';
    imgJ.style.top = '0px';
    var img = document.createElement('img');
    img.src = 'img/GRAY_BLANK.png';
    img.id = 'img2';
    img.style.width = '80px';
    img.style.height = '80px';
    img.style.position = 'absolute';
    img.style.left = '20px';
    img.style.top = '80px';
    var p = document.createElement('font');
    p.style.left = '100px';
    p.style.top = '110px';
    p.style.color = 'green';
    p.style.position = 'absolute';
    p.innerText = text;
    div.appendChild(imgJ);
    div.appendChild(img);
    div.appendChild(p);
    return div;
}

FlowPoint._init = function (text) {
    var sc = document.getElementById('stepsChart');
    console.log(sc.style.height);
    var div = document.createElement('div');
    div.style.position = 'relative';
    div.style.width = '100%';
    div.style.height = '80px';
    var img = document.createElement('img');
    img.src = 'img/GREEN_SOLID.png';
    img.id = 'green';
    img.style.width = '80px';
    img.style.height = '80px';
    img.style.position = 'absolute';
    img.style.left = '20px';
    //            var imgJ = document.createElement('img');
    //            imgJ.src = 'jiantou.jpg';
    //            imgJ.id = 'imgJ';
    //            imgJ.style.width = '20px';
    //            imgJ.style.height = '80px';
    //            imgJ.style.position = 'absolute';
    //            imgJ.style.left = '50px';
    //            imgJ.style.top = '80px';
    //            var img2 = document.createElement('img');
    //            img2.src = 'green.jpg';
    //            img2.id = 'img2';
    //            img2.style.width = '80px';
    //            img2.style.height = '80px';
    //            img2.style.position = 'absolute';
    //            img2.style.left = '20px';
    div.appendChild(img);
    sc.appendChild(div);
    //            sc.appendChild(imgJ);
    //            img2.style.top = '160px' ;
    //            sc.appendChild(img2);
    sc.appendChild(FlowPoint._createNode('第一节点'));
    sc.appendChild(FlowPoint._createNode('第二节点'));
    sc.appendChild(FlowPoint._createNode('第三节点'));
}