class create_data{

}
class allocate_seats {
    constructor(total_seats, applications) {
        this.applications = applications;
        this.counter = 0;
        this.total_seats = total_seats;
        this.open_seats = Math.floor(0.5 * total_seats);
        this.sc_seats = Math.floor(0.13 * total_seats);
        this.st_seats = Math.ceil(0.07 * total_seats);
        this.vj_seats = Math.ceil(0.03 * total_seats);
        this.nt1_seats = Math.ceil(0.025 * total_seats);
        this.nt2_seats = Math.ceil(0.035 * total_seats);
        this.nt3_seats = Math.ceil(0.02 * total_seats);
        this.obc_seats = Math.floor(0.19 * total_seats);
        this.ews_seats = Math.floor(0.1 * total_seats);
        this.waiting_seat = 1
    }
    allocate() {
        let seatCounts = [this.sc_seats, this.st_seats, this.vj_seats, this.nt1_seats, this.nt2_seats, this.nt3_seats, this.obc_seats, this.ews_seats, this.waiting_seat]
        this.applications.sort((a, b) =>
            a.grade < b.grade ? 1 : -1)
        const openList = this.applications.slice(0, this.open_seats);
        const waitingList = []
        openList.forEach((student, index) => {
            student.allotment.allotmentSeatCategoryType = "OPEN";
            student.allotment.allotmentSeatCategoryNumber = index + 1;
        });
        this.counter = this.counter + this.open_seats
        this.applications.splice(0, this.open_seats);
        this.applications.forEach((student, index) => {
            if (this.counter<= this.total_seats)
            {
                if (student.category === "SC" && seatCounts[0] > 0) {
                    student.allotment.allotmentSeatCategoryType = "SC"
                    student.allotment.allotmentSeatCategoryNumber = (this.sc_seats - seatCounts[0]) + 1
                    openList.push(student);
                    seatCounts[0]--;
                }
                else if (student.category === "ST" && seatCounts[1] > 0) {
                    student.allotment.allotmentSeatCategoryType = "ST"
                    student.allotment.allotmentSeatCategoryNumber = (this.st_seats - seatCounts[1]) + 1
                    openList.push(student);
                    seatCounts[1]--;
                }
                else if (student.category === "VJ" && seatCounts[2] > 0) {
                    student.allotment.allotmentSeatCategoryType = "VJ"
                    student.allotment.allotmentSeatCategoryNumber = (this.vj_seats - seatCounts[2]) + 1
                    openList.push(student);
                    seatCounts[2]--;
                }
                else if (student.category === "NT-1" && seatCounts[3] > 0) {
                    student.allotment.allotmentSeatCategoryType = "NT-1"
                    student.allotment.allotmentSeatCategoryNumber = (this.nt1_seats - seatCounts[3]) + 1
                    openList.push(student);
                    seatCounts[3]--;
                }
                else if (student.category === "NT-2" && seatCounts[4] > 0) {
                    student.allotment.allotmentSeatCategoryType = "NT-2"
                    student.allotment.allotmentSeatCategoryNumber = (this.nt2_seats - seatCounts[4]) + 1
                    openList.push(student);
                    seatCounts[4]--;
                }
                else if (student.category === "NT-3" && seatCounts[5] > 0) {
                    student.allotment.allotmentSeatCategoryType = "NT-3"
                    student.allotment.allotmentSeatCategoryNumber = (this.nt3_seats - seatCounts[5]) + 1
                    openList.push(student);
                    seatCounts[5]--;
                }
                else if (student.category === "OBC" && seatCounts[6] > 0) {
                    student.allotment.allotmentSeatCategoryType = "OBC"
                    student.allotment.allotmentSeatCategoryNumber = (this.obc_seats - seatCounts[6]) + 1
                    openList.push(student);
                    seatCounts[6]--;
                }
                else if (student.category === "EWS" && seatCounts[7] > 0) {
                    student.allotment.allotmentSeatCategoryType = "EWS"
                    student.allotment.allotmentSeatCategoryNumber = (this.ews_seats - seatCounts[7]) + 1
                    openList.push(student);
                    seatCounts[7]--;
                }
                else{
                    student.allotment.allotmentSeatCategoryType = "WAITING"
                    student.allotment.allotmentSeatCategoryNumber = (seatCounts[8])
                    waitingList.push(student);
                    seatCounts[8]++;
                }
                
            }
            else{
                student.allotment.allotmentSeatCategoryType = "WAITING"
                student.allotment.allotmentSeatCategoryNumber = (seatCounts[8])
                waitingList.push(student);
                seatCounts[8]++;
            }
        });
        return  [openList,waitingList];
    }
}


// function allocation(applications) {
//     applications.forEach(application => {
//         const { branch } = application;

//         if (!studentsByBranchBoys[branch] && applications.gender==="Male") {
//             studentsByBranchBoys[branch] = [];
//         }
//         else if(studentsByBranchBoys[branch] && application.gender==="Male"){
//             studentsByBranchBoys[branch].push(application);
//         }
//         else if (!studentsByBranchGirls[branch] && application.gender==="Female") {
//             studentsByBranchGirls[branch] = [];
//         }
//         else{
//             studentsByBranchGirls[branch].push(application)
//         }
        
//     });
//     return 
// }


function allocation(arr1,arr2,totalBoys, totalGirls ){

    const factor = 21;
    const instruFac = 1;
    const PlanningFac = 2;
    const MetaFac = 2;
    const civilFac = 2;
    const ManFac = 2;
    const ElectricalFac = 2;
    const EntcFac = 2;
    const MechFac = 4;
    const CompFac = 4;
    //for boys
    const civilBranch = (totalBoys/factor) * civilFac;
    const electricalBranch = (totalBoys/factor) * ElectricalFac;
    const entcBranch = (totalBoys/factor) * EntcFac;
    const manuBranch = (totalBoys/factor) * ManFac;
    const mechanicalBranch = (totalBoys/factor) * MechFac;
    const metaBranch = (totalBoys/factor) * MetaFac;
    const planningBranch = (totalBoys/factor) * PlanningFac;
    const instruBranch = (totalBoys/factor) * instruFac;
    const compBranch = (totalBoys/factor) * CompFac;

    const civilBranchGirls = (totalGirls / factor) * civilFac;
    const electricalBranchGirls = (totalGirls / factor) * ElectricalFac;
    const entcBranchGirls = (totalGirls / factor) * EntcFac;
    const manuBranchGirls = (totalGirls / factor) * ManFac;
    const mechanicalBranchGirls = (totalGirls / factor) * MechFac;
    const metaBranchGirls = (totalGirls / factor) * MetaFac;
    const planningBranchGirls = (totalGirls / factor) * PlanningFac;
    const instruBranchGirls = (totalGirls / factor) * instruFac;
    const compBranchGirls = (totalGirls / factor) * CompFac;
    
    const branch_boys = (new allocate_seats(civilBranch,arr1)).allocate();
    const branch_girls = (new allocate_seats(civilBranchGirls,arr2)).allocate();
   
    return [ branch_boys,branch_girls];
}


export default allocation;

