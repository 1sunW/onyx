import { openDB, IDBPDatabase } from "idb";
import { ScramjetDB } from "@/types";

const DB_NAME = "$scramjet";
const DB_VERSION = 2;

const REQUIRED_STORES = [
	"config",
	"cookies",
	"redirectTrackers",
	"referrerPolicies",
	"publicSuffixList",
] as const;

export async function openScramjetDB(): Promise<IDBPDatabase<ScramjetDB>> {
	return openDB<ScramjetDB>(DB_NAME, DB_VERSION, {
		upgrade(db) {
			for (const store of REQUIRED_STORES) {
				if (!db.objectStoreNames.contains(store)) {
					db.createObjectStore(store);
				}
			}
		},
	});
}

