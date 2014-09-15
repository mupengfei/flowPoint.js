/**
 * Created by mupengfei on 2014/8/27.
 */
/**
 *  pNo : 节点编号
 *  pName : 节点名称(用于显示在节点左侧)
 *  pSta : 2 已结束  1  正在进行  0  尚未开始
 *  isVisit : 1 允许  2 不允许
 *  isHand : 1 指向  2 不指向
 *
 * srcArr数组单个对象结构
 * eg: [{pNo:'1',pName:'第一节点',pSta:2,isVisit:1},{pNo:'2',pName:'第二节点',pSta:1,isVisit:1},{pNo:'3',pName:'第三节点',pSta:0,isVisit:2}]
 */
var FlowPoint = function () {

}
FlowPoint.init = function (srcArr, varFun) {
    var _sc = document.getElementById('stepsChart');
    if (!_sc) {
        alert('id为stepsChart的div木有找到~');
        return;
    }
    var _Point_Length_ = FlowPoint._getPointHeight(_sc,srcArr.length);
    _sc.appendChild(FlowPoint._createPoint(srcArr[0], _Point_Length_, varFun));
        for(var i=1;i<srcArr.length;i++){
            _sc.appendChild(FlowPoint._createNode(srcArr[i], _Point_Length_, varFun));
        }
//    alert(srcArr.length);
//    FlowPoint._init();
}

FlowPoint._getDivHeight = function (tar) {
    return tar.offsetHeight;
}

FlowPoint._getPointHeight = function (tar, num) {
    var _chartHeight = FlowPoint._getDivHeight(tar) * 0.9;
    var _pointHeight = (_chartHeight / ((num - 1) * 3 + 1)).toFixed(0) ;
    _pointHeight = _pointHeight > 64 ? 64 : (_pointHeight < 24 ? 24 : _pointHeight);
    return  _pointHeight;
}

FlowPoint._createPoint = function (point, _pointHeight, varFun) {
    var div = document.createElement('div');
    div.style.position = 'relative';
    div.style.width = '100%';
    div.style.height = _pointHeight + 'px';
    var redHand = document.createElement('img');
    redHand.id = 'RedHand' + point.pNo;
    redHand.src = 'img/RED_HAND.png';
    redHand.className = 'RedHandClass';
    redHand.style.width = '20px';
    redHand.style.height = _pointHeight + 'px';
    redHand.style.position = 'absolute';
    redHand.style.left = '0px';
    redHand.style.visibility = point.isHand == 1 ? 'visible' : 'hidden';
    var img = document.createElement('img');
    if(point.pSta == 2){
        img.src = 'img/GREEN_SOLID.png';
    } else if (point.pSta == 1){
        img.src = 'img/GREEN_BLANK.png';
    } else if (point.pSta == 0){
        img.src = 'img/GRAY_BLANK.png';
    }
    img.style.width = _pointHeight + 'px';
    img.style.height = _pointHeight + 'px';
    img.style.position = 'absolute';
    img.style.left = '20px';
    img.onclick = (function(e){
        debugger;
        var e = e || event;
        var img = e.srcElement ? e.srcElement : e.target;
        //        var img = e.currentTarget;
        var pNo = img.getAttribute('pNo');
        var eleArr = document.getElementsByClassName ? document.getElementsByClassName('RedHandClass') : FlowPoint._getElementsByClassName('RedHandClass');
        for (var i = 0;i < eleArr.length;i++) {
            if(eleArr[i].id == 'RedHand' + pNo)
                eleArr[i].style.visibility = 'visible';
            else
                eleArr[i].style.visibility = 'hidden';
        }
//        var redEle = document.getElementById('RedHand' + pNo);
//        if(redEle)
//            redEle.style.visibility = 'visible';
        varFun(pNo);
    });
    img.setAttribute('pNo', point.pNo);
    img.setAttribute('redId', 'RedHand' + point.pNo);
    var fo = document.createElement('font');
    fo.style.color = point.pSta == 0 ? 'gray' :'green';
    fo.innerText = point.pName;
    fo.style.position = 'absolute';
    fo.style.left = (20 + parseInt(_pointHeight)) + 'px';
    fo.style.top = (_pointHeight / 2 - 10) + 'px';
    fo.style.fontWeight = 'bold';
    div.appendChild(redHand);
    div.appendChild(img);
    div.appendChild(fo);
    return div;
}

FlowPoint._createNode = function (point, _pointHeight, varFun) {
    var div = document.createElement('div');
    div.style.position = 'relative';
    div.style.width = '100%';
    div.style.height = (parseInt(_pointHeight > 45 ? 100 : 50) + parseInt(_pointHeight)) + 'px';
    var divIn = document.createElement('div');
    divIn.style.position = 'relative';
    divIn.style.width = '100%';
    divIn.style.height = _pointHeight > 45 ? '100px' : '50px';
    var imgJ = document.createElement('img');
    imgJ.src = point.pSta == 0 ? 'img/GRAY_HAND.png' : 'img/GREEN_HAND.png';
    imgJ.id = 'imgJ';
    imgJ.style.width = '20px';
    imgJ.style.height = _pointHeight > 45 ? '100px' : '50px';
    imgJ.style.position = 'relative';
    imgJ.style.left = (10 + parseInt(_pointHeight) / 2) + 'px';
    imgJ.style.top = '0px';
    divIn.appendChild(imgJ);
    div.appendChild(divIn);
    var _pDiv = FlowPoint._createPoint(point, _pointHeight, varFun);
    _pDiv.style.left = '0px';
    _pDiv.style.top = '0px';
    _pDiv.style.margin = '0';
    _pDiv.style.padding = '0';
    div.appendChild(_pDiv);
    return div;
}

FlowPoint._getElementsByClassName = function (className,root,tagName) {    //root：父节点，tagName：该节点的标签名。 这两个参数均可有可无
    if(root){
        root=typeof root=="string" ? document.getElementById(root) : root;
    }else{
        root=document.body;
    }
    tagName=tagName||"*";
    if (document.getElementsByClassName) {                    //如果浏览器支持getElementsByClassName，就直接的用
        return root.getElementsByClassName(className);
    }else {
        var tag= root.getElementsByTagName(tagName);    //获取指定元素
        var tagAll = [];                                    //用于存储符合条件的元素
        for (var i = 0; i < tag.length; i++) {                //遍历获得的元素
            for(var j=0,n=tag[i].className.split(' ');j<n.length;j++){    //遍历此元素中所有class的值，如果包含指定的类名，就赋值给tagnameAll
                if(n[j]==className){
                    tagAll.push(tag[i]);
                    break;
                }
            }
        }
        return tagAll;
    }
}