
var Log = {
    elem: false,
    write: function (text) {
        if (!this.elem)
            this.elem = document.getElementById('log');
        this.elem.innerHTML = text;
        this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
    }
};

var jsons ={
    "id": "-9999",
    "name": "正经项目别动",
    "pid": "-10000",
    "children": [
      {
        "code_name": "",
        "data": "",
        "id": "-4",
        "l_busin_flag": "0",
        "l_flag": "0",
        "name": "对手方信息",
        "pid": "-9999",
        "vc_kind_name": "",
        "children": [
          {
            "code_name": "l_rival_id",
            "data": "1",
            "id": "2",
            "l_busin_flag": "22238",
            "l_flag": "1",
            "name": "1<br/>机构对手方测试",
            "pid": "-4",
            "vc_kind_name": "RIVAL",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": 0.1,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "2",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "1<br/>机构对手方测试"
          },
          {
            "code_name": "l_rival_id",
            "data": "5",
            "id": "4",
            "l_busin_flag": "22238",
            "l_flag": "1",
            "name": "5<br/>cw",
            "pid": "-4",
            "vc_kind_name": "RIVAL",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -0.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "4",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "5<br/>cw"
          }
        ],
        "alias": "对手方信息"
      },
      {
        "code_name": "",
        "data": "",
        "id": "-3",
        "l_busin_flag": "0",
        "l_flag": "0",
        "name": "合同信息",
        "pid": "-9999",
        "vc_kind_name": "",
        "children": [
          {
            "code_name": "vc_stock_code",
            "data": "GQ5200217005",
            "id": "5",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "GQ5200217005<br/>001001000011",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -1.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "5",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "GQ5200217005<br/>001001000011"
          },
          {
            "code_name": "vc_stock_code",
            "data": "GQ5200217006",
            "id": "6",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "GQ5200217006<br/>LBJ合同",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -2.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "6",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "GQ5200217006<br/>LBJ合同"
          },
          {
            "code_name": "vc_stock_code",
            "data": "GQ5200217008",
            "id": "7",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "GQ5200217008<br/>james",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -3.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "7",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "GQ5200217008<br/>james"
          },
          {
            "code_name": "vc_stock_code",
            "data": "GQ5200217009",
            "id": "8",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "GQ5200217009<br/>测试日期",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -4.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "8",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "GQ5200217009<br/>测试日期"
          },
          {
            "code_name": "vc_stock_code",
            "data": "GQ520021700A",
            "id": "9",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "GQ520021700A<br/>股权日期",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -5.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "9",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "GQ520021700A<br/>股权日期"
          },
          {
            "code_name": "vc_stock_code",
            "data": "GQ520021700H",
            "id": "10",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "GQ520021700H<br/>11",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -6.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "10",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "GQ520021700H<br/>11"
          },
          {
            "code_name": "vc_stock_code",
            "data": "GQ520021700I",
            "id": "11",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "GQ520021700I<br/>12",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -7.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "11",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "GQ520021700I<br/>12"
          },
          {
            "code_name": "vc_stock_code",
            "data": "GQ520021700J",
            "id": "12",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "GQ520021700J<br/>13",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -8.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "12",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "GQ520021700J<br/>13"
          },
          {
            "code_name": "vc_stock_code",
            "data": "GQ520021700K",
            "id": "13",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "GQ520021700K<br/>15",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -9.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "13",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "GQ520021700K<br/>15"
          },
          {
            "code_name": "vc_stock_code",
            "data": "GQ520021700L",
            "id": "14",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "GQ520021700L<br/>16",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -10.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "14",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "GQ520021700L<br/>16"
          },
          {
            "code_name": "vc_stock_code",
            "data": "GQ520021700M",
            "id": "15",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "GQ520021700M<br/>17",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -11.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "15",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "GQ520021700M<br/>17"
          },
          {
            "code_name": "vc_stock_code",
            "data": "GQ520021700N",
            "id": "16",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "GQ520021700N<br/>22",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -12.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "16",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "GQ520021700N<br/>22"
          },
          {
            "code_name": "vc_stock_code",
            "data": "GQ520021700P",
            "id": "17",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "GQ520021700P<br/>0010001",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -13.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "17",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "GQ520021700P<br/>0010001"
          },
          {
            "code_name": "vc_stock_code",
            "data": "GQ520021700R",
            "id": "18",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "GQ520021700R<br/>0010002",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -14.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "18",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "GQ520021700R<br/>0010002"
          },
          {
            "code_name": "vc_stock_code",
            "data": "ZQD200217006",
            "id": "21",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "ZQD200217006<br/>多重利率",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -15.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "21",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "ZQD200217006<br/>多重利率"
          },
          {
            "code_name": "vc_stock_code",
            "data": "ZQD200217009",
            "id": "22",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "ZQD200217009<br/>11",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -16.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "22",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "ZQD200217009<br/>11"
          },
          {
            "code_name": "vc_stock_code",
            "data": "ZQD20021700A",
            "id": "23",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "ZQD20021700A<br/>11",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -17.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "23",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "ZQD20021700A<br/>11"
          },
          {
            "code_name": "vc_stock_code",
            "data": "ZQD20021700B",
            "id": "24",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "ZQD20021700B<br/>12",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -18.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "24",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "ZQD20021700B<br/>12"
          },
          {
            "code_name": "vc_stock_code",
            "data": "ZQD20021700C",
            "id": "25",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "ZQD20021700C<br/>22",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -19.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "25",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "ZQD20021700C<br/>22"
          },
          {
            "code_name": "vc_stock_code",
            "data": "ZQD20021700D",
            "id": "26",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "ZQD20021700D<br/>001001001",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -20.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "26",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "ZQD20021700D<br/>001001001"
          },
          {
            "code_name": "vc_stock_code",
            "data": "ZQD20021700J",
            "id": "27",
            "l_busin_flag": "22229",
            "l_flag": "1",
            "name": "ZQD20021700J<br/>ddf",
            "pid": "-3",
            "vc_kind_name": "CONTRACT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -21.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "27",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "ZQD20021700J<br/>ddf"
          }
        ],
        "alias": "合同信息"
      },
      {
        "code_name": "",
        "data": "",
        "id": "-1",
        "l_busin_flag": "0",
        "l_flag": "0",
        "name": "基金信息",
        "pid": "-9999",
        "vc_kind_name": "",
        "children": [
          {
            "code_name": "vc_product_id",
            "data": "12121",
            "id": "1",
            "l_busin_flag": "22430",
            "l_flag": "1",
            "name": "12121<br/>12121基金",
            "pid": "-1",
            "vc_kind_name": "PRODUCT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -22.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "1",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "12121<br/>12121基金"
          },
          {
            "code_name": "vc_product_id",
            "data": "201700100101",
            "id": "3",
            "l_busin_flag": "22430",
            "l_flag": "1",
            "name": "201700100101<br/>天成一号",
            "pid": "-1",
            "vc_kind_name": "PRODUCT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -23.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "3",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "201700100101<br/>天成一号"
          },
          {
            "code_name": "vc_product_id",
            "data": "JJ1234",
            "id": "19",
            "l_busin_flag": "22430",
            "l_flag": "1",
            "name": "JJ1234<br/>jijin1234",
            "pid": "-1",
            "vc_kind_name": "PRODUCT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -24.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "19",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "JJ1234<br/>jijin1234"
          },
          {
            "code_name": "vc_product_id",
            "data": "XZTRUST00101",
            "id": "20",
            "l_busin_flag": "22430",
            "l_flag": "1",
            "name": "XZTRUST00101<br/>西藏信托集合信托0001",
            "pid": "-1",
            "vc_kind_name": "PRODUCT",
            "children": [
              {
                "code_name": "l_rival_id",
                "data": "1",
                "id": -25.9,
                "l_busin_flag": "22238",
                "l_flag": "1",
                "name": "修改",
                "pid": "20",
                "vc_kind_name": "RIVAL",
                "children": []
              }
            ],
            "alias": "XZTRUST00101<br/>西藏信托集合信托0001"
          }
        ],
        "alias": "基金信息"
      }
    ]
  }


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
            color: '#9BCD9B',
            overridable: true
        },

        Edge: {
            type: 'quadratic:end',
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
                 st.onClick(node.id);
            };
            //set label styles
            var style = label.style;
            style.width = 100 + 'px';
            style.height = 40 + 'px';
            style.cursor = 'pointer';
            style.color = 'white';
            style.fontSize = '0.8em';
            style.textAlign = 'center';
            style.paddingTop = '20px';
            style.paddingLeft = '0px;';
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
                node.data.$color = "#9BCD9B";
            }
            else {
                delete node.data.$color;
                //if the node belongs to the last plotted level
                if (!node.anySubnode("exist")) {
                    // if(node._depth==2){
                    //     node.Config.color = "#eaa";
                    //     //node.Config.width = "200";
                    //     node.Config.type = "rectangle";
                    //}
                    //count children number
                    var count = 0;
                    node.eachSubnode(function (n) { count++; });
                    //assign a node color based on
                    //how many children it has      7D9EC0
                    node.data.$color = ['#9BCD9B', '#baa', '#caa', '#daa', '#eaa', '#eaa','#eaa','#7D9EC0','#7D9EC0','#7D9EC0','#7D9EC0','#7D9EC0'][count];
                    //node.data.$color = ['','','',''];
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
    st.loadJSON(jsons);
    //compute node positions and layout
    st.compute();
    //optional: make a translation of the tree
    st.geom.translate(new $jit.Complex(-200, 0), "current");
    //emulate a click on the root node.
    st.onClick(st.root);
    //end

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
            if (result[i].pid === ccnode[0].pid) {
                string += '<tr><td>' + result[i].alias + '</td></tr>';
            }
        }
        string += '</table>';
        Details.write(string);
    }
}

var pIds = [];
function formatResult(Arr, pObject) {
    var hasChild = false;
    for (var i = 0; i < arr.length; i++) {
        if (pObject.id == arr[i].pid) {
            hasChild = true;
            pObject.children.push(arr[i]);
        }
    }
    if (hasChild == true) {
        var currChildren = pObject.children;
        for (var j = 0; j < currChildren.length; j++) {
            formatResult(Arr, currChildren[j]);
        }
    } else {
        var isExist = false;
        for (var m = 0; m < pIds.length; m++) {
            if (pIds[i] == pObject.pid) {
                isExist = true;
            }
        }
        if (!isExist) {
            pIds.push(pObject.pid);
        }
    }
    return pObject;
}

function dealChildren(cJson, pIds) {
    for (var i = 0; i < pIds.length; i++) {
        var cId = pIds[i];
        if (cJson.id == cId) {
            if (cJson.children.length > 8) {
                cJson.children = cJson.children.slice(0, 8);
                cJson.children.push({
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
            }
        } else {
            for (var j = 0; j < cJson.children.length; j++) {
                dealChildren(cJson.children[i], cId);
            }
        }
    }
}
