"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mcuLink = void 0;
var _data;
var _getInterval = 0;
var request = function (url, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("http://localhost:3033/api/data")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                _data = _a.sent();
                callback === null || callback === void 0 ? void 0 : callback(_data);
                return [2 /*return*/];
        }
    });
}); };
exports.mcuLink = {
    start: function (callback) {
        stop();
        _getInterval = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                request("http://localhost:3033/api/data", callback);
                return [2 /*return*/];
            });
        }); }, 1000);
    },
    stop: function () {
        clearInterval(_getInterval);
    },
    requestData: function (callback) {
        request("http://localhost:3033/api/data", callback);
        return _data;
    },
    mcuData: function () {
        return _data;
    },
    ledGet: function (id) {
        return _data.leds[id];
    },
    pswGet: function (id) {
        return _data.psws[id];
    },
    adcGet: function (id) {
        return _data.adcs[id];
    },
    // app.get('/api/:tag/:id/:act', async (req, res)
    ledOn: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3033/api/led/".concat(id, "/on"))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    ledOff: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3033/api/led/".concat(id, "/off"))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    ledInv: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3033/api/led/".concat(id, "/inv"))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    /**
     *
     * @param interval Beep interval in milliseconds.
     * @param frequency Beep frequency in Hertz.
     * @param percentPower Beep power 0 - 100 (percent).
     */
    beep: function (interval, frequency, percentPower) { return __awaiter(void 0, void 0, void 0, function () {
        var audioContext, gainNode, oscillator;
        return __generator(this, function (_a) {
            audioContext = new AudioContext();
            gainNode = audioContext.createGain();
            gainNode.connect(audioContext.destination);
            gainNode.gain.value = Math.max(0, Math.min(1, percentPower / 100));
            oscillator = audioContext.createOscillator();
            oscillator.connect(gainNode);
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Frequency of 440Hz (A4)
            oscillator.type = 'sine'; // can be 'sine', 'square', 'triangle', or 'sawtooth'
            oscillator.start();
            setTimeout(function () {
                oscillator.stop();
            }, interval);
            return [2 /*return*/];
        });
    }); },
    timeGet: function () {
        var zp2 = function (x) { return (x < 10 ? "0".concat(x) : "".concat(x)); };
        var zp3 = function (x) { return (x < 100 ? "00".concat(x) : x < 10 ? "0".concat(x) : "".concat(x)); };
        var d = new Date();
        return "".concat(zp2(d.getHours()), ":").concat(zp2(d.getMinutes()), ":").concat(zp2(d.getSeconds()), ".").concat(zp3(d.getMilliseconds()));
    }
};
