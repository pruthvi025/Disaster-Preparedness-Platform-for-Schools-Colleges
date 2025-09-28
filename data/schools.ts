export type SchoolEntry = {
  zone: "Zone-1" | "Zone-2" | "Zone-3" | "Zone-4";
  district: string;
  udiseCode: string;
  schoolName: string;
  schoolCategory: string;
};

export const schools: SchoolEntry[] = [
  // Zone-1 (10)
  { zone: "Zone-1", district: "Amritsar", udiseCode: "3020810702", schoolName: "GHS KALA", schoolCategory: "High School" },
  { zone: "Zone-1", district: "Amritsar", udiseCode: "3020810801", schoolName: "GHS MAHAL RMSA UPGRADED", schoolCategory: "High School" },
  { zone: "Zone-1", district: "Amritsar", udiseCode: "3020801003", schoolName: "GHS BHAGTA WALA G", schoolCategory: "High School" },
  { zone: "Zone-1", district: "Amritsar", udiseCode: "3020800702", schoolName: "GHS DOBURJI LUBANA", schoolCategory: "High School" },
  { zone: "Zone-1", district: "Amritsar", udiseCode: "3020802402", schoolName: "GHS LACHHMANSAR", schoolCategory: "High School" },
  { zone: "Zone-1", district: "Amritsar", udiseCode: "3020804602", schoolName: "GHS SHARIFPURA", schoolCategory: "High School" },
  { zone: "Zone-1", district: "Amritsar", udiseCode: "3020801803", schoolName: "GHS SULTANWIND B", schoolCategory: "High School" },
  { zone: "Zone-1", district: "Amritsar", udiseCode: "3020804702", schoolName: "GHS GANDA SINGH WALA", schoolCategory: "High School" },
  { zone: "Zone-1", district: "Amritsar", udiseCode: "3020805702", schoolName: "GHS MAQBOOLPURA", schoolCategory: "High School" },
  { zone: "Zone-1", district: "Amritsar", udiseCode: "3020806202", schoolName: "GHS NANGLI", schoolCategory: "High School" },

  // Zone-2 (10)
  { zone: "Zone-2", district: "Amritsar", udiseCode: "3020409701", schoolName: "GHS MEHARBAN PURA", schoolCategory: "High School" },
  { zone: "Zone-2", district: "Amritsar", udiseCode: "3020812702", schoolName: "GHS KHAPER KHERI", schoolCategory: "High School" },
  { zone: "Zone-2", district: "Amritsar", udiseCode: "3020812102", schoolName: "GHS MUDHAL", schoolCategory: "High School" },
  { zone: "Zone-2", district: "Amritsar", udiseCode: "3020402702", schoolName: "GHS CHATTIWIND", schoolCategory: "High School" },
  { zone: "Zone-2", district: "Amritsar", udiseCode: "3020401402", schoolName: "GHS CHHAPA RAM SINGH", schoolCategory: "High School" },
  { zone: "Zone-2", district: "Amritsar", udiseCode: "3020402202", schoolName: "GHS GURUWALI", schoolCategory: "High School" },
  { zone: "Zone-2", district: "Amritsar", udiseCode: "3020400702", schoolName: "GHS MEHMA", schoolCategory: "High School" },
  { zone: "Zone-2", district: "Amritsar", udiseCode: "3020401102", schoolName: "GHS QILA JIWAN SINGH", schoolCategory: "High School" },
  { zone: "Zone-2", district: "Amritsar", udiseCode: "3020400802", schoolName: "GHS MAKHAN WINDI", schoolCategory: "High School" },
  { zone: "Zone-2", district: "Amritsar", udiseCode: "3020806902", schoolName: "GHS PANDORI WARAICH", schoolCategory: "High School" },

  // Zone-3 (10)
  { zone: "Zone-3", district: "Amritsar", udiseCode: "3020101202", schoolName: "GHS DHARIWAL KALER RMSA UPGRADED", schoolCategory: "High School" },
  { zone: "Zone-3", district: "Amritsar", udiseCode: "3020109002", schoolName: "GHS LAKHUWAL", schoolCategory: "High School" },
  { zone: "Zone-3", district: "Gurdaspur", udiseCode: "3010709001", schoolName: "GPS BASSARPUR", schoolCategory: "Primary School" },
  { zone: "Zone-3", district: "Gurdaspur", udiseCode: "3010707601", schoolName: "GPS BAULI INDERJIT", schoolCategory: "Primary School" },
  { zone: "Zone-3", district: "Gurdaspur", udiseCode: "3010707401", schoolName: "GPS BODE DI KHUHI", schoolCategory: "Primary School" },
  { zone: "Zone-3", district: "Gurdaspur", udiseCode: "3010708101", schoolName: "GPS BRANCH NO. I Batala", schoolCategory: "Primary School" },
  { zone: "Zone-3", district: "Gurdaspur", udiseCode: "3010706601", schoolName: "GPS BRANCH NO. II Batala", schoolCategory: "Primary School" },
  { zone: "Zone-3", district: "Gurdaspur", udiseCode: "3010708001", schoolName: "GPS BRANCH NO. III Batala", schoolCategory: "Primary School" },
  { zone: "Zone-3", district: "Gurdaspur", udiseCode: "3010708201", schoolName: "GPS BRANCH NO. V Batala", schoolCategory: "Primary School" },
  { zone: "Zone-3", district: "Gurdaspur", udiseCode: "3010706301", schoolName: "GPS BRANCH NO. VI Batala", schoolCategory: "Primary School" },

  // Zone-4 (10)
  { zone: "Zone-4", district: "Amritsar", udiseCode: "3020704001", schoolName: "GPS KOHALA", schoolCategory: "Primary School" },
  { zone: "Zone-4", district: "Amritsar", udiseCode: "3020609101", schoolName: "GPS MALIK NANGAL", schoolCategory: "Primary School" },
  { zone: "Zone-4", district: "Amritsar", udiseCode: "3020707201", schoolName: "GPS NAWAN TANEL", schoolCategory: "Primary School" },
  { zone: "Zone-4", district: "Amritsar", udiseCode: "3020703301", schoolName: "GPS SAIDO LEHEL", schoolCategory: "Primary School" },
  { zone: "Zone-4", district: "Amritsar", udiseCode: "3020706801", schoolName: "GPS SUROPADDA", schoolCategory: "Primary School" },
  { zone: "Zone-4", district: "Amritsar", udiseCode: "3020708001", schoolName: "GPS TARFAN SSA UPGRADED", schoolCategory: "Primary School" },
  { zone: "Zone-4", district: "Amritsar", udiseCode: "3020902601", schoolName: "GPS JHANJARPUR", schoolCategory: "Primary School" },
  { zone: "Zone-4", district: "Amritsar", udiseCode: "3020113001", schoolName: "GPS AWAN", schoolCategory: "Primary School" },
  { zone: "Zone-4", district: "Amritsar", udiseCode: "3020111701", schoolName: "GPS BHUTANPURA (Ramdas)", schoolCategory: "Primary School" },
  { zone: "Zone-4", district: "Amritsar", udiseCode: "3020107501", schoolName: "GPS DYAL BHATTI", schoolCategory: "Primary School" }
];

// Derived helpers used by UI components
export function listZones(): string[] {
  const zoneSet = new Set<string>();
  for (const entry of schools) zoneSet.add(entry.zone);
  return Array.from(zoneSet).sort();
}

export function listDistricts(zone: string): string[] {
  const districtSet = new Set<string>();
  for (const entry of schools) if (entry.zone === zone) districtSet.add(entry.district);
  return Array.from(districtSet).sort();
}

export function listSchools(district: string): { udiseCode: string; schoolName: string; schoolCategory: string }[] {
  return schools
    .filter((s) => s.district === district)
    .map(({ udiseCode, schoolName, schoolCategory }) => ({ udiseCode, schoolName, schoolCategory }))
    .sort((a, b) => a.schoolName.localeCompare(b.schoolName));
}

