
//HTNPaginationCtrlLoadWithDataGrid(PageNo, PageSize);
// * - This is Common for load grid with pagination
// * - It's called from "../HtnShared/PaginationControl.js"

//
// HTNPaginationCtrlData.PageNo
// HTNPaginationCtrlData.PageSize
// HTNPaginationCtrlData.LastPageNo
// 

function HTNPaginationCtrlLoadWithDataGrid() {
    if (viewBag.OurCd == "Project") {
        LoadGridViewColumn();
    }
    else {
        try {
            LoadMain_ItmMasGrid();

        } catch (e) {

        }
    }


}