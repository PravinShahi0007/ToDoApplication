
    function LoadCombo() {

        $(":file").change(function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);
            }
        });
        function imageIsLoaded(e) {
            $('#myImg').attr('src', e.target.result);

        };



        $("#Type").kendoComboBox({

            dataValueField: "ControlConKy",
            dataTextField: "ConNm",

            dataSource: {
                type: "POST",
                transport: {
                    read: urlEmpMas.GetTypeOth
                }
            },

            change: function (e) {
                var ControlConKy = document.getElementById("Type").value;
                   $("#code").kendoComboBox({


                    dataValueField: "CdKy",
                    dataTextField: "CdNm",
                    dataSource: GetTypP(ControlConKy),

                    filter: "contains",
                    suggest: true,
                    placeholder: "Select a Code"
                })

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select a Type"
        })

        $("#Country").kendoComboBox({

            dataValueField: "CdKy",
            dataTextField: "CdNm",

            dataSource: {
                type: "POST",
                transport: {

                    read: urlEmpMas.GetCountry

                }
            },
            filter: "contains",
            suggest: true,
            placeholder: "Select a Country"
        })

        function GetTypP(Temp) {
            var dataSource = new kendo.data.DataSource(
     {
         transport: {
             read: {
                 url: urlEmpMas.GetCodeOth,
                 data: {
                     ControlConKy: Temp
                 },
                 dataType: "json"
             }
         }
     });
            return dataSource;
        }


        $("#AmtAdd").kendoNumericTextBox({

        });
        $("#AmtDed").kendoNumericTextBox({

        });


        $("#DateFD").kendoDatePicker({

            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });
        $("#DateTD").kendoDatePicker({

            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });

        $("#Date").kendoDatePicker({

            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });


        $("#EDate").kendoDatePicker({

            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });


        $("#DateFA").kendoDatePicker({

            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });


        $("#DateDed").kendoDatePicker({

            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });

    }

	
	
    $("#TypeD").width(224).kendoComboBox({

        dataValueField: "CdKy",
        dataTextField: "ConNm",
        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.GetTypeAdd
            }
        },

        change: function (e) {
            var ConCd = document.getElementById("TypeD").value;

            $("#codeD").kendoComboBox({


                dataValueField: "CdKy",
                dataTextField: "CdNm",
                dataSource: codeA(ConCd),

                filter: "contains",
                suggest: true,
                placeholder: "Select a Code"
            })
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Type"
    });

    $("#TypeA").width(224).kendoComboBox({

        dataValueField: "CdKy",
        dataTextField: "ConNm",
        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.GetTypeAdd
            }
        },

        change: function (e) {

            var ConCd = document.getElementById("TypeA").value;

            $("#codeA").kendoComboBox({


                dataValueField: "CdKy",
                dataTextField: "CdNm",
                dataSource: codeA(ConCd),

                filter: "contains",
                suggest: true,
                placeholder: "Select a Code"
            })

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Type"
    });


    function codeA(ConCd) {
        var dataSource = new kendo.data.DataSource({
             transport: {
                 read: {
                     url: urlEmpMas.GetCodeAD,
                     data: {
                         ConCd: ConCd
                     },
                     dataType: "json"
                 }
             }
         });
        return dataSource;
    }
	
	
	
    $("#GenderFM").kendoComboBox({
        dataTextField: "parentName",
        dataValueField: "parentId",
        dataSource: [
            { parentName: "Male", parentId: "M" },
            { parentName: "Female", parentId: "F" }

        ],
        placeholder: "Select Gender"

    });
   
 
        $("#Ethnic").kendoComboBox({

            dataValueField: "CdKy",
            dataTextField: "CdNm",
            dataSource: GetCdMas_LookupWeb('EthGrp'),
            filter: "contains",
            suggest: true,
            placeholder: "Select a Ethnic Group"
        });

    $("#Religion").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('religion'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a religion"
    });
    function GetCdMas_LookupWeb(ConCd) {
        var dataSource = new kendo.data.DataSource(
          {
              transport: {
                  read: {
                      url: urlHRISEmployeeGetCdMas_LookupWeb,
                      data: { ConCd: ConCd },
                      dataType: "json"
                  }
              }
          });
        return dataSource;
    }