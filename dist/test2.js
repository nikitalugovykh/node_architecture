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
exports.C = void 0;
require("reflect-metadata");
function Test(target) {
    Reflect.defineMetadata('a', 1, target);
    const meta = Reflect.getMetadata('a', target);
    console.log({ meta });
}
function Prop(target, name) {
}
let C = class C {
};
__decorate([
    Prop,
    __metadata("design:type", Number)
], C.prototype, "props", void 0);
C = __decorate([
    Test
], C);
exports.C = C;
