
    function Save() {

        if (document.getElementById("EmpNo").value != "") {
            var EmpNo = document.getElementById("EmpNo").value;
            $.ajax({

                url: urlEmpMas.CheckEmployee,
                data: JSON.stringify({
                    EmpNo: EmpNo,
                }),
                contentType: 'application/json; charset=utf-8',
                dataType: "Json",
                type: "POST",
                success: function (data) {

                    if (data > 0) {
                       
                        //alert("This EmpNo is Alredy Exit");
                        if (confirm('This EmpNo is Alredy Exit.Do you want to update it?')) {
                            // Save it!
                            SaveNow();
                        } else {
                            document.getElementById("EmpNo").value = "";
                            // Do nothing!
                        }
                        //EmpDetailClear();
                    } else {
                        SaveNow();
                    }

                },
                error: function (e) {
                    return false;
                }

            })
        }
        else {

            alert("Please Enter Employee Number");
        }
    }



    function SaveNow() {
   
        if (document.getElementById("EmpNo").value != "") {
            if (document.getElementById("NIC").value != "") {
                if (document.getElementById("EmployeeNm").value != "") {

                    var EmpNo = document.getElementById("EmpNo").value;

                    var NIC = document.getElementById("NIC").value;
                    var EmployeeNm = document.getElementById("EmployeeNm").value;
                    var EPFNO = document.getElementById("EPFNO").value;

                    var GenderFM = document.getElementById("GenderFM").value;
                    var Religion = document.getElementById("Religion").value;
                    var Ethnic = document.getElementById("Ethnic").value;
                    var Date = document.getElementById("Date").value;
                    if ($('#IsActive1').is(":checked")) {

                        IsActive = 1;



                    } else {

                        IsActive = 0;



                    }
                    //  var IsActive1 = document.getElementById("IsActive").value;

                    var Street = document.getElementById("Street").value;
                    var City = document.getElementById("City").value;
                    var State = document.getElementById("State").value;
                    var ZipCode = document.getElementById("ZipCode").value;
                    var Country = document.getElementById("Country").value;
                    var Mobile = document.getElementById("Mobile").value;
                    var Tel1 = document.getElementById("Tel-Gen1").value;
                    var Tel2 = document.getElementById("Tel-Gen2").value;
                    var Fax = document.getElementById("Fax").value;
                    var Email = document.getElementById("Email").value;
                 

                    var GridEmpOthe = $("#GridEmpOthe").data("kendoGrid");
                    
                    var dataSource = GridEmpOthe.dataSource;

                    //records on current view / page   
                    var recordsOnCurrentView = dataSource.view().length;
                    //total records
                    var totalRecords = dataSource.total();
                    //alert(totalRecords1);
                    var currentData = GridEmpOthe.dataSource.data();
                    var updatedRecords = [];
                    var newRecordsEmpOthe = [];

                    for (var i = 0; i < currentData.length; i++) {
                        if (currentData[i].isNew()) {
                            newRecordsEmpOthe.push(currentData[i].toJSON());
                        } else if (currentData[i].Dirty == "Dirty" && currentData[i].AccTrnKy > 0) {
                            updatedRecords.push(currentData[i].toJSON());
                        }
                    }

               
                    var GridEmpAdd = $("#GridEmpAdd").data("kendoGrid");

                    var dataSource = GridEmpAdd.dataSource;

                    //records on current view / page   
                    var recordsOnCurrentView = dataSource.view().length;
                    //total records
                    var totalRecords = dataSource.total();

                    var currentData = GridEmpAdd.dataSource.data();
                    var updatedRecords = [];
                    var newRecordsEmpAdd = [];

                    for (var i = 0; i < currentData.length; i++) {
                        if (currentData[i].isNew()) {
                            newRecordsEmpAdd.push(currentData[i].toJSON());
                        } else if (currentData[i].Dirty == "Dirty" && currentData[i].AccTrnKy > 0) {
                            updatedRecords.push(currentData[i].toJSON());
                        }
                    }

                  

                    var GridEmpDed = $("#GridEmpDed").data("kendoGrid");

                    var dataSource = GridEmpDed.dataSource;

                    //records on current view / page   
                    var recordsOnCurrentView = dataSource.view().length;
                    //total records
                    var totalRecords = dataSource.total();

                    var currentData = GridEmpDed.dataSource.data();
                    var updatedRecords = [];
                    var newRecordsEmpDed = [];

                    for (var i = 0; i < currentData.length; i++) {
                        if (currentData[i].isNew()) {
                            newRecordsEmpDed.push(currentData[i].toJSON());
                        } else if (currentData[i].Dirty == "Dirty" && currentData[i].AccTrnKy > 0) {
                            updatedRecords.push(currentData[i].toJSON());
                        }
                    }
               
                    //var x = 0;
                 
                    $.ajax({

                        url: urlEmpMas.InsertEmployee,
                        data: JSON.stringify({
                            EmpNo: EmpNo,
                            NIC: NIC,
                            EmployeeNm: EmployeeNm,
                            EPFNO: EPFNO,
                            GenderFM: GenderFM,
                            Religion: Religion,
                            Ethnic: Ethnic,
                            Date: Date,
                            IsActive: IsActive,
                            Street: Street,
                            City: City,
                            State: State,
                            ZipCode: ZipCode,
                            Country: Country,
                            Mobile: Mobile,
                            Tel1: Tel1,
                            Tel2: Tel2,
                            Fax: Fax,
                            Email: Email,
                            EmpOthe: kendo.stringify(newRecordsEmpOthe),
                            EmpAdd: kendo.stringify(newRecordsEmpAdd),
                           EmpDed: kendo.stringify(newRecordsEmpDed)

                            //EmpDed:x



                        }),
                        contentType: 'application/json; charset=utf-8',
                        dataType: "Json",
                        type: "POST",
                        success: function (data) {

                            //alert(data)
                            //var a = data;
                            ////  $("#Trnky").value(a);
                            //var elem = document.getElementById("Trnky");
                            //elem.value = a;
                            alert("successfully Saved!");
                            //  alert(a)
                            //  GetGridDetail(a);
                            EmpDetailClear();
                        },
                        error: function (e) {
                            return false;
                        }

                    });

                }
                else {
                    alert("Please Enter Employee Name");
                }
            }
            else {
                alert("please Enter NIC No");
            }
        }

        else {
            alert("please Enter Emp No");
        }
    }