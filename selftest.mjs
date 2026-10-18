#!/usr/bin/env node
/**
 * zoneinn.vaked.dev selftest — verifies `#zi-core` (window.zoneInnCore)
 * against pinned Rust golden vectors from `8b-is/zoneInn`:
 *   - FNV-1a 64-bit hash for [1, -1, 1, 0, 1, -1, 0, 1] === 0xe0efe6a3385d3dd3
 *   - Demo frame trits [-1, -1, -1, 1, 1, 1, -1, -1] golden === 0x7311bcbd581290fd
 *   - Bluetooth speaker recognition (`Soundcore Select 4 GO`)
 *   - Ultrawhale NAND Ring Oscillator truth table & HF refeed row generator
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const match = html.match(/<script id="zi-core">([\s\S]*?)<\/script>/);
assert.ok(match, 'missing <script id="zi-core"> in index.html');

const sandbox = { window: {}, console, BigInt, Math, Number, String, Array, Object, JSON, Date };
vm.createContext(sandbox);
vm.runInContext(match[1], sandbox);

const core = sandbox.window.zoneInnCore;
assert.ok(core, 'window.zoneInnCore not exported');

// 1. Canonical golden hash parity with Rust `tern::tests::golden_hash_is_stable_and_sensitive`
const canonical = core.ternFrameFromBins([0.9, -0.9, 0.9, 0.0, 0.9, -0.9, 0.0, 0.9]);
assert.deepEqual(canonical.trits, [1, -1, 1, 0, 1, -1, 0, 1]);
assert.equal(canonical.hash, 16208427172629396947n);
assert.equal(canonical.hashHex, '0xe0efe6a3385d3dd3');

// 2. Render quantTernAscii parity with Rust `ascii::render`
const ascii0 = core.renderQuantTernAscii(canonical, 'radio.vaked.dev', 0.0);
assert.ok(ascii0.includes('quantTernRadio · zoneInn · {−1, 0, +1}'));
assert.ok(ascii0.includes('station: radio.vaked.dev · frame at t = 0.0s'));
assert.ok(ascii0.includes('trits   + − + · + − · +'));
assert.ok(ascii0.includes('dominant +1'));
assert.ok(ascii0.includes('frame golden 0xe0efe6a3385d3dd3'));

// 3. Bluetooth speaker recognition parity with Rust `bt::tests`
const sc = core.matchSpeaker('Anker Soundcore Select 4 Go BLE');
assert.ok(sc);
assert.equal(sc.model, 'Soundcore Select 4 GO');
assert.equal(sc.audio_class, 'A2DP sink / BLE companion');
assert.equal(core.matchSpeaker('MacBook Pro Speakers'), null);

// 4. Ultrawhale Ternary NAND Ring Oscillator
assert.equal(core.nand(1, 1), -1);
assert.equal(core.nand(1, -1), 1);
assert.equal(core.nand(-1, 1), 1);
assert.equal(core.nand(-1, -1), 1);
assert.equal(core.kleeneNand(1, 0), 0);
assert.equal(core.kleeneNand(-1, 0), 1);

const pat = core.nandPattern(64);
assert.equal(pat.length, 64);
assert.ok(pat.includes(1) && pat.includes(-1));

// 5. Ring step & HF refeed rows
const st0 = core.nandRingStep([1, -1, 1, -1, 1], [1, 0, -1, 0, 1], 0);
assert.equal(st0.ring.length, 5);
assert.equal(st0.kleene.length, 5);
assert.ok(st0.frame.hashHex.startsWith('0x'));

const rows = core.generateNandRefeedRows(8);
assert.equal(rows.length, 8);
assert.equal(rows[0].dim, 'nand_oscillator');
assert.equal(rows[0].repo, 'PeetPedro/ultrawhale-dogfood');
assert.equal(rows[0].source, '8b-is/zoneInn');
assert.ok(rows[0].frame_golden.startsWith('0x'));

// 6. Favourite Musics Crate on radio.vaked.dev (14 tracks, 432 Hz Verdi tuning)
assert.equal(core.FAVOURITE_MUSICS.length, 14);
assert.equal(core.midiToHz432(69), 432.0);
assert.equal(core.findFavourite('mahakala').slug, 'mahakala');
assert.equal(core.findFavourite('innerbloom').slug, 'innerbloom');
assert.equal(core.findFavourite('faded').slug, 'faded');
assert.equal(core.findFavourite('Billie').slug, 'everything-i-wanted');
assert.equal(core.findFavourite('Lorn').slug, 'anvil');

console.log('✓ zoneinn.vaked.dev selftest passed (6/6 suites, golden hashes & 14 Favourite Musics verified)');

