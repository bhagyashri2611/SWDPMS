export interface DashboardModel {
    totalDischargeMonthly: any[],
    totalDischargeLocMonthly: any[],
    totalEnergyBill: Number,
    totalRebate: Number
}

export interface IDashboardResponce {
    message: String;
    status: number;
    data: DashboardModel;
}

export interface SqlAutoData {
    PSName: String,
    Date: String,
    Time: String,
    Level1: String,
    Level2: String,
    Flow1: String,
    Flow2: String,
    Flow3: String,
    Flow4: String,
    Flow5: String,
    Flow6: String,
    Pump1: String,
    Pump2: String,
    Pump3: String,
    Pump4: String,
    Pump5: String,
    Pump6: String,
    Pump7: String,
    Pump8: String,
}

export interface ISqlAutoDataResponce {
    message: String;
    status: number;
    data: SqlAutoData[];
}