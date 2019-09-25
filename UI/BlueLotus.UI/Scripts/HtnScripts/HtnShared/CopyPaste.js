
//$(document).ready(function () {

//    var IsAltKeyDown = false; //bool
//    var IsCtrlKeyDown = false; //bool
//    var IsShiftKeyDown = false; //bool
//    var IsPlusKeyDown = false; //bool

//    $(document).on("keydown", function (e) {
//        if (e.keyCode == 17) {
//            IsCtrlKeyDown = true;
//            //alert('Ctrl Key Down');
//            return;
//        }
//        if (e.keyCode == 16) {
//            IsShiftKeyDown = true;
//            //alert('Shift Key Down');
//            return;
//        }
//        if (e.keyCode == 18) {
//            e.preventDefault();
//            e.stopPropagation();
//            IsAltKeyDown = true;
//            //alert('Alt Key Down');
//            return;
//        }

//        if (!IsAltKeyDown && e.keyCode == 107) { // +

//            var ele_cpypst_blsmartcpypaste = getActiveElement_data_cpypst_blsmartcpypaste($(document.activeElement));
//            if (ele_cpypst_blsmartcpypaste != undefined) {
//                e.preventDefault();
//                e.stopPropagation();
//                IsPlusKeyDown = true;
//                var act_ele_val = localStorage.getItem("C_L_" + ele_cpypst_blsmartcpypaste);

//                $(document.activeElement).val(act_ele_val);
//                //alert('+');
//                return;
//            }
//        }
//        else if (IsAltKeyDown && e.keyCode == 107) { // Alt + +

//            var ele_cpypst_blsmartcpypaste = getActiveElement_data_cpypst_blsmartcpypaste($(document.activeElement));
//            if (ele_cpypst_blsmartcpypaste != undefined) {
//                e.preventDefault();
//                e.stopPropagation();
//                IsPlusKeyDown = true;
//                var act_ele_val = localStorage.getItem("P_L_" + ele_cpypst_blsmartcpypaste);

//                $(document.activeElement).val(act_ele_val);
//                //alert('Shift + +');
//                return;
//            }
//        }






//        /////////////////////////////////////////////////////////////////////////////////
//        // All keypress event move to keydown event because its not support in chrome. //
//        /////////////////////////////////////////////////////////////////////////////////
//        //e.stopPropagation();

//        if (e.keyCode == 18) {
//            e.preventDefault();
//            e.stopPropagation();
//        }
//        if (IsPlusKeyDown && e.keyCode == 43) {
//            e.preventDefault();
//            e.stopPropagation();
//        }
//        else if (e.keyCode == 119) { // F8

//            var ele_cpypst_blsmartcpypaste = getActiveElement_data_cpypst_blsmartcpypaste($(document.activeElement));
//            if (ele_cpypst_blsmartcpypaste != undefined) {
//                var act_ele_val = $(document.activeElement).val();

//                storeLocalStorage_C(ele_cpypst_blsmartcpypaste, act_ele_val);
//                //alert($(document.activeElement).val());
//                //alert('F8');
//            }
//        }
//        else if (!IsAltKeyDown && e.keyCode == 120) { // F9 and Not Alt

//            var ele_cpypst_blsmartcpypaste = getActiveElement_data_cpypst_blsmartcpypaste($(document.activeElement));
//            if (ele_cpypst_blsmartcpypaste != undefined) {
//                var act_ele_val = localStorage.getItem("C_" + ele_cpypst_blsmartcpypaste);

//                $(document.activeElement).val(act_ele_val);
//                //alert('F9');
//            }
//        }
//        else if (IsAltKeyDown && e.keyCode == 120) { // (IsAltKeyDown && F9

//            var ele_cpypst_blsmartcpypaste = getActiveElement_data_cpypst_blsmartcpypaste($(document.activeElement));
//            if (ele_cpypst_blsmartcpypaste != undefined) {
//                var act_ele_val = localStorage.getItem("P_" + ele_cpypst_blsmartcpypaste);

//                $(document.activeElement).val(act_ele_val);
//                //alert('Ctrl + F9');
//            }
//        }


//        else if (!IsAltKeyDown && e.keyCode == 113) { // F2

//            var ele_cpypst_blsmartcpypaste = getActiveElement_data_cpypst_blsmartcpypaste($(document.activeElement));
//            if (ele_cpypst_blsmartcpypaste != undefined) {
//                var act_ele_val = localStorage.getItem("C_L_" + ele_cpypst_blsmartcpypaste);

//                $(document.activeElement).val(act_ele_val);
//                //alert('F9');
//            }
//        }
//        else if (IsAltKeyDown && e.keyCode == 113) { // F2 + Alt

//            var ele_cpypst_blsmartcpypaste = getActiveElement_data_cpypst_blsmartcpypaste($(document.activeElement));
//            if (ele_cpypst_blsmartcpypaste != undefined) {
//                var act_ele_val = localStorage.getItem("P_L_" + ele_cpypst_blsmartcpypaste);

//                $(document.activeElement).val(act_ele_val);
//                //alert('Ctrl + F9');
//            }
//        }
//    });

//    $(document).on("keyup", function (e) {
//        if (e.keyCode == 17) {
//            IsCtrlKeyDown = false;
//            //alert('Ctrl Key Up');
//        }
//        if (e.keyCode == 16) {
//            IsShiftKeyDown = false;
//            //alert('Shift Key Up');
//        }
//        if (e.keyCode == 107) {
//            IsPlusKeyDown = false;
//            //alert('+ Key Up');
//        }
//        if (e.keyCode == 18) {
//            e.preventDefault();
//            e.stopPropagation();
//            IsAltKeyDown = false;
//            //alert('Alt Key Down');
//            return;
//        }
//    });

//    var mActiveElement = document.activeElement;
//    var mPreActiveElement = document.activeElement;
//    var mPrePreActiveElement = document.activeElement;

//    var documentFocusChanged = window.setInterval(function () {

//        if (isActiveElementChanged()) {
//            var ele_cpypst_blsmartcpypaste = getActiveElement_data_cpypst_blsmartcpypaste($(mPrePreActiveElement));
//            if (ele_cpypst_blsmartcpypaste != undefined) {
//                var act_ele_val = $(mPrePreActiveElement).val(); // mPrePreActiveElement.value; //
//                if (act_ele_val != "" && act_ele_val != "0.00" && act_ele_val != "0") {
//                    storeLocalStorage_P_L(ele_cpypst_blsmartcpypaste, act_ele_val);
//                }
//                //alert($(document.activeElement).val());
//                //alert('Focus Changed');
//            }

//            // By defalut select all the text in input element.
//            if ($(mPreActiveElement)) {
//                $(mPreActiveElement).select();
//            }

//        }


//        var ele_obj_objky = getActiveElement_data_obj_objky($(document.activeElement));
//        if (ele_obj_objky != undefined && document.getElementById("LayOut_ObjKy_RefNo") != undefined) {
//            document.getElementById("LayOut_ObjKy_RefNo").innerHTML = "Obj Ref No : " + ele_obj_objky;
//        }
//        else if(document.getElementById("LayOut_ObjKy_RefNo") != undefined) {
//            document.getElementById("LayOut_ObjKy_RefNo").innerHTML = "Obj Ref No : N/A";
//        }

//    }, 1);

//    function storeLocalStorage_C(ele_cpypst_blsmartcpypaste , act_ele_val) {
//        var c_act_ele_val = localStorage.getItem("C_" + ele_cpypst_blsmartcpypaste);
//        if (c_act_ele_val != act_ele_val) {
//            localStorage.setItem("P_" + ele_cpypst_blsmartcpypaste, localStorage.getItem("C_" + ele_cpypst_blsmartcpypaste));
//            localStorage.setItem("C_" + ele_cpypst_blsmartcpypaste, act_ele_val);
//        }
//    }

//    function storeLocalStorage_P_L(ele_cpypst_blsmartcpypaste, act_ele_val) {
//        var c_l_act_ele_val = localStorage.getItem("C_L_" + ele_cpypst_blsmartcpypaste);
//        if (c_l_act_ele_val != act_ele_val) {
//            localStorage.setItem("P_L_" + ele_cpypst_blsmartcpypaste, localStorage.getItem("C_L_" + ele_cpypst_blsmartcpypaste));
//            localStorage.setItem("C_L_" + ele_cpypst_blsmartcpypaste, act_ele_val);
//        }
//    }

//    function isActiveElementChanged() {
//        var mActiveElement = document.activeElement;
//        if (mActiveElement != mPreActiveElement) {
//            mPrePreActiveElement = mPreActiveElement;
//            mPreActiveElement = mActiveElement;
//            return true;
//        }
//        return false;
//    }

//    function getActiveElement_data_cpypst_blsmartcpypaste(documentActiveElement) {

//        var ele_cpypst_blsmartcpypaste = null;
//        var fromWhichCondition = "";

//        if (documentActiveElement.closest("[data-cpypst-blsmartcpypaste]").data('cpypst-blsmartcpypaste') != undefined) {
//            fromWhichCondition = "Direct Closest";
//            ele_cpypst_blsmartcpypaste = documentActiveElement.closest("[data-cpypst-blsmartcpypaste]").data('cpypst-blsmartcpypaste');
//        } else if (documentActiveElement.siblings("[data-cpypst-blsmartcpypaste]").data('cpypst-blsmartcpypaste') != undefined) {
//            fromWhichCondition = "Direct Siblings";
//            ele_cpypst_blsmartcpypaste = documentActiveElement.siblings("[data-cpypst-blsmartcpypaste]").data('cpypst-blsmartcpypaste')
//        } else if (documentActiveElement.parent().siblings("[data-cpypst-blsmartcpypaste]").data('cpypst-blsmartcpypaste') != undefined) {
//            fromWhichCondition = "Direct Parent Siblings";
//            ele_cpypst_blsmartcpypaste = documentActiveElement.parent().siblings("[data-cpypst-blsmartcpypaste]").data('cpypst-blsmartcpypaste')
//        } else if (documentActiveElement.parent().closest("[data-cpypst-blsmartcpypaste]").data('cpypst-blsmartcpypaste') != undefined) {
//            fromWhichCondition = "Direct Parent Closest";
//            ele_cpypst_blsmartcpypaste = documentActiveElement.parent().closest("[data-cpypst-blsmartcpypaste]").data('cpypst-blsmartcpypaste');
//        } else {
//            fromWhichCondition = "Direct Undefined";
//            ele_cpypst_blsmartcpypaste = undefined;
//        }

//        //alert(fromWhichCondition);
//        //alert(ele_cpypst_blsmartcpypaste);

//        return ele_cpypst_blsmartcpypaste;
//    }

//    function getActiveElement_data_obj_objky(documentActiveElement) {

//        var ele_obj_objky = null;
//        var fromWhichCondition = "";

//        if (documentActiveElement.closest("[data-obj-objky]").data('obj-objky') != undefined) {
//            fromWhichCondition = "Direct Closest";
//            ele_obj_objky = documentActiveElement.closest("[data-obj-objky]").data('obj-objky');
//        } else if (documentActiveElement.siblings("[data-obj-objky]").data('obj-objky') != undefined) {
//            fromWhichCondition = "Direct Siblings";
//            ele_obj_objky = documentActiveElement.siblings("[data-obj-objky]").data('obj-objky')
//        } else if (documentActiveElement.parent().siblings("[data-obj-objky]").data('obj-objky') != undefined) {
//            fromWhichCondition = "Direct Parent Siblings";
//            ele_obj_objky = documentActiveElement.parent().siblings("[data-obj-objky]").data('obj-objky')
//        } else if (documentActiveElement.parent().closest("[data-obj-objky]").data('obj-objky') != undefined) {
//            fromWhichCondition = "Direct Parent Closest";
//            ele_obj_objky = documentActiveElement.parent().closest("[data-obj-objky]").data('obj-objky');
//        } else {
//            fromWhichCondition = "Direct Undefined";
//            ele_obj_objky = undefined;
//        }

//        //alert(fromWhichCondition);
//        //alert(ele_cpypst_blsmartcpypaste);

//        return ele_obj_objky;
//    }

//    $(document).on("keypress", function (e) {

//        /////////////////////////////////////////////////////////////////////////////////
//        // All keypress event move to keydown event because its not support in chrome. //
//        /////////////////////////////////////////////////////////////////////////////////        
//    });

//});


//  *************************************************  //
//                                                     //
//  f1, f2, f4, f8, f9  : firebox                      //
//  f2, f4, f7, f8, f9, f10 : Chorome                  //
//                                                     //
//  f2, f4, f8, f9 : Common                            //
//                                                     //
//  store the copy paste data in :                     //
//                                                     //
//  localStorage.setItem('PrjCd','TestData');          //
//  undefined                                          //
//  localStorage.getItem('PrjCd');                     //
//  "TestData"                                         //
//                                                     //
//  http://jsfiddle.net/sZmST/18/                      //
//  http://jsfiddle.net/C97h6/1/                       //
//                                                     //
//  *************************************************  //

/********************************************************
*                                                       *
*   f8 for copy,            119                         *
*   f9 for paste,           120                         *
*   Alt + f9 for paste previous value    18 , 120      *
*                                                       *
*   f2 for paste,                  113                  *
*   Alt + f2 for paste,           18, 113              *
*   + for paste,                   107                  *
*   shift + + for paste previous value    16 , 107      *
*                                                       *
********************************************************/

//$(document).on("keypress keydown keyup", function (e) {

// At present I handling on header level controler by objcode. In feature we need to enhance the 
// feature in grid also. my sugestion for grid copy paste handling is, using objcode and colum name as well.

// for grid : when store the data in localstorage using ObjCd and Column name both.


function WriteTologHTN(logMsg) {
    console.log(logMsg + "HTN LOG : VGSAN");
}