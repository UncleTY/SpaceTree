
var Log = {
    elem: false,
    write: function (text) {
        if (!this.elem)
            this.elem = document.getElementById('log');
        this.elem.innerHTML = text;
        this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
    }
};

var json = {
    "data": "",
    "id": "-9999",
    "l_flag": "0",
    "name": "根目录",
    "pid": "0",
    "alias": "根目录",
    "children": []
};
var seeMore = [];
var result = [
    {
        "data": "3",
        "id": "1",
        "l_flag": "1",
        "name": "00(3)",
        "pid": "-5"
    },
    {
        "data": "ZQD20011700B",
        "id": "2",
        "l_flag": "1",
        "name": "111(ZQD20011700B)",
        "pid": "-3"
    },
    {
        "data": "12",
        "id": "3",
        "l_flag": "1",
        "name": "123(12)",
        "pid": "-4"
    },
    {
        "data": "123",
        "id": "4",
        "l_flag": "1",
        "name": "123(123)",
        "pid": "-1"
    },
    {
        "data": "GQ520011700A",
        "id": "5",
        "l_flag": "1",
        "name": "123(GQ520011700A)",
        "pid": "-3"
    },
    {
        "data": "ZQD20011700H",
        "id": "6",
        "l_flag": "1",
        "name": "123(ZQD20011700H)",
        "pid": "-3"
    },
    {
        "data": "ZQD20011700E",
        "id": "7",
        "l_flag": "1",
        "name": "12321(ZQD20011700E)",
        "pid": "-3"
    },
    {
        "data": "GQ520011700B",
        "id": "8",
        "l_flag": "1",
        "name": "13(GQ520011700B)",
        "pid": "-3"
    },
    {
        "data": "ZQD20011700F",
        "id": "9",
        "l_flag": "1",
        "name": "13(ZQD20011700F)",
        "pid": "-3"
    },
    {
        "data": "ZQD20011700I",
        "id": "10",
        "l_flag": "1",
        "name": "13(ZQD20011700I)",
        "pid": "-3"
    },
    {
        "data": "ZQD20011700D",
        "id": "11",
        "l_flag": "1",
        "name": "13213(ZQD20011700D)",
        "pid": "-3"
    },
    {
        "data": "ZQD20011700G",
        "id": "12",
        "l_flag": "1",
        "name": "23(ZQD20011700G)",
        "pid": "-3"
    },
    {
        "data": "2",
        "id": "13",
        "l_flag": "1",
        "name": "32132(2)",
        "pid": "-5"
    },
    {
        "data": "ZQD20011700C",
        "id": "14",
        "l_flag": "1",
        "name": "89(ZQD20011700C)",
        "pid": "-3"
    },
    {
        "data": "Fund0721",
        "id": "15",
        "l_flag": "1",
        "name": "Fund0721(Fund0721)",
        "pid": "-1"
    },
    {
        "data": "Test001",
        "id": "16",
        "l_flag": "1",
        "name": "Test001名称(Test001)",
        "pid": "-1"
    },
    {
        "data": "JJ0001",
        "id": "17",
        "l_flag": "1",
        "name": "jj1(JJ0001)",
        "pid": "-1"
    },
    {
        "data": "JJ0002",
        "id": "18",
        "l_flag": "1",
        "name": "jj2(JJ0002)",
        "pid": "-1"
    },
    {
        "data": "JJ0003",
        "id": "19",
        "l_flag": "1",
        "name": "jj3(JJ0003)",
        "pid": "-1"
    },
    {
        "data": "GQ5200117008",
        "id": "20",
        "l_flag": "1",
        "name": "qc1(GQ5200117008)",
        "pid": "-3"
    },
    {
        "data": "GQ5200117009",
        "id": "21",
        "l_flag": "1",
        "name": "qc彻底(GQ5200117009)",
        "pid": "-3"
    },
    {
        "data": "test20170706",
        "id": "22",
        "l_flag": "1",
        "name": "test20170706(test20170706)",
        "pid": "-2"
    },
    {
        "data": "GQ5200101001",
        "id": "23",
        "l_flag": "1",
        "name": "wde(GQ5200101001)",
        "pid": "-3"
    },
    {
        "data": "",
        "id": "-5",
        "l_flag": "0",
        "name": "抵质押物信息",
        "pid": "-9999"
    },
    {
        "data": "5",
        "id": "24",
        "l_flag": "1",
        "name": "对手方20170707(5)",
        "pid": "-4"
    },
    {
        "data": "",
        "id": "-4",
        "l_flag": "0",
        "name": "对手方信息",
        "pid": "-9999"
    },
    {
        "data": "GQ0001",
        "id": "25",
        "l_flag": "1",
        "name": "给股权用的1(GQ0001)",
        "pid": "-1"
    },
    {
        "data": "QTSY001",
        "id": "26",
        "l_flag": "1",
        "name": "给其他收益权用1(QTSY001)",
        "pid": "-1"
    },
    {
        "data": "GQ5200117003",
        "id": "27",
        "l_flag": "1",
        "name": "股权0713A(GQ5200117003)",
        "pid": "-3"
    },
    {
        "data": "GQ5200117005",
        "id": "28",
        "l_flag": "1",
        "name": "股权11(GQ5200117005)",
        "pid": "-3"
    },
    {
        "data": "GQ5200117001",
        "id": "29",
        "l_flag": "1",
        "name": "股权合同0710(GQ5200117001)",
        "pid": "-3"
    },
    {
        "data": "GQ5200117007",
        "id": "30",
        "l_flag": "1",
        "name": "股权合同0721(GQ5200117007)",
        "pid": "-3"
    },
    {
        "data": "",
        "id": "-3",
        "l_flag": "0",
        "name": "合同信息",
        "pid": "-9999"
    },
    {
        "data": "JJ0005",
        "id": "31",
        "l_flag": "1",
        "name": "基金5(JJ0005)",
        "pid": "-1"
    },
    {
        "data": "",
        "id": "-1",
        "l_flag": "0",
        "name": "基金信息",
        "pid": "-9999"
    },
    {
        "data": "9",
        "id": "32",
        "l_flag": "1",
        "name": "姜小宁(9)",
        "pid": "-4"
    },
    {
        "data": "GUTZ001",
        "id": "33",
        "l_flag": "1",
        "name": "姜小宁股权投资(GUTZ001)",
        "pid": "-2"
    },
    {
        "data": "JXNGQ002",
        "id": "34",
        "l_flag": "1",
        "name": "姜小宁股权投资002号私募股权计划(JXNGQ002)",
        "pid": "-1"
    },
    {
        "data": "GQ5200117006",
        "id": "35",
        "l_flag": "1",
        "name": "姜小宁股权投资002号投资明细(GQ5200117006)",
        "pid": "-3"
    },
    {
        "data": "TEST001",
        "id": "36",
        "l_flag": "1",
        "name": "姜小宁股权投资计划一号(TEST001)",
        "pid": "-1"
    },
    {
        "data": "ZQD200117009",
        "id": "37",
        "l_flag": "1",
        "name": "姜小宁债权2号(ZQD200117009)",
        "pid": "-3"
    },
    {
        "data": "QS7200117003",
        "id": "38",
        "l_flag": "1",
        "name": "其他0713A(QS7200117003)",
        "pid": "-3"
    },
    {
        "data": "QS7200117004",
        "id": "39",
        "l_flag": "1",
        "name": "其他0713B(QS7200117004)",
        "pid": "-3"
    },
    {
        "data": "QS7200117005",
        "id": "40",
        "l_flag": "1",
        "name": "其他收益1(QS7200117005)",
        "pid": "-3"
    },
    {
        "data": "QS7200117002",
        "id": "41",
        "l_flag": "1",
        "name": "其他收益权合同0712(QS7200117002)",
        "pid": "-3"
    },
    {
        "data": "11",
        "id": "42",
        "l_flag": "1",
        "name": "试试管理人(11)",
        "pid": "-4"
    },
    {
        "data": "1",
        "id": "43",
        "l_flag": "1",
        "name": "我是抵押物(1)",
        "pid": "-5"
    },
    {
        "data": "T20170710",
        "id": "44",
        "l_flag": "1",
        "name": "项目测试0710(T20170710)",
        "pid": "-2"
    },
    {
        "data": "",
        "id": "-2",
        "l_flag": "0",
        "name": "项目信息",
        "pid": "-9999"
    },
    {
        "data": "ZQD200117007",
        "id": "45",
        "l_flag": "1",
        "name": "债权0713A(ZQD200117007)",
        "pid": "-3"
    },
    {
        "data": "ZQD200117008",
        "id": "46",
        "l_flag": "1",
        "name": "债权111(ZQD200117008)",
        "pid": "-3"
    },
    {
        "data": "ZQD200117006",
        "id": "47",
        "l_flag": "1",
        "name": "债权4(ZQD200117006)",
        "pid": "-3"
    },
    {
        "data": "ZQD200117002",
        "id": "48",
        "l_flag": "1",
        "name": "债权合同0710(ZQD200117002)",
        "pid": "-3"
    },
    {
        "data": "ZQD200117003",
        "id": "49",
        "l_flag": "1",
        "name": "债权合同0710A(ZQD200117003)",
        "pid": "-3"
    },
    {
        "data": "GQ5200117002",
        "id": "50",
        "l_flag": "1",
        "name": "债权合同0712(GQ5200117002)",
        "pid": "-3"
    },
    {
        "data": "8",
        "id": "51",
        "l_flag": "1",
        "name": "中国银行(8)",
        "pid": "-4"
    }
];

json = formatJson(result);

function init() {
    //maxHeight(json);
    //init Spacetree
    //Create a new ST instance
    var st = new $jit.ST({

        //id of viz container element
        injectInto: 'infovis',
        //set duration for the animation
        duration: 800,
        //set animation transition type
        transition: $jit.Trans.Quart.easeInOut,
        //set distance between node and its children
        levelDistance: 50,
        //enable panning
        Navigation: {
            enable: true,
            panning: true
        },

        //set node and edge styles
        //set overridable=true for styling individual
        //nodes or edges
        Node: {
            height: 50,
            width: 100,
            type: 'ellipse',
            color: '#aaa',
            overridable: true
        },

        Edge: {
            type: 'bezier',
            overridable: true
        },

        onBeforeCompute: function (node) {
            Log.write(node.name + "正在加载中");
        },

        onAfterCompute: function () {
            Log.write("加载完成");
        },

        //This method is called on DOM label creation.
        //Use this method to add event handlers and styles to
        //your node.
        onCreateLabel: function (label, node) {
            label.id = node.id;
            label.innerHTML = node.name;
            label.onclick = function () {
                if (node._depth <= 1) {
                    st.onClick(node.id);
                    //changeHeight(node, json);
                } else {
                    showDetails(node.id);
                    //json = createNewJson(node, storedJson);
                    //document.getElementById("infovis").innerHTML = "";
                    //init();
                    //st.setRoot(node.id, 'animate');
                }
            };
            //set label styles
            var style = label.style;
            style.width = 100 + 'px';
            style.height = 40 + 'px';
            style.cursor = 'pointer';
            style.color = '#333';
            style.fontSize = '0.8em';
            style.textAlign = 'left';
            style.paddingTop = '20px';
            style.paddingLeft = '20px';
        },

        //This method is called right before plotting
        //a node. It's useful for changing an individual node
        //style properties before plotting it.
        //The data properties prefixed with a dollar
        //sign will override the global node style properties.
        onBeforePlotNode: function (node) {
            //add some color to the nodes in the path between the
            //root node and the selected node.
            if (node.selected) {
                node.data.$color = "#aaa";
            }
            else {
                delete node.data.$color;
                //if the node belongs to the last plotted level
                if (!node.anySubnode("exist")) {
                    //count children number
                    var count = 0;
                    node.eachSubnode(function (n) { count++; });
                    //assign a node color based on
                    //how many children it has
                    //node.data.$color = ['#aaa', '#baa', '#caa', '#daa', '#eaa', '#faa'][count];
                    node.data.$color = "#eed";
                }
            }
        },

        //This method is called right before plotting
        //an edge. It's useful for changing an individual edge
        //style properties before plotting it.
        //Edge data proprties prefixed with a dollar sign will
        //override the Edge global style properties.
        onBeforePlotLine: function (adj) {
            if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                adj.data.$color = "#eed";
                adj.data.$lineWidth = 3;
            }
            else {
                delete adj.data.$color;
                delete adj.data.$lineWidth;
            }
        }
    });
    //load json data
    st.loadJSON(json);
    //compute node positions and layout
    st.compute();
    //optional: make a translation of the tree
    st.geom.translate(new $jit.Complex(-200, 0), "current");
    //emulate a click on the root node.
    st.onClick(st.root);
    //end

}

function changeHeight(node, json) {
    var children = json.children;
    var iHeight = 0;
    for (var i = 0; i < children.length; i++) {
        if (node.id === children[i].id) {
            iHeight = children[i].children.length * 80 + 200;
        }
    }
    var obj = document.getElementById("infovis");
    obj.style.height = iHeight < 520 ? "520px" : iHeight + "px";
};

function maxHeight(json) {
    var children = json.children;
    var maxHeight = 0;
    for (var i = 0; i < children.length; i++) {
        if (maxHeight < children[i].children.length) {
            maxHeight = children[i].children.length;
        }
    }
    var obj = document.getElementById("infovis");
    obj.style.height = maxHeight * 80 + 220 + "px";
}


function formatJson(jsonArr) {

    //初始化json
    var targetJson = {
        "data": "",
        "id": "-9999",
        "l_flag": "0",
        "name": "根目录",
        "pid": "0",
        "children": []
    };

    dealWithArr(jsonArr);
    //寻找二级菜单
    appendChild(jsonArr, targetJson);

    var count = 12345;
    //寻找三级菜单
    for (var j = 0; j < targetJson.children.length; j++) {
        appendChild(jsonArr, targetJson.children[j]);
        if (targetJson.children[j].children.length > 8) {
            targetJson.children[j].children = targetJson.children[j].children.slice(0, 8);
            targetJson.children[j].children.push({
                "data": "",
                "id": count + "",
                "l_flag": "0",
                "name": "查看更多...",
                "pid": targetJson.children[j].id,
                "children": []
            });
            seeMore.push({
                "data": "",
                "id": count + "",
                "l_flag": "0",
                "name": "查看更多...",
                "pid": targetJson.children[j].id,
                "children": []
            });
            count++;
        }
    }
    return targetJson;
}

function dealWithArr(originArr) {
    for (var i = 0; i < originArr.length; i++) {
        originArr[i].children = [];
        originArr[i].alias = originArr[i].name;
        if (originArr[i].name.length > 6) {
            originArr[i].name = originArr[i].name.substring(0, 5) + '...';
        }
    }
}

var last = {
    "data": "",
    "id": "999",
    "l_flag": "0",
    "name": "查看更多...",
    "pid": "998",
    "children": []
};
function appendChild(jsonArr, pObj) {
    for (var i = 0; i < jsonArr.length; i++) {
        if (jsonArr[i].pid == pObj.id) {
            pObj.children.push(jsonArr[i]);
        }
    }
}

function showDetails(nodeId) {
    var cnode = result.filter(function (item) {
        return item.id == nodeId;
    })
    if (cnode && cnode.length > 0 && cnode[0].alias && cnode[0].alias != '查看更多...') {
        document.getElementById("detail").innerHTML = cnode[0].alias;
    } else {
        var string = '<table>';
        var ccnode = seeMore.filter(function (n) {
            return n.id == nodeId;
        });
        // var results = result.filter(function (p) {
        //     return p.pid == ccnode.pid;
        // });
        for (var i = 0; i < result.length; i++) {
            if(result[i].pid === ccnode[0].pid){
                string+='<tr><td>'+result[i].alias+'</td></tr>';
            }
        }
        string+='</table>';
        Details.write(string);
    }
}

var Details = {
    ele: false,
    write: function (text) {
        if (!this.ele)
            this.ele = document.getElementById('detail');
        this.ele.innerHTML = text;
        this.ele.style.left = '20px';
    }
};