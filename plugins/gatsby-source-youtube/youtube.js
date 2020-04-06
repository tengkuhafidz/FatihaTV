"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var axios_1 = require("axios");
var Youtube = /** @class */ (function () {
    function Youtube(apiKey) {
        var _this = this;
        this.BASE_URL = "https://www.googleapis.com/youtube/v3/";
        this.url = function (service, part, params) {
            var paramString = Object.keys(params)
                .map(function (key) {
                return "&" + key + "=" + params[key];
            })
                .join("");
            return (_this.BASE_URL +
                service +
                "?key=" +
                _this.API_KEY +
                "&part=" +
                part.join(",") +
                paramString);
        };
        this.usedQuota = 0;
        this.getChannel = function (channelId) { return __awaiter(_this, void 0, void 0, function () {
            var part, cost, params, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        part = [
                            // "auditDetails", //4 - Requires special perms
                            // "contentDetails", //2
                            // "brandingSettings", //2
                            // "contentOwnerDetails", //2
                            "id",
                            // "localizations", //2
                            "snippet",
                        ];
                        cost = 2;
                        params = {
                            id: channelId,
                            maxResults: "50"
                        };
                        return [4 /*yield*/, axios_1["default"].get(this.url("channels", part, params))];
                    case 1:
                        res = _a.sent();
                        this.usedQuota += cost;
                        return [2 /*return*/, res.data.items];
                }
            });
        }); };
        this.getChannelPlaylists = function (channelId) { return __awaiter(_this, void 0, void 0, function () {
            var part, cost, params, res, playlists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        part = [
                            // "contentDetails", //2,
                            "id",
                            // "localizations", //2,
                            // "player", //0,
                            "snippet",
                        ];
                        cost = 2;
                        params = {
                            channelId: channelId,
                            maxResults: "50"
                        };
                        return [4 /*yield*/, axios_1["default"].get(this.url("playlists", part, params))];
                    case 1:
                        res = _a.sent();
                        this.usedQuota += cost;
                        playlists = res.data.items;
                        _a.label = 2;
                    case 2:
                        if (!res.data.nextPageToken) return [3 /*break*/, 4];
                        return [4 /*yield*/, axios_1["default"].get(this.url("playlists", part, __assign(__assign({}, params), { pageToken: res.data.nextPageToken })))];
                    case 3:
                        res = _a.sent();
                        this.usedQuota += cost;
                        playlists = __spreadArrays(playlists, res.data.items);
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/, playlists];
                }
            });
        }); };
        this.getPlaylistVideos = function (playlistId) { return __awaiter(_this, void 0, void 0, function () {
            var part, cost, params, res, videos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        part = [
                            // "contentDetails", //2,
                            "id",
                            "snippet",
                        ];
                        cost = 2;
                        params = {
                            playlistId: playlistId,
                            maxResults: "50"
                        };
                        return [4 /*yield*/, axios_1["default"].get(this.url("playlistItems", part, params))];
                    case 1:
                        res = _a.sent();
                        this.usedQuota += cost;
                        videos = res.data.items;
                        _a.label = 2;
                    case 2:
                        if (!res.data.nextPageToken) return [3 /*break*/, 4];
                        return [4 /*yield*/, axios_1["default"].get(this.url("playlistItems", part, __assign(__assign({}, params), { pageToken: res.data.nextPageToken })))];
                    case 3:
                        res = _a.sent();
                        this.usedQuota += cost;
                        videos = __spreadArrays(videos, res.data.items);
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/, videos];
                }
            });
        }); };
        this.API_KEY = apiKey;
    }
    return Youtube;
}());
exports.Youtube = Youtube;
// (async (): Promise<void> => {
//   const yt = new Youtube();
//   await Promise.all([
//     yt.getChannel("UCnqD9EhaRuKIhHY_pHPyxcA"),
//     yt.getChannelPlaylists("UCnqD9EhaRuKIhHY_pHPyxcA"),
//     yt.getPlaylistVideos("PLoBuEb7Cp3UPmrc4IqSU_N68sNELPFAjh"),
//   ]);
//   console.log(yt.usedQuota);
// })();
// const yt = new Youtube();
// (async (): Promise<void> => {
//   console.log(await yt.getChannel("UCnqD9EhaRuKIhHY_pHPyxcA"));
// })();
// (async (): Promise<void> => {
//   console.log(await yt.getChannelPlaylists("UCnqD9EhaRuKIhHY_pHPyxcA"));
// })();
// (async (): Promise<void> => {
//   console.log(await yt.getPlaylistVideos("PLoBuEb7Cp3UPmrc4IqSU_N68sNELPFAjh"));
// })();
