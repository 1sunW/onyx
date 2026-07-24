import { ScramjetConfig, ScramjetFlags } from "@/types";

export * from "./cookie";
export * from "./headers";
export * from "./htmlRules";
export * from "./rewriters";
export * from "./security";
export * from "./db";

export let codecEncode: (input: string) => string;
export let codecDecode: (input: string) => string;

const nativeFunction = Function;
export function loadCodecs() {
	codecEncode = nativeFunction(`return ${config.codec.encode}`)() as any;
	codecDecode = nativeFunction(`return ${config.codec.decode}`)() as any;
}

export function flagEnabled(flag: keyof ScramjetFlags, url: URL): boolean {
	const value = config.flags[flag];
	for (const regex in config.siteFlags) {
		const partialflags = config.siteFlags[regex];
		if (new RegExp(regex).test(url.href) && flag in partialflags) {
			return partialflags[flag];
		}
	}

	return value;
}

export const defaultConfig: ScramjetConfig = {
	prefix: "/scramjet/",
	globals: {
		wrapfn: "$scramjet$wrap",
		wrappropertybase: "$scramjet__",
		wrappropertyfn: "$scramjet$prop",
		cleanrestfn: "$scramjet$clean",
		importfn: "$scramjet$import",
		rewritefn: "$scramjet$rewrite",
		metafn: "$scramjet$meta",
		setrealmfn: "$scramjet$setrealm",
		pushsourcemapfn: "$scramjet$pushsourcemap",
		trysetfn: "$scramjet$tryset",
		templocid: "$scramjet$temploc",
		tempunusedid: "$scramjet$tempunused",
	},
	files: {
		wasm: "/scram/scramjet.wasm.wasm",
		all: "/scram/scramjet.all.js",
		sync: "/scram/scramjet.sync.js",
	},
	flags: {
		serviceworkers: false,
		syncxhr: false,
		strictRewrites: true,
		rewriterLogs: false,
		captureErrors: true,
		cleanErrors: false,
		scramitize: false,
		sourcemaps: true,
		destructureRewrites: false,
		interceptDownloads: false,
		allowInvalidJs: true,
		allowFailedIntercepts: true,
	},
	siteFlags: {},
	codec: {
		encode: "((url) => { if (!url) return url; return encodeURIComponent(url); })",
		decode: "((url) => { if (!url) return url; return decodeURIComponent(url); })",
	},
};

export let config: ScramjetConfig = defaultConfig;
loadCodecs();

export function setConfig(newConfig: ScramjetConfig) {
	config = newConfig;
	loadCodecs();
}
