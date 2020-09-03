package com.kartik.compcoding;

public class Test23 {
  // empId, manId
  [ { id: , manId }, ]


  findManagers(list, id) {
    empObj = find(list, id);
    manList = [];
    recur(list, empObj, masList);
  }

  recur(list, empObj, manList) {
    if (empObj.manId != null) {
      manObj = find(list, empObj.manId);
      manList.push(manObj);
      recur(list, manObj, manList);
    }
  }

}
