
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
    "children": [
        {
            "data": "",
            "id": "-5",
            "l_flag": "0",
            "name": "抵质押物信息",
            "pid": "-9999",
            "children": [
                {
                    "data": "1",
                    "id": "24",
                    "l_flag": "1",
                    "name": "我是抵押物(1)",
                    "pid": "-5",
                    "children": []
                }
            ]
        },
        {
            "data": "",
            "id": "-4",
            "l_flag": "0",
            "name": "对手方信息",
            "pid": "-9999",
            "children": [
                {
                    "data": "5",
                    "id": "8",
                    "l_flag": "1",
                    "name": "对手方20170707(5)",
                    "pid": "-4",
                    "children": []
                },
                {
                    "data": "9",
                    "id": "15",
                    "l_flag": "1",
                    "name": "姜小宁(9)",
                    "pid": "-4",
                    "children": []
                },
                {
                    "data": "8",
                    "id": "31",
                    "l_flag": "1",
                    "name": "中国银行(8)",
                    "pid": "-4",
                    "children": []
                }
            ]
        },
        {
            "data": "",
            "id": "-3",
            "l_flag": "0",
            "name": "合同信息",
            "pid": "-9999",
            "children": [
                {
                    "data": "ZQD20011700B",
                    "id": "1",
                    "l_flag": "1",
                    "name": "111(ZQD20011700B)",
                    "pid": "-3",
                    "children": []
                },
                {
                    "data": "GQ5200117003",
                    "id": "11",
                    "l_flag": "1",
                    "name": "股权0713A(GQ5200117003)",
                    "pid": "-3",
                    "children": []
                },
                {
                    "data": "GQ5200117005",
                    "id": "12",
                    "l_flag": "1",
                    "name": "股权11(GQ5200117005)",
                    "pid": "-3",
                    "children": []
                },
                {
                    "data": "GQ5200117001",
                    "id": "13",
                    "l_flag": "1",
                    "name": "股权合同0710(GQ5200117001)",
                    "pid": "-3",
                    "children": []
                },
                {
                    "data": "GQ5200117007",
                    "id": "14",
                    "l_flag": "1",
                    "name": "股权合同0721(GQ5200117007)",
                    "pid": "-3",
                    "children": []
                },
                {
                    "data": "GQ5200117006",
                    "id": "17",
                    "l_flag": "1",
                    "name": "姜小宁股权投资002号投资明细(GQ5200117006)",
                    "pid": "-3",
                    "children": []
                },
                {
                    "data": "ZQD200117009",
                    "id": "19",
                    "l_flag": "1",
                    "name": "姜小宁债权2号(ZQD200117009)",
                    "pid": "-3",
                    "children": []
                },
                {
                    "data": "QS7200117003",
                    "id": "20",
                    "l_flag": "1",
                    "name": "其他0713A(QS7200117003)",
                    "pid": "-3",
                    "children": []
                },
                {
                    "data": "QS7200117004",
                    "id": "21",
                    "l_flag": "1",
                    "name": "其他0713B(QS7200117004)",
                    "pid": "-3",
                    "children": []
                },
                {
                    "data": "QS7200117005",
                    "id": "22",
                    "l_flag": "1",
                    "name": "其他收益1(QS7200117005)",
                    "pid": "-3",
                    "children": []
                },
                {
                    "data": "QS7200117002",
                    "id": "23",
                    "l_flag": "1",
                    "name": "其他收益权合同0712(QS7200117002)",
                    "pid": "-3",
                    "children": []
                },
                {
                    "data": "ZQD200117007",
                    "id": "25",
                    "l_flag": "1",
                    "name": "债权0713A(ZQD200117007)",
                    "pid": "-3",
                    "children": []
                },
                {
                    "data": "ZQD200117008",
                    "id": "26",
                    "l_flag": "1",
                    "name": "债权111(ZQD200117008)",
                    "pid": "-3",
                    "children": []
                },
                {
                    "data": "ZQD200117006",
                    "id": "27",
                    "l_flag": "1",
                    "name": "债权4(ZQD200117006)",
                    "pid": "-3",
                    "children": []
                },
                {
                    "data": "ZQD200117002",
                    "id": "28",
                    "l_flag": "1",
                    "name": "债权合同0710(ZQD200117002)",
                    "pid": "-3",
                    "children": []
                },
                {
                    "data": "ZQD200117003",
                    "id": "29",
                    "l_flag": "1",
                    "name": "债权合同0710A(ZQD200117003)",
                    "pid": "-3",
                    "children": []
                },
                {
                    "data": "GQ5200117002",
                    "id": "30",
                    "l_flag": "1",
                    "name": "债权合同0712(GQ5200117002)",
                    "pid": "-3",
                    "children": []
                }
            ]
        },
        {
            "data": "",
            "id": "-1",
            "l_flag": "0",
            "name": "基金信息",
            "pid": "-9999",
            "children": [
                {
                    "data": "123",
                    "id": "2",
                    "l_flag": "1",
                    "name": "123(123)",
                    "pid": "-1",
                    "children": []
                },
                {
                    "data": "Fund0721",
                    "id": "3",
                    "l_flag": "1",
                    "name": "Fund0721(Fund0721)",
                    "pid": "-1",
                    "children": []
                },
                {
                    "data": "Test001",
                    "id": "4",
                    "l_flag": "1",
                    "name": "Test001名称(Test001)",
                    "pid": "-1",
                    "children": []
                },
                {
                    "data": "JJ0001",
                    "id": "5",
                    "l_flag": "1",
                    "name": "jj1(JJ0001)",
                    "pid": "-1",
                    "children": []
                },
                {
                    "data": "JJ0002",
                    "id": "6",
                    "l_flag": "1",
                    "name": "jj2(JJ0002)",
                    "pid": "-1",
                    "children": []
                },
                {
                    "data": "JJ0003",
                    "id": "7",
                    "l_flag": "1",
                    "name": "jj3(JJ0003)",
                    "pid": "-1",
                    "children": []
                },
                {
                    "data": "GQ0001",
                    "id": "9",
                    "l_flag": "1",
                    "name": "给股权用的1(GQ0001)",
                    "pid": "-1",
                    "children": []
                },
                {
                    "data": "QTSY001",
                    "id": "10",
                    "l_flag": "1",
                    "name": "给其他收益权用1(QTSY001)",
                    "pid": "-1",
                    "children": []
                },
                {
                    "data": "JXNGQ002",
                    "id": "16",
                    "l_flag": "1",
                    "name": "姜小宁股权投资002号私募股权计划(JXNGQ002)",
                    "pid": "-1",
                    "children": []
                },
                {
                    "data": "TEST001",
                    "id": "18",
                    "l_flag": "1",
                    "name": "姜小宁股权投资计划一号(TEST001)",
                    "pid": "-1",
                    "children": []
                }
            ]
        }
    ]
}

function init() {
    maxHeight(json);
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
            height: 80,
            width: 200,
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
                    changeHeight(node, json);
                } else {
                    //json = createNewJson(node, storedJson);
                    //document.getElementById("infovis").innerHTML = "";
                    //init();
                    //st.setRoot(node.id, 'animate');
                }
            };
            //set label styles
            var style = label.style;
            style.width = node.name.length * 30 + 'px';
            style.height = 40 + 'px';
            style.cursor = 'pointer';
            style.color = '#333';
            style.fontSize = '0.8em';
            style.textAlign = 'left';
            style.paddingTop = '30px';
            style.paddingLeft = '60px';
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
    obj.style.height = maxHeight*80+220+"px";
}