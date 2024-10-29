"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const getTxn_1 = require("../utils/getTxn");
let BalanceService = class BalanceService {
    constructor(configService) {
        this.configService = configService;
        this.apiKey = this.configService.get('ALCHEMY_API_KEY');
        if (!this.apiKey) {
            throw new Error('Alchemy API key is missing');
        }
        console.log('apiKey:', this.apiKey);
    }
    async getTxn(userAddress, tokenAddress) {
        const token = tokenAddress || '0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC';
        const user = userAddress || '0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac';
        const { balanceArray, reward } = await (0, getTxn_1.getTxn)(token, user, this.apiKey);
        console.log('balanceArray', balanceArray, '\nreward', reward);
        return balanceArray;
    }
};
exports.BalanceService = BalanceService;
exports.BalanceService = BalanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], BalanceService);
//# sourceMappingURL=balance.service.js.map