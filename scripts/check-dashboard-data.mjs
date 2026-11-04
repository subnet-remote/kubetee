import { readFileSync } from "node:fs";

const DATA_URL = new URL("../src/data/dashboard.json", import.meta.url);
const PUBLIC_DATA_URL = new URL("../public/dashboard.json", import.meta.url);
const DAY_MS = 86_400_000;
const WINDOW_DAYS = 30;

const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function isIso(value) {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

function dayKey(iso) {
  return new Date(iso).toISOString().slice(0, 10);
}

function dayStart(key) {
  return Date.parse(`${key}T00:00:00.000Z`);
}

function shiftDay(key, days) {
  return new Date(dayStart(key) + days * DAY_MS).toISOString().slice(0, 10);
}

function usd(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function alpha(value) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
}

function tao(value) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
}

function buildWindow(fills, endKey) {
  const startKey = shiftDay(endKey, -(WINDOW_DAYS - 1));
  const start = dayStart(startKey);
  const buckets = new Map();

  for (let index = 0; index < WINDOW_DAYS; index += 1) {
    const key = new Date(start + index * DAY_MS).toISOString().slice(0, 10);
    buckets.set(key, { usd: 0, fills: 0, sn28: 0, sn90: 0, tao: 0 });
  }

  for (const fill of fills) {
    const key = dayKey(fill.ts);
    const bucket = buckets.get(key);
    if (!bucket) continue;
    bucket.usd += fill.usdValue ?? 0;
    bucket.fills += 1;
    bucket.sn28 += fill.sn28Alpha;
    bucket.sn90 += fill.sn90Alpha;
    bucket.tao += fill.taoValue;
  }

  const points = [...buckets.entries()].map(([date, bucket]) => ({
    date,
    ...bucket,
  }));
  const totalUsd = points.reduce((sum, point) => sum + point.usd, 0);
  const fillsCount = points.reduce((sum, point) => sum + point.fills, 0);
  const activeDays = points.filter((point) => point.fills > 0).length;
  const peak = points.reduce(
    (best, point) =>
      point.usd > 0 && (best === null || point.usd > best.usd) ? point : best,
    null,
  );

  return {
    start: startKey,
    end: endKey,
    points,
    totalUsd,
    fills: fillsCount,
    activeDays,
    peak,
    sn28: points.reduce((sum, point) => sum + point.sn28, 0),
    sn90: points.reduce((sum, point) => sum + point.sn90, 0),
    tao: points.reduce((sum, point) => sum + point.tao, 0),
  };
}

let raw;
try {
  raw = JSON.parse(readFileSync(DATA_URL, "utf8"));
} catch (error) {
  console.error(
    `dashboard:check: cannot read dashboard.json: ${error.message}`,
  );
  process.exit(1);
}

if (!isIso(raw.generatedAt)) fail("generatedAt is not a valid ISO timestamp");
if (typeof raw.coldkey !== "string" || raw.coldkey.length === 0) {
  fail("coldkey is missing");
}
if (!raw.recycle || !Array.isArray(raw.recycle.fills)) {
  fail("recycle.fills is not an array");
}
if (!raw.recycle?.totals || typeof raw.recycle.totals !== "object") {
  fail("recycle.totals is missing");
}
if (!raw.sn28 || !Array.isArray(raw.sn28.hotkeys)) {
  fail("sn28.hotkeys is not an array");
}
if (!Number.isInteger(raw.sn28?.count) || raw.sn28.count <= 0) {
  fail("sn28.count is not a positive integer");
}

const fills = Array.isArray(raw.recycle?.fills) ? raw.recycle.fills : [];
const seenExtrinsics = new Set();

for (const [index, fill] of fills.entries()) {
  const label = `fills[${index}]`;

  if (!isIso(fill.ts)) fail(`${label}.ts is not a valid ISO timestamp`);
  if (!Number.isInteger(fill.block) || fill.block <= 0) {
    fail(`${label}.block is not a positive integer`);
  }
  if (typeof fill.extrinsic !== "string" || fill.extrinsic.length === 0) {
    fail(`${label}.extrinsic is missing`);
  } else if (seenExtrinsics.has(fill.extrinsic)) {
    fail(`${label}.extrinsic is duplicated: ${fill.extrinsic}`);
  } else {
    seenExtrinsics.add(fill.extrinsic);
  }
  if (!isFiniteNumber(fill.sn28Alpha) || fill.sn28Alpha <= 0) {
    fail(`${label}.sn28Alpha is not a positive number`);
  }
  if (!isFiniteNumber(fill.sn90Alpha) || fill.sn90Alpha <= 0) {
    fail(`${label}.sn90Alpha is not a positive number`);
  }
  if (!isFiniteNumber(fill.taoValue) || fill.taoValue <= 0) {
    fail(`${label}.taoValue is not a positive number`);
  }
  if (
    fill.usdValue !== null &&
    (!isFiniteNumber(fill.usdValue) || fill.usdValue < 0)
  ) {
    fail(`${label}.usdValue is not a non-negative number or null`);
  }
  if (typeof fill.link !== "string" || !fill.link.includes(fill.extrinsic)) {
    fail(`${label}.link does not reference its extrinsic`);
  }
}

for (let index = 1; index < fills.length; index += 1) {
  if (Date.parse(fills[index - 1].ts) < Date.parse(fills[index].ts)) {
    fail("recycle.fills is not sorted newest first");
    break;
  }
}

try {
  const publicRaw = readFileSync(PUBLIC_DATA_URL, "utf8");
  if (JSON.stringify(JSON.parse(publicRaw)) !== JSON.stringify(raw)) {
    fail(
      "public/dashboard.json does not match src/data/dashboard.json; rerun pnpm dashboard:data",
    );
  }
} catch (error) {
  fail(
    `cannot read public/dashboard.json (${error.message}); rerun pnpm dashboard:data`,
  );
}

if (errors.length === 0) {
  const latest = fills[0];
  const oldest = fills[fills.length - 1];

  if (Date.parse(raw.generatedAt) < Date.parse(latest.ts)) {
    fail("generatedAt is older than the newest fill");
  }

  const generatedGapHours =
    (Date.parse(raw.generatedAt) - Date.parse(latest.ts)) / 3_600_000;
  if (generatedGapHours > 36) {
    warn(
      `generatedAt is ${generatedGapHours.toFixed(1)}h after the newest fill; check the refresh pipeline`,
    );
  }

  const totals = fills.reduce(
    (acc, fill) => ({
      sn28Alpha: acc.sn28Alpha + fill.sn28Alpha,
      sn90Alpha: acc.sn90Alpha + fill.sn90Alpha,
      taoValue: acc.taoValue + fill.taoValue,
      usdValue: acc.usdValue + (fill.usdValue ?? 0),
      count: acc.count + 1,
    }),
    { sn28Alpha: 0, sn90Alpha: 0, taoValue: 0, usdValue: 0, count: 0 },
  );

  const published = raw.recycle.totals;
  if (published.count !== totals.count) {
    fail(
      `totals.count ${published.count} does not match ${totals.count} fills`,
    );
  }
  if (Math.abs(published.sn28Alpha - totals.sn28Alpha) > 1e-6) {
    fail("totals.sn28Alpha does not match the sum of fills");
  }
  if (Math.abs(published.sn90Alpha - totals.sn90Alpha) > 1e-6) {
    fail("totals.sn90Alpha does not match the sum of fills");
  }
  if (Math.abs(published.taoValue - totals.taoValue) > 1e-6) {
    fail("totals.taoValue does not match the sum of fills");
  }
  if (Math.abs(published.usdValue - totals.usdValue) > 0.01) {
    fail("totals.usdValue does not match the sum of fills");
  }

  const miner = raw.sn28.hotkeys.find((row) => row.isKubeTEE);
  if (!miner) {
    fail("no isKubeTEE miner in sn28.hotkeys");
  } else {
    if (
      !isFiniteNumber(miner.incentive) ||
      miner.incentive < 0 ||
      miner.incentive > 1
    ) {
      fail("miner.incentive is not a fraction between 0 and 1");
    }
    if (!Number.isInteger(miner.uid)) fail("miner.uid is not an integer");
    if (typeof miner.hotkey !== "string" || miner.hotkey.length === 0) {
      fail("miner.hotkey is missing");
    }
    if (typeof miner.link !== "string" || miner.link.length === 0) {
      fail("miner.link is missing");
    }
  }

  const latestKey = dayKey(latest.ts);
  const oldestKey = dayKey(oldest.ts);
  const spanDays =
    Math.round((dayStart(latestKey) - dayStart(oldestKey)) / DAY_MS) + 1;
  const activeDays = new Set(fills.map((fill) => dayKey(fill.ts))).size;
  const usdMissing = fills.filter((fill) => fill.usdValue == null).length;
  const window = buildWindow(fills, latestKey);
  const previous = buildWindow(fills, shiftDay(window.start, -1));
  const deltaPct =
    previous.totalUsd > 0
      ? ((window.totalUsd - previous.totalUsd) / previous.totalUsd) * 100
      : null;

  console.log("dashboard:check");
  console.log(`  generatedAt       ${raw.generatedAt}`);
  console.log(`  newest fill       ${latest.ts}`);
  console.log(`  oldest fill       ${oldest.ts}`);
  console.log(`  fills             ${fills.length}`);
  console.log(`  span              ${spanDays} days`);
  console.log(`  active days       ${activeDays} of ${spanDays}`);
  console.log(
    `  all-time          ${usd(totals.usdValue)} · ${alpha(totals.sn28Alpha)} SN28 α · ${alpha(totals.sn90Alpha)} SN90 α · ${tao(totals.taoValue)} TAO`,
  );
  console.log(
    `  30-day window     ${window.start} → ${window.end} · ${usd(window.totalUsd)} · ${window.fills} fills · ${window.activeDays} active days`,
  );
  console.log(
    `  previous window   ${previous.start} → ${previous.end} · ${usd(previous.totalUsd)} · ${previous.fills} fills`,
  );
  console.log(
    `  delta             ${deltaPct == null ? "—" : `${deltaPct >= 0 ? "+" : ""}${deltaPct.toFixed(1)}%`}`,
  );
  console.log(
    `  peak              ${window.peak ? `${usd(window.peak.usd)} on ${window.peak.date}` : "—"}`,
  );
  console.log(`  missing USD       ${usdMissing}`);
  console.log(
    `  miner             UID ${miner?.uid ?? "—"} · incentive ${miner ? (miner.incentive * 100).toFixed(2) : "—"}% · ${raw.sn28.hotkeys.length} published row(s) of ${raw.sn28.count} hotkeys`,
  );
  console.log(
    `  window α/TAO      ${alpha(window.sn28)} SN28 α · ${alpha(window.sn90)} SN90 α · ${tao(window.tao)} TAO`,
  );

  if (usdMissing > 0) {
    warn(`${usdMissing} fill(s) have no USD value; USD totals exclude them`);
  }
}

for (const message of warnings)
  console.warn(`dashboard:check: warning: ${message}`);

if (errors.length > 0) {
  for (const message of errors) console.error(`dashboard:check: ${message}`);
  process.exit(1);
}

console.log("dashboard:check: ok");
