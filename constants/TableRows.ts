const tvlTypeOpts = {
  PACKG: "package",
  ETK: "flight",
  TRANSF: "transfers",
  HOTEL: "hotel",
  EXCH: "exchange",
  CRUISE: "cruise",
  SVCFEE: "service fee",
  CAR: "car",
  DTECHG: "date change",
  INS: "insurance",
  REBATE: "rebate",
  ACT: "activity",
  CNLFEE: "xnl fee",
  FEE: "fee",
  CHN: "change",
  TOUR: "tour",
  ADJMNT: "adjustment",
  CREDIT: "travel credit",
  RAIL: "rail",
  MISC: "misc",
};

const supplierOpts = {
  PICASSO: "PIC",
  EXPEDIA: "EXP",
  KAYAK: "KYK",
  ORBITZ4AGENTS: "ORB",
  ALLABOUT: "ALL",
  UNITEDTOURS: "UAT",
  USVACS: "USV",
  VACSEX: "VEX",
  PLEASANT: "PLS",
  AAGROUP: "AAG",
  PRINCESS: "PRC",
  RUSHAWAII: "RHW",
  JETBLUE: "JTB",
  DELTA: "DAL",
  AIRFARE: "AFR",
  ORBITZ: "ORB",
  VAYAMA: "VAY",
  HAL: "HAL",
  JUSTFLY: "JST",
  BEDS: "BED",
  TPI: "TPI",
  GOGO: "GOG",
};

export function getSupplierOpts() {
  return supplierOpts;
}

export function getTvlTypeOpts() {
  return tvlTypeOpts;
}
