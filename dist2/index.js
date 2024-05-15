/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 902:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResultDetails = exports.RuleResult = exports.ScanResult = exports.Compiler = exports.Flow = exports.FlowResource = exports.FlowVariable = exports.FlowType = exports.FlowNode = exports.FlowElement = exports.FlowAttribute = void 0;
const Compiler_1 = __nccwpck_require__(450);
Object.defineProperty(exports, "Compiler", ({ enumerable: true, get: function () { return Compiler_1.Compiler; } }));
const Flow_1 = __nccwpck_require__(877);
Object.defineProperty(exports, "Flow", ({ enumerable: true, get: function () { return Flow_1.Flow; } }));
const FlowAttribute_1 = __nccwpck_require__(80);
Object.defineProperty(exports, "FlowAttribute", ({ enumerable: true, get: function () { return FlowAttribute_1.FlowAttribute; } }));
const FlowElement_1 = __nccwpck_require__(930);
Object.defineProperty(exports, "FlowElement", ({ enumerable: true, get: function () { return FlowElement_1.FlowElement; } }));
const FlowType_1 = __nccwpck_require__(929);
Object.defineProperty(exports, "FlowType", ({ enumerable: true, get: function () { return FlowType_1.FlowType; } }));
const FlowNode_1 = __nccwpck_require__(360);
Object.defineProperty(exports, "FlowNode", ({ enumerable: true, get: function () { return FlowNode_1.FlowNode; } }));
const FlowResource_1 = __nccwpck_require__(526);
Object.defineProperty(exports, "FlowResource", ({ enumerable: true, get: function () { return FlowResource_1.FlowResource; } }));
const FlowVariable_1 = __nccwpck_require__(455);
Object.defineProperty(exports, "FlowVariable", ({ enumerable: true, get: function () { return FlowVariable_1.FlowVariable; } }));
const ResultDetails_1 = __nccwpck_require__(995);
Object.defineProperty(exports, "ResultDetails", ({ enumerable: true, get: function () { return ResultDetails_1.ResultDetails; } }));
const RuleResult_1 = __nccwpck_require__(379);
Object.defineProperty(exports, "RuleResult", ({ enumerable: true, get: function () { return RuleResult_1.RuleResult; } }));
const ScanResult_1 = __nccwpck_require__(992);
Object.defineProperty(exports, "ScanResult", ({ enumerable: true, get: function () { return ScanResult_1.ScanResult; } }));
//# sourceMappingURL=internals.js.map

/***/ }),

/***/ 727:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BuildFlow = void 0;
const ConvertFlowNodes_1 = __nccwpck_require__(392);
function BuildFlow(nodesToMerge) {
    let res = {};
    for (const nodeToMerge of nodesToMerge) {
        const subtype = nodeToMerge.subtype;
        const nodesOfType = nodesToMerge.filter(node => subtype === node.subtype);
        res = (0, ConvertFlowNodes_1.convertFlowNodes)(res, nodesOfType, subtype);
    }
    return res;
}
exports.BuildFlow = BuildFlow;
//# sourceMappingURL=BuildFlow.js.map

/***/ }),

/***/ 450:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Compiler = void 0;
const FlowNode_1 = __nccwpck_require__(360);
class Compiler {
    constructor() {
        this.visitedElements = new Set();
    }
    traverseFlow(flow, startElementName, visitCallback, endElementName) {
        // Iterative Deepening Depth-First Search (IDDFS)
        let elementsToVisit = [startElementName];
        while (elementsToVisit.length > 0) {
            const nextElements = [];
            for (const elementName of elementsToVisit) {
                if (!this.visitedElements.has(elementName)) {
                    const currentElement = flow.elements.find(element => element instanceof FlowNode_1.FlowNode && element.name === elementName);
                    if (currentElement) {
                        visitCallback(currentElement);
                        this.visitedElements.add(elementName);
                        nextElements.push(...this.findNextElements(flow, currentElement, endElementName));
                    }
                }
            }
            if (nextElements.length === 0) { // If no more next elements
                break; // Terminate the traversal
            }
            elementsToVisit = nextElements;
        }
    }
    findNextElements(flow, currentElement, endElementName) {
        const nextElements = [];
        if (currentElement.connectors && currentElement.connectors.length > 0) {
            for (const connector of currentElement.connectors) {
                if (connector.reference) {
                    // Check if the reference exists in the flow elements
                    const nextElement = flow.elements.find(element => element instanceof FlowNode_1.FlowNode && element.name === connector.reference);
                    if (nextElement instanceof FlowNode_1.FlowNode && nextElement.name !== endElementName) {
                        nextElements.push(nextElement.name);
                    }
                }
            }
        }
        return nextElements;
    }
}
exports.Compiler = Compiler;
//# sourceMappingURL=Compiler.js.map

/***/ }),

/***/ 392:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertFlowNodes = void 0;
function convertFlowNodes(obj, nodes, key) {
    obj[key] = nodes.map(node => node.element);
    return obj;
}
exports.convertFlowNodes = convertFlowNodes;
//# sourceMappingURL=ConvertFlowNodes.js.map

/***/ }),

/***/ 903:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DynamicRule = void 0;
const DefaultRuleStore_1 = __nccwpck_require__(771);
class DynamicRule {
    constructor(className) {
        if (DefaultRuleStore_1.DefaultRuleStore[className] === undefined || DefaultRuleStore_1.DefaultRuleStore[className] === null) {
            throw new Error(`Rule \'${className}\' does not exist in the store.`);
        }
        return new DefaultRuleStore_1.DefaultRuleStore[className]();
    }
}
exports.DynamicRule = DynamicRule;
//# sourceMappingURL=DynamicRule.js.map

/***/ }),

/***/ 169:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FixFlows = void 0;
const BuildFlow_1 = __nccwpck_require__(727);
const core = __importStar(__nccwpck_require__(902));
function FixFlows(flow, ruleResults) {
    const unusedVariableRes = ruleResults.find((r) => r.ruleName === 'UnusedVariable');
    const unusedVariableReferences = (unusedVariableRes && unusedVariableRes.details && unusedVariableRes.details.length > 0) ? unusedVariableRes.details.map((d) => d.name) : [];
    const unconnectedElementsRes = ruleResults.find((r) => r.ruleName === 'UnconnectedElement');
    const unconnectedElementsReferences = (unconnectedElementsRes && unconnectedElementsRes.details && unconnectedElementsRes.details.length > 0) ? unconnectedElementsRes.details.map((d) => d.name) : [];
    const nodesToBuild = flow.elements.filter(node => {
        switch (node.metaType) {
            case 'variable':
                const nodeVar = node;
                if (!unusedVariableReferences.includes(nodeVar.name)) {
                    return node;
                }
                break;
            case 'node':
                const nodeElement = node;
                if (!unconnectedElementsReferences.includes(nodeElement.name)) {
                    return node;
                }
                break;
            case 'metadata':
                return node;
            case 'resource':
                return node;
        }
    });
    let xmldata = (0, BuildFlow_1.BuildFlow)(nodesToBuild);
    const newFlow = new core.Flow(flow.name, xmldata);
    return newFlow;
}
exports.FixFlows = FixFlows;
//# sourceMappingURL=FixFlows.js.map

/***/ }),

/***/ 874:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetRuleDefinitions = void 0;
const DefaultRuleStore_1 = __nccwpck_require__(771);
const DynamicRule_1 = __nccwpck_require__(903);
function GetRuleDefinitions(ruleConfig) {
    const selectedRules = [];
    if (ruleConfig && ruleConfig instanceof Map) {
        for (const ruleName of ruleConfig.keys()) {
            let severity = "error";
            try {
                const configuredSeverity = ruleConfig.get(ruleName)["severity"];
                if (configuredSeverity &&
                    (configuredSeverity === "error" ||
                        configuredSeverity === "warning" ||
                        configuredSeverity === "note")) {
                    severity = configuredSeverity;
                }
                const matchedRule = new DynamicRule_1.DynamicRule(ruleName);
                matchedRule["severity"] = severity;
                selectedRules.push(matchedRule);
            }
            catch (error) {
                console.log(error.message);
            }
        }
    }
    else {
        // tslint:disable-next-line:forin
        for (const rule in DefaultRuleStore_1.DefaultRuleStore) {
            const matchedRule = new DynamicRule_1.DynamicRule(rule);
            matchedRule["severity"] = "error";
            selectedRules.push(matchedRule);
        }
    }
    return selectedRules;
}
exports.GetRuleDefinitions = GetRuleDefinitions;
//# sourceMappingURL=GetRuleDefinitions.js.map

/***/ }),

/***/ 514:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScanFlows = void 0;
const GetRuleDefinitions_1 = __nccwpck_require__(874);
const core = __importStar(__nccwpck_require__(902));
function ScanFlows(flows, ruleOptions) {
    const flowResults = [];
    let selectedRules = [];
    if (ruleOptions && ruleOptions.rules) {
        const ruleMap = new Map();
        for (const [ruleName, rule] of Object.entries(ruleOptions.rules)) {
            ruleMap.set(ruleName, rule);
        }
        selectedRules = (0, GetRuleDefinitions_1.GetRuleDefinitions)(ruleMap);
    }
    else {
        selectedRules = (0, GetRuleDefinitions_1.GetRuleDefinitions)();
    }
    for (const flow of flows) {
        const ruleResults = [];
        for (const rule of selectedRules) {
            try {
                if (rule.supportedTypes.includes(flow.type)) {
                    let config = undefined;
                    if (ruleOptions &&
                        ruleOptions["rules"] &&
                        ruleOptions["rules"][rule.name]) {
                        config = ruleOptions["rules"][rule.name];
                    }
                    const result = config && Object.keys(config).length > 0
                        ? rule.execute(flow, config)
                        : rule.execute(flow);
                    if (result.severity !== rule.severity) {
                        result.severity = rule.severity;
                    }
                    ruleResults.push(result);
                }
                else {
                    ruleResults.push(new core.RuleResult(rule, []));
                }
            }
            catch (error) {
                let message = "Something went wrong while executing " +
                    rule.name +
                    " in the Flow: '" +
                    flow.name;
                ruleResults.push(new core.RuleResult(rule, [], message));
            }
        }
        flowResults.push(new core.ScanResult(flow, ruleResults));
    }
    return flowResults;
}
exports.ScanFlows = ScanFlows;
//# sourceMappingURL=ScanFlows.js.map

/***/ }),

/***/ 877:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Flow = void 0;
const FlowNode_1 = __nccwpck_require__(360);
const FlowMetadata_1 = __nccwpck_require__(617);
const FlowVariable_1 = __nccwpck_require__(455);
const FlowResource_1 = __nccwpck_require__(526);
class Flow {
    constructor(flowName, data) {
        this.flowVariables = [
            "choices",
            "constants",
            "dynamicChoiceSets",
            "formulas",
            "variables",
        ];
        this.flowResources = ["textTemplates", "stages"];
        this.flowMetadata = [
            "description",
            "apiVersion",
            "processMetadataValues",
            "processType",
            "interviewLabel",
            "label",
            "status",
            "runInMode",
            "startElementReference",
            "isTemplate",
            "fullName",
            "timeZoneSidKey",
            "isAdditionalPermissionRequiredToRun",
            "migratedFromWorkflowRuleName",
            "triggerOrder",
            "environments",
            "segment",
        ];
        this.flowNodes = [
            "actionCalls",
            "apexPluginCalls",
            "assignments",
            "collectionProcessors",
            "decisions",
            "loops",
            "orchestratedStages",
            "recordCreates",
            "recordDeletes",
            "recordLookups",
            "recordUpdates",
            "recordRollbacks",
            "screens",
            "start",
            "steps",
            "subflows",
            "waits",
        ];
        this.name = flowName;
        if (data) {
            if (data.Flow) {
                this.xmldata = data.Flow;
            }
            else
                this.xmldata = data;
            this.preProcessNodes();
        }
    }
    preProcessNodes() {
        this.label = this.xmldata.label;
        this.interviewLabel = this.xmldata.interviewLabel;
        this.processType = this.xmldata.processType;
        this.processMetadataValues = this.xmldata.processMetadataValues;
        this.startElementReference = this.xmldata.startElementReference;
        this.start = this.xmldata.start;
        this.status = this.xmldata.status;
        this.type = this.xmldata.processType;
        const allNodes = [];
        for (const nodeType in this.xmldata) {
            // skip xmlns url
            // if (nodeType == "@xmlns") {
            //   continue;
            // }
            let data = this.xmldata[nodeType];
            if (this.flowMetadata.includes(nodeType)) {
                if (Array.isArray(data)) {
                    for (const node of data) {
                        allNodes.push(new FlowMetadata_1.FlowMetadata(nodeType, node));
                    }
                    for (const node of data) {
                    }
                }
                else {
                    allNodes.push(new FlowMetadata_1.FlowMetadata(nodeType, data));
                }
            }
            else if (this.flowVariables.includes(nodeType)) {
                if (Array.isArray(data)) {
                    for (const node of data) {
                        allNodes.push(new FlowVariable_1.FlowVariable(node.name, nodeType, node));
                    }
                }
                else {
                    allNodes.push(new FlowVariable_1.FlowVariable(data.name, nodeType, data));
                }
            }
            else if (this.flowNodes.includes(nodeType)) {
                if (Array.isArray(data)) {
                    for (const node of data) {
                        allNodes.push(new FlowNode_1.FlowNode(node.name, nodeType, node));
                    }
                }
                else {
                    allNodes.push(new FlowNode_1.FlowNode(data.name, nodeType, data));
                }
            }
            else if (this.flowResources.includes(nodeType)) {
                if (Array.isArray(data)) {
                    for (const node of data) {
                        allNodes.push(new FlowResource_1.FlowResource(node.name, nodeType, node));
                    }
                }
                else {
                    allNodes.push(new FlowResource_1.FlowResource(data.name, nodeType, data));
                }
            }
        }
        this.elements = allNodes;
        this.startReference = this.findStart();
    }
    findStart() {
        let start = "";
        const flowElements = this.elements.filter((node) => node instanceof FlowNode_1.FlowNode);
        if (this.startElementReference) {
            start = this.startElementReference;
        }
        else if (flowElements.find((n) => {
            return n.subtype === "start";
        })) {
            let startElement = flowElements.find((n) => {
                return n.subtype === "start";
            });
            start = startElement.connectors[0]["reference"];
        }
        return start;
    }
}
exports.Flow = Flow;
//# sourceMappingURL=Flow.js.map

/***/ }),

/***/ 80:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlowAttribute = void 0;
class FlowAttribute {
    constructor(name, subtype, expression) {
        this.metaType = 'attribute';
        this.name = name;
        this.subtype = subtype;
        this.expression = expression;
    }
}
exports.FlowAttribute = FlowAttribute;
//# sourceMappingURL=FlowAttribute.js.map

/***/ }),

/***/ 930:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlowElement = void 0;
class FlowElement {
    constructor(metaType, subtype, element) {
        this.element = {};
        this.element = element;
        this.subtype = subtype;
        this.metaType = metaType;
    }
}
exports.FlowElement = FlowElement;
//# sourceMappingURL=FlowElement.js.map

/***/ }),

/***/ 543:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlowElementConnector = void 0;
class FlowElementConnector {
    constructor(type, element, args) {
        this.element = {};
        this.processed = false;
        this.type = type;
        this.element = element;
        this.childName = args.childName ? args.childName : undefined;
        this.childOf = args.childOf ? args.childOf : undefined;
        if (element && element['targetReference']) {
            this.reference = element['targetReference'];
        }
    }
}
exports.FlowElementConnector = FlowElementConnector;
//# sourceMappingURL=FlowElementConnector.js.map

/***/ }),

/***/ 617:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlowMetadata = void 0;
const FlowElement_1 = __nccwpck_require__(930);
class FlowMetadata extends FlowElement_1.FlowElement {
    constructor(subtype, element) {
        super('metadata', subtype, element);
    }
}
exports.FlowMetadata = FlowMetadata;
//# sourceMappingURL=FlowMetadata.js.map

/***/ }),

/***/ 360:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlowNode = void 0;
const FlowElementConnector_1 = __nccwpck_require__(543);
const FlowElement_1 = __nccwpck_require__(930);
class FlowNode extends FlowElement_1.FlowElement {
    constructor(provName, subtype, element) {
        super('node', subtype, element);
        this.connectors = [];
        let nodeName = subtype === 'start' ? 'flowstart' : provName;
        this.name = nodeName;
        const connectors = this.getConnectors(subtype, element);
        this.connectors = connectors;
        this.locationX = element["locationX"];
        this.locationY = element["locationY"];
    }
    getConnectors(subtype, element) {
        var _a;
        if (subtype === 'start') {
            const connectors = [];
            if (element.connector) {
                connectors.push(new FlowElementConnector_1.FlowElementConnector('connector', element.connector, {}));
            }
            if (Array.isArray(element.scheduledPaths)) {
                for (const asyncElement of element === null || element === void 0 ? void 0 : element.scheduledPaths) {
                    if (asyncElement.connector) {
                        connectors.push(new FlowElementConnector_1.FlowElementConnector('connector', asyncElement.connector, {
                            childName: (_a = asyncElement === null || asyncElement === void 0 ? void 0 : asyncElement.name) !== null && _a !== void 0 ? _a : 'AsyncAfterCommit',
                            childOf: 'scheduledPaths'
                        }));
                    }
                }
            }
            else {
                if (element.scheduledPaths) {
                    connectors.push(new FlowElementConnector_1.FlowElementConnector('connector', element.scheduledPaths, {
                        childName: element.scheduledPaths.name,
                        childOf: 'scheduledPaths'
                    }));
                }
            }
            return connectors;
        }
        else if (subtype === 'decisions') {
            const connectors = [];
            if (element.defaultConnector) {
                connectors.push(new FlowElementConnector_1.FlowElementConnector('defaultConnector', element.defaultConnector, {}));
            }
            if (element.rules) {
                if (Array.isArray(element.rules)) {
                    for (const rule of element.rules) {
                        if (rule.connector) {
                            connectors.push(new FlowElementConnector_1.FlowElementConnector('connector', rule.connector, {
                                childName: rule.name,
                                childOf: 'rules'
                            }));
                        }
                    }
                }
                else {
                    if (element.rules.connector) {
                        connectors.push(new FlowElementConnector_1.FlowElementConnector('connector', element.rules.connector, {
                            childName: element.rules.name,
                            childOf: 'rules'
                        }));
                    }
                }
            }
            return connectors;
        }
        else if (subtype === 'assignments') {
            return element.connector ? [new FlowElementConnector_1.FlowElementConnector('connector', element.connector, {})] : [];
        }
        else if (subtype === 'loops') {
            const connectors = [];
            if (element.nextValueConnector) {
                connectors.push(new FlowElementConnector_1.FlowElementConnector('nextValueConnector', element.nextValueConnector, {}));
            }
            if (element.noMoreValuesConnector) {
                connectors.push(new FlowElementConnector_1.FlowElementConnector('noMoreValuesConnector', element.noMoreValuesConnector, {}));
            }
            return connectors;
        }
        else if (subtype === 'actionCalls') {
            const connectors = [];
            if (element.connector) {
                connectors.push(new FlowElementConnector_1.FlowElementConnector('connector', element.connector, {}));
            }
            if (element.faultConnector) {
                connectors.push(new FlowElementConnector_1.FlowElementConnector('faultConnector', element.faultConnector, {}));
            }
            return connectors;
        }
        else if (subtype === 'waits') {
            const connectors = [];
            if (element.defaultConnector) {
                connectors.push(new FlowElementConnector_1.FlowElementConnector('defaultConnector', element.defaultConnector, {}));
            }
            if (element.faultConnector) {
                connectors.push(new FlowElementConnector_1.FlowElementConnector('faultConnector', element.faultConnector, {}));
            }
            if (Array.isArray(element.waitEvents)) {
                for (const waitEvent of element.waitEvents) {
                    if (waitEvent.connector) {
                        connectors.push(new FlowElementConnector_1.FlowElementConnector('connector', waitEvent.connector, {
                            childName: waitEvent.name,
                            childOf: 'waitEvents'
                        }));
                    }
                }
            }
            return connectors;
        }
        else if (subtype === 'recordCreates') {
            const connectors = [];
            if (element.connector) {
                connectors.push(new FlowElementConnector_1.FlowElementConnector('connector', element.connector, {}));
            }
            if (element.faultConnector) {
                connectors.push(new FlowElementConnector_1.FlowElementConnector('faultConnector', element.faultConnector, {}));
            }
            return connectors;
        }
        else if (subtype === 'recordDeletes') {
            const connectors = [];
            if (element.connector) {
                connectors.push(new FlowElementConnector_1.FlowElementConnector('connector', element.connector, {}));
            }
            if (element.faultConnector) {
                connectors.push(new FlowElementConnector_1.FlowElementConnector('faultConnector', element.faultConnector, {}));
            }
            return connectors;
        }
        else if (subtype === 'recordLookups') {
            const connectors = [];
            if (element.connector) {
                connectors.push(new FlowElementConnector_1.FlowElementConnector('connector', element.connector, {}));
            }
            if (element.faultConnector) {
                connectors.push(new FlowElementConnector_1.FlowElementConnector('faultConnector', element.faultConnector, {}));
            }
            return connectors;
        }
        else if (subtype === 'recordUpdates') {
            const connectors = [];
            if (element.connector) {
                connectors.push(new FlowElementConnector_1.FlowElementConnector('connector', element.connector, {}));
            }
            if (element.faultConnector) {
                connectors.push(new FlowElementConnector_1.FlowElementConnector('faultConnector', element.faultConnector, {}));
            }
            return connectors;
        }
        else if (subtype === 'subflows') {
            return element.connector ? [new FlowElementConnector_1.FlowElementConnector('connector', element.connector, {})] : [];
        }
        else if (subtype === 'screens') {
            return element.connector ? [new FlowElementConnector_1.FlowElementConnector('connector', element.connector, {})] : [];
        }
        else {
            return element.connector ? [new FlowElementConnector_1.FlowElementConnector('connector', element.connector, {})] : [];
        }
    }
}
exports.FlowNode = FlowNode;
//# sourceMappingURL=FlowNode.js.map

/***/ }),

/***/ 526:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlowResource = void 0;
const FlowElement_1 = __nccwpck_require__(930);
class FlowResource extends FlowElement_1.FlowElement {
    constructor(name, subtype, element) {
        super('resource', subtype, element);
        this.name = name;
    }
}
exports.FlowResource = FlowResource;
//# sourceMappingURL=FlowResource.js.map

/***/ }),

/***/ 929:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlowType = void 0;
class FlowType {
}
exports.FlowType = FlowType;
FlowType.backEndTypes = ['AutoLaunchedFlow', 'CustomEvent', 'InvocableProcess', 'Orchestrator', 'EvaluationFlow', 'ActionCadenceAutolaunchedFlow'];
FlowType.processBuilder = ['Workflow'];
FlowType.surveyTypes = ['Survey'];
FlowType.visualTypes = ['Flow', 'IndividualObjectLinkingFlow', 'LoginFlow', 'RoutingFlow', 'Appointments', 'ActionCadenceStepFlow', 'ContactRequestFlow', 'ContactRequestFlow', 'CustomerLifecycle', 'FieldServiceMobile', 'FieldServiceWeb', 'SurveyEnrich'];
FlowType.unsupportedTypes = ['CheckoutFlow', 'FSCLending', 'FSCLending', 'LoyaltyManagementFlow'];
FlowType.allTypes = function () {
    return [...this.backEndTypes, ...this.visualTypes, ...this.surveyTypes];
};
//# sourceMappingURL=FlowType.js.map

/***/ }),

/***/ 455:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlowVariable = void 0;
const FlowElement_1 = __nccwpck_require__(930);
class FlowVariable extends FlowElement_1.FlowElement {
    constructor(name, subtype, element) {
        super('variable', subtype, element);
        this.name = name;
        this.dataType = element["dataType"];
    }
}
exports.FlowVariable = FlowVariable;
//# sourceMappingURL=FlowVariable.js.map

/***/ }),

/***/ 995:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResultDetails = void 0;
class ResultDetails {
    constructor(violation) {
        this.violation = violation;
        this.name = violation.name;
        this.metaType = violation.metaType;
        this.type = violation.subtype;
        if (violation.metaType === 'variable') {
            let element = violation;
            this.details = { dataType: element.dataType };
        }
        if (violation.metaType === 'node') {
            let element = violation;
            this.details = { locationX: element.locationX, locationY: element.locationY, connectsTo: element.connectors.map(connector => connector.reference) };
        }
        if (violation.metaType === 'attribute') {
            let element = violation;
            this.details = { expression: element.expression };
        }
    }
}
exports.ResultDetails = ResultDetails;
//# sourceMappingURL=ResultDetails.js.map

/***/ }),

/***/ 180:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RuleCommon = void 0;
class RuleCommon {
    constructor(info, optional) {
        this.docRefs = [];
        this.name = info.name;
        this.supportedTypes = info.supportedTypes;
        this.label = info.label;
        this.description = info.description;
        this.uri = 'https://github.com/Lightning-Flow-Scanner/lightning-flow-scanner-core/tree/master/src/main/rules/' + info.name + '.ts';
        this.docRefs = info.docRefs;
        this.isConfigurable = info.isConfigurable;
        this.autoFixable = info.autoFixable;
        this.severity = (optional && optional.severity) ? optional.severity : 'error';
    }
}
exports.RuleCommon = RuleCommon;
//# sourceMappingURL=RuleCommon.js.map

/***/ }),

/***/ 379:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RuleResult = void 0;
class RuleResult {
    constructor(info, details, errorMessage) {
        this.details = [];
        this.ruleDefinition = info;
        this.ruleName = info.name;
        this.severity = info.severity ? info.severity : 'error';
        this.occurs = false;
        this.details = details;
        if (details.length > 0) {
            this.occurs = true;
        }
        if (errorMessage) {
            this.errorMessage = errorMessage;
        }
    }
}
exports.RuleResult = RuleResult;
//# sourceMappingURL=RuleResult.js.map

/***/ }),

/***/ 992:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScanResult = void 0;
class ScanResult {
    constructor(flow, ruleResults) {
        this.flow = flow;
        this.ruleResults = ruleResults;
    }
}
exports.ScanResult = ScanResult;
//# sourceMappingURL=ScanResult.js.map

/***/ }),

/***/ 590:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.APIVersion = void 0;
const core = __importStar(__nccwpck_require__(902));
const RuleCommon_1 = __nccwpck_require__(180);
class APIVersion extends RuleCommon_1.RuleCommon {
    constructor() {
        super({
            name: 'APIVersion',
            label: 'Outdated API Version',
            description: "Introducing newer API components may lead to unexpected issues with older versions of Flows, as they might not align with the underlying mechanics. Starting from API version 50.0, the 'Api Version' attribute has been readily available on the Flow Object. To ensure smooth operation and reduce discrepancies between API versions, it is strongly advised to regularly update and maintain them.",
            supportedTypes: core.FlowType.allTypes(),
            docRefs: [],
            isConfigurable: true,
            autoFixable: false
        });
    }
    execute(flow, options) {
        let flowAPIVersionNumber;
        if (flow.xmldata.apiVersion) {
            const flowAPIVersion = flow.xmldata.apiVersion;
            flowAPIVersionNumber = +flowAPIVersion;
        }
        if (flowAPIVersionNumber) {
            if (options && options.expression) {
                const expressionEvaluation = eval(flowAPIVersionNumber + options.expression);
                return (!expressionEvaluation ?
                    new core.RuleResult(this, [new core.ResultDetails(new core.FlowAttribute(!expressionEvaluation ? ('' + flowAPIVersionNumber) : undefined, "apiVersion", options.expression))]) :
                    new core.RuleResult(this, []));
            }
            else {
                return new core.RuleResult(this, []);
            }
        }
        else {
            return new core.RuleResult(this, [new core.ResultDetails(new core.FlowAttribute('API Version <49', "apiVersion", "<49"))]);
        }
    }
}
exports.APIVersion = APIVersion;
//# sourceMappingURL=APIVersion.js.map

/***/ }),

/***/ 701:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutoLayout = void 0;
const core = __importStar(__nccwpck_require__(902));
const RuleCommon_1 = __nccwpck_require__(180);
class AutoLayout extends RuleCommon_1.RuleCommon {
    constructor() {
        super({
            name: 'AutoLayout',
            label: 'Auto-Layout Mode',
            description: "With Canvas Mode set to Auto-Layout, Elements are spaced, connected, and aligned automatically, keeping your Flow neatly organized thus saving you time.",
            supportedTypes: core.FlowType.allTypes(),
            docRefs: [],
            isConfigurable: true,
            autoFixable: false
        });
    }
    execute(flow, options) {
        var _a;
        if (flow.processMetadataValues) {
            const CanvasMode = flow.xmldata.processMetadataValues.find(mdv => mdv.name === 'CanvasMode');
            const AutoLayout = CanvasMode.value && typeof CanvasMode.value === 'object' && CanvasMode.value.stringValue && CanvasMode.value.stringValue === "AUTO_LAYOUT_CANVAS";
            return (!AutoLayout ?
                new core.RuleResult(this, [new core.ResultDetails(new core.FlowAttribute((_a = CanvasMode.value) === null || _a === void 0 ? void 0 : _a.stringValue, "CanvasMode", '!== AUTO_LAYOUT_CANVAS'))]) :
                new core.RuleResult(this, []));
        }
    }
}
exports.AutoLayout = AutoLayout;
//# sourceMappingURL=AutoLayout.js.map

/***/ }),

/***/ 645:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CopyAPIName = void 0;
const core = __importStar(__nccwpck_require__(902));
const RuleCommon_1 = __nccwpck_require__(180);
class CopyAPIName extends RuleCommon_1.RuleCommon {
    constructor() {
        super({
            name: 'CopyAPIName',
            label: 'Copy API Name',
            description: "Maintaining multiple elements with a similar name, like 'Copy_X_Of_Element,' can diminish the overall readability of your Flow. When copying and pasting these elements, it's crucial to remember to update the API name of the newly created copy.",
            supportedTypes: core.FlowType.allTypes(),
            docRefs: [],
            isConfigurable: false,
            autoFixable: false
        });
    }
    execute(flow) {
        const flowElements = flow.elements.filter(node => node instanceof core.FlowNode);
        const copyOfElements = [];
        for (const element of flowElements) {
            const copyOf = new RegExp('Copy_[0-9]+_of_[A-Za-z0-9]+').test(element.name);
            if (copyOf) {
                copyOfElements.push(element);
            }
        }
        let results = [];
        for (const det of copyOfElements) {
            results.push(new core.ResultDetails(det));
        }
        return new core.RuleResult(this, results);
    }
}
exports.CopyAPIName = CopyAPIName;
//# sourceMappingURL=CopyAPIName.js.map

/***/ }),

/***/ 284:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DMLStatementInLoop = void 0;
const RuleCommon_1 = __nccwpck_require__(180);
const core = __importStar(__nccwpck_require__(902));
class DMLStatementInLoop extends RuleCommon_1.RuleCommon {
    constructor() {
        super({
            name: 'DMLStatementInLoop',
            label: 'DML Statement In A Loop',
            description: "To prevent exceeding Apex governor limits, it is advisable to consolidate all your database operations, including record creation, updates, or deletions, at the conclusion of the flow.",
            supportedTypes: core.FlowType.backEndTypes,
            docRefs: [{ 'label': 'Flow Best Practices', 'path': 'https://help.salesforce.com/s/articleView?id=sf.flow_prep_bestpractices.htm&type=5' }],
            isConfigurable: false,
            autoFixable: false
        });
    }
    execute(flow) {
        const dmlStatementTypes = ['recordDeletes', 'recordUpdates', 'recordCreates'];
        const loopElements = flow.elements.filter(node => node.subtype === 'loops');
        const dmlStatementsInLoops = [];
        const findDML = (element) => {
            if (dmlStatementTypes.includes(element.subtype)) {
                dmlStatementsInLoops.push(element);
            }
        };
        for (const element of loopElements) {
            let loopEnd;
            // Check if 'noMoreValuesConnector' attribute exists
            if (element.element['noMoreValuesConnector'] && element.element['noMoreValuesConnector'][0]) {
                loopEnd = element.element['noMoreValuesConnector'][0].targetReference[0];
            }
            else {
                loopEnd = element.name;
            }
            new core.Compiler().traverseFlow(flow, element.name, findDML, loopEnd);
        }
        // Create result details
        const results = dmlStatementsInLoops.map(det => new core.ResultDetails(det));
        return new core.RuleResult(this, results);
    }
}
exports.DMLStatementInLoop = DMLStatementInLoop;
//# sourceMappingURL=DMLStatementInLoop.js.map

/***/ }),

/***/ 776:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DuplicateDMLOperation = void 0;
const RuleCommon_1 = __nccwpck_require__(180);
const core = __importStar(__nccwpck_require__(902));
class DuplicateDMLOperation extends RuleCommon_1.RuleCommon {
    constructor() {
        super({
            name: "DuplicateDMLOperation",
            label: "Duplicate DML Operation",
            description: "When the flow executes database changes or actions between two screens, it's important to prevent users from navigating back between screens. Failure to do so may result in duplicate database operations being performed within the flow.",
            supportedTypes: core.FlowType.visualTypes,
            docRefs: [],
            isConfigurable: false,
            autoFixable: false,
        });
    }
    execute(flow) {
        const flowElements = flow.elements.filter((node) => node instanceof core.FlowNode);
        const processedElementIndexes = [];
        const unconnectedElementIndexes = [];
        const DuplicateDMLOperations = [];
        const startingNode = this.findStart(flow);
        if (!startingNode || startingNode === -1) {
            throw "Can not find starting element";
        }
        let dmlFlag = false;
        let indexesToProcess = [startingNode];
        do {
            indexesToProcess = indexesToProcess.filter((index) => !processedElementIndexes.includes(index));
            if (indexesToProcess.length > 0) {
                for (const [index, element] of flowElements.entries()) {
                    if (indexesToProcess.includes(index)) {
                        const references = [];
                        if (element.connectors && element.connectors.length > 0) {
                            for (const connector of element.connectors) {
                                if (connector.reference) {
                                    references.push(connector.reference);
                                }
                            }
                        }
                        dmlFlag = this.flagDML(element, dmlFlag);
                        if (references.length > 0) {
                            const elementsByReferences = flowElements.filter((element) => references.includes(element.name));
                            for (const nextElement of elementsByReferences) {
                                const nextIndex = flowElements.findIndex((element) => nextElement.name === element.name);
                                if ("screens" === nextElement.subtype) {
                                    if (dmlFlag &&
                                        nextElement.element["allowBack"] &&
                                        nextElement.element["allowBack"] == "true" &&
                                        nextElement.element["showFooter"] == "true") {
                                        DuplicateDMLOperations.push(nextElement);
                                    }
                                }
                                if (!processedElementIndexes.includes(nextIndex)) {
                                    indexesToProcess.push(nextIndex);
                                }
                            }
                        }
                        processedElementIndexes.push(index);
                    }
                }
            }
            else {
                // skip unconnected elements
                for (const index of flowElements.keys()) {
                    if (!processedElementIndexes.includes(index)) {
                        unconnectedElementIndexes.push(index);
                    }
                }
            }
        } while (processedElementIndexes.length + unconnectedElementIndexes.length <
            flowElements.length);
        let results = [];
        for (const det of DuplicateDMLOperations) {
            results.push(new core.ResultDetails(det));
        }
        return new core.RuleResult(this, results);
    }
    flagDML(element, dmlFlag) {
        const dmlStatementTypes = [
            "recordDeletes",
            "recordUpdates",
            "recordCreates",
        ];
        if (dmlStatementTypes.includes(element.subtype)) {
            return true;
        }
        else if (dmlFlag === true &&
            element.subtype === "screens" &&
            element.element["allowBack"] &&
            element.element["allowBack"] == "true") {
            return false;
        }
        else {
            return dmlFlag;
        }
    }
    findStart(flow) {
        const flowElements = flow.elements.filter((node) => node instanceof core.FlowNode);
        let start;
        if (flow.startElementReference) {
            start = flowElements.findIndex((n) => {
                return n.name == flow.startElementReference;
            });
        }
        else {
            start = flowElements.findIndex((n) => {
                return n.subtype === "start";
            });
        }
        return start;
    }
}
exports.DuplicateDMLOperation = DuplicateDMLOperation;
//# sourceMappingURL=DuplicateDMLOperation.js.map

/***/ }),

/***/ 412:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlowDescription = void 0;
const RuleCommon_1 = __nccwpck_require__(180);
const core = __importStar(__nccwpck_require__(902));
class FlowDescription extends RuleCommon_1.RuleCommon {
    constructor() {
        super({
            name: 'FlowDescription',
            label: 'Missing Flow Description',
            description: "Descriptions play a vital role in documentation. We highly recommend including details about where they are used and their intended purpose.",
            supportedTypes: [...core.FlowType.backEndTypes, ...core.FlowType.visualTypes],
            docRefs: [],
            isConfigurable: false,
            autoFixable: false
        });
    }
    execute(flow) {
        const missingFlowDescription = !flow.xmldata.description;
        return (missingFlowDescription ?
            new core.RuleResult(this, [new core.ResultDetails(new core.FlowAttribute('undefined', "description", "!==null"))]) :
            new core.RuleResult(this, []));
    }
}
exports.FlowDescription = FlowDescription;
//# sourceMappingURL=FlowDescription.js.map

/***/ }),

/***/ 153:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlowName = void 0;
const RuleCommon_1 = __nccwpck_require__(180);
const core = __importStar(__nccwpck_require__(902));
class FlowName extends RuleCommon_1.RuleCommon {
    constructor() {
        super({
            name: 'FlowName',
            label: 'Flow Naming Convention',
            description: "The readability of a flow is of utmost importance. Establishing a naming convention for the Flow Name significantly enhances findability, searchability, and maintains overall consistency. It is advisable to include at least a domain and a brief description of the actions carried out in the flow, for instance, 'Service_OrderFulfillment'.",
            supportedTypes: core.FlowType.allTypes(),
            docRefs: [{ 'label': "Naming your Flows is more critical than ever. By Stephen Church", 'path': 'https://www.linkedin.com/posts/stephen-n-church_naming-your-flows-this-is-more-critical-activity-7099733198175158274-1sPx?utm_source=share&utm_medium=member_desktop' }],
            isConfigurable: true,
            autoFixable: false
        });
    }
    execute(flow, options) {
        const regexExp = (options && options.expression) ? options.expression : '[A-Za-z0-9]+_[A-Za-z0-9]+';
        const conventionApplied = new RegExp(regexExp).test(flow.name);
        return (!conventionApplied ?
            new core.RuleResult(this, [new core.ResultDetails(new core.FlowAttribute(flow.name, 'name', regexExp))]) :
            new core.RuleResult(this, []));
    }
}
exports.FlowName = FlowName;
//# sourceMappingURL=FlowName.js.map

/***/ }),

/***/ 312:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HardcodedId = void 0;
const IdPrefixes = __importStar(__nccwpck_require__(435));
const RuleCommon_1 = __nccwpck_require__(180);
const core = __importStar(__nccwpck_require__(902));
class HardcodedId extends RuleCommon_1.RuleCommon {
    constructor() {
        super({
            name: 'HardcodedId',
            label: 'Hardcoded Id',
            description: 'Avoid hard-coding IDs as they are org-specific. Instead, pass them into variables at the start of the flow. You can achieve this by utilizing merge fields in URL parameters or employing a Get Records element.',
            supportedTypes: core.FlowType.allTypes(),
            docRefs: [{ 'label': 'Flow Best Practices', 'path': 'https://help.salesforce.com/s/articleView?id=sf.flow_prep_bestpractices.htm&type=5' }, { 'label': "Don't hard code Record Type IDs in Flow. By Stephen Church.", 'path': 'https://www.linkedin.com/feed/update/urn:li:activity:6947530300012826624/?updateEntityUrn=urn%3Ali%3Afs_feedUpdate%3A%28V2%2Curn%3Ali%3Aactivity%3A6947530300012826624%29' }],
            isConfigurable: false,
            autoFixable: false
        });
    }
    execute(flow) {
        const prefixes = IdPrefixes.ids.map(prefix => {
            return prefix['Key Prefix'];
        });
        const nodesWithHardcodedIds = [];
        const customPrefixes = new Array(100);
        for (let i = 0; i < customPrefixes.length; i++) {
            const prefix = ('' + i).length === 1 ? 'a0' + String(i) : 'a' + String(i);
            prefixes.push(prefix);
        }
        for (const prefix of prefixes) {
            const match18charIds = new RegExp('\\b' + prefix + '\\w{15}\\b');
            const match15charIds = new RegExp('\\b' + prefix + '\\w{12}\\b');
            for (const node of flow.elements) {
                const nodeString = JSON.stringify(node);
                const hardcodedIdsL18 = nodeString.match(match18charIds);
                const hardcodedIdsL15 = nodeString.match(match15charIds);
                if (hardcodedIdsL15 || hardcodedIdsL18) {
                    nodesWithHardcodedIds.push(node);
                }
            }
        }
        let results = [];
        for (const det of nodesWithHardcodedIds) {
            results.push(new core.ResultDetails(det));
        }
        return new core.RuleResult(this, results);
    }
}
exports.HardcodedId = HardcodedId;
//# sourceMappingURL=HardcodedId.js.map

/***/ }),

/***/ 736:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InactiveFlow = void 0;
const RuleCommon_1 = __nccwpck_require__(180);
const core = __importStar(__nccwpck_require__(902));
class InactiveFlow extends RuleCommon_1.RuleCommon {
    constructor() {
        super({
            name: 'InactiveFlow',
            label: 'Inactive Flow',
            description: 'Like cleaning out your closet: deleting unused flows is essential. Inactive flows can still cause trouble, like accidentally deleting records during testing, or being activated as subflows within parent flows.',
            supportedTypes: core.FlowType.allTypes(),
            docRefs: [],
            isConfigurable: false,
            autoFixable: false
        });
    }
    execute(flow) {
        const inactiveFlows = [];
        for (const node of flow.elements) {
            const nodeElementString = JSON.stringify(node.element);
            if (node.subtype == "status" && nodeElementString != '\"Active\"') {
                inactiveFlows.push(node);
            }
        }
        let results = [];
        for (const det of inactiveFlows) {
            results.push(new core.ResultDetails(det));
        }
        return new core.RuleResult(this, results);
    }
}
exports.InactiveFlow = InactiveFlow;
//# sourceMappingURL=InactiveFlow.js.map

/***/ }),

/***/ 799:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MissingFaultPath = void 0;
const RuleCommon_1 = __nccwpck_require__(180);
const core = __importStar(__nccwpck_require__(902));
class MissingFaultPath extends RuleCommon_1.RuleCommon {
    constructor() {
        super({
            name: 'MissingFaultPath',
            label: 'Missing Fault Path',
            description: "At times, a flow may fail to execute a configured operation as intended. By default, the flow displays an error message to the user and notifies the admin who created the flow via email. However, you can customize this behavior by incorporating a Fault Path.",
            supportedTypes: [...core.FlowType.backEndTypes, ...core.FlowType.visualTypes],
            docRefs: [{ label: 'Flow Best Practices', path: 'https://help.salesforce.com/s/articleView?id=sf.flow_prep_bestpractices.htm&type=5' }],
            isConfigurable: false,
            autoFixable: false
        });
    }
    execute(flow) {
        const compiler = new core.Compiler();
        const results = [];
        const elementsWhereFaultPathIsApplicable = flow.elements.filter((node) => node instanceof core.FlowNode && ['recordLookups', 'recordDeletes', 'recordUpdates', 'recordCreates', 'waits', 'actionCalls'].includes(node.subtype)).map((e) => e.name);
        const visitCallback = (element) => {
            // Check if the element should have a fault path
            if (!element.connectors.find((connector) => connector.type === 'faultConnector') && elementsWhereFaultPathIsApplicable.includes(element.name)) {
                // Check if the element is part of another fault path
                if (!this.isPartOfFaultHandlingFlow(element, flow)) {
                    results.push(new core.ResultDetails(element));
                }
            }
        };
        // Use the core.Compiler for traversal
        compiler.traverseFlow(flow, flow.startReference, visitCallback);
        return new core.RuleResult(this, results);
    }
    isPartOfFaultHandlingFlow(element, flow) {
        const flowelements = flow.elements.filter(el => el instanceof core.FlowNode);
        for (const otherElement of flowelements) {
            if (otherElement !== element) {
                // Check if the otherElement has a faultConnector pointing to element
                if (otherElement.connectors.find((connector) => connector.type === 'faultConnector' && connector.reference === element.name)) {
                    return true;
                }
            }
        }
        return false;
    }
}
exports.MissingFaultPath = MissingFaultPath;
//# sourceMappingURL=MissingFaultPath.js.map

/***/ }),

/***/ 473:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MissingNullHandler = void 0;
const RuleCommon_1 = __nccwpck_require__(180);
const core = __importStar(__nccwpck_require__(902));
class MissingNullHandler extends RuleCommon_1.RuleCommon {
    constructor() {
        super({
            name: 'MissingNullHandler',
            label: 'Missing Null Handler',
            description: "When a Get Records operation doesn't find any data, it returns null. To ensure data validation, utilize a decision element on the operation result variable to check for a non-null result.",
            supportedTypes: [...core.FlowType.backEndTypes, ...core.FlowType.visualTypes],
            docRefs: [],
            isConfigurable: false,
            autoFixable: false
        });
    }
    execute(flow) {
        const getOperations = ['recordLookups'];
        const getOperationElements = flow.elements.filter(node => node.metaType === 'node' && getOperations.includes(node.subtype));
        const decisionElements = flow.elements.filter(node => node.metaType === 'node' && node.subtype === 'decisions');
        const getOperationsWithoutNullHandler = [];
        for (const getElement of getOperationElements) {
            const elementName = getElement.name;
            let nullCheckFound = false;
            let resultReferences = [];
            if (getElement.element['storeOutputAutomatically']) {
                resultReferences = [elementName];
            }
            else if (getElement.element['outputReference']) {
                resultReferences = getElement.element['outputReference'];
            }
            else if (getElement.element['outputAssignments']) {
                const outputAssignments = getElement.element['outputAssignments'];
                for (const assignment of outputAssignments) {
                    resultReferences.push(assignment.assignToReference);
                }
            }
            for (const el of decisionElements) {
                const rules = el.element['rules'];
                for (const rule of rules) {
                    for (const condition of rule.conditions) {
                        let referenceFound = false;
                        let isNullOperator = false;
                        let checksIfFalse = false;
                        if (condition.leftValueReference && condition.leftValueReference.length > 0) {
                            let valueReference = condition.leftValueReference[0];
                            for (let ref of resultReferences) {
                                referenceFound = ref.includes(valueReference);
                                if (referenceFound) {
                                    break;
                                }
                            }
                        }
                        if (condition.operator && condition.operator.length > 0) {
                            let operator = condition.operator[0];
                            isNullOperator = (operator === 'IsNull');
                        }
                        if (condition.rightValue && condition.rightValue.length > 0 && condition.rightValue[0].booleanValue && condition.rightValue[0].booleanValue.length > 0) {
                            let rightValue = condition.rightValue[0].booleanValue[0];
                            checksIfFalse = (rightValue.toLowerCase() === 'false');
                        }
                        if (referenceFound && isNullOperator && checksIfFalse) {
                            nullCheckFound = true;
                        }
                    }
                }
            }
            if (!nullCheckFound) {
                getOperationsWithoutNullHandler.push(getElement);
            }
        }
        let results = [];
        for (const det of getOperationsWithoutNullHandler) {
            results.push(new core.ResultDetails(det));
        }
        return new core.RuleResult(this, results);
    }
}
exports.MissingNullHandler = MissingNullHandler;
//# sourceMappingURL=MissingNullHandler.js.map

/***/ }),

/***/ 560:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessBuilder = void 0;
const core = __importStar(__nccwpck_require__(902));
const RuleCommon_1 = __nccwpck_require__(180);
class ProcessBuilder extends RuleCommon_1.RuleCommon {
    constructor() {
        super({
            name: 'ProcessBuilder',
            label: 'No Process Builder',
            description: "Salesforce is transitioning away from Workflow Rules and Process Builder in favor of Flow. Ensure you're prepared for this transition by migrating your organization's automation to Flow. Refer to official documentation for more information on the transition process and tools available.",
            supportedTypes: core.FlowType.processBuilder,
            docRefs: [{ 'label': 'Process Builder Retirement', 'path': 'https://help.salesforce.com/s/articleView?id=000389396&type=1' }],
            isConfigurable: true,
            autoFixable: false
        });
    }
    execute(flow, options) {
        return new core.RuleResult(this, [new core.ResultDetails(new core.FlowAttribute('Workflow', "processType", '== Workflow'))]);
    }
}
exports.ProcessBuilder = ProcessBuilder;
//# sourceMappingURL=ProcessBuilder.js.map

/***/ }),

/***/ 404:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SOQLQueryInLoop = void 0;
const RuleCommon_1 = __nccwpck_require__(180);
const core = __importStar(__nccwpck_require__(902));
class SOQLQueryInLoop extends RuleCommon_1.RuleCommon {
    constructor() {
        super({
            name: 'SOQLQueryInLoop',
            label: 'SOQL Query In A Loop',
            description: "To prevent exceeding Apex governor limits, it is advisable to consolidate all your SOQL queries at the conclusion of the flow.",
            supportedTypes: core.FlowType.backEndTypes,
            docRefs: [{ 'label': 'Flow Best Practices', 'path': 'https://help.salesforce.com/s/articleView?id=sf.flow_prep_bestpractices.htm&type=5' }],
            isConfigurable: false,
            autoFixable: false
        });
    }
    execute(flow) {
        const dmlStatementTypes = ['recordLookups'];
        const loopElements = flow.elements.filter(node => node.subtype === 'loops');
        const soqlStatementsInLoops = [];
        const findDML = (element) => {
            if (dmlStatementTypes.includes(element.subtype)) {
                soqlStatementsInLoops.push(element);
            }
        };
        for (const element of loopElements) {
            let loopEnd;
            // Check if 'noMoreValuesConnector' attribute exists
            if (element.element['noMoreValuesConnector'] && element.element['noMoreValuesConnector']) {
                loopEnd = element.element['noMoreValuesConnector'].targetReference;
            }
            else {
                loopEnd = element.name;
            }
            new core.Compiler().traverseFlow(flow, element.name, findDML, loopEnd);
        }
        // Create result details
        const results = soqlStatementsInLoops.map(det => new core.ResultDetails(det));
        return new core.RuleResult(this, results);
    }
}
exports.SOQLQueryInLoop = SOQLQueryInLoop;
//# sourceMappingURL=SOQLQueryInLoop.js.map

/***/ }),

/***/ 384:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnconnectedElement = void 0;
const RuleCommon_1 = __nccwpck_require__(180);
const core = __importStar(__nccwpck_require__(902));
class UnconnectedElement extends RuleCommon_1.RuleCommon {
    constructor() {
        super({
            name: 'UnconnectedElement',
            label: 'Unconnected Element',
            description: "To maintain the efficiency and manageability of your Flow, it's best to avoid including unconnected elements that are not in use.",
            supportedTypes: [...core.FlowType.backEndTypes, ...core.FlowType.visualTypes],
            docRefs: [],
            isConfigurable: false,
            autoFixable: false
        });
    }
    execute(flow) {
        const connectedElements = new Set();
        // Callback function to log connected elements
        const logConnected = (element) => {
            connectedElements.add(element.name);
        };
        // Get Traversable Nodes
        const flowElements = flow.elements.filter(node => node instanceof core.FlowNode);
        // Find start of Flow
        const startIndex = this.findStart(flowElements);
        // Start traversal from the start node
        if (startIndex !== -1) {
            new core.Compiler().traverseFlow(flow, flowElements[startIndex].name, logConnected);
        }
        const unconnectedElements = flowElements.filter(element => !connectedElements.has(element.name));
        // Create result details
        const results = unconnectedElements.map(det => new core.ResultDetails(det));
        return new core.RuleResult(this, results);
    }
    findStart(nodes) {
        return nodes.findIndex(n => {
            return n.subtype === 'start';
        });
    }
}
exports.UnconnectedElement = UnconnectedElement;
//# sourceMappingURL=UnconnectedElement.js.map

/***/ }),

/***/ 500:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnusedVariable = void 0;
const RuleCommon_1 = __nccwpck_require__(180);
const core = __importStar(__nccwpck_require__(902));
class UnusedVariable extends RuleCommon_1.RuleCommon {
    constructor() {
        super({
            name: 'UnusedVariable',
            label: 'Unused Variable',
            description: "To maintain the efficiency and manageability of your Flow, it's advisable to avoid including unconnected variables that are not in use.",
            supportedTypes: [...core.FlowType.backEndTypes, ...core.FlowType.visualTypes],
            docRefs: [],
            isConfigurable: false,
            autoFixable: false
        });
    }
    execute(flow) {
        const unusedVariables = [];
        for (const variable of flow.elements.filter(node => node instanceof core.FlowVariable)) {
            const variableName = variable.name;
            if ([...JSON.stringify(flow.elements.filter(node => node instanceof core.FlowNode)).matchAll(new RegExp(variableName, 'gi'))].map(a => a.index).length === 0) {
                // if not found in any inside of flow elements
                if ([...JSON.stringify(flow.elements.filter(node => node instanceof core.FlowResource)).matchAll(new RegExp(variableName, 'gi'))].map(a => a.index).length === 0) {
                    const insideCounter = [...JSON.stringify(variable).matchAll(new RegExp(variable.name, 'gi'))].map(a => a.index);
                    const variableUsage = [...JSON.stringify(flow.elements.filter(node => node instanceof core.FlowVariable)).matchAll(new RegExp(variableName, 'gi'))].map(a => a.index);
                    // finally also checks indexes where name occurs in the variable itself and where name occurs in all variables
                    // when this is the same, variable must be unused.
                    if (variableUsage.length === insideCounter.length) {
                        unusedVariables.push(variable);
                    }
                }
            }
        }
        let results = [];
        for (const det of unusedVariables) {
            results.push(new core.ResultDetails(det));
        }
        return new core.RuleResult(this, results);
    }
}
exports.UnusedVariable = UnusedVariable;
//# sourceMappingURL=UnusedVariable.js.map

/***/ }),

/***/ 771:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultRuleStore = void 0;
const APIVersion_1 = __nccwpck_require__(590);
const AutoLayout_1 = __nccwpck_require__(701);
const CopyAPIName_1 = __nccwpck_require__(645);
const DMLStatementInLoop_1 = __nccwpck_require__(284);
const DuplicateDMLOperation_1 = __nccwpck_require__(776);
const FlowDescription_1 = __nccwpck_require__(412);
const FlowName_1 = __nccwpck_require__(153);
const HardcodedId_1 = __nccwpck_require__(312);
const InactiveFlow_1 = __nccwpck_require__(736);
const MissingFaultPath_1 = __nccwpck_require__(799);
const MissingNullHandler_1 = __nccwpck_require__(473);
const ProcessBuilder_1 = __nccwpck_require__(560);
const SOQLQueryInLoop_1 = __nccwpck_require__(404);
const UnconnectedElement_1 = __nccwpck_require__(384);
const UnusedVariable_1 = __nccwpck_require__(500);
exports.DefaultRuleStore = {
    APIVersion: APIVersion_1.APIVersion,
    AutoLayout: AutoLayout_1.AutoLayout,
    CopyAPIName: CopyAPIName_1.CopyAPIName,
    DMLStatementInLoop: DMLStatementInLoop_1.DMLStatementInLoop,
    DuplicateDMLOperation: DuplicateDMLOperation_1.DuplicateDMLOperation,
    FlowDescription: FlowDescription_1.FlowDescription,
    FlowName: FlowName_1.FlowName,
    HardcodedId: HardcodedId_1.HardcodedId,
    MissingFaultPath: MissingFaultPath_1.MissingFaultPath,
    MissingNullHandler: MissingNullHandler_1.MissingNullHandler,
    ProcessBuilder: ProcessBuilder_1.ProcessBuilder,
    SOQLQueryInLoop: SOQLQueryInLoop_1.SOQLQueryInLoop,
    UnconnectedElement: UnconnectedElement_1.UnconnectedElement,
    UnusedVariable: UnusedVariable_1.UnusedVariable,
    InactiveFlow: InactiveFlow_1.InactiveFlow,
};
//# sourceMappingURL=DefaultRuleStore.js.map

/***/ }),

/***/ 435:
/***/ ((module) => {

module.exports = JSON.parse('{"ids":[{"Key Prefix":"000","Object Type":"EmptyKey","Notes":"Ref"},{"Key Prefix":"001","Object Type":"Account","Notes":""},{"Key Prefix":"002","Object Type":"Note","Notes":"Doc"},{"Key Prefix":"003","Object Type":"Contact","Notes":""},{"Key Prefix":"005","Object Type":"User","Notes":""},{"Key Prefix":"006","Object Type":"Opportunity","Notes":""},{"Key Prefix":"007","Object Type":"Activity","Notes":""},{"Key Prefix":"008","Object Type":"OpportunityHistory","Notes":""},{"Key Prefix":"00A","Object Type":"FORECAST_ITEM","Notes":""},{"Key Prefix":"00B","Object Type":"ListView","Notes":""},{"Key Prefix":"00C","Object Type":"DeleteEvent","Notes":"/DELETE_EVENT"},{"Key Prefix":"00D","Object Type":"Organization","Notes":""},{"Key Prefix":"00E","Object Type":"UserRole","Notes":""},{"Key Prefix":"00F","Object Type":"QUEUE","Notes":"- TDC"},{"Key Prefix":"00G","Object Type":"Group","Notes":""},{"Key Prefix":"00I","Object Type":"Partner","Notes":"Also OpportunityPartner, which \\"is automatically created when a Partner object is created for a partner relationship between an account and an opportunity\\""},{"Key Prefix":"00I","Object Type":"AccountPartner","Notes":"/Partner"},{"Key Prefix":"00I","Object Type":"OpportunityPartner","Notes":"/Partner"},{"Key Prefix":"00J","Object Type":"OpportunityCompetitor","Notes":""},{"Key Prefix":"00K","Object Type":"OpportunityContactRole","Notes":""},{"Key Prefix":"00M","Object Type":"MobileSettingsAssignment","Notes":""},{"Key Prefix":"00N","Object Type":"CustomFieldDefinition","Notes":"- Setup > Create > Objects > [Your Object] > [Your Field]"},{"Key Prefix":"00O","Object Type":"Report","Notes":""},{"Key Prefix":"00P","Object Type":"Attachment","Notes":""},{"Key Prefix":"00Q","Object Type":"Lead","Notes":""},{"Key Prefix":"00R","Object Type":"MassOperationsSubsetResults","Notes":""},{"Key Prefix":"00S","Object Type":"ImportQueue","Notes":""},{"Key Prefix":"00T","Object Type":"Task","Notes":""},{"Key Prefix":"00U","Object Type":"Event","Notes":"Doc"},{"Key Prefix":"00X","Object Type":"EmailTemplate","Notes":""},{"Key Prefix":"00Y","Object Type":"EmailTemp","Notes":""},{"Key Prefix":"00a","Object Type":"COMMENTS","Notes":""},{"Key Prefix":"00a","Object Type":"CaseComment","Notes":"or IdeaComment"},{"Key Prefix":"00a","Object Type":"IdeaComment","Notes":"or CaseComment"},{"Key Prefix":"00b","Object Type":"WebLink","Notes":"- Custom Button or Link - CUSTOM_RESOURCE_LINK"},{"Key Prefix":"00c","Object Type":"Training","Notes":""},{"Key Prefix":"00d","Object Type":"AutomatedProcessUserId","Notes":"TBC - In v48, User.UserName field for Automated Process user is autoproc@00d0q0000000okqeaq"},{"Key Prefix":"00e","Object Type":"Profile","Notes":""},{"Key Prefix":"00f","Object Type":"MH_BLUESHEET","Notes":""},{"Key Prefix":"00g","Object Type":"MH_GOLDSHEET","Notes":""},{"Key Prefix":"00h","Object Type":"Layout","Notes":"- Page Layout"},{"Key Prefix":"00i","Object Type":"Pricebook","Notes":""},{"Key Prefix":"00j","Object Type":"Product","Notes":"- PRICEBOOK_ENTRY_MAPPING"},{"Key Prefix":"00k","Object Type":"OpportunityLineItem","Notes":""},{"Key Prefix":"00l","Object Type":"Folder","Notes":""},{"Key Prefix":"00m","Object Type":"EMAIL_ATTACHMENT_LOOKUP","Notes":""},{"Key Prefix":"00n","Object Type":"EMAIL_ATTACHMENT_ARCHIVE","Notes":""},{"Key Prefix":"00o","Object Type":"OpportunityLineItemSchedule","Notes":"Doc"},{"Key Prefix":"Represents information about the quantity, revenue distribution, and delivery dates for a particular OpportunityLineItem.","Object Type":"","Notes":""},{"Key Prefix":"Products, Price Books, and Schedules Overview","Object Type":"","Notes":""},{"Key Prefix":"00p","Object Type":"UserTeamMember","Notes":""},{"Key Prefix":"00q","Object Type":"OpportunityTeamMember","Notes":"Doc - \\"This object is available only in organizations that have enabled team selling.\\""},{"Key Prefix":"00r","Object Type":"AccountShare","Notes":""},{"Key Prefix":"00s","Object Type":"AccountOwnerSharingRule","Notes":""},{"Key Prefix":"00t","Object Type":"OpportunityShare","Notes":""},{"Key Prefix":"00u","Object Type":"OpportunityOwnerSharingRule","Notes":""},{"Key Prefix":"00v","Object Type":"CampaignMember","Notes":""},{"Key Prefix":"00w","Object Type":"MassOperationsNotification","Notes":"/ PAYMENT_APPLICATION"},{"Key Prefix":"00x","Object Type":"BILLED_PRODUCT","Notes":""},{"Key Prefix":"00y","Object Type":"PURCHASE_RULE","Notes":""},{"Key Prefix":"00z","Object Type":"PURCHASE_RULE_ENTRY","Notes":""},{"Key Prefix":"010","Object Type":"CaseSolution","Notes":""},{"Key Prefix":"011","Object Type":"GroupMember","Notes":""},{"Key Prefix":"012","Object Type":"RecordType","Notes":""},{"Key Prefix":"013","Object Type":"RecordTypePicklist","Notes":""},{"Key Prefix":"014","Object Type":"ProfileRecordType","Notes":""},{"Key Prefix":"015","Object Type":"Document","Notes":""},{"Key Prefix":"016","Object Type":"BrandTemplate","Notes":"Doc (Letterhead)"},{"Key Prefix":"017","Object Type":"EntityHistory","Notes":"Prefix for all xxxHistory objects (Standard/custom) except OpportunityHistory which is 008"},{"Key Prefix":"018","Object Type":"EmailStatus","Notes":""},{"Key Prefix":"019","Object Type":"BusinessProcess","Notes":""},{"Key Prefix":"01A","Object Type":"BusinessProcessPicklist","Notes":""},{"Key Prefix":"01B","Object Type":"LayoutSection","Notes":""},{"Key Prefix":"01C","Object Type":"LayoutItem","Notes":""},{"Key Prefix":"01D","Object Type":"UserAccountTeamMember","Notes":""},{"Key Prefix":"01E","Object Type":"EntityAttributes","Notes":""},{"Key Prefix":"01G","Object Type":"ProfileLayout","Notes":""},{"Key Prefix":"01H","Object Type":"MailmergeTemplate","Notes":""},{"Key Prefix":"01I","Object Type":"CustomEntityDefinition","Notes":"a.k.a. External Object"},{"Key Prefix":"01J","Object Type":"PicklistMaster","Notes":"Use caution as there are at least two object types exposed via the partner API with the same keyPrefix!"},{"Key Prefix":"01J","Object Type":"LeadStatus","Notes":"/PicklistMaster"},{"Key Prefix":"01J","Object Type":"OpportunityStage","Notes":"/PicklistMaster"},{"Key Prefix":"01K","Object Type":"ActivityMetricRollupBase","Notes":""},{"Key Prefix":"01L","Object Type":"CurrencyType","Notes":""},{"Key Prefix":"01M","Object Type":"AccountTeamMember","Notes":""},{"Key Prefix":"01N","Object Type":"Scontrol","Notes":""},{"Key Prefix":"01O","Object Type":"USER_UI_CONFIGURATION","Notes":""},{"Key Prefix":"01P","Object Type":"PermissionSetTabSetting","Notes":""},{"Key Prefix":"01Q","Object Type":"WorkflowRule","Notes":"/AssignmentRule Docs"},{"Key Prefix":"01Q","Object Type":"AssignmentRule","Notes":""},{"Key Prefix":"01R","Object Type":"RuleFilter","Notes":""},{"Key Prefix":"01S","Object Type":"RuleFilterItem","Notes":""},{"Key Prefix":"01T","Object Type":"RuleFilterAction","Notes":""},{"Key Prefix":"01U","Object Type":"ActionAssignEscalate","Notes":""},{"Key Prefix":"01V","Object Type":"ActionTask","Notes":""},{"Key Prefix":"01W","Object Type":"ActionEmail","Notes":""},{"Key Prefix":"01X","Object Type":"ActionEmailRecipient","Notes":""},{"Key Prefix":"01Y","Object Type":"CampaignMemberStatus","Notes":""},{"Key Prefix":"01Z","Object Type":"Dashboard","Notes":"Doc"},{"Key Prefix":"01a","Object Type":"DashboardComponent","Notes":""},{"Key Prefix":"01b","Object Type":"ListViewCriterion","Notes":""},{"Key Prefix":"01c","Object Type":"ListViewDisplayColumn","Notes":""},{"Key Prefix":"01d","Object Type":"FOLDER_GROUPS","Notes":""},{"Key Prefix":"01e","Object Type":"PicklistSet","Notes":""},{"Key Prefix":"01f","Object Type":"Scorecard","Notes":"/ WEBEX_MEETING"},{"Key Prefix":"01g","Object Type":"API_QUERY","Notes":"The first part of the QueryLocatory returned for an API SOQL query that needs to be paged."},{"Key Prefix":"01h","Object Type":"Translation","Notes":""},{"Key Prefix":"01i","Object Type":"TRANSLATION_USER","Notes":""},{"Key Prefix":"01j","Object Type":"LocalizedValue","Notes":""},{"Key Prefix":"01k","Object Type":"FieldPermissions","Notes":"a.k.a. PROFILE_FLS_ITEM"},{"Key Prefix":"01l","Object Type":"ActionResponse","Notes":""},{"Key Prefix":"01m","Object Type":"BusinessHours","Notes":""},{"Key Prefix":"01n","Object Type":"CaseShare","Notes":""},{"Key Prefix":"01o","Object Type":"LeadShare","Notes":""},{"Key Prefix":"01p","Object Type":"ApexClass","Notes":"Doc"},{"Key Prefix":"01q","Object Type":"ApexTrigger","Notes":""},{"Key Prefix":"01r","Object Type":"CustomTabDefinition","Notes":"Visualforce Tab"},{"Key Prefix":"01s","Object Type":"Pricebook2","Notes":""},{"Key Prefix":"01t","Object Type":"Product2","Notes":""},{"Key Prefix":"01u","Object Type":"PricebookEntry","Notes":""},{"Key Prefix":"01v","Object Type":"PricebookShare","Notes":""},{"Key Prefix":"01w","Object Type":"OpportunityUpdateReminder","Notes":""},{"Key Prefix":"01x","Object Type":"OPP_UPDATE_REMINDER_STATS","Notes":""},{"Key Prefix":"01y","Object Type":"CaseOwnerSharingRule","Notes":""},{"Key Prefix":"01z","Object Type":"CaseEscalation","Notes":""},{"Key Prefix":"020","Object Type":"ExternalIdMap","Notes":"/EventAttendee"},{"Key Prefix":"021","Object Type":"QUANTITY_FORECAST","Notes":""},{"Key Prefix":"022","Object Type":"FiscalYearSettings","Notes":""},{"Key Prefix":"023","Object Type":"Calendar","Notes":""},{"Key Prefix":"024","Object Type":"CalendarShare","Notes":""},{"Key Prefix":"025","Object Type":"ListLayoutItem","Notes":""},{"Key Prefix":"026","Object Type":"Period","Notes":""},{"Key Prefix":"027","Object Type":"REVENUE_FORECAST","Notes":""},{"Key Prefix":"028","Object Type":"OPPORTUNITY_OVERRIDE","Notes":""},{"Key Prefix":"029","Object Type":"LINEITEM_OVERRIDE","Notes":""},{"Key Prefix":"02A","Object Type":"LeadOwnerSharingRule","Notes":""},{"Key Prefix":"02B","Object Type":"LabelDefinition","Notes":""},{"Key Prefix":"02C","Object Type":"LabelData","Notes":""},{"Key Prefix":"02D","Object Type":"CaseHistory2","Notes":""},{"Key Prefix":"02E","Object Type":"HELP_SETTING","Notes":""},{"Key Prefix":"02F","Object Type":"CustomFieldMap","Notes":""},{"Key Prefix":"02G","Object Type":"TenantSecret","Notes":""},{"Key Prefix":"02H","Object Type":"EltWorkflowJobDetail","Notes":"/MH_GOLD_PROGRAM"},{"Key Prefix":"02I","Object Type":"InsightsApplication","Notes":"/MH_GOLD_INFORMATION"},{"Key Prefix":"02J","Object Type":"RecommendationAudience","Notes":""},{"Key Prefix":"02K","Object Type":"Dataflow","Notes":"MH_GOLD_ACTION"},{"Key Prefix":"02L","Object Type":"DataflowVersion","Notes":"/MH_CUSTOMER_CRITERION"},{"Key Prefix":"02M","Object Type":"DatasetAccess","Notes":"/MH_GREENSHEET"},{"Key Prefix":"02N","Object Type":"ContentLogMetricsByOrg","Notes":""},{"Key Prefix":"02O","Object Type":"DatasetRegister","Notes":"/MH_GREEN_GET_INFO"},{"Key Prefix":"02P","Object Type":"DataflowGroupMember","Notes":"/MH_CONTACT_ROLE"},{"Key Prefix":"02Q","Object Type":"DataflowGroupDependency","Notes":"/MH_INFORMATION"},{"Key Prefix":"02R","Object Type":"USER_PREFERENCE2","Notes":""},{"Key Prefix":"02S","Object Type":"HTML_COMPONENT","Notes":""},{"Key Prefix":"02T","Object Type":"CustomPage","Notes":""},{"Key Prefix":"02U","Object Type":"CustomPageItem","Notes":""},{"Key Prefix":"02V","Object Type":"PageComponent","Notes":""},{"Key Prefix":"02W","Object Type":"DataflowGroupTrigger","Notes":""},{"Key Prefix":"02X","Object Type":"CustomPageProfile","Notes":""},{"Key Prefix":"02Y","Object Type":"UserComponentData","Notes":""},{"Key Prefix":"02Z","Object Type":"AccountContactRole","Notes":""},{"Key Prefix":"02a","Object Type":"ContractContactRole","Notes":""},{"Key Prefix":"02b","Object Type":"ComponentResourceLink","Notes":""},{"Key Prefix":"02c","Object Type":"SharingRule","Notes":""},{"Key Prefix":"02c","Object Type":"VoiceCallRecordingShare","Notes":""},{"Key Prefix":"02c","Object Type":"VoiceCallShare","Notes":""},{"Key Prefix":"02d","Object Type":"DIVISION","Notes":""},{"Key Prefix":"02e","Object Type":"DIVISION_WORKFLOW_RULE","Notes":""},{"Key Prefix":"02f","Object Type":"DelegateGroup","Notes":""},{"Key Prefix":"02g","Object Type":"DelegateGroupMember","Notes":""},{"Key Prefix":"02h","Object Type":"DelegateGroupGrant","Notes":""},{"Key Prefix":"02i","Object Type":"Asset","Notes":""},{"Key Prefix":"02j","Object Type":"PROFILE_ENTITY_PERMISSIONS","Notes":"CategoryAccess"},{"Key Prefix":"02k","Object Type":"ListLayout","Notes":""},{"Key Prefix":"02l","Object Type":"OUTBOUND_QUEUE","Notes":""},{"Key Prefix":"02m","Object Type":"CustomIndex","Notes":""},{"Key Prefix":"02n","Object Type":"CategoryNode","Notes":""},{"Key Prefix":"02o","Object Type":"CategoryData","Notes":""},{"Key Prefix":"02p","Object Type":"DivTransferEvent","Notes":""},{"Key Prefix":"02q","Object Type":"LayoutItemColumn","Notes":""},{"Key Prefix":"02r","Object Type":"OpportunityAlert","Notes":""},{"Key Prefix":"02s","Object Type":"EmailMessage","Notes":""},{"Key Prefix":"02t","Object Type":"EmailRoutingAddress","Notes":""},{"Key Prefix":"02u","Object Type":"TabSet","Notes":"AKA. Apps"},{"Key Prefix":"02v","Object Type":"TabSetMember","Notes":""},{"Key Prefix":"02w","Object Type":"LoginIpRange","Notes":""},{"Key Prefix":"02x","Object Type":"LoginHours","Notes":""},{"Key Prefix":"02y","Object Type":"ReportAggregate","Notes":""},{"Key Prefix":"02z","Object Type":"ReportColorRange","Notes":""},{"Key Prefix":"030","Object Type":"DataflowRequest","Notes":"/PROFILE_TAB_SET"},{"Key Prefix":"031","Object Type":"USER_TAB_SET_MEMBER","Notes":""},{"Key Prefix":"032","Object Type":"ACC_TERRITORY_RULE","Notes":""},{"Key Prefix":"033","Object Type":"AllPackage","Notes":"Package being built in the developer org"},{"Key Prefix":"033","Object Type":"MetadataPackage","Notes":""},{"Key Prefix":"034","Object Type":"PackageMember","Notes":""},{"Key Prefix":"035","Object Type":"SelfServiceUser","Notes":""},{"Key Prefix":"036","Object Type":"DataAssessmentConfigItem","Notes":""},{"Key Prefix":"037","Object Type":"ReportColumn","Notes":""},{"Key Prefix":"038","Object Type":"ReportFilterItem","Notes":""},{"Key Prefix":"039","Object Type":"ReportBreak","Notes":""},{"Key Prefix":"03A","Object Type":"CalendarView","Notes":"/Calendar2/CustomObjectCalendar"},{"Key Prefix":"03B","Object Type":"CalendarModel","Notes":""},{"Key Prefix":"03C","Object Type":"DataflowInstance","Notes":""},{"Key Prefix":"03D","Object Type":"ContactOwnerSharingRule","Notes":""},{"Key Prefix":"03E","Object Type":"GatherStatsTaskInfo","Notes":""},{"Key Prefix":"03G","Object Type":"AccountCriteriaSharingRule","Notes":""},{"Key Prefix":"03H","Object Type":"ContactCriteriaSharingRule","Notes":""},{"Key Prefix":"03I","Object Type":"CaseCriteriaSharingRule","Notes":""},{"Key Prefix":"03J","Object Type":"ChatterMessage","Notes":""},{"Key Prefix":"03K","Object Type":"ChatterMessageThread","Notes":""},{"Key Prefix":"03L","Object Type":"DataflowNode","Notes":""},{"Key Prefix":"03M","Object Type":"ChatterConversation","Notes":""},{"Key Prefix":"03N","Object Type":"ChatterConversationMember","Notes":""},{"Key Prefix":"03O","Object Type":"CardPaymentMethod","Notes":""},{"Key Prefix":"03P","Object Type":"DataAssessmentMetric","Notes":""},{"Key Prefix":"03Q","Object Type":"DataAssessmentFieldMetric","Notes":""},{"Key Prefix":"03R","Object Type":"DataAssessmentValueMetric","Notes":""},{"Key Prefix":"03S","Object Type":"ContentAsset","Notes":""},{"Key Prefix":"03U","Object Type":"DataAssessmentBIMetrics","Notes":""},{"Key Prefix":"03V","Object Type":"CampaignInfluenceModel","Notes":""},{"Key Prefix":"03Y","Object Type":"InteractionScreenRule","Notes":""},{"Key Prefix":"03Z","Object Type":"InteractionScreenRuleAction","Notes":""},{"Key Prefix":"03a","Object Type":"DependentPicklist","Notes":""},{"Key Prefix":"03b","Object Type":"SubscriberPackageVersionInstallRequest","Notes":""},{"Key Prefix":"03c","Object Type":"LayoutRightPanel","Notes":""},{"Key Prefix":"03d","Object Type":"ValidationFormula","Notes":"Validation Rule"},{"Key Prefix":"03e","Object Type":"CustomSetupDefinition","Notes":""},{"Key Prefix":"03f","Object Type":"CustomSetup","Notes":""},{"Key Prefix":"03g","Object Type":"QueueSobject","Notes":""},{"Key Prefix":"03h","Object Type":"ExternalServiceAction","Notes":""},{"Key Prefix":"03i","Object Type":"ConsoleConfig","Notes":""},{"Key Prefix":"03j","Object Type":"CaseContactRole","Notes":""},{"Key Prefix":"03k","Object Type":"ConsoleConfigItem","Notes":""},{"Key Prefix":"03m","Object Type":"ExternalServiceType","Notes":""},{"Key Prefix":"03n","Object Type":"ApexClassIdentifier","Notes":""},{"Key Prefix":"03o","Object Type":"ExternalActionParameter","Notes":""},{"Key Prefix":"03q","Object Type":"ApexClassIdentifierRelationship","Notes":""},{"Key Prefix":"03r","Object Type":"AssignedResource","Notes":""},{"Key Prefix":"03s","Object Type":"ContactShare","Notes":""},{"Key Prefix":"03u","Object Type":"UserPreference","Notes":""},{"Key Prefix":"03v","Object Type":"Package2Member","Notes":""},{"Key Prefix":"040","Object Type":"ReportParam","Notes":""},{"Key Prefix":"041","Object Type":"ACC_TERRITORY_ASSIGN","Notes":""},{"Key Prefix":"042","Object Type":"ACC_TERR_ASSIGN_RULE_ITEM","Notes":""},{"Key Prefix":"043","Object Type":"OutboundField","Notes":""},{"Key Prefix":"044","Object Type":"ExternalizedReference","Notes":""},{"Key Prefix":"045","Object Type":"PartnerNetworkSetup","Notes":""},{"Key Prefix":"049","Object Type":"OpportunitySplit","Notes":""},{"Key Prefix":"04B","Object Type":"Bookmark","Notes":""},{"Key Prefix":"04E","Object Type":"SandOmObserver","Notes":""},{"Key Prefix":"04F","Object Type":"LoginGeo","Notes":""},{"Key Prefix":"04G","Object Type":"DatacloudIndustryCode","Notes":""},{"Key Prefix":"04H","Object Type":"InstanceDirective","Notes":""},{"Key Prefix":"04I","Object Type":"EmbeddedServiceConfig","Notes":""},{"Key Prefix":"04P","Object Type":"PartnerNetworkConnection","Notes":"Doc"},{"Key Prefix":"04Q","Object Type":"LearningItem","Notes":"/LogAnalysisRun"},{"Key Prefix":"04R","Object Type":"LearningLink","Notes":"/LogAnalysisItem"},{"Key Prefix":"04S","Object Type":"USER_TERRITORY","Notes":""},{"Key Prefix":"04T","Object Type":"TERRITORY","Notes":""},{"Key Prefix":"04U","Object Type":"DNB_ACCOUNT_MAPPING","Notes":""},{"Key Prefix":"04V","Object Type":"PartnerNetworkRecordConnection","Notes":"Doc"},{"Key Prefix":"04W","Object Type":"RevenueForecastHistory","Notes":""},{"Key Prefix":"04X","Object Type":"QuantityForecastHistory","Notes":""},{"Key Prefix":"04Y","Object Type":"ActionFieldUpdate","Notes":"Field Update"},{"Key Prefix":"04Z","Object Type":"EntityLock","Notes":""},{"Key Prefix":"04a","Object Type":"ProcessDefinition","Notes":""},{"Key Prefix":"04b","Object Type":"ProcessNode","Notes":""},{"Key Prefix":"04c","Object Type":"ProcessTransition","Notes":""},{"Key Prefix":"04d","Object Type":"ProcessTransitionCondition","Notes":""},{"Key Prefix":"04e","Object Type":"ProcessActionItem","Notes":""},{"Key Prefix":"04f","Object Type":"ProcessWorkitemProperties","Notes":""},{"Key Prefix":"04g","Object Type":"ProcessInstance","Notes":""},{"Key Prefix":"04h","Object Type":"ProcessInstanceStep","Notes":""},{"Key Prefix":"04i","Object Type":"ProcessInstanceWorkitem","Notes":""},{"Key Prefix":"04j","Object Type":"ProcessAllowedSubmitter","Notes":""},{"Key Prefix":"04k","Object Type":"ActionOutboundMessage","Notes":"Outbound Message Id"},{"Key Prefix":"04l","Object Type":"OutboundMessage","Notes":"Outbound Notification Id"},{"Key Prefix":"04m","Object Type":"AdditionalNumber","Notes":""},{"Key Prefix":"04n","Object Type":"SoftphoneLayout","Notes":""},{"Key Prefix":"04o","Object Type":"SoftphoneLayoutSection","Notes":""},{"Key Prefix":"04p","Object Type":"SoftphoneLayoutItem","Notes":""},{"Key Prefix":"04q","Object Type":"SoftphoneLayoutInfoField","Notes":""},{"Key Prefix":"04r","Object Type":"SoftphoneLayoutCallType","Notes":""},{"Key Prefix":"04s","Object Type":"AsyncRequest","Notes":"AsyncResult, DeployResult"},{"Key Prefix":"04t","Object Type":"AllPackageVersion","Notes":"Install Package - Subscriber Package Version ID"},{"Key Prefix":"04t","Object Type":"MetadataPackageVersion","Notes":""},{"Key Prefix":"04u","Object Type":"ActionOverride","Notes":""},{"Key Prefix":"04v","Object Type":"CallCenter","Notes":""},{"Key Prefix":"04w","Object Type":"DatedConversionRate","Notes":""},{"Key Prefix":"04x","Object Type":"PackageExtension","Notes":""},{"Key Prefix":"04y","Object Type":"ListColumn","Notes":""},{"Key Prefix":"04z","Object Type":"LayoutItemActionRef","Notes":""},{"Key Prefix":"050","Object Type":"PackageLicense","Notes":""},{"Key Prefix":"051","Object Type":"UserPackageLicense","Notes":""},{"Key Prefix":"052","Object Type":"SfdcOutboundMessage","Notes":""},{"Key Prefix":"053","Object Type":"WorkflowTimeTrigger","Notes":""},{"Key Prefix":"054","Object Type":"WorkflowTimeAction","Notes":""},{"Key Prefix":"055","Object Type":"WorkflowTimeQueue","Notes":""},{"Key Prefix":"056","Object Type":"ContentTagName","Notes":""},{"Key Prefix":"057","Object Type":"ContentDocumentSubscription","Notes":""},{"Key Prefix":"058","Object Type":"ContentWorkspace","Notes":"Doc"},{"Key Prefix":"059","Object Type":"ContentWorkspaceDoc","Notes":""},{"Key Prefix":"05A","Object Type":"ContentWorkspaceMember","Notes":"/ContentWorkspaceMembership"},{"Key Prefix":"05B","Object Type":"CampaignCriteriaSharingRule","Notes":""},{"Key Prefix":"05C","Object Type":"ContentVersionComment","Notes":""},{"Key Prefix":"05D","Object Type":"ContentDistribution","Notes":""},{"Key Prefix":"05E","Object Type":"AsyncApiBatchOptions","Notes":""},{"Key Prefix":"05F","Object Type":"ApexTestSuite","Notes":""},{"Key Prefix":"05G","Object Type":"IpWhitelist","Notes":""},{"Key Prefix":"05H","Object Type":"ContentDistributionView","Notes":""},{"Key Prefix":"05I","Object Type":"CampaignSharingRuleFilterItem","Notes":""},{"Key Prefix":"05J","Object Type":"ContentVersionRating","Notes":""},{"Key Prefix":"05K","Object Type":"ContentVersionRenditionContent","Notes":""},{"Key Prefix":"05L","Object Type":"DBCThumbnailFilter","Notes":""},{"Key Prefix":"05M","Object Type":"Experiment","Notes":""},{"Key Prefix":"05N","Object Type":"ContentVersionTagName","Notes":""},{"Key Prefix":"05P","Object Type":"ContentWorkspacePermission","Notes":""},{"Key Prefix":"05Q","Object Type":"ContentTagSubscription","Notes":""},{"Key Prefix":"05R","Object Type":"ContentWorkspaceSubscription","Notes":""},{"Key Prefix":"05S","Object Type":"ContentUserSubscription","Notes":""},{"Key Prefix":"05T","Object Type":"ContentBody","Notes":""},{"Key Prefix":"05U","Object Type":"EntityFeedLayout","Notes":""},{"Key Prefix":"05V","Object Type":"ContentNotification","Notes":""},{"Key Prefix":"05W","Object Type":"ContentNotificationParam","Notes":""},{"Key Prefix":"05X","Object Type":"DocumentAttachmentMap","Notes":""},{"Key Prefix":"05Z","Object Type":"ContentWorkspaceRecentEvent","Notes":""},{"Key Prefix":"05a","Object Type":"DataStatistics","Notes":""},{"Key Prefix":"05c","Object Type":"CopyExportChunk2","Notes":""},{"Key Prefix":"05d","Object Type":"CopyImportChunk2","Notes":""},{"Key Prefix":"05e","Object Type":"CopyEntityTally2","Notes":""},{"Key Prefix":"05f","Object Type":"AcceptedRecommendation","Notes":""},{"Key Prefix":"05g","Object Type":"TwoFactorTempCode","Notes":""},{"Key Prefix":"05i","Object Type":"Package2Version","Notes":"Package Version ID"},{"Key Prefix":"05j","Object Type":"CommunityTemplateDefinition","Notes":""},{"Key Prefix":"05k","Object Type":"ColorDefinition","Notes":""},{"Key Prefix":"05l","Object Type":"CommunityThemeDefinition","Notes":""},{"Key Prefix":"05m","Object Type":"ApexTestRunResult","Notes":""},{"Key Prefix":"05n","Object Type":"ApexTestResultLimits","Notes":""},{"Key Prefix":"05o","Object Type":"EclairNgMapGeoJson","Notes":""},{"Key Prefix":"05p","Object Type":"EclairNgMap","Notes":""},{"Key Prefix":"05q","Object Type":"AssistantRecommendation","Notes":""},{"Key Prefix":"05t","Object Type":"CustomEntityTranslation","Notes":""},{"Key Prefix":"05v","Object Type":"DataPrepRecipe","Notes":""},{"Key Prefix":"05y","Object Type":"DirectMessage","Notes":""},{"Key Prefix":"05z","Object Type":"DirectMessageMember","Notes":""},{"Key Prefix":"060","Object Type":"Portal","Notes":""},{"Key Prefix":"061","Object Type":"PortalAccount","Notes":""},{"Key Prefix":"062","Object Type":"PortalStyleConfig","Notes":""},{"Key Prefix":"063","Object Type":"MobileConfig","Notes":""},{"Key Prefix":"064","Object Type":"QuerySet","Notes":""},{"Key Prefix":"065","Object Type":"QuerySetItem","Notes":""},{"Key Prefix":"066","Object Type":"ApexPage","Notes":""},{"Key Prefix":"067","Object Type":"PortalMember","Notes":""},{"Key Prefix":"068","Object Type":"ContentVersion","Notes":""},{"Key Prefix":"069","Object Type":"ContentDocument","Notes":""},{"Key Prefix":"069","Object Type":"ContentNote","Notes":"/ContentDocument"},{"Key Prefix":"06A","Object Type":"ContentDocumentLink","Notes":""},{"Key Prefix":"06B","Object Type":"ContentWorkspaceAllowedRecType","Notes":""},{"Key Prefix":"06E","Object Type":"DandBCompany","Notes":""},{"Key Prefix":"06F","Object Type":"EmailCapture","Notes":""},{"Key Prefix":"06G","Object Type":"CustomConsoleComponent","Notes":""},{"Key Prefix":"06M","Object Type":"LogoutEvent","Notes":"BigObjectForReporting"},{"Key Prefix":"06N","Object Type":"ApplicationDependency","Notes":""},{"Key Prefix":"06O","Object Type":"ServiceDeskAttributes","Notes":""},{"Key Prefix":"06P","Object Type":"Application","Notes":"Connected App"},{"Key Prefix":"06V","Object Type":"InsightsExternalData","Notes":""},{"Key Prefix":"06W","Object Type":"InsightsExternalDataPart","Notes":""},{"Key Prefix":"06Y","Object Type":"FeedActionDefinition","Notes":""},{"Key Prefix":"06a","Object Type":"LocalNamespace","Notes":""},{"Key Prefix":"06b","Object Type":"FeedActionState","Notes":""},{"Key Prefix":"06c","Object Type":"EltWorkflowAudit","Notes":""},{"Key Prefix":"06d","Object Type":"GrantedByLicense","Notes":""},{"Key Prefix":"06e","Object Type":"DdcProspectorMetrics","Notes":""},{"Key Prefix":"06f","Object Type":"EdgeMartDataShard","Notes":""},{"Key Prefix":"06g","Object Type":"EdgeMartDataShardFile","Notes":""},{"Key Prefix":"06h","Object Type":"FileSearchActivity","Notes":""},{"Key Prefix":"06i","Object Type":"FlexQueueItem","Notes":""},{"Key Prefix":"06j","Object Type":"ApexEmailNotification","Notes":""},{"Key Prefix":"06k","Object Type":"ProfileActionOverride","Notes":""},{"Key Prefix":"06l","Object Type":"OverridableEntities","Notes":""},{"Key Prefix":"06m","Object Type":"AppDefinition","Notes":""},{"Key Prefix":"06n","Object Type":"ServicePresenceStatusInfo","Notes":""},{"Key Prefix":"06o","Object Type":"AppTabMember","Notes":""},{"Key Prefix":"06p","Object Type":"NotifTypeUserSetting","Notes":""},{"Key Prefix":"06q","Object Type":"BackgroundOperationResult","Notes":""},{"Key Prefix":"06r","Object Type":"AppNotificationType","Notes":""},{"Key Prefix":"06s","Object Type":"SkinnyTable","Notes":""},{"Key Prefix":"06t","Object Type":"SkinnyTableField","Notes":""},{"Key Prefix":"06u","Object Type":"PresenceUserConfigInfo","Notes":""},{"Key Prefix":"06v","Object Type":"AppNotifTypeUserSetting","Notes":""},{"Key Prefix":"06w","Object Type":"AppBrand","Notes":""},{"Key Prefix":"06y","Object Type":"SubscriberPackageVersionUninstallRequest","Notes":""},{"Key Prefix":"070","Object Type":"CustomReportType","Notes":""},{"Key Prefix":"071","Object Type":"CrtObject","Notes":""},{"Key Prefix":"072","Object Type":"CrtColumn","Notes":"Related to reports in some way."},{"Key Prefix":"073","Object Type":"CrtLayoutSection","Notes":""},{"Key Prefix":"074","Object Type":"CorsWhitelistEntry","Notes":""},{"Key Prefix":"075","Object Type":"DuplicateErrorLog","Notes":""},{"Key Prefix":"076","Object Type":"RateLimitingNotification","Notes":""},{"Key Prefix":"077","Object Type":"ApiCapture","Notes":""},{"Key Prefix":"078","Object Type":"ApiUsage","Notes":""},{"Key Prefix":"079","Object Type":"MobileMarkedRecord","Notes":""},{"Key Prefix":"07A","Object Type":"MassMail","Notes":""},{"Key Prefix":"07D","Object Type":"FeedPostTemplate","Notes":""},{"Key Prefix":"07E","Object Type":"Sandbox","Notes":""},{"Key Prefix":"07F","Object Type":"FeedFavorite","Notes":""},{"Key Prefix":"07G","Object Type":"SummaryRecalcQueue","Notes":""},{"Key Prefix":"07H","Object Type":"ContentFolder","Notes":""},{"Key Prefix":"07I","Object Type":"ContentFolderMember","Notes":""},{"Key Prefix":"07J","Object Type":"ComponentObjectDependency","Notes":""},{"Key Prefix":"07K","Object Type":"ComponentFeatureDependency","Notes":""},{"Key Prefix":"07L","Object Type":"ApexLog","Notes":""},{"Key Prefix":"07M","Object Type":"ApexTestResult","Notes":"Doc"},{"Key Prefix":"07N","Object Type":"ActionLinkTemplateBinding","Notes":""},{"Key Prefix":"07O","Object Type":"Canvas","Notes":""},{"Key Prefix":"07P","Object Type":"EntitySizeJob","Notes":""},{"Key Prefix":"07R","Object Type":"DataCategoryMapping","Notes":""},{"Key Prefix":"07S","Object Type":"CleanDataService","Notes":"/CleanDataSource"},{"Key Prefix":"07T","Object Type":"AuthConfig","Notes":""},{"Key Prefix":"07U","Object Type":"AuthConfigProviders","Notes":""},{"Key Prefix":"07V","Object Type":"ActionSend","Notes":""},{"Key Prefix":"07W","Object Type":"CustomBrand","Notes":""},{"Key Prefix":"07X","Object Type":"CustomBrandAsset","Notes":""},{"Key Prefix":"07Y","Object Type":"CleanRule","Notes":"BatchOrgSizeJob"},{"Key Prefix":"07Z","Object Type":"EntityDataSize","Notes":""},{"Key Prefix":"07a","Object Type":"ApexDebuggerSession","Notes":""},{"Key Prefix":"07b","Object Type":"ApexDebuggerBreakpoint","Notes":""},{"Key Prefix":"07c","Object Type":"ApexDebuggerRequest","Notes":""},{"Key Prefix":"07d","Object Type":"ApexDebuggerEvent","Notes":""},{"Key Prefix":"07e","Object Type":"FeedPostTemplateItem","Notes":""},{"Key Prefix":"07f","Object Type":"BluetailFeedback","Notes":""},{"Key Prefix":"07g","Object Type":"ActionLinkGroupTemplate","Notes":""},{"Key Prefix":"07h","Object Type":"ConnectedAppOauthPolicy","Notes":""},{"Key Prefix":"07i","Object Type":"CleanRule","Notes":""},{"Key Prefix":"07j","Object Type":"ContentSyncSetting","Notes":""},{"Key Prefix":"07k","Object Type":"AccountContactRelation","Notes":""},{"Key Prefix":"07l","Object Type":"ActionLinkTemplate","Notes":""},{"Key Prefix":"07m","Object Type":"DatacloudAddress","Notes":""},{"Key Prefix":"07n","Object Type":"ApexExecutionOverlayResult","Notes":""},{"Key Prefix":"07o","Object Type":"EntityLimit","Notes":""},{"Key Prefix":"07p","Object Type":"UserAppMenuItem","Notes":""},{"Key Prefix":"07t","Object Type":"ApiEvent","Notes":""},{"Key Prefix":"07u","Object Type":"UserEntityAccess","Notes":""},{"Key Prefix":"07v","Object Type":"ContentFolderLink","Notes":""},{"Key Prefix":"07w","Object Type":"DatacloudIndustryChapter","Notes":""},{"Key Prefix":"07x","Object Type":"DatacloudIndustrySubChapter","Notes":""},{"Key Prefix":"07y","Object Type":"DatacloudIndustryContent","Notes":""},{"Key Prefix":"07z","Object Type":"DatacloudIndustry","Notes":""},{"Key Prefix":"080","Object Type":"PacCrudPermission","Notes":""},{"Key Prefix":"081","Object Type":"StaticResource","Notes":""},{"Key Prefix":"082","Object Type":"UninstallExport","Notes":"Data from Uninstalled Packages? A zip containing CSVs."},{"Key Prefix":"083","Object Type":"Vote","Notes":""},{"Key Prefix":"084","Object Type":"VoteConfig","Notes":""},{"Key Prefix":"085","Object Type":"VoteStats","Notes":""},{"Key Prefix":"086","Object Type":"MobileDevice","Notes":""},{"Key Prefix":"087","Object Type":"Idea","Notes":""},{"Key Prefix":"08C","Object Type":"DatacloudContact","Notes":""},{"Key Prefix":"08E","Object Type":"AddressCountry","Notes":""},{"Key Prefix":"08F","Object Type":"AddressState","Notes":""},{"Key Prefix":"08G","Object Type":"CleanJobLog","Notes":""},{"Key Prefix":"08H","Object Type":"CleanBatchErrorLog","Notes":""},{"Key Prefix":"08I","Object Type":"CleanEntityErrorLog","Notes":""},{"Key Prefix":"08J","Object Type":"EltWorkflowNode","Notes":""},{"Key Prefix":"08K","Object Type":"DuplicateRuleMatchRule","Notes":""},{"Key Prefix":"08M","Object Type":"FeedAttachment","Notes":""},{"Key Prefix":"08N","Object Type":"ExternalEventMapping","Notes":""},{"Key Prefix":"08O","Object Type":"FTestSystemCatalogEntity","Notes":""},{"Key Prefix":"08P","Object Type":"BackgroundOperation","Notes":""},{"Key Prefix":"08Q","Object Type":"ForecastingOwnerAdjustment","Notes":""},{"Key Prefix":"08R","Object Type":"FeedMute","Notes":""},{"Key Prefix":"08U","Object Type":"FeedRevision","Notes":""},{"Key Prefix":"08V","Object Type":"FTestMetadataCatalogEntity","Notes":""},{"Key Prefix":"08W","Object Type":"DashboardGridLayout","Notes":""},{"Key Prefix":"08X","Object Type":"DashboardGridComponent","Notes":""},{"Key Prefix":"08a","Object Type":"CronJobDetail","Notes":""},{"Key Prefix":"08c","Object Type":"Package2VersionCreateRequest","Notes":"Package Version Create Request"},{"Key Prefix":"08d","Object Type":"CampaignOwnerSharingRule","Notes":""},{"Key Prefix":"08e","Object Type":"CronTrigger","Notes":"Doc"},{"Key Prefix":"08g","Object Type":"CronFiredTrigger","Notes":""},{"Key Prefix":"08h","Object Type":"EmbeddedServiceLiveAgent","Notes":""},{"Key Prefix":"08j","Object Type":"Package2OauthConsumer","Notes":""},{"Key Prefix":"08k","Object Type":"DimensionCustomAction","Notes":""},{"Key Prefix":"08l","Object Type":"AQTWorkloadData","Notes":""},{"Key Prefix":"08n","Object Type":"AqtCompoundRecommendedIndex","Notes":""},{"Key Prefix":"08o","Object Type":"AqtCreatedIndex","Notes":""},{"Key Prefix":"08p","Object Type":"ServiceAppointment","Notes":""},{"Key Prefix":"08q","Object Type":"WorkType","Notes":""},{"Key Prefix":"08r","Object Type":"AqtLongRunningRequestData","Notes":""},{"Key Prefix":"08s","Object Type":"CampaignShare","Notes":""},{"Key Prefix":"08t","Object Type":"AqtRIRequestMap","Notes":""},{"Key Prefix":"08u","Object Type":"AqtRecommendedIndex","Notes":""},{"Key Prefix":"08v","Object Type":"AqtAwrData","Notes":""},{"Key Prefix":"08x","Object Type":"InstancePerm","Notes":""},{"Key Prefix":"08y","Object Type":"CspTrustedSite","Notes":""},{"Key Prefix":"090","Object Type":"MobileExcludedField","Notes":""},{"Key Prefix":"091","Object Type":"EmailServicesFunction","Notes":""},{"Key Prefix":"092","Object Type":"WeeklyDataExport","Notes":""},{"Key Prefix":"093","Object Type":"EmailServicesAddress","Notes":""},{"Key Prefix":"094","Object Type":"MobileView","Notes":""},{"Key Prefix":"095","Object Type":"MobileViewSortColumn","Notes":""},{"Key Prefix":"096","Object Type":"MobileViewDisplayColumn","Notes":""},{"Key Prefix":"097","Object Type":"MobileViewFilter","Notes":""},{"Key Prefix":"098","Object Type":"GoogleDoc","Notes":""},{"Key Prefix":"099","Object Type":"ApexComponent","Notes":""},{"Key Prefix":"09A","Object Type":"FeedPollChoice","Notes":""},{"Key Prefix":"09B","Object Type":"FeedPollVote","Notes":""},{"Key Prefix":"09C","Object Type":"AsyncApiJobMatchDetail","Notes":""},{"Key Prefix":"09D","Object Type":"QuickActionDefinition","Notes":""},{"Key Prefix":"09E","Object Type":"AsyncApiBatchMatchDetail","Notes":""},{"Key Prefix":"09F","Object Type":"DatacloudPurchaseUsage","Notes":""},{"Key Prefix":"09G","Object Type":"EnvironmentHubInvitation","Notes":""},{"Key Prefix":"09H","Object Type":"ConnectedApplication2","Notes":""},{"Key Prefix":"09I","Object Type":"QuickActionListItem","Notes":""},{"Key Prefix":"09J","Object Type":"QuickActionList","Notes":""},{"Key Prefix":"09K","Object Type":"DatacloudCompany","Notes":""},{"Key Prefix":"09L","Object Type":"ActionFlow","Notes":""},{"Key Prefix":"09M","Object Type":"ActionFlowParam","Notes":""},{"Key Prefix":"09N","Object Type":"DatacloudDandBCompany","Notes":""},{"Key Prefix":"09O","Object Type":"DatacloudOwnedEntity","Notes":""},{"Key Prefix":"09P","Object Type":"EmailDomainKey","Notes":""},{"Key Prefix":"09S","Object Type":"AsyncRequestFFX","Notes":""},{"Key Prefix":"09T","Object Type":"AsyncRequestFFXResult","Notes":""},{"Key Prefix":"09U","Object Type":"DomainCookieStore","Notes":""},{"Key Prefix":"09V","Object Type":"DashboardStickyFilter","Notes":""},{"Key Prefix":"09W","Object Type":"ThirdPartyAccountLinkLocal","Notes":""},{"Key Prefix":"09X","Object Type":"DcSocialProfileHandle","Notes":""},{"Key Prefix":"09Y","Object Type":"DcSocialProfile","Notes":""},{"Key Prefix":"09Z","Object Type":"FeedFilterDefinition","Notes":""},{"Key Prefix":"09a","Object Type":"Community","Notes":""},{"Key Prefix":"09d","Object Type":"FeedFilterCriterion","Notes":""},{"Key Prefix":"09e","Object Type":"InvocableAction","Notes":""},{"Key Prefix":"09f","Object Type":"InvocableActionParameter","Notes":""},{"Key Prefix":"09g","Object Type":"InvocableActionPicklist","Notes":""},{"Key Prefix":"09h","Object Type":"IncrementalCandidate","Notes":""},{"Key Prefix":"09i","Object Type":"DataAssessmentRecord","Notes":""},{"Key Prefix":"09j","Object Type":"QoptimizerOption","Notes":"IpRange"},{"Key Prefix":"09k","Object Type":"IconDefinition","Notes":""},{"Key Prefix":"09l","Object Type":"ApexDebuggerLicense","Notes":""},{"Key Prefix":"09m","Object Type":"FeedEntityUnpublished","Notes":""},{"Key Prefix":"09s","Object Type":"MassOperationsJobInfo","Notes":""},{"Key Prefix":"09t","Object Type":"UiFormulaRule","Notes":""},{"Key Prefix":"09v","Object Type":"SecurityCustomBaseline","Notes":""},{"Key Prefix":"09w","Object Type":"IQOpportunityEmailAddress","Notes":""},{"Key Prefix":"09x","Object Type":"CommunityWorkspacesNode","Notes":""},{"Key Prefix":"09z","Object Type":"EmbeddedServiceQuickAction","Notes":""},{"Key Prefix":"0A0","Object Type":"ReportJob","Notes":""},{"Key Prefix":"0A1","Object Type":"ReportJobFieldMap","Notes":""},{"Key Prefix":"0A2","Object Type":"DevelopmentPackageVersion","Notes":"Change Set"},{"Key Prefix":"0A3","Object Type":"InstalledPackageVersion","Notes":"Installed Package"},{"Key Prefix":"0A4","Object Type":"ProcessTransitionApprover","Notes":""},{"Key Prefix":"0A5","Object Type":"AllManagedPackageMember","Notes":""},{"Key Prefix":"0A7","Object Type":"CustomShareRowCause","Notes":""},{"Key Prefix":"0A8","Object Type":"ReportJobRun","Notes":""},{"Key Prefix":"0A9","Object Type":"ReportJobRunError","Notes":""},{"Key Prefix":"0AB","Object Type":"ProfilePortalDelegate","Notes":""},{"Key Prefix":"0AD","Object Type":"PackageEvent","Notes":""},{"Key Prefix":"0AF","Object Type":"FolderShare","Notes":""},{"Key Prefix":"0AH","Object Type":"CompactLayout","Notes":""},{"Key Prefix":"0AI","Object Type":"FirehoseCheckpoint","Notes":""},{"Key Prefix":"0AJ","Object Type":"ComponentInstanceProperty","Notes":""},{"Key Prefix":"0AK","Object Type":"ComponentInstance","Notes":""},{"Key Prefix":"0AL","Object Type":"ExternalSocialAccount","Notes":""},{"Key Prefix":"0AM","Object Type":"CompactLayoutItem","Notes":""},{"Key Prefix":"0AN","Object Type":"CompactLayoutMapping","Notes":""},{"Key Prefix":"0AO","Object Type":"CopyExport","Notes":""},{"Key Prefix":"0AP","Object Type":"CopyImport","Notes":""},{"Key Prefix":"0AQ","Object Type":"CopyExportChunk","Notes":""},{"Key Prefix":"0AR","Object Type":"CopyImportChunk","Notes":""},{"Key Prefix":"0AS","Object Type":"CopyEntityTally","Notes":""},{"Key Prefix":"0AT","Object Type":"EventLogFile","Notes":""},{"Key Prefix":"0AU","Object Type":"AuthSecurityLevel","Notes":""},{"Key Prefix":"0AV","Object Type":"CopyExportObserverInfo","Notes":""},{"Key Prefix":"0AW","Object Type":"CanvasFeedItem","Notes":""},{"Key Prefix":"0AX","Object Type":"ConsolePersonalization","Notes":""},{"Key Prefix":"0AY","Object Type":"ExternalEvent","Notes":""},{"Key Prefix":"0AZ","Object Type":"ActionApex","Notes":""},{"Key Prefix":"0Aa","Object Type":"CollaborationGroupRecord","Notes":""},{"Key Prefix":"0Ab","Object Type":"AuraDefinitionBundle","Notes":""},{"Key Prefix":"0Ad","Object Type":"AuraDefinition","Notes":""},{"Key Prefix":"0Af","Object Type":"DeployRequest","Notes":""},{"Key Prefix":"0Ag","Object Type":"ActionLinkGroup","Notes":""},{"Key Prefix":"0Ah","Object Type":"ConferenceNumber","Notes":""},{"Key Prefix":"0Ai","Object Type":"DeployMessage","Notes":""},{"Key Prefix":"0Aj","Object Type":"AsyncApiTransformationSpec","Notes":""},{"Key Prefix":"0Ak","Object Type":"AuthSession","Notes":""},{"Key Prefix":"0Al","Object Type":"DeployTestResult","Notes":""},{"Key Prefix":"0Am","Object Type":"SplitMapping","Notes":""},{"Key Prefix":"0An","Object Type":"ActionLink","Notes":""},{"Key Prefix":"0Ao","Object Type":"SplitPod","Notes":""},{"Key Prefix":"0Ap","Object Type":"Split","Notes":""},{"Key Prefix":"0Aq","Object Type":"ActionLinkGroupAssoc","Notes":""},{"Key Prefix":"0Ar","Object Type":"SplitAction","Notes":""},{"Key Prefix":"0As","Object Type":"SplitActionResult","Notes":""},{"Key Prefix":"0At","Object Type":"ActionLinkUserState","Notes":""},{"Key Prefix":"0Au","Object Type":"AnalyticNotification","Notes":""},{"Key Prefix":"0Av","Object Type":"AnalyticThreshold","Notes":""},{"Key Prefix":"0Aw","Object Type":"AnalyticCondition","Notes":""},{"Key Prefix":"0Ax","Object Type":"ContentVersioningPolicy","Notes":""},{"Key Prefix":"0Ay","Object Type":"AnalyticAction","Notes":""},{"Key Prefix":"0Az","Object Type":"AuraResource","Notes":""},{"Key Prefix":"0B0","Object Type":"MobileEntitySetting","Notes":""},{"Key Prefix":"0B1","Object Type":"MessageIdentifier","Notes":""},{"Key Prefix":"0B2","Object Type":"PortalLanguageConfig","Notes":""},{"Key Prefix":"0B3","Object Type":"PortalLanguageTabConfig","Notes":""},{"Key Prefix":"0B9","Object Type":"MobileTab","Notes":""},{"Key Prefix":"0BA","Object Type":"CustomDataType","Notes":""},{"Key Prefix":"0BB","Object Type":"CustomDataTypeComponent","Notes":""},{"Key Prefix":"0BC","Object Type":"CustomFieldDataColumn","Notes":""},{"Key Prefix":"0BE","Object Type":"FileFieldData","Notes":""},{"Key Prefix":"0BF","Object Type":"ComponentAppVersion","Notes":""},{"Key Prefix":"0BG","Object Type":"CampaignInfluenceAdjustment","Notes":""},{"Key Prefix":"0BH","Object Type":"AllManagedClassRelationship","Notes":""},{"Key Prefix":"0BI","Object Type":"ContentVersionMap","Notes":""},{"Key Prefix":"0BJ","Object Type":"ActionAssignTeam","Notes":""},{"Key Prefix":"0BL","Object Type":"PackageIdMapping","Notes":""},{"Key Prefix":"0BM","Object Type":"Connection","Notes":"Salesforce to Salesforce"},{"Key Prefix":"0BR","Object Type":"LogSearchResult","Notes":""},{"Key Prefix":"0BV","Object Type":"OpportunityCriteriaSharingRule","Notes":""},{"Key Prefix":"0BW","Object Type":"MobilePushDevice","Notes":""},{"Key Prefix":"0BX","Object Type":"HistoricalEntityConfig","Notes":""},{"Key Prefix":"0BY","Object Type":"MqSlaRequest","Notes":""},{"Key Prefix":"0BZ","Object Type":"EmailBrand","Notes":""},{"Key Prefix":"0Ba","Object Type":"LoginBrandAsset","Notes":""},{"Key Prefix":"0Bb","Object Type":"LoginBrand","Notes":""},{"Key Prefix":"0Bc","Object Type":"MqSlaJob","Notes":""},{"Key Prefix":"0Bd","Object Type":"HistoricalFieldConfig","Notes":""},{"Key Prefix":"0Be","Object Type":"HistoricalTransactionPrefix","Notes":""},{"Key Prefix":"0Bf","Object Type":"HistoricalStaging","Notes":""},{"Key Prefix":"0Bg","Object Type":"IdeaTheme","Notes":""},{"Key Prefix":"0Bi","Object Type":"HistoricalSelectorValue","Notes":""},{"Key Prefix":"0Bk","Object Type":"HistoricalSelector","Notes":""},{"Key Prefix":"0Bl","Object Type":"BlacklistedConsumer","Notes":""},{"Key Prefix":"0Bm","Object Type":"DuplicateRule","Notes":""},{"Key Prefix":"0Bn","Object Type":"ConsoleSidebarContainer","Notes":""},{"Key Prefix":"0Bo","Object Type":"SidebarComponentLayout","Notes":""},{"Key Prefix":"0Bp","Object Type":"ListPoolUsage","Notes":""},{"Key Prefix":"0Bq","Object Type":"EltWorkflowJobTracker","Notes":""},{"Key Prefix":"0Br","Object Type":"EltWorkflowJobHistory","Notes":""},{"Key Prefix":"0Bs","Object Type":"DatacloudSocialHandle","Notes":""},{"Key Prefix":"0Bt","Object Type":"Announcement","Notes":""},{"Key Prefix":"0Bu","Object Type":"DunsRightAsyncBatch","Notes":""},{"Key Prefix":"0Bv","Object Type":"DunsRightAsyncAccountRecord","Notes":""},{"Key Prefix":"0Bw","Object Type":"EltWorkflow","Notes":""},{"Key Prefix":"0Bx","Object Type":"DunsRightAsyncChunk","Notes":""},{"Key Prefix":"0By","Object Type":"ContentDispositionAssignment","Notes":""},{"Key Prefix":"0Bz","Object Type":"AgentWork","Notes":""},{"Key Prefix":"0C0","Object Type":"Holiday","Notes":""},{"Key Prefix":"0C1","Object Type":"CustIdxCandidate","Notes":""},{"Key Prefix":"0C2","Object Type":"MobileSession","Notes":""},{"Key Prefix":"0C3","Object Type":"RequestThrottle","Notes":""},{"Key Prefix":"0C5","Object Type":"Skill","Notes":""},{"Key Prefix":"0C6","Object Type":"LiveChatUserConfig","Notes":""},{"Key Prefix":"0C8","Object Type":"SetupAssistantProgress","Notes":""},{"Key Prefix":"0C9","Object Type":"SkillUser","Notes":""},{"Key Prefix":"0CA","Object Type":"SkillProfile","Notes":""},{"Key Prefix":"0CB","Object Type":"LiveChatUserConfigUser","Notes":""},{"Key Prefix":"0CC","Object Type":"SiteChangelistComponent","Notes":""},{"Key Prefix":"0CD","Object Type":"LiveChatUserConfigProfile","Notes":""},{"Key Prefix":"0CE","Object Type":"GroupSubscription","Notes":""},{"Key Prefix":"0CF","Object Type":"ChatterNowUserFavorites","Notes":""},{"Key Prefix":"0CG","Object Type":"MailAppSettings","Notes":""},{"Key Prefix":"0CH","Object Type":"ContentHubItem","Notes":""},{"Key Prefix":"0CI","Object Type":"EntityImplements","Notes":""},{"Key Prefix":"0CJ","Object Type":"FieldImplements","Notes":""},{"Key Prefix":"0CK","Object Type":"MailAppExchangeWhitelist","Notes":""},{"Key Prefix":"0CL","Object Type":"SiteChangelist","Notes":""},{"Key Prefix":"0CM","Object Type":"ChatSessionMembers","Notes":""},{"Key Prefix":"0CO","Object Type":"MailAppExchangeUserMap","Notes":""},{"Key Prefix":"0CP","Object Type":"CustomPermission","Notes":""},{"Key Prefix":"0CQ","Object Type":"OauthToken","Notes":""},{"Key Prefix":"0CS","Object Type":"ChatterNowUserSettings","Notes":""},{"Key Prefix":"0CU","Object Type":"OrgSizingDataHolder","Notes":""},{"Key Prefix":"0CW","Object Type":"OrgSizingInfo","Notes":""},{"Key Prefix":"0CX","Object Type":"MobilePushUserUpdate","Notes":""},{"Key Prefix":"0CZ","Object Type":"EmailMessageRelation","Notes":""},{"Key Prefix":"0Cd","Object Type":"EventBusSubscriber","Notes":""},{"Key Prefix":"0Ce","Object Type":"FormulaParticle","Notes":""},{"Key Prefix":"0Cg","Object Type":"OrganizationValueInfo","Notes":""},{"Key Prefix":"0Ch","Object Type":"LayoutParticle","Notes":""},{"Key Prefix":"0Ci","Object Type":"AppManifest","Notes":""},{"Key Prefix":"0Cj","Object Type":"OperationLog","Notes":""},{"Key Prefix":"0Cl","Object Type":"ForecastingUserPreference","Notes":""},{"Key Prefix":"0Cn","Object Type":"NotificationMember","Notes":""},{"Key Prefix":"0Co","Object Type":"ProductItem","Notes":""},{"Key Prefix":"0Ct","Object Type":"ManagedContentBlock","Notes":""},{"Key Prefix":"0Cu","Object Type":"ManagedContentBlockVersion","Notes":""},{"Key Prefix":"0Cv","Object Type":"KanbanView","Notes":""},{"Key Prefix":"0Cw","Object Type":"PartnerMarketingBudget","Notes":""},{"Key Prefix":"0Cy","Object Type":"OwnerChangeOptionInfo","Notes":""},{"Key Prefix":"0Cz","Object Type":"Setting","Notes":""},{"Key Prefix":"0D0","Object Type":"CustomIndexUsage","Notes":""},{"Key Prefix":"0D1","Object Type":"DataCategoryGroup","Notes":""},{"Key Prefix":"0D2","Object Type":"OrgWideEmailAddress","Notes":""},{"Key Prefix":"0D3","Object Type":"OrgEmailAddressSecurity","Notes":""},{"Key Prefix":"0D4","Object Type":"LeadCriteriaSharingRule","Notes":""},{"Key Prefix":"0D5","Object Type":"FeedItem","Notes":"Doc or NewsFeed or UserProfileFeed"},{"Key Prefix":"0D6","Object Type":"FeedTrackedChange","Notes":""},{"Key Prefix":"0D7","Object Type":"FeedComment","Notes":""},{"Key Prefix":"0D8","Object Type":"AllManagedMemberOption","Notes":""},{"Key Prefix":"0D9","Object Type":"LeadSharingRuleFilterItem","Notes":""},{"Key Prefix":"0DA","Object Type":"EntityCategoryGroup","Notes":""},{"Key Prefix":"0DB","Object Type":"Network","Notes":""},{"Key Prefix":"0DC","Object Type":"ProcessTransitionAction","Notes":""},{"Key Prefix":"0DD","Object Type":"SynonymGroup","Notes":""},{"Key Prefix":"0DE","Object Type":"Synonym","Notes":""},{"Key Prefix":"0DF","Object Type":"VersionSet","Notes":"encodes your package version selections when the enterprise WSDL was generated. See Package Version Settings"},{"Key Prefix":"0DG","Object Type":"NamedFilter","Notes":""},{"Key Prefix":"0DH","Object Type":"FieldAttributes","Notes":""},{"Key Prefix":"0DL","Object Type":"NetworkMemberGroup","Notes":""},{"Key Prefix":"0DM","Object Type":"Site","Notes":""},{"Key Prefix":"0DN","Object Type":"SitePageOverride","Notes":""},{"Key Prefix":"0DO","Object Type":"NetworkMember","Notes":""},{"Key Prefix":"0DQ","Object Type":"IndexKeyDefinitionItem","Notes":""},{"Key Prefix":"0DR","Object Type":"AndroidPushApplicationSetup","Notes":""},{"Key Prefix":"0DS","Object Type":"AppMenuItem","Notes":""},{"Key Prefix":"0DT","Object Type":"IdeaReputationLevel","Notes":""},{"Key Prefix":"0DU","Object Type":"LimitUsageHistory","Notes":""},{"Key Prefix":"0DV","Object Type":"PushUpgradeRequest","Notes":""},{"Key Prefix":"0DV","Object Type":"PackagePushRequest","Notes":""},{"Key Prefix":"0DW","Object Type":"IdeaReputation","Notes":""},{"Key Prefix":"0DX","Object Type":"PushUpgradeJob","Notes":""},{"Key Prefix":"0DX","Object Type":"PackagePushJob","Notes":""},{"Key Prefix":"0DY","Object Type":"PushUpgradeJobError","Notes":""},{"Key Prefix":"0DY","Object Type":"PackagePushError","Notes":""},{"Key Prefix":"0DZ","Object Type":"LiveChatTranscriptEvent","Notes":""},{"Key Prefix":"0Db","Object Type":"ForecastingType","Notes":""},{"Key Prefix":"0Dd","Object Type":"ListViewChart","Notes":""},{"Key Prefix":"0De","Object Type":"ListViewChartInstance","Notes":""},{"Key Prefix":"0Df","Object Type":"InstanceSizeJob","Notes":""},{"Key Prefix":"0Dg","Object Type":"FeedEntry","Notes":""},{"Key Prefix":"0Dh","Object Type":"MaterializedFeedEntry","Notes":""},{"Key Prefix":"0Di","Object Type":"FeedClumpMapping","Notes":""},{"Key Prefix":"0Dj","Object Type":"FeedClumpInfo","Notes":""},{"Key Prefix":"0Dk","Object Type":"ObjectMapping","Notes":""},{"Key Prefix":"0Dl","Object Type":"ObjectMappingField","Notes":""},{"Key Prefix":"0Dm","Object Type":"NetworkSelfRegistration","Notes":""},{"Key Prefix":"0Dp","Object Type":"NetworkPageOverride","Notes":""},{"Key Prefix":"0Dq","Object Type":"TwoFactorAuthPairing","Notes":""},{"Key Prefix":"0Dr","Object Type":"MailAppOwaWhitelist","Notes":""},{"Key Prefix":"0Ds","Object Type":"UserAppInfo","Notes":""},{"Key Prefix":"0Dt","Object Type":"OrgSigningKey","Notes":""},{"Key Prefix":"0Du","Object Type":"ExchangeUserMapping","Notes":""},{"Key Prefix":"0Dv","Object Type":"NotifTypeOrgSetting","Notes":""},{"Key Prefix":"0Dy","Object Type":"GlobalVariableType","Notes":""},{"Key Prefix":"0Dz","Object Type":"OptimizerMetricsAverage","Notes":""},{"Key Prefix":"0E0","Object Type":"EmailSyncConfig","Notes":""},{"Key Prefix":"0E1","Object Type":"EmailSyncEntitySetting","Notes":""},{"Key Prefix":"0E2","Object Type":"EmailSyncFieldMapping","Notes":""},{"Key Prefix":"0E3","Object Type":"EmailSyncValueMapping","Notes":""},{"Key Prefix":"0E4","Object Type":"EmailConfigEntitySetting","Notes":""},{"Key Prefix":"0E5","Object Type":"EmailUserEntitySetting","Notes":""},{"Key Prefix":"0E6","Object Type":"EmailSyncAdvancedSetting","Notes":""},{"Key Prefix":"0E7","Object Type":"EntitlementContact","Notes":""},{"Key Prefix":"0E8","Object Type":"EntitySubscription","Notes":"Doc"},{"Key Prefix":"0E9","Object Type":"ProductEntitlementTemplate","Notes":""},{"Key Prefix":"0EA","Object Type":"PackageVersionPatchOrg","Notes":""},{"Key Prefix":"0EB","Object Type":"Renderer","Notes":""},{"Key Prefix":"0ED","Object Type":"LpuAccessMapping","Notes":""},{"Key Prefix":"0EE","Object Type":"DeployDirection","Notes":""},{"Key Prefix":"0EF","Object Type":"RequestTrace","Notes":""},{"Key Prefix":"0EG","Object Type":"ReportChart","Notes":""},{"Key Prefix":"0EH","Object Type":"SummaryLayout","Notes":""},{"Key Prefix":"0EI","Object Type":"SummaryLayoutItem","Notes":""},{"Key Prefix":"0EJ","Object Type":"SummaryLayoutSliceInfo","Notes":""},{"Key Prefix":"0EM","Object Type":"ContentReference","Notes":"Appears next to refid query string parameter when pulling images. See rtaimage servlet parametersâ€¦what does the refid refer to?"},{"Key Prefix":"0EO","Object Type":"PicklistItemProperty","Notes":""},{"Key Prefix":"0EP","Object Type":"InboundChangeSet","Notes":""},{"Key Prefix":"0EQ","Object Type":"CategoryJobTask","Notes":""},{"Key Prefix":"0ER","Object Type":"RichTextAreaFieldData","Notes":""},{"Key Prefix":"0EV","Object Type":"AllInstalledPackageVersion","Notes":""},{"Key Prefix":"0EW","Object Type":"ChangeSetDeployHistory","Notes":""},{"Key Prefix":"0EX","Object Type":"ChangeSetDeployMessage","Notes":""},{"Key Prefix":"0EZ","Object Type":"S2XExchOAuthCredential","Notes":""},{"Key Prefix":"0Eb","Object Type":"ModuleDependency","Notes":""},{"Key Prefix":"0Ee","Object Type":"HistoricalDataFilter","Notes":""},{"Key Prefix":"0Ef","Object Type":"HistoricalDataFilterItem","Notes":""},{"Key Prefix":"0Eg","Object Type":"GlobalDbKey","Notes":""},{"Key Prefix":"0Eh","Object Type":"TodayCard","Notes":""},{"Key Prefix":"0El","Object Type":"InstalledMobileApp","Notes":""},{"Key Prefix":"0Em","Object Type":"TodayCardProperty","Notes":""},{"Key Prefix":"0En","Object Type":"ReadOnlyMemcachedServer","Notes":""},{"Key Prefix":"0Ep","Object Type":"ReadOnlyUserLogin","Notes":""},{"Key Prefix":"0Eq","Object Type":"LeadConvertSettings","Notes":""},{"Key Prefix":"0Er","Object Type":"PlatformCachePartition","Notes":""},{"Key Prefix":"0Es","Object Type":"TemplateDeployment","Notes":""},{"Key Prefix":"0Et","Object Type":"ReadOnlyAuthSession","Notes":""},{"Key Prefix":"0Eu","Object Type":"TemplateDeploymentItem","Notes":""},{"Key Prefix":"0Ev","Object Type":"PlatformCachePartitionType","Notes":""},{"Key Prefix":"0Ex","Object Type":"PlatformCacheTrial","Notes":""},{"Key Prefix":"0Ey","Object Type":"ReadOnlyRedisServer","Notes":""},{"Key Prefix":"0Ez","Object Type":"ReadOnlyLoginHistory","Notes":""},{"Key Prefix":"0F0","Object Type":"EmailTempAttachmentMap","Notes":""},{"Key Prefix":"0F1","Object Type":"DuplicateRuleFilter","Notes":""},{"Key Prefix":"0F2","Object Type":"HadoopCounter","Notes":""},{"Key Prefix":"0F3","Object Type":"ReportBlock","Notes":""},{"Key Prefix":"0F5","Object Type":"PhotoItem","Notes":""},{"Key Prefix":"0F7","Object Type":"FeedPost","Notes":""},{"Key Prefix":"0F8","Object Type":"SoftphoneScreenPopOption","Notes":""},{"Key Prefix":"0F9","Object Type":"CollaborationGroup","Notes":""},{"Key Prefix":"0FA","Object Type":"CsnDomain","Notes":""},{"Key Prefix":"0FB","Object Type":"CollaborationGroupMember","Notes":""},{"Key Prefix":"0FG","Object Type":"MobilePushServiceDevice","Notes":""},{"Key Prefix":"0FH","Object Type":"LinkReference","Notes":""},{"Key Prefix":"0FI","Object Type":"DuplicateRuleFilterItem","Notes":""},{"Key Prefix":"0FJ","Object Type":"LensFile","Notes":""},{"Key Prefix":"0FK","Object Type":"Lens","Notes":""},{"Key Prefix":"0FM","Object Type":"FeedMapping","Notes":""},{"Key Prefix":"0FO","Object Type":"AssistantProgress","Notes":"OrgSizeJob"},{"Key Prefix":"0FP","Object Type":"ReportRunTracker","Notes":""},{"Key Prefix":"0FQ","Object Type":"TrialMaster","Notes":""},{"Key Prefix":"0FR","Object Type":"PackageOperationError","Notes":""},{"Key Prefix":"0FT","Object Type":"TopicAssignment","Notes":""},{"Key Prefix":"0FX","Object Type":"QoptimizerLimitOverride","Notes":""},{"Key Prefix":"0Fa","Object Type":"ContextFieldAttributes","Notes":""},{"Key Prefix":"0Fb","Object Type":"EdgeMart","Notes":""},{"Key Prefix":"0Fc","Object Type":"EdgeMartData","Notes":""},{"Key Prefix":"0Fd","Object Type":"EdgeMartDataFile","Notes":""},{"Key Prefix":"0Fe","Object Type":"IdentityConnector","Notes":""},{"Key Prefix":"0Ff","Object Type":"InboundSocialPost","Notes":""},{"Key Prefix":"0Fg","Object Type":"InteractionLoop","Notes":""},{"Key Prefix":"0Fh","Object Type":"InteractionActionCall","Notes":""},{"Key Prefix":"0Fi","Object Type":"InteractionActionCallParam","Notes":""},{"Key Prefix":"0Fj","Object Type":"InteractionMetadataValue","Notes":""},{"Key Prefix":"0Fl","Object Type":"ContentRenditionPolicy","Notes":""},{"Key Prefix":"0Fm","Object Type":"LensEdgeMart","Notes":""},{"Key Prefix":"0Fn","Object Type":"EdgeExternalDataFile","Notes":""},{"Key Prefix":"0Fo","Object Type":"FlowInterview","Notes":""},{"Key Prefix":"0Fp","Object Type":"HammerResultStatus","Notes":""},{"Key Prefix":"0Fq","Object Type":"FeedChannel","Notes":""},{"Key Prefix":"0Fr","Object Type":"FeedChannelSubscription","Notes":""},{"Key Prefix":"0Fs","Object Type":"OrderOwnerSharingRule","Notes":""},{"Key Prefix":"0Ft","Object Type":"OrderCriteriaSharingRule","Notes":""},{"Key Prefix":"0Fu","Object Type":"OrderSharingRuleFilterItem","Notes":""},{"Key Prefix":"0Fv","Object Type":"InteractionRefOrValue","Notes":""},{"Key Prefix":"0Fy","Object Type":"OrderShare","Notes":""},{"Key Prefix":"0Fz","Object Type":"IndexKeyDefinition","Notes":""},{"Key Prefix":"0G1","Object Type":"FeedFieldHistory","Notes":""},{"Key Prefix":"0G2","Object Type":"ForecastingCompositeKey","Notes":""},{"Key Prefix":"0G3","Object Type":"ForecastingItem","Notes":""},{"Key Prefix":"0G4","Object Type":"OracleAwrSqlstat","Notes":""},{"Key Prefix":"0G5","Object Type":"OracleAwrSqltext","Notes":""},{"Key Prefix":"0G6","Object Type":"ForecastingFact","Notes":""},{"Key Prefix":"0G7","Object Type":"ForecastingAdjustment","Notes":""},{"Key Prefix":"0G8","Object Type":"ReportBucketField","Notes":""},{"Key Prefix":"0G9","Object Type":"AccountSharingRuleFilterItem","Notes":""},{"Key Prefix":"0GC","Object Type":"EmailDisclaimer","Notes":""},{"Key Prefix":"0GD","Object Type":"ReportBucketFieldValue","Notes":""},{"Key Prefix":"0GE","Object Type":"ReportBucketFieldSourceValue","Notes":""},{"Key Prefix":"0GH","Object Type":"SchemaBuilderLayout","Notes":""},{"Key Prefix":"0GI","Object Type":"SchemaBuilderLayoutItem","Notes":""},{"Key Prefix":"0GJ","Object Type":"ApplePushApplicationSetup","Notes":""},{"Key Prefix":"0GK","Object Type":"DuplicateRecordSet","Notes":""},{"Key Prefix":"0GL","Object Type":"DuplicateRecordItem","Notes":""},{"Key Prefix":"0GM","Object Type":"MetadataIdentifier","Notes":""},{"Key Prefix":"0GN","Object Type":"MetadataContent","Notes":""},{"Key Prefix":"0GO","Object Type":"LiveChatSensitiveDataRule","Notes":""},{"Key Prefix":"0GP","Object Type":"ProspectorRecModel","Notes":""},{"Key Prefix":"0GQ","Object Type":"SandboxInfo","Notes":""},{"Key Prefix":"0GR","Object Type":"SandboxProcess","Notes":""},{"Key Prefix":"0GS","Object Type":"S2XEventMap","Notes":""},{"Key Prefix":"0GT","Object Type":"S2XContactMap","Notes":""},{"Key Prefix":"0GU","Object Type":"LongRunningRequest","Notes":""},{"Key Prefix":"0GV","Object Type":"SiteDetail","Notes":""},{"Key Prefix":"0GW","Object Type":"RelatedEntity","Notes":""},{"Key Prefix":"0GY","Object Type":"Tombstone","Notes":""},{"Key Prefix":"0Ga","Object Type":"AsyncApiChunkResults","Notes":"RecommendedIndex"},{"Key Prefix":"0Gc","Object Type":"BusProcessFeedbackConfig","Notes":"/RecommendedIndexLrrMap"},{"Key Prefix":"0Gf","Object Type":"InterestingSqlFromAwr","Notes":""},{"Key Prefix":"0Gg","Object Type":"SourceMetadataMember","Notes":""},{"Key Prefix":"0Gi","Object Type":"SecurityHealthCheck","Notes":""},{"Key Prefix":"0Gj","Object Type":"TimeSlot","Notes":""},{"Key Prefix":"0Gm","Object Type":"S2XEventTxnProps","Notes":""},{"Key Prefix":"0Gn","Object Type":"ProductRequired","Notes":""},{"Key Prefix":"0Go","Object Type":"AssistantInteraction","Notes":""},{"Key Prefix":"0Gp","Object Type":"UiFormulaCriterion","Notes":""},{"Key Prefix":"0Gq","Object Type":"IntelligenceField","Notes":""},{"Key Prefix":"0Gq","Object Type":"ActivityMetric","Notes":""},{"Key Prefix":"0Gr","Object Type":"UserLicenseMetrics","Notes":"UiFormulaRuleAssignment"},{"Key Prefix":"0Gt","Object Type":"Package2VersionCreateRequestError","Notes":""},{"Key Prefix":"0Gu","Object Type":"SCSTermsOfService","Notes":""},{"Key Prefix":"0Gv","Object Type":"ProductConsumed","Notes":""},{"Key Prefix":"0Gw","Object Type":"S2XSandmanError","Notes":""},{"Key Prefix":"0Gx","Object Type":"FormulaOperator","Notes":""},{"Key Prefix":"0Gy","Object Type":"DataIntegrationRecordPurchasePermission","Notes":"/DiscoveryUserLicense"},{"Key Prefix":"0Gz","Object Type":"DiscoveryOrgLicense","Notes":""},{"Key Prefix":"0H0","Object Type":"SiteRedirectMapping","Notes":""},{"Key Prefix":"0H1","Object Type":"CollaborationInvitation","Notes":""},{"Key Prefix":"0H2","Object Type":"SharingSet","Notes":"/LpuSharingSet"},{"Key Prefix":"0H4","Object Type":"ConnectedApplication","Notes":""},{"Key Prefix":"0H6","Object Type":"ChangeSetUploadHistory","Notes":""},{"Key Prefix":"0H7","Object Type":"PackageSupportAccess","Notes":""},{"Key Prefix":"0H9","Object Type":"OracleAwrSqlignore","Notes":""},{"Key Prefix":"0HC","Object Type":"RecordSalt","Notes":""},{"Key Prefix":"0HD","Object Type":"PackageUploadRequest","Notes":""},{"Key Prefix":"0HE","Object Type":"SettingsTemplate","Notes":""},{"Key Prefix":"0HF","Object Type":"ReadOnlyLoginMessage","Notes":"PublishEvent"},{"Key Prefix":"0HG","Object Type":"EntitySharingModel","Notes":""},{"Key Prefix":"0HI","Object Type":"ReportBlockAggregate","Notes":""},{"Key Prefix":"0HJ","Object Type":"LiveChatButtonDeployment","Notes":""},{"Key Prefix":"0HK","Object Type":"LiveAgentSession","Notes":""},{"Key Prefix":"0HN","Object Type":"TwoFactorInfo","Notes":""},{"Key Prefix":"0HO","Object Type":"MobilePushSetupRegistry","Notes":""},{"Key Prefix":"0HP","Object Type":"UserProvisioningRequest","Notes":""},{"Key Prefix":"0HQ","Object Type":"ReadOnlyAppserver","Notes":""},{"Key Prefix":"0HR","Object Type":"MetricsTransmissionHistory","Notes":""},{"Key Prefix":"0HS","Object Type":"SharingOperation","Notes":""},{"Key Prefix":"0HT","Object Type":"ScrutinyRun","Notes":""},{"Key Prefix":"0HU","Object Type":"ProfileSessionSetting","Notes":""},{"Key Prefix":"0HV","Object Type":"ProfilePasswordPolicy","Notes":""},{"Key Prefix":"0HW","Object Type":"ConnectedAppSessionPolicy","Notes":""},{"Key Prefix":"0HX","Object Type":"UserProvMockTarget","Notes":""},{"Key Prefix":"0HY","Object Type":"UserProvAccountStaging","Notes":""},{"Key Prefix":"0HZ","Object Type":"ConnectedAppPlugin","Notes":""},{"Key Prefix":"0Ha","Object Type":"SandOmInfo","Notes":""},{"Key Prefix":"0Hb","Object Type":"PackageSubscriber","Notes":""},{"Key Prefix":"0Hc","Object Type":"ProfileTabSetConfiguration","Notes":""},{"Key Prefix":"0Hd","Object Type":"TestSuiteMembership","Notes":""},{"Key Prefix":"0He","Object Type":"CaptchaKey","Notes":""},{"Key Prefix":"0Hf","Object Type":"PackageInstallRequest","Notes":""},{"Key Prefix":"0Hg","Object Type":"SandstormWhitelist","Notes":""},{"Key Prefix":"0Hh","Object Type":"ServiceTerritory","Notes":""},{"Key Prefix":"0Hi","Object Type":"AppIpRange","Notes":""},{"Key Prefix":"0Hj","Object Type":"AppManifestVersion","Notes":""},{"Key Prefix":"0Hk","Object Type":"ConnectivityDevConfig","Notes":""},{"Key Prefix":"0Hl","Object Type":"ConnectivityAttributes","Notes":""},{"Key Prefix":"0Hn","Object Type":"ServiceResource","Notes":""},{"Key Prefix":"0Ho","Object Type":"Package2","Notes":""},{"Key Prefix":"0Hp","Object Type":"SandOmImportInfoDetail","Notes":""},{"Key Prefix":"0Hq","Object Type":"SandOmInfoDetail","Notes":""},{"Key Prefix":"0Hr","Object Type":"AssistantRecommendationType","Notes":""},{"Key Prefix":"0Hs","Object Type":"UserProvisioningLog","Notes":""},{"Key Prefix":"0Ht","Object Type":"SandOmImportInfo","Notes":""},{"Key Prefix":"0Hu","Object Type":"ServiceTerritoryMember","Notes":""},{"Key Prefix":"0Hv","Object Type":"ServiceResourceSkill","Notes":""},{"Key Prefix":"0Hw","Object Type":"ResourceAbsence","Notes":""},{"Key Prefix":"0Hx","Object Type":"SkillRequirement","Notes":""},{"Key Prefix":"0Hy","Object Type":"ServiceResourceCapacity","Notes":""},{"Key Prefix":"0Hz","Object Type":"ExperimentRequest","Notes":""},{"Key Prefix":"0I0","Object Type":"FeedLike","Notes":""},{"Key Prefix":"0I1","Object Type":"DbLockUsage","Notes":""},{"Key Prefix":"0I2","Object Type":"SiteAsset","Notes":""},{"Key Prefix":"0I3","Object Type":"SiteComponent","Notes":""},{"Key Prefix":"0I4","Object Type":"Domain","Notes":""},{"Key Prefix":"0I5","Object Type":"CollaborationGroupMemberRequest","Notes":""},{"Key Prefix":"0I6","Object Type":"OpportunitySharingRuleFilterItem","Notes":""},{"Key Prefix":"0I7","Object Type":"CaseSharingRuleFilterItem","Notes":""},{"Key Prefix":"0I8","Object Type":"ContactSharingRuleFilterItem","Notes":""},{"Key Prefix":"0I9","Object Type":"ReportObjectFilterItem","Notes":""},{"Key Prefix":"0IA","Object Type":"KnowledgeLanguageConfig","Notes":""},{"Key Prefix":"0IB","Object Type":"DashboardFilter","Notes":""},{"Key Prefix":"0IC","Object Type":"DashboardFilterItem","Notes":""},{"Key Prefix":"0ID","Object Type":"DashboardFilterRepCol","Notes":""},{"Key Prefix":"0IF","Object Type":"PushTopic","Notes":""},{"Key Prefix":"0IG","Object Type":"MobileDeviceRegistrar","Notes":""},{"Key Prefix":"0II","Object Type":"FeedCrossReference","Notes":""},{"Key Prefix":"0IO","Object Type":"BrandingValue","Notes":""},{"Key Prefix":"0IS","Object Type":"ApexComponentAttribute","Notes":""},{"Key Prefix":"0IT","Object Type":"GridforceJob","Notes":""},{"Key Prefix":"0IU","Object Type":"HadoopJob","Notes":""},{"Key Prefix":"0IV","Object Type":"LogSearch","Notes":""},{"Key Prefix":"0IW","Object Type":"MobileApplicationDetail","Notes":""},{"Key Prefix":"0IX","Object Type":"FieldSet","Notes":""},{"Key Prefix":"0IY","Object Type":"FieldSetItem","Notes":""},{"Key Prefix":"0IZ","Object Type":"JiffyTrace","Notes":""},{"Key Prefix":"0Ia","Object Type":"CustomEntityTruncateInfo","Notes":""},{"Key Prefix":"0Ib","Object Type":"MatchingInformation","Notes":""},{"Key Prefix":"0Ic","Object Type":"LimitSnapshot","Notes":""},{"Key Prefix":"0Id","Object Type":"NetworkModeration","Notes":""},{"Key Prefix":"0Ie","Object Type":"SupervisorAgentConfigSkill","Notes":""},{"Key Prefix":"0If","Object Type":"LiveChatButtonSkill","Notes":""},{"Key Prefix":"0Ig","Object Type":"LiveChatTranscriptSkill","Notes":""},{"Key Prefix":"0Ih","Object Type":"ServiceDeskComponent","Notes":""},{"Key Prefix":"0Ii","Object Type":"PushProfileMapping","Notes":""},{"Key Prefix":"0Ij","Object Type":"PushIntent","Notes":""},{"Key Prefix":"0Ik","Object Type":"Module","Notes":""},{"Key Prefix":"0Il","Object Type":"ScrutinyPkChunkData","Notes":""},{"Key Prefix":"0In","Object Type":"PhoenixDataSync","Notes":""},{"Key Prefix":"0Io","Object Type":"RawEmail","Notes":""},{"Key Prefix":"0Iq","Object Type":"ObjectTerritory2AssignmentRuleItem","Notes":""},{"Key Prefix":"0Ir","Object Type":"ObjectTerritory2AssignmentRule","Notes":""},{"Key Prefix":"0It","Object Type":"WaveDataConnector","Notes":""},{"Key Prefix":"0Iu","Object Type":"WaveBaseDataset","Notes":""},{"Key Prefix":"0Iv","Object Type":"WaveBaseField","Notes":""},{"Key Prefix":"0Iw","Object Type":"RecommendationMetric","Notes":""},{"Key Prefix":"0Iy","Object Type":"SplitFrameworkResult","Notes":""},{"Key Prefix":"0Iz","Object Type":"PackageDependency","Notes":""},{"Key Prefix":"0J0","Object Type":"SetupEntityAccess","Notes":""},{"Key Prefix":"0J1","Object Type":"EnvironmentHubMember","Notes":""},{"Key Prefix":"0J2","Object Type":"Personalization","Notes":""},{"Key Prefix":"0J3","Object Type":"EnvironmentHubMemberRel","Notes":""},{"Key Prefix":"0J4","Object Type":"SPSamlAttributes","Notes":""},{"Key Prefix":"0J5","Object Type":"PredictiveModel","Notes":""},{"Key Prefix":"0J6","Object Type":"NetworkActivityAudit","Notes":""},{"Key Prefix":"0J7","Object Type":"EnvironmentHub","Notes":""},{"Key Prefix":"0J8","Object Type":"ServiceDeskHotkey","Notes":""},{"Key Prefix":"0J9","Object Type":"ForecastingQuota","Notes":""},{"Key Prefix":"0JB","Object Type":"ObjectTerritory2Association","Notes":""},{"Key Prefix":"0JD","Object Type":"MatchingRule","Notes":""},{"Key Prefix":"0JE","Object Type":"MatchingRuleItem","Notes":""},{"Key Prefix":"0JF","Object Type":"NotifDeliveryUserPref","Notes":""},{"Key Prefix":"0JJ","Object Type":"MatchIndexValue","Notes":""},{"Key Prefix":"0JK","Object Type":"MatchIndexDefinition","Notes":""},{"Key Prefix":"0JL","Object Type":"ServiceDeskCustomStyling","Notes":""},{"Key Prefix":"0JM","Object Type":"OauthTokenLocal","Notes":""},{"Key Prefix":"0JO","Object Type":"SearchActivity","Notes":""},{"Key Prefix":"0JP","Object Type":"RecordOrigin","Notes":""},{"Key Prefix":"0JR","Object Type":"PendingServiceRouting","Notes":""},{"Key Prefix":"0JS","Object Type":"JigsawSavedSearch","Notes":""},{"Key Prefix":"0JT","Object Type":"JobTracker","Notes":""},{"Key Prefix":"0JU","Object Type":"UserListViewCriterion","Notes":""},{"Key Prefix":"0JV","Object Type":"PlatformAction","Notes":""},{"Key Prefix":"0JW","Object Type":"SetupNode","Notes":""},{"Key Prefix":"0JX","Object Type":"SurveyDefaultConfig","Notes":"/SetupCustomNode"},{"Key Prefix":"0JY","Object Type":"MacroAction","Notes":""},{"Key Prefix":"0JZ","Object Type":"Macro","Notes":""},{"Key Prefix":"0Ja","Object Type":"ReadOnlyOauthToken","Notes":""},{"Key Prefix":"0Jb","Object Type":"ReadOnlyOauthTokenScope","Notes":""},{"Key Prefix":"0Jc","Object Type":"ForecastingShare","Notes":""},{"Key Prefix":"0Jd","Object Type":"ForecastingCategoryMapping","Notes":""},{"Key Prefix":"0Je","Object Type":"UserProvisioningConfig","Notes":""},{"Key Prefix":"0Jf","Object Type":"DomainSite","Notes":""},{"Key Prefix":"0Jg","Object Type":"ForecastingTypeToCategory","Notes":""},{"Key Prefix":"0Ji","Object Type":"MacroInstruction","Notes":""},{"Key Prefix":"0Jj","Object Type":"CopySuspension","Notes":""},{"Key Prefix":"0Jk","Object Type":"ReadOnlySecurityToken","Notes":""},{"Key Prefix":"0Jl","Object Type":"ReadOnlyLoginIp","Notes":""},{"Key Prefix":"0Jm","Object Type":"ReadOnlyLoginIpEmail","Notes":""},{"Key Prefix":"0Jn","Object Type":"PlatformActionList","Notes":""},{"Key Prefix":"0Jo","Object Type":"PlatformActionListItem","Notes":""},{"Key Prefix":"0Jp","Object Type":"ReadOnlyClientBrowser","Notes":""},{"Key Prefix":"0Jq","Object Type":"SCSInboundSettings","Notes":""},{"Key Prefix":"0Jr","Object Type":"ThirdPartyAccountLink","Notes":""},{"Key Prefix":"0Js","Object Type":"SkinnyIndex","Notes":""},{"Key Prefix":"0Jt","Object Type":"SkinnyIndexColumn","Notes":""},{"Key Prefix":"0Ju","Object Type":"RelationshipInfo","Notes":""},{"Key Prefix":"0Jv","Object Type":"RelationshipDomain","Notes":""},{"Key Prefix":"0Jx","Object Type":"IdentityVerificationEvent","Notes":""},{"Key Prefix":"0Jy","Object Type":"StandardAction","Notes":""},{"Key Prefix":"0Jz","Object Type":"TodayGoal","Notes":""},{"Key Prefix":"0K0","Object Type":"ActionKnowledgeSubmit","Notes":""},{"Key Prefix":"0K2","Object Type":"ActionChatterPost","Notes":""},{"Key Prefix":"0K3","Object Type":"ActionChatterPostRecipient","Notes":""},{"Key Prefix":"0K4","Object Type":"SamplingStrategy","Notes":""},{"Key Prefix":"0K6","Object Type":"SampledEntity","Notes":""},{"Key Prefix":"0K7","Object Type":"StorageConfigAuditTrail","Notes":""},{"Key Prefix":"0K9","Object Type":"QueueRoutingConfig","Notes":""},{"Key Prefix":"0KA","Object Type":"UserConfigTransferSkill","Notes":""},{"Key Prefix":"0KB","Object Type":"UserConfigTransferButton","Notes":""},{"Key Prefix":"0KD","Object Type":"TabDefinition","Notes":""},{"Key Prefix":"0KG","Object Type":"SqlIdToRequestMap","Notes":""},{"Key Prefix":"0KK","Object Type":"CampaignInfluence","Notes":""},{"Key Prefix":"0KM","Object Type":"InstalledSubscriberPackageVersion","Notes":""},{"Key Prefix":"0KO","Object Type":"SecurityHealthCheckRisks","Notes":""},{"Key Prefix":"0KP","Object Type":"PresenceConfigDeclineReason","Notes":""},{"Key Prefix":"0KR","Object Type":"PresenceDeclineReason","Notes":""},{"Key Prefix":"0KT","Object Type":"EdgeMartMetadata","Notes":""},{"Key Prefix":"0KU","Object Type":"Measure","Notes":""},{"Key Prefix":"0KV","Object Type":"Dimension","Notes":""},{"Key Prefix":"0KW","Object Type":"RecordDisplayLookup","Notes":""},{"Key Prefix":"0KX","Object Type":"DimensionMember","Notes":""},{"Key Prefix":"0KY","Object Type":"StandardValueSet","Notes":""},{"Key Prefix":"0KZ","Object Type":"ReportInstanceQuery","Notes":""},{"Key Prefix":"0Ka","Object Type":"SurveyEmailBranding","Notes":""},{"Key Prefix":"0Kb","Object Type":"SyncTransactionLog","Notes":""},{"Key Prefix":"0Kc","Object Type":"SurveyQuestionChoice","Notes":""},{"Key Prefix":"0Kd","Object Type":"Survey","Notes":""},{"Key Prefix":"0Ke","Object Type":"SurveyPage","Notes":""},{"Key Prefix":"0Kf","Object Type":"WaveFeaturedAsset","Notes":""},{"Key Prefix":"0Kg","Object Type":"TwoFactorMethodsInfo","Notes":""},{"Key Prefix":"0Kh","Object Type":"FormulaFunctionCategory","Notes":""},{"Key Prefix":"0Ki","Object Type":"SurveyInvitation","Notes":""},{"Key Prefix":"0Km","Object Type":"CustomAppMetrics","Notes":""},{"Key Prefix":"0Kn","Object Type":"FormulaFunction","Notes":""},{"Key Prefix":"0Ko","Object Type":"GlobalVariable","Notes":""},{"Key Prefix":"0Kp","Object Type":"TwoFactorMethodsInfoLocal","Notes":""},{"Key Prefix":"0Kq","Object Type":"LoginFlow","Notes":""},{"Key Prefix":"0Kr","Object Type":"SurveyQuestionResponse","Notes":""},{"Key Prefix":"0Ks","Object Type":"SurveyVersion","Notes":""},{"Key Prefix":"0Kt","Object Type":"AssociatedLocation","Notes":""},{"Key Prefix":"0Ku","Object Type":"SurveyQuestion","Notes":""},{"Key Prefix":"0Kv","Object Type":"SetupApp","Notes":""},{"Key Prefix":"0Ky","Object Type":"CspFrameAncestor","Notes":""},{"Key Prefix":"0Kz","Object Type":"ResourcePreference","Notes":""},{"Key Prefix":"0L0","Object Type":"XmdDimRecordDisplayLookup","Notes":""},{"Key Prefix":"0L1","Object Type":"VoiceVendorInfo","Notes":""},{"Key Prefix":"0L2","Object Type":"TenantPlatformLicense","Notes":""},{"Key Prefix":"0L3","Object Type":"TenantUserLicense","Notes":""},{"Key Prefix":"0L4","Object Type":"TenantEditionLicense","Notes":""},{"Key Prefix":"0L5","Object Type":"TenantAddOnLicense","Notes":""},{"Key Prefix":"0LC","Object Type":"TenantLicensingRequest","Notes":""},{"Key Prefix":"0LD","Object Type":"RecalcCampaignStats","Notes":""},{"Key Prefix":"0LE","Object Type":"SamlSsoConfig","Notes":""},{"Key Prefix":"0LG","Object Type":"ReportInstance","Notes":""},{"Key Prefix":"0LH","Object Type":"SocialKeyJobLog","Notes":""},{"Key Prefix":"0LI","Object Type":"SocialKeyEntityErrorLog","Notes":""},{"Key Prefix":"0LJ","Object Type":"ModerationRule","Notes":""},{"Key Prefix":"0LM","Object Type":"KeywordList","Notes":""},{"Key Prefix":"0LN","Object Type":"StorageSizeJob","Notes":""},{"Key Prefix":"0LO","Object Type":"SetupAssistantAnswer","Notes":""},{"Key Prefix":"0LP","Object Type":"WaveReplicationFilterItem","Notes":""},{"Key Prefix":"0LQ","Object Type":"VoiceCall","Notes":""},{"Key Prefix":"0LR","Object Type":"WaveTrendedReport","Notes":""},{"Key Prefix":"0LT","Object Type":"DimensionSalesforceAction","Notes":""},{"Key Prefix":"0LV","Object Type":"UserCriteria","Notes":""},{"Key Prefix":"0LY","Object Type":"WaveAnnotationTarget","Notes":""},{"Key Prefix":"0LZ","Object Type":"WaveAnnotation","Notes":""},{"Key Prefix":"0La","Object Type":"DateMetadata","Notes":""},{"Key Prefix":"0Lb","Object Type":"EdgeMartOrganization","Notes":""},{"Key Prefix":"0Lc","Object Type":"LicensedCustomPermission","Notes":""},{"Key Prefix":"0Ld","Object Type":"LicenseDefinition","Notes":""},{"Key Prefix":"0Le","Object Type":"ExternalServiceRegistration","Notes":""},{"Key Prefix":"0Lf","Object Type":"UserFeedChannel","Notes":""},{"Key Prefix":"0Lg","Object Type":"UserSetupAppInfo","Notes":""},{"Key Prefix":"0Lh","Object Type":"ReleasedApexIdentifier","Notes":""},{"Key Prefix":"0Li","Object Type":"AssetTokenEvent","Notes":""},{"Key Prefix":"0Lj","Object Type":"AnalyticActionConfiguration","Notes":""},{"Key Prefix":"0Ll","Object Type":"LoginEventStream","Notes":""},{"Key Prefix":"0Lm","Object Type":"NavigationLinkSet","Notes":""},{"Key Prefix":"0Ln","Object Type":"ReleasedApexIdentifierOption","Notes":""},{"Key Prefix":"0Lo","Object Type":"AutoActivityCaptureMetrics","Notes":""},{"Key Prefix":"0Lq","Object Type":"EmbeddedServiceDetail","Notes":""},{"Key Prefix":"0Ls","Object Type":"AvroSchema","Notes":""},{"Key Prefix":"0Lu","Object Type":"ProductTransfer","Notes":""},{"Key Prefix":"0Lw","Object Type":"BrandingSet","Notes":""},{"Key Prefix":"0Lx","Object Type":"AIModel","Notes":""},{"Key Prefix":"0Ly","Object Type":"BrandingSetProperty","Notes":""},{"Key Prefix":"0Lz","Object Type":"LearningLinkProgress","Notes":""},{"Key Prefix":"0M0","Object Type":"FlexiPage","Notes":""},{"Key Prefix":"0M1","Object Type":"SocialUserAuth","Notes":""},{"Key Prefix":"0M2","Object Type":"FlexiPageRegion","Notes":""},{"Key Prefix":"0M3","Object Type":"SocialKeyParentRecord","Notes":""},{"Key Prefix":"0M4","Object Type":"SocialKeyPersonaRecord","Notes":""},{"Key Prefix":"0M5","Object Type":"Territory2Type","Notes":""},{"Key Prefix":"0M6","Object Type":"StreamingChannel","Notes":""},{"Key Prefix":"0M9","Object Type":"SandboxObserver","Notes":""},{"Key Prefix":"0MA","Object Type":"Territory2Model","Notes":""},{"Key Prefix":"0MD","Object Type":"SearchPromotionRule","Notes":""},{"Key Prefix":"0ME","Object Type":"SessionLevelPolicy","Notes":""},{"Key Prefix":"0MF","Object Type":"SynonymDictionary","Notes":""},{"Key Prefix":"0MH","Object Type":"TransitionMessage","Notes":""},{"Key Prefix":"0MI","Object Type":"Territory2","Notes":""},{"Key Prefix":"0MJ","Object Type":"SystemStreamingChannel","Notes":""},{"Key Prefix":"0MK","Object Type":"XCleanMatchRateMetrics","Notes":""},{"Key Prefix":"0ML","Object Type":"CustomNotificationType","Notes":""},{"Key Prefix":"0MM","Object Type":"WaveNotificationConfig","Notes":""},{"Key Prefix":"0MN","Object Type":"LayoutSectionState","Notes":""},{"Key Prefix":"0MO","Object Type":"AppNotifTypeOrgSetting","Notes":""},{"Key Prefix":"0MP","Object Type":"WaveTemplateDetails","Notes":""},{"Key Prefix":"0MQ","Object Type":"UserCustomBadge","Notes":""},{"Key Prefix":"0MR","Object Type":"MetricsDataFile","Notes":""},{"Key Prefix":"0MT","Object Type":"ContentOrgMetrics","Notes":""},{"Key Prefix":"0MU","Object Type":"ReleasedEntityState","Notes":""},{"Key Prefix":"0MV","Object Type":"UserFavorite","Notes":""},{"Key Prefix":"0MW","Object Type":"BuffaloOrgEstimate","Notes":""},{"Key Prefix":"0MY","Object Type":"ChatterExtension","Notes":""},{"Key Prefix":"0MZ","Object Type":"SourceMember","Notes":""},{"Key Prefix":"0Ma","Object Type":"SandboxObserver2","Notes":""},{"Key Prefix":"0Mb","Object Type":"ChatterExtensionInstance","Notes":""},{"Key Prefix":"0Me","Object Type":"OrchestrationContext","Notes":""},{"Key Prefix":"0Mf","Object Type":"FieldServiceMobileSettings","Notes":""},{"Key Prefix":"0Mg","Object Type":"AppExtension","Notes":""},{"Key Prefix":"0Mh","Object Type":"ConsumptionSchedule","Notes":""},{"Key Prefix":"0Mi","Object Type":"NavigationMenuItem","Notes":""},{"Key Prefix":"0Mj","Object Type":"MessagingChannel","Notes":""},{"Key Prefix":"0Mk","Object Type":"WindowsPushApplicationSetup","Notes":""},{"Key Prefix":"0Mm","Object Type":"MessagingLink","Notes":""},{"Key Prefix":"0Mn","Object Type":"OrchestrationContextEvent","Notes":""},{"Key Prefix":"0Mo","Object Type":"ConsumptionRate","Notes":""},{"Key Prefix":"0Mp","Object Type":"FeedEntityRead","Notes":""},{"Key Prefix":"0Mq","Object Type":"ProductConsumptionSchedule","Notes":""},{"Key Prefix":"0Ms","Object Type":"FeedRead","Notes":""},{"Key Prefix":"0Mt","Object Type":"BuffaloMigrationEvent","Notes":""},{"Key Prefix":"0Mu","Object Type":"BuffaloMigrationManagement","Notes":""},{"Key Prefix":"0Mw","Object Type":"MessagingSession","Notes":""},{"Key Prefix":"0My","Object Type":"SurveyResponse","Notes":""},{"Key Prefix":"0Mz","Object Type":"DomainProvision","Notes":""},{"Key Prefix":"0N0","Object Type":"UserMembershipSharingRule","Notes":""},{"Key Prefix":"0N1","Object Type":"UserCriteriaSharingRule","Notes":""},{"Key Prefix":"0N2","Object Type":"UserShare","Notes":""},{"Key Prefix":"0N3","Object Type":"UserSharingRuleFilterItem","Notes":""},{"Key Prefix":"0N4","Object Type":"RuleTerritory2Association","Notes":""},{"Key Prefix":"0N5","Object Type":"ServicePresenceStatus","Notes":""},{"Key Prefix":"0N9","Object Type":"ServiceChannel","Notes":""},{"Key Prefix":"0NB","Object Type":"SecureAgent","Notes":""},{"Key Prefix":"0NC","Object Type":"ServiceChannelStatus","Notes":""},{"Key Prefix":"0ND","Object Type":"SecureAgentPlugin","Notes":""},{"Key Prefix":"0NE","Object Type":"SecureAgentPluginProperty","Notes":""},{"Key Prefix":"0NF","Object Type":"ReportCustomDetailField","Notes":""},{"Key Prefix":"0NI","Object Type":"TransactionSecurityPolicy","Notes":""},{"Key Prefix":"0NK","Object Type":"S2XAdminError","Notes":""},{"Key Prefix":"0NL","Object Type":"StandardReportType","Notes":""},{"Key Prefix":"0NM","Object Type":"SearchQuerySuggestion","Notes":""},{"Key Prefix":"0NN","Object Type":"PostArchivalDeletionRequest","Notes":""},{"Key Prefix":"0NQ","Object Type":"TransactionSecurityAction","Notes":""},{"Key Prefix":"0NR","Object Type":"TransactionSecurityActionEvent","Notes":""},{"Key Prefix":"0NU","Object Type":"ReputationLevel","Notes":""},{"Key Prefix":"0NV","Object Type":"ReputationPointsRule","Notes":""},{"Key Prefix":"0NW","Object Type":"SOSDeployment","Notes":""},{"Key Prefix":"0NX","Object Type":"SOSSession","Notes":"SOS video calls"},{"Key Prefix":"0NZ","Object Type":"SOSSessionActivity","Notes":""},{"Key Prefix":"0Na","Object Type":"UserListView","Notes":""},{"Key Prefix":"0Nb","Object Type":"LinkState","Notes":""},{"Key Prefix":"0Nc","Object Type":"LinkStateData","Notes":""},{"Key Prefix":"0Nd","Object Type":"PresenceUserConfig","Notes":""},{"Key Prefix":"0Ne","Object Type":"PresenceUserConfigUser","Notes":""},{"Key Prefix":"0Nf","Object Type":"PresenceUserConfigProfile","Notes":""},{"Key Prefix":"0Ng","Object Type":"CleanInfo","Notes":""},{"Key Prefix":"0Nh","Object Type":"CleanActivityLog","Notes":""},{"Key Prefix":"0Ni","Object Type":"UserProvAccount","Notes":""},{"Key Prefix":"0Nj","Object Type":"CleanEntityError","Notes":""},{"Key Prefix":"0Nk","Object Type":"WaveTemplate","Notes":""},{"Key Prefix":"0Nl","Object Type":"WaveTemplateExternalData","Notes":""},{"Key Prefix":"0Nm","Object Type":"WaveTemplateValues","Notes":""},{"Key Prefix":"0Nn","Object Type":"Xmd","Notes":""},{"Key Prefix":"0No","Object Type":"LiveChatBlockingRule","Notes":""},{"Key Prefix":"0Np","Object Type":"XCleanBulkJob","Notes":""},{"Key Prefix":"0Nq","Object Type":"XmdMeasure","Notes":""},{"Key Prefix":"0Nr","Object Type":"XmdDimension","Notes":""},{"Key Prefix":"0Ns","Object Type":"XmdDimensionMember","Notes":""},{"Key Prefix":"0Nt","Object Type":"SharedPicklistDefinition","Notes":""},{"Key Prefix":"0Nu","Object Type":"XmdDate","Notes":""},{"Key Prefix":"0Nv","Object Type":"EntityParticle","Notes":""},{"Key Prefix":"0Nw","Object Type":"UserAppMenuCustomization","Notes":""},{"Key Prefix":"0Nx","Object Type":"XmdDimSalesforceAction","Notes":""},{"Key Prefix":"0Ny","Object Type":"XmdOrganization","Notes":""},{"Key Prefix":"0O0","Object Type":"XinstanceInfo","Notes":""},{"Key Prefix":"0O1","Object Type":"TwoFactorU2F","Notes":""},{"Key Prefix":"0O4","Object Type":"WaveExternalConnProperty","Notes":""},{"Key Prefix":"0O5","Object Type":"XmdDimensionCustomAction","Notes":""},{"Key Prefix":"0O6","Object Type":"FieldMappingField","Notes":""},{"Key Prefix":"0O7","Object Type":"FieldMappingRow","Notes":""},{"Key Prefix":"0O8","Object Type":"FieldMapping","Notes":""},{"Key Prefix":"0OB","Object Type":"Shipment","Notes":""},{"Key Prefix":"0OC","Object Type":"TransactionSecurityCondition","Notes":""},{"Key Prefix":"0OD","Object Type":"InteractionCountReport","Notes":""},{"Key Prefix":"0OE","Object Type":"SubscriberTabSetMember","Notes":""},{"Key Prefix":"0OF","Object Type":"FlexipageComponentMetrics","Notes":"BulkDedupeJob"},{"Key Prefix":"0OG","Object Type":"BaseEventInterface","Notes":"DuplicateRuleJob"},{"Key Prefix":"0OH","Object Type":"OperatingHours","Notes":""},{"Key Prefix":"0OI","Object Type":"MatchingRuleJob","Notes":""},{"Key Prefix":"0OK","Object Type":"ReleasedApexClassRel","Notes":""},{"Key Prefix":"0OL","Object Type":"OrgLifecycleNotification","Notes":""},{"Key Prefix":"0OO","Object Type":"ProcessInstanceNode","Notes":""},{"Key Prefix":"0OP","Object Type":"VisualforceAccessMetrics","Notes":""},{"Key Prefix":"0OV","Object Type":"NetworkAffinity","Notes":""},{"Key Prefix":"0OZ","Object Type":"WaveCompatibilityCheckItem","Notes":""},{"Key Prefix":"0Oa","Object Type":"ComponentResponseCache","Notes":""},{"Key Prefix":"0Ob","Object Type":"ChatterExtensionConfig","Notes":""},{"Key Prefix":"0Oe","Object Type":"DashboardComponentColumn","Notes":""},{"Key Prefix":"0Of","Object Type":"DashboardComponentResult","Notes":""},{"Key Prefix":"0Oi","Object Type":"CaseSubjectParticle","Notes":""},{"Key Prefix":"0Ol","Object Type":"ReportEventStream","Notes":"TwoFactorU2F"},{"Key Prefix":"0Om","Object Type":"ScorecardMetric","Notes":""},{"Key Prefix":"0Oq","Object Type":"PendingChangeContainer","Notes":""},{"Key Prefix":"0Or","Object Type":"DatasetExportEvent","Notes":""},{"Key Prefix":"0Ow","Object Type":"ContactPointPhone","Notes":""},{"Key Prefix":"0Ox","Object Type":"VoiceCallRecording","Notes":""},{"Key Prefix":"0P0","Object Type":"FlowVariableAssignment","Notes":""},{"Key Prefix":"0P1","Object Type":"Certificate","Notes":""},{"Key Prefix":"0P2","Object Type":"CertificateIp","Notes":""},{"Key Prefix":"0P5","Object Type":"AacObjectSetting","Notes":""},{"Key Prefix":"0P9","Object Type":"CalendarSharing","Notes":""},{"Key Prefix":"0PA","Object Type":"MessagingEndUser","Notes":""},{"Key Prefix":"0PB","Object Type":"DuplicateJob","Notes":""},{"Key Prefix":"0PC","Object Type":"DuplicateJobMatchingRule","Notes":""},{"Key Prefix":"0PD","Object Type":"CustomPermissionDependency","Notes":""},{"Key Prefix":"0PF","Object Type":"ParallelJobItemData","Notes":""},{"Key Prefix":"0PG","Object Type":"PermissionSetGroup","Notes":""},{"Key Prefix":"0PH","Object Type":"LogoutEventStream","Notes":""},{"Key Prefix":"0PK","Object Type":"Individual","Notes":""},{"Key Prefix":"0PL","Object Type":"PermissionSetLicense","Notes":""},{"Key Prefix":"0PM","Object Type":"PermissionSetGroupComponent","Notes":""},{"Key Prefix":"0PO","Object Type":"DuplicateJobDefinition","Notes":""},{"Key Prefix":"0PP","Object Type":"DuplicateJobMatchingRuleDefinition","Notes":""},{"Key Prefix":"0PQ","Object Type":"ProcessTimeQueue","Notes":""},{"Key Prefix":"0PS","Object Type":"PermissionSet","Notes":"Permission set metadata"},{"Key Prefix":"0PX","Object Type":"PushUpgradeExcludedOrg","Notes":""},{"Key Prefix":"0PY","Object Type":"EmbeddedServiceFieldService","Notes":""},{"Key Prefix":"0PZ","Object Type":"MetadataContainerMember","Notes":""},{"Key Prefix":"0Pa","Object Type":"PermissionSetAssignment","Notes":""},{"Key Prefix":"0Pk","Object Type":"ChannelProgram","Notes":""},{"Key Prefix":"0Pl","Object Type":"ChannelProgramLevel","Notes":""},{"Key Prefix":"0Pm","Object Type":"ChannelProgramMember","Notes":""},{"Key Prefix":"0Pp","Object Type":"EinsteinApplication","Notes":""},{"Key Prefix":"0Pq","Object Type":"PredictionConfig","Notes":""},{"Key Prefix":"0Pr","Object Type":"PredictionField","Notes":""},{"Key Prefix":"0Ps","Object Type":"PushBackDefinition","Notes":""},{"Key Prefix":"0Pt","Object Type":"PackageVersionInstallRequestError","Notes":""},{"Key Prefix":"0Pu","Object Type":"PackageVersionUninstallRequestError","Notes":""},{"Key Prefix":"0Pv","Object Type":"BigObjectsRecordMetrics","Notes":""},{"Key Prefix":"0Px","Object Type":"DatasetExport","Notes":""},{"Key Prefix":"0Py","Object Type":"DatasetExportPart","Notes":""},{"Key Prefix":"0Pz","Object Type":"EventTypeDefinition","Notes":""},{"Key Prefix":"0Q0","Object Type":"Quote","Notes":"Doc"},{"Key Prefix":"0Q1","Object Type":"OutgoingEmail","Notes":""},{"Key Prefix":"0Q3","Object Type":"OutgoingEmailRelation","Notes":""},{"Key Prefix":"0Q5","Object Type":"UserMetrics","Notes":""},{"Key Prefix":"0Q7","Object Type":"DirectMessageMemberActivity","Notes":""},{"Key Prefix":"0QD","Object Type":"QuoteDocument","Notes":""},{"Key Prefix":"0QH","Object Type":"Form","Notes":""},{"Key Prefix":"0QI","Object Type":"ApiEventStream","Notes":""},{"Key Prefix":"0QJ","Object Type":"FeedSignal","Notes":""},{"Key Prefix":"0QK","Object Type":"PinnedEntity","Notes":""},{"Key Prefix":"0QL","Object Type":"QuoteLineItem","Notes":""},{"Key Prefix":"0QM","Object Type":"MutingPermissionSet","Notes":"/EinsteinAppAnalytics"},{"Key Prefix":"0QO","Object Type":"FTestGenInterface","Notes":""},{"Key Prefix":"0QP","Object Type":"FTestGenBodyInterface","Notes":""},{"Key Prefix":"0QR","Object Type":"QuoteTemplateRichTextData","Notes":""},{"Key Prefix":"0QT","Object Type":"MetadataContainerMemberWithSymbolTable","Notes":""},{"Key Prefix":"0QU","Object Type":"ShareInterface","Notes":""},{"Key Prefix":"0QV","Object Type":"MultiCurrency","Notes":""},{"Key Prefix":"0QY","Object Type":"MetadataContainerMemberWithBody","Notes":""},{"Key Prefix":"0QZ","Object Type":"Auditable","Notes":""},{"Key Prefix":"0Qb","Object Type":"EntityEventInterface","Notes":""},{"Key Prefix":"0Qc","Object Type":"ActionQuickCreate","Notes":""},{"Key Prefix":"0Qd","Object Type":"DataExportEventInterface","Notes":""},{"Key Prefix":"0Qf","Object Type":"FormSection","Notes":""},{"Key Prefix":"0Qg","Object Type":"TransactionSecurityEventInterface","Notes":""},{"Key Prefix":"0Qh","Object Type":"FormItem","Notes":""},{"Key Prefix":"0Qi","Object Type":"SoftDeletable","Notes":""},{"Key Prefix":"0Qj","Object Type":"RecordUserAccessInterface","Notes":""},{"Key Prefix":"0Qk","Object Type":"UserNavItem","Notes":""},{"Key Prefix":"0Qn","Object Type":"ScorecardAssociation","Notes":""},{"Key Prefix":"0Qo","Object Type":"ExternalCredential","Notes":""},{"Key Prefix":"0Qp","Object Type":"SandOmBulkExport","Notes":""},{"Key Prefix":"0Qt","Object Type":"VerificationHistory","Notes":""},{"Key Prefix":"0Qu","Object Type":"ReportEvent","Notes":""},{"Key Prefix":"0Qy","Object Type":"SecureAgentsCluster","Notes":""},{"Key Prefix":"0Qz","Object Type":"Nameable","Notes":""},{"Key Prefix":"0R0","Object Type":"UserTerritory2Association","Notes":""},{"Key Prefix":"0R1","Object Type":"UserServicePresence","Notes":""},{"Key Prefix":"0R2","Object Type":"UiPlugin","Notes":""},{"Key Prefix":"0R8","Object Type":"PartnerFundAllocation","Notes":""},{"Key Prefix":"0RA","Object Type":"ActivityRelation","Notes":""},{"Key Prefix":"0RB","Object Type":"PartnerFundClaim","Notes":""},{"Key Prefix":"0RC","Object Type":"CollaborationGroupRank","Notes":""},{"Key Prefix":"0RD","Object Type":"RecommendationDefinition","Notes":""},{"Key Prefix":"0RE","Object Type":"EventRelation","Notes":""},{"Key Prefix":"0RH","Object Type":"SandOmExportedBlob","Notes":""},{"Key Prefix":"0RI","Object Type":"LearningAssignment","Notes":""},{"Key Prefix":"0RJ","Object Type":"PartnerFundRequest","Notes":""},{"Key Prefix":"0RL","Object Type":"FlowCategory","Notes":""},{"Key Prefix":"0RM","Object Type":"BigObjectCounter","Notes":""},{"Key Prefix":"0RT","Object Type":"TaskRelation","Notes":""},{"Key Prefix":"0RX","Object Type":"LightningBolt","Notes":""},{"Key Prefix":"0RY","Object Type":"CustomSettingNameIndex","Notes":""},{"Key Prefix":"0RZ","Object Type":"PlinyPhysicalDeleteJob","Notes":""},{"Key Prefix":"0Rb","Object Type":"LightningComponentBundle","Notes":""},{"Key Prefix":"0Rd","Object Type":"LightningComponentResource","Notes":""},{"Key Prefix":"0Rf","Object Type":"LinkedInLeadGenToken","Notes":""},{"Key Prefix":"0Rg","Object Type":"InteractionLCMetrics","Notes":""},{"Key Prefix":"0Rh","Object Type":"TopicDataCategoryRule","Notes":""},{"Key Prefix":"0Ri","Object Type":"LinkedInLeadGenConfig","Notes":""},{"Key Prefix":"0Rl","Object Type":"FlowCategoryItem","Notes":""},{"Key Prefix":"0Rm","Object Type":"WaveAssetVersion","Notes":""},{"Key Prefix":"0Rn","Object Type":"EnhancedLetterhead","Notes":""},{"Key Prefix":"0Rp","Object Type":"LinkedInLeadGenAdAccount","Notes":""},{"Key Prefix":"0Rr","Object Type":"LightningBoltItem","Notes":""},{"Key Prefix":"0Rs","Object Type":"VisibilityChangeNotification","Notes":""},{"Key Prefix":"0Rs","Object Type":"VisibilityUpdateEvent","Notes":""},{"Key Prefix":"0Rt","Object Type":"FolderClosure","Notes":""},{"Key Prefix":"0Ru","Object Type":"LightningBoltImage","Notes":""},{"Key Prefix":"0Rv","Object Type":"LightningBoltFeature","Notes":""},{"Key Prefix":"0Rw","Object Type":"RecordAction","Notes":""},{"Key Prefix":"0Rx","Object Type":"PersonalizedUnswdQuestion","Notes":""},{"Key Prefix":"0S1","Object Type":"LightningExperienceTheme","Notes":""},{"Key Prefix":"0S2","Object Type":"S2XPushSubscription","Notes":""},{"Key Prefix":"0S5","Object Type":"OrchestrationEvent","Notes":""},{"Key Prefix":"0S6","Object Type":"OrchestrationEventField","Notes":""},{"Key Prefix":"0SE","Object Type":"ProfileSkillEndorsement","Notes":""},{"Key Prefix":"0SK","Object Type":"PurchaserPlanAssn","Notes":""},{"Key Prefix":"0SL","Object Type":"ServiceReportLayout","Notes":""},{"Key Prefix":"0SM","Object Type":"ProfileSkillUser","Notes":""},{"Key Prefix":"0SO","Object Type":"AuthProvider","Notes":""},{"Key Prefix":"0SP","Object Type":"SocialPersona","Notes":""},{"Key Prefix":"0SR","Object Type":"SignupRequest","Notes":""},{"Key Prefix":"0ST","Object Type":"SocialPost","Notes":""},{"Key Prefix":"0SU","Object Type":"AqtIncidentDetection","Notes":""},{"Key Prefix":"0SV","Object Type":"ReportInstanceCsvResult","Notes":""},{"Key Prefix":"0SX","Object Type":"RemoteTenantSecretSetting","Notes":""},{"Key Prefix":"0Sa","Object Type":"MetadataContainerMemberWithBinaryBody","Notes":""},{"Key Prefix":"0Sb","Object Type":"PurchaserPlan","Notes":""},{"Key Prefix":"0Se","Object Type":"AdminSetupEvent","Notes":""},{"Key Prefix":"0Sf","Object Type":"CoverageBenefitItem","Notes":""},{"Key Prefix":"0Sg","Object Type":"PlanBenefitItem","Notes":""},{"Key Prefix":"0Sk","Object Type":"ProfileSkill","Notes":""},{"Key Prefix":"0Sl","Object Type":"ProcessTypeDefinition","Notes":""},{"Key Prefix":"0Sn","Object Type":"ReturnOrderLineItem","Notes":""},{"Key Prefix":"0So","Object Type":"C2CPermissionBinding","Notes":""},{"Key Prefix":"0Sq","Object Type":"MemberPlan","Notes":""},{"Key Prefix":"0Sr","Object Type":"PersonEducation","Notes":""},{"Key Prefix":"0Ss","Object Type":"IdentityDocument","Notes":""},{"Key Prefix":"0Su","Object Type":"QmosEntityDefinition","Notes":""},{"Key Prefix":"0Sy","Object Type":"ActionOverrideMetrics","Notes":""},{"Key Prefix":"0Sz","Object Type":"QmosQueryStatus","Notes":""},{"Key Prefix":"0T0","Object Type":"SetupFlowProgress","Notes":""},{"Key Prefix":"0T1","Object Type":"ManagedContentType","Notes":""},{"Key Prefix":"0T2","Object Type":"AIInsightReason","Notes":""},{"Key Prefix":"0T5","Object Type":"IndividualShare","Notes":""},{"Key Prefix":"0T6","Object Type":"EmailDomainFilter","Notes":""},{"Key Prefix":"0T7","Object Type":"ManagedContentTypeVersion","Notes":""},{"Key Prefix":"0T9","Object Type":"OrchestrationContextDeploy","Notes":""},{"Key Prefix":"0TA","Object Type":"IndividualSharingRuleFilterItem","Notes":""},{"Key Prefix":"0TB","Object Type":"IndividualOwnerSharingRule","Notes":""},{"Key Prefix":"0TC","Object Type":"IndividualCriteriaSharingRule","Notes":""},{"Key Prefix":"0TD","Object Type":"MessagingTemplate","Notes":""},{"Key Prefix":"0TG","Object Type":"ManagedContentSpaceLink","Notes":""},{"Key Prefix":"0TH","Object Type":"ProdDbHammerRequest","Notes":""},{"Key Prefix":"0TI","Object Type":"TopicIndex","Notes":""},{"Key Prefix":"0TJ","Object Type":"EventTypeFieldDefinition","Notes":""},{"Key Prefix":"0TK","Object Type":"ManagedContentNodeType","Notes":""},{"Key Prefix":"0TL","Object Type":"CoverageBenefit","Notes":""},{"Key Prefix":"0TM","Object Type":"PlanBenefit","Notes":""},{"Key Prefix":"0TN","Object Type":"WaveAssetEvent","Notes":""},{"Key Prefix":"0TO","Object Type":"Topic","Notes":""},{"Key Prefix":"0TR","Object Type":"ProductItemTransaction","Notes":"/CloudConfiguration"},{"Key Prefix":"0TS","Object Type":"ProductRequest","Notes":""},{"Key Prefix":"0TT","Object Type":"TrialforceTemplate","Notes":""},{"Key Prefix":"0TU","Object Type":"AccountBrand","Notes":""},{"Key Prefix":"0TW","Object Type":"IsvHammerRequestId","Notes":""},{"Key Prefix":"0TY","Object Type":"TopicOntology","Notes":""},{"Key Prefix":"0TZ","Object Type":"OrchestrationContextDataset","Notes":""},{"Key Prefix":"0Tc","Object Type":"QmosQuery1","Notes":""},{"Key Prefix":"0Td","Object Type":"CarePreauth","Notes":""},{"Key Prefix":"0Te","Object Type":"QmosQueryCol1","Notes":""},{"Key Prefix":"0Tg","Object Type":"CarePreauthItem","Notes":""},{"Key Prefix":"0Ti","Object Type":"QmosMatCol1","Notes":""},{"Key Prefix":"0Tj","Object Type":"MetadataComponentDependency","Notes":""},{"Key Prefix":"0Tp","Object Type":"PermissionSetProfileMetrics","Notes":""},{"Key Prefix":"0Ts","Object Type":"ValidationRuleInfo","Notes":""},{"Key Prefix":"0Tt","Object Type":"TopicTerm","Notes":""},{"Key Prefix":"0Tv","Object Type":"BaseSessionInterface","Notes":""},{"Key Prefix":"0Tw","Object Type":"ProductRequestLineItem","Notes":""},{"Key Prefix":"0Tz","Object Type":"ContactRequest","Notes":""},{"Key Prefix":"0U5","Object Type":"LightningUsageByPageMetrics","Notes":""},{"Key Prefix":"0U6","Object Type":"QmosSelCol1","Notes":""},{"Key Prefix":"0UG","Object Type":"OnboardingMetrics","Notes":""},{"Key Prefix":"0UJ","Object Type":"FieldServiceOrgSettings","Notes":""},{"Key Prefix":"0UM","Object Type":"SsoUserMapping","Notes":""},{"Key Prefix":"0UN","Object Type":"EmbeddedServiceLayout","Notes":""},{"Key Prefix":"0UO","Object Type":"EmbeddedServiceLayoutRule","Notes":""},{"Key Prefix":"0UR","Object Type":"EmbeddedServiceCustomComponent","Notes":""},{"Key Prefix":"0US","Object Type":"BotSessionsMetrics","Notes":""},{"Key Prefix":"0UT","Object Type":"TenantUsageEntitlement","Notes":""},{"Key Prefix":"0UV","Object Type":"UserEmailPreferredPerson","Notes":""},{"Key Prefix":"0UW","Object Type":"UserVerificationMessageUse","Notes":""},{"Key Prefix":"0UX","Object Type":"ForgottenToken","Notes":""},{"Key Prefix":"0UZ","Object Type":"WaveAutoInstallRequest","Notes":""},{"Key Prefix":"0Ua","Object Type":"LbpmMetrics","Notes":""},{"Key Prefix":"0Ub","Object Type":"RecordActionHistory","Notes":""},{"Key Prefix":"0Uc","Object Type":"FlowExtensionParam","Notes":"/FlowLightningComponentParam"},{"Key Prefix":"0Ud","Object Type":"ContentFolderDistribution","Notes":""},{"Key Prefix":"0Ue","Object Type":"VerificationMessageCreditMetrics","Notes":""},{"Key Prefix":"0Uh","Object Type":"MessagingConfiguration","Notes":""},{"Key Prefix":"0Uj","Object Type":"NLPhrase","Notes":""},{"Key Prefix":"0Um","Object Type":"CareRequest","Notes":""},{"Key Prefix":"0Un","Object Type":"NLQueryFragment","Notes":""},{"Key Prefix":"0Uq","Object Type":"FlowExtension","Notes":"/FlowLightningComponent"},{"Key Prefix":"0Us","Object Type":"CareRequestConfiguration","Notes":""},{"Key Prefix":"0Uu","Object Type":"EmbeddedServiceLabel","Notes":""},{"Key Prefix":"0Uv","Object Type":"PardotTenant","Notes":""},{"Key Prefix":"0Uw","Object Type":"UriEvent","Notes":""},{"Key Prefix":"0Ux","Object Type":"UriEventStream","Notes":""},{"Key Prefix":"0Uy","Object Type":"BaseEventPackageInterface","Notes":""},{"Key Prefix":"0Uz","Object Type":"EngagementEvent","Notes":""},{"Key Prefix":"0V2","Object Type":"PlatformStatusAlertEvent","Notes":""},{"Key Prefix":"0V8","Object Type":"MessagingMetrics","Notes":""},{"Key Prefix":"0V9","Object Type":"LightningExitByPageMetrics","Notes":""},{"Key Prefix":"0VA","Object Type":"RemoteKeyCalloutEvent","Notes":""},{"Key Prefix":"0VB","Object Type":"UserActivityTimelineFilter","Notes":""},{"Key Prefix":"0VC","Object Type":"CareDiagnosis","Notes":""},{"Key Prefix":"0VD","Object Type":"CareRequestDrug","Notes":""},{"Key Prefix":"0VF","Object Type":"OrchestrationContextRuntimeEvent","Notes":""},{"Key Prefix":"0VG","Object Type":"LimitUsageTracker","Notes":""},{"Key Prefix":"0VI","Object Type":"BuffaloStep","Notes":""},{"Key Prefix":"0VK","Object Type":"CareRequestItem","Notes":""},{"Key Prefix":"0VL","Object Type":"ContactPointEntityAssocSnapshotLocator","Notes":""},{"Key Prefix":"0VM","Object Type":"EntityAssociationDefinitionVersion","Notes":""},{"Key Prefix":"0VP","Object Type":"WorkCapacityUsage","Notes":""},{"Key Prefix":"0VQ","Object Type":"WorkCapacityLimit","Notes":""},{"Key Prefix":"0VR","Object Type":"ServiceAppointmentCapacityUsage","Notes":""},{"Key Prefix":"0VS","Object Type":"WorkTypeGroup","Notes":""},{"Key Prefix":"0VX","Object Type":"LoginAsEvent","Notes":""},{"Key Prefix":"0VY","Object Type":"LoginAsEventStream","Notes":""},{"Key Prefix":"0VZ","Object Type":"InteractionUsageMetrics","Notes":""},{"Key Prefix":"0Vi","Object Type":"ContentDocumentListViewMapping","Notes":""},{"Key Prefix":"0Vk","Object Type":"SurveySubject","Notes":""},{"Key Prefix":"0Vl","Object Type":"Accreditation","Notes":""},{"Key Prefix":"0Vo","Object Type":"CareBarrier","Notes":""},{"Key Prefix":"0Vp","Object Type":"PlatformEventConduitMetrics","Notes":""},{"Key Prefix":"0Vs","Object Type":"CareBarrierType","Notes":""},{"Key Prefix":"0Vy","Object Type":"MessagingAggregatedMetrics","Notes":""},{"Key Prefix":"0Vz","Object Type":"PlatformActionMetrics","Notes":""},{"Key Prefix":"0W0","Object Type":"WorkThanks","Notes":""},{"Key Prefix":"0W1","Object Type":"WorkBadgeDefinition","Notes":""},{"Key Prefix":"0W2","Object Type":"WorkBadge","Notes":""},{"Key Prefix":"0W3","Object Type":"WorkReward","Notes":""},{"Key Prefix":"0W4","Object Type":"WorkRewardFund","Notes":""},{"Key Prefix":"0W5","Object Type":"WorkAccess","Notes":""},{"Key Prefix":"0W7","Object Type":"WorkPerformanceCycle","Notes":""},{"Key Prefix":"0W8","Object Type":"WorkFeedbackQuestionSet","Notes":""},{"Key Prefix":"0WA","Object Type":"WorkFeedbackQuestion","Notes":""},{"Key Prefix":"0WB","Object Type":"WorkFeedback","Notes":""},{"Key Prefix":"0WC","Object Type":"WorkFeedbackRequest","Notes":""},{"Key Prefix":"0WD","Object Type":"WorkCoaching","Notes":""},{"Key Prefix":"0WE","Object Type":"WorkGoal","Notes":""},{"Key Prefix":"0WF","Object Type":"WorkGoalCollaborator","Notes":""},{"Key Prefix":"0WG","Object Type":"WorkGoalLink","Notes":""},{"Key Prefix":"0WH","Object Type":"WorkRewardFundType","Notes":""},{"Key Prefix":"0WI","Object Type":"Goal","Notes":""},{"Key Prefix":"0WJ","Object Type":"Metric","Notes":""},{"Key Prefix":"0WK","Object Type":"GoalLink","Notes":""},{"Key Prefix":"0WL","Object Type":"WorkFeedbackTemplate","Notes":""},{"Key Prefix":"0WM","Object Type":"MetricDataLink","Notes":""},{"Key Prefix":"0WO","Object Type":"WorkOrder","Notes":""},{"Key Prefix":"0WQ","Object Type":"NetworkLEAPlusDailyLoginMetrics","Notes":""},{"Key Prefix":"0WR","Object Type":"NetworkLEADailyLoginMetrics","Notes":""},{"Key Prefix":"0Wa","Object Type":"QmosMatEntityMeta","Notes":""},{"Key Prefix":"0Wb","Object Type":"QmosInColMap1","Notes":""},{"Key Prefix":"0Wg","Object Type":"RecordActionDeployment","Notes":""},{"Key Prefix":"0Wh","Object Type":"RecordActionSelectableItem","Notes":""},{"Key Prefix":"0Wi","Object Type":"RecordActionDefaultItem","Notes":""},{"Key Prefix":"0Wv","Object Type":"ManagedContentSpaceMember","Notes":""},{"Key Prefix":"0Ww","Object Type":"CareProgramEnrollee","Notes":""},{"Key Prefix":"0Wx","Object Type":"RecordActionDeploymentChannel","Notes":""},{"Key Prefix":"0Wy","Object Type":"B2BCommercePkgProductMetrics","Notes":""},{"Key Prefix":"0Wz","Object Type":"WorkTypeGroupMember","Notes":""},{"Key Prefix":"0X0","Object Type":"SalesforceIqSyncFailure","Notes":""},{"Key Prefix":"0X1","Object Type":"StreamEmail","Notes":""},{"Key Prefix":"0X2","Object Type":"StreamEvent","Notes":""},{"Key Prefix":"0X5","Object Type":"IntegrationAuditingEvent","Notes":""},{"Key Prefix":"0X7","Object Type":"FormsMetrics","Notes":""},{"Key Prefix":"0X8","Object Type":"ListViewEvent","Notes":""},{"Key Prefix":"0XA","Object Type":"NamedCredential","Notes":""},{"Key Prefix":"0XB","Object Type":"ListEmail","Notes":""},{"Key Prefix":"0XC","Object Type":"ExternalDataSource","Notes":"Data Source for External Objects. A.K.A."},{"Key Prefix":"0XC","Object Type":"ContentHubRepository","Notes":"/ExternalDataSource"},{"Key Prefix":"0XD","Object Type":"ListEmailRecipientSource","Notes":""},{"Key Prefix":"0XE","Object Type":"ListEmailSentResult","Notes":""},{"Key Prefix":"0XF","Object Type":"ListEmailIndividualRecipient","Notes":""},{"Key Prefix":"0XG","Object Type":"ListViewEventStream","Notes":""},{"Key Prefix":"0XH","Object Type":"CustomHttpHeader","Notes":""},{"Key Prefix":"0XI","Object Type":"AppAnalyticsQueryRequest","Notes":""},{"Key Prefix":"0XK","Object Type":"HealthCareProcedure","Notes":""},{"Key Prefix":"0XN","Object Type":"HealthCareDiagnosis","Notes":""},{"Key Prefix":"0XR","Object Type":"SalesforceIqUser","Notes":""},{"Key Prefix":"0XS","Object Type":"SalesforceIqDataSource","Notes":""},{"Key Prefix":"0XT","Object Type":"StreamActivityAccess","Notes":""},{"Key Prefix":"0XU","Object Type":"ExternalDataUserAuth","Notes":""},{"Key Prefix":"0XY","Object Type":"SiqUserBlacklist","Notes":""},{"Key Prefix":"0Xc","Object Type":"PaymentAuthorization","Notes":""},{"Key Prefix":"0Xe","Object Type":"B2BCommercePackageMetrics","Notes":""},{"Key Prefix":"0Xj","Object Type":"AddressableEventInterface","Notes":""},{"Key Prefix":"0Xk","Object Type":"ContentExternalStorage","Notes":""},{"Key Prefix":"0Xl","Object Type":"CommSubscription","Notes":""},{"Key Prefix":"0Xs","Object Type":"SiteIframeWhiteListUrl","Notes":""},{"Key Prefix":"0Xt","Object Type":"PaymentGatewayLog","Notes":""},{"Key Prefix":"0Xv","Object Type":"SourceChangeNotification","Notes":""},{"Key Prefix":"0Xw","Object Type":"AsyncOperationEvent","Notes":""},{"Key Prefix":"0Xy","Object Type":"AEJobTracker","Notes":""},{"Key Prefix":"0Y7","Object Type":"ReportFormattingRule","Notes":""},{"Key Prefix":"0Y8","Object Type":"ReportFormattingRuleValue","Notes":""},{"Key Prefix":"0YD","Object Type":"AsyncOperationStatus","Notes":""},{"Key Prefix":"0YI","Object Type":"ActivityEngagementRollup","Notes":""},{"Key Prefix":"0YL","Object Type":"PlatformEventChannel","Notes":""},{"Key Prefix":"0YM","Object Type":"CareInterventionType","Notes":""},{"Key Prefix":"0YN","Object Type":"NextBestActionUsageMetrics","Notes":""},{"Key Prefix":"0YO","Object Type":"CareDeterminantType","Notes":""},{"Key Prefix":"0YS","Object Type":"BoardCertification","Notes":""},{"Key Prefix":"0YT","Object Type":"InsurancePolicy","Notes":""},{"Key Prefix":"0YW","Object Type":"InsurancePolicyAsset","Notes":""},{"Key Prefix":"0YY","Object Type":"ExecutionPlanTask","Notes":""},{"Key Prefix":"0YZ","Object Type":"PrivacyConsentRow","Notes":""},{"Key Prefix":"0Ya","Object Type":"LoginHistory","Notes":""},{"Key Prefix":"0Ym","Object Type":"SetupAuditTrail","Notes":""},{"Key Prefix":"0Yq","Object Type":"RateLimitIntBuckets","Notes":""},{"Key Prefix":"0Yr","Object Type":"PersonLifeEvent","Notes":""},{"Key Prefix":"0Ys","Object Type":"ParallelJobStatus","Notes":""},{"Key Prefix":"0Yu","Object Type":"IdpEventLog","Notes":""},{"Key Prefix":"0Yv","Object Type":"ReportAnomalyEvent","Notes":""},{"Key Prefix":"0Yw","Object Type":"UserLogin","Notes":""},{"Key Prefix":"0Yx","Object Type":"Producer","Notes":""},{"Key Prefix":"0Yy","Object Type":"InsuranceProfile","Notes":""},{"Key Prefix":"0Z2","Object Type":"ASEMobileConfigUser","Notes":""},{"Key Prefix":"0Z7","Object Type":"ReportAnomalyEventStore","Notes":""},{"Key Prefix":"0ZA","Object Type":"FileInspectionResult","Notes":""},{"Key Prefix":"0ZB","Object Type":"SharingUserCoverage","Notes":""},{"Key Prefix":"0ZD","Object Type":"SharingCoverageJob","Notes":""},{"Key Prefix":"0ZQ","Object Type":"SendEmailActionDefinition","Notes":""},{"Key Prefix":"0ZT","Object Type":"DataUseLegalBasis","Notes":""},{"Key Prefix":"0ZU","Object Type":"DoradoRequestEvent","Notes":""},{"Key Prefix":"0ZW","Object Type":"DataUsePurpose","Notes":""},{"Key Prefix":"0ZX","Object Type":"ContactPointConsent","Notes":""},{"Key Prefix":"0ZY","Object Type":"ContactPointTypeConsent","Notes":""},{"Key Prefix":"0ZZ","Object Type":"InvalidRecordEvent","Notes":""},{"Key Prefix":"0Zb","Object Type":"CareBarrierDeterminant","Notes":""},{"Key Prefix":"0Zd","Object Type":"DatasetFetch","Notes":""},{"Key Prefix":"0Ze","Object Type":"CareProgram","Notes":""},{"Key Prefix":"0Zf","Object Type":"OrchestrationRuntimeEventHv","Notes":""},{"Key Prefix":"0Zg","Object Type":"SurveyQuestionScore","Notes":""},{"Key Prefix":"0Zh","Object Type":"SessionHijackingEvent","Notes":""},{"Key Prefix":"0Zj","Object Type":"SessionHijackingEventStore","Notes":""},{"Key Prefix":"0Zk","Object Type":"Claim","Notes":""},{"Key Prefix":"0Zm","Object Type":"ConditionalFormattingPropertyPredicate","Notes":""},{"Key Prefix":"0Zn","Object Type":"ConditionalFormattingPropertyBin","Notes":""},{"Key Prefix":"0Zo","Object Type":"ConditionalFormattingProperty","Notes":""},{"Key Prefix":"0Zq","Object Type":"AnalyticNotificationTracker","Notes":""},{"Key Prefix":"0Zr","Object Type":"CareProgramTeamMember","Notes":""},{"Key Prefix":"0Zs","Object Type":"CareProgramCampaign","Notes":""},{"Key Prefix":"0Zt","Object Type":"DatasetDarkLaunch","Notes":""},{"Key Prefix":"0Zu","Object Type":"ManagedContentSpace","Notes":""},{"Key Prefix":"0Zx","Object Type":"ForecastingDisplayedFamily","Notes":""},{"Key Prefix":"0Zy","Object Type":"ConversationEntry","Notes":""},{"Key Prefix":"0a0","Object Type":"Shift","Notes":""},{"Key Prefix":"0a2","Object Type":"FlexipagePageTypeMetrics","Notes":""},{"Key Prefix":"0a5","Object Type":"TimeSheetTemplateAssignment","Notes":""},{"Key Prefix":"0aB","Object Type":"EventDestination","Notes":""},{"Key Prefix":"0aC","Object Type":"OrchestrationContextEventField","Notes":""},{"Key Prefix":"0aD","Object Type":"AuraDefinitionChange","Notes":""},{"Key Prefix":"0aJ","Object Type":"ManagedContentSpaceRole","Notes":""},{"Key Prefix":"0aQ","Object Type":"Payment","Notes":""},{"Key Prefix":"0aS","Object Type":"ClaimParticipant","Notes":""},{"Key Prefix":"0aa","Object Type":"PaymentMethod","Notes":""},{"Key Prefix":"0ab","Object Type":"AuraDefinitionBundleInfo","Notes":""},{"Key Prefix":"0ad","Object Type":"AuraDefinitionInfo","Notes":""},{"Key Prefix":"0ae","Object Type":"AIPredictionEvent","Notes":""},{"Key Prefix":"0af","Object Type":"AutoCreationRun","Notes":""},{"Key Prefix":"0al","Object Type":"CommSubscriptionTiming","Notes":""},{"Key Prefix":"0am","Object Type":"AudienceMembership","Notes":""},{"Key Prefix":"0ao","Object Type":"InsurancePolicyParticipant","Notes":""},{"Key Prefix":"0ap","Object Type":"ManagedContentChannel","Notes":""},{"Key Prefix":"0aq","Object Type":"ManagedContentSpaceItem","Notes":""},{"Key Prefix":"0b0","Object Type":"PaymentGateway","Notes":""},{"Key Prefix":"0b1","Object Type":"ComponentInstancePropertyListItem","Notes":"/ComponentInstancePropListItem"},{"Key Prefix":"0b3","Object Type":"DialerBasicFeatureMetrics","Notes":""},{"Key Prefix":"0b8","Object Type":"CustomerProperty","Notes":""},{"Key Prefix":"0bF","Object Type":"LearningAssignmentProgress","Notes":""},{"Key Prefix":"0bJ","Object Type":"ManagedContentTypeInfo","Notes":""},{"Key Prefix":"0bK","Object Type":"CareTaxonomy","Notes":""},{"Key Prefix":"0bN","Object Type":"HealthcareProviderNpi","Notes":""},{"Key Prefix":"0bO","Object Type":"HealthcareProviderSpecialty","Notes":""},{"Key Prefix":"0bP","Object Type":"HealthcareProviderTaxonomy","Notes":""},{"Key Prefix":"0bQ","Object Type":"RecordActionRecommendation","Notes":""},{"Key Prefix":"0bR","Object Type":"RecordActionDeploymentContext","Notes":""},{"Key Prefix":"0bS","Object Type":"HealthcarePractitionerFacility","Notes":""},{"Key Prefix":"0bT","Object Type":"DashboardComponentSort","Notes":""},{"Key Prefix":"0bW","Object Type":"InteractionVisibilityRule","Notes":""},{"Key Prefix":"0bX","Object Type":"CareProviderFacilitySpecialty","Notes":""},{"Key Prefix":"0bY","Object Type":"HealthcareFacilityNetwork","Notes":""},{"Key Prefix":"0bZ","Object Type":"LightningSchedulerUsageMetrics","Notes":""},{"Key Prefix":"0bc","Object Type":"CareSpecialty","Notes":""},{"Key Prefix":"0bd","Object Type":"CareProgramProduct","Notes":""},{"Key Prefix":"0be","Object Type":"CareProgramEnrolleeProduct","Notes":""},{"Key Prefix":"0bf","Object Type":"HealthcarePayerNetwork","Notes":""},{"Key Prefix":"0bg","Object Type":"CareProgramEnrollmentCard","Notes":""},{"Key Prefix":"0bh","Object Type":"LightningUriEvent","Notes":""},{"Key Prefix":"0bi","Object Type":"LightningUriEventStream","Notes":""},{"Key Prefix":"0bk","Object Type":"CareProgramEligibilityRule","Notes":""},{"Key Prefix":"0bm","Object Type":"EnrollmentEligibilityCriteria","Notes":""},{"Key Prefix":"0bn","Object Type":"CareProgramGoal","Notes":""},{"Key Prefix":"0bo","Object Type":"CareProgramProvider","Notes":""},{"Key Prefix":"0br","Object Type":"CareRequestExtension","Notes":""},{"Key Prefix":"0bs","Object Type":"Prompt","Notes":""},{"Key Prefix":"0bt","Object Type":"PromptVersion","Notes":""},{"Key Prefix":"0bu","Object Type":"PromptAction","Notes":""},{"Key Prefix":"0bv","Object Type":"AdminSetupEventStream","Notes":""},{"Key Prefix":"0by","Object Type":"FlexipageFieldInstance","Notes":""},{"Key Prefix":"0bz","Object Type":"DialerBasicAudioRecMetrics","Notes":""},{"Key Prefix":"0c0","Object Type":"CustomIndexDefinition","Notes":""},{"Key Prefix":"0c1","Object Type":"CustomIndexFieldDefinition","Notes":""},{"Key Prefix":"0c6","Object Type":"NetworkUserHistoryRecent","Notes":""},{"Key Prefix":"0cC","Object Type":"LoanApplicationFinancial","Notes":""},{"Key Prefix":"0cE","Object Type":"BusinessLicense","Notes":""},{"Key Prefix":"0cF","Object Type":"Award","Notes":""},{"Key Prefix":"0cH","Object Type":"CommerceIntegrationEvent","Notes":""},{"Key Prefix":"0cI","Object Type":"AuthorizationForm","Notes":""},{"Key Prefix":"0cJ","Object Type":"PaymentGatewayProvider","Notes":""},{"Key Prefix":"0cK","Object Type":"AuthorizationFormConsent","Notes":""},{"Key Prefix":"0cM","Object Type":"AuthorizationFormDataUse","Notes":""},{"Key Prefix":"0cN","Object Type":"AuthorizationFormText","Notes":""},{"Key Prefix":"0cP","Object Type":"LoanApplicationProperty","Notes":""},{"Key Prefix":"0cQ","Object Type":"CaseGatewayRequest","Notes":""},{"Key Prefix":"0cS","Object Type":"SurveyResponseUsageMetrics","Notes":""},{"Key Prefix":"0cT","Object Type":"LoanApplicationTitleHolder","Notes":""},{"Key Prefix":"0cU","Object Type":"LoanApplicant","Notes":""},{"Key Prefix":"0cV","Object Type":"LoanApplicantDeclaration","Notes":""},{"Key Prefix":"0cW","Object Type":"PortalDelegablePermissionSet","Notes":"/PermissionSetPortalDelegate"},{"Key Prefix":"0cY","Object Type":"InsurancePolicyCoverage","Notes":""},{"Key Prefix":"0ca","Object Type":"ChatterActivity","Notes":""},{"Key Prefix":"0cb","Object Type":"Refund","Notes":""},{"Key Prefix":"0cd","Object Type":"ResidentialLoanApplication","Notes":""},{"Key Prefix":"0ce","Object Type":"CommerceIntegrationResponse","Notes":""},{"Key Prefix":"0cf","Object Type":"CareSystemFieldMapping","Notes":""},{"Key Prefix":"0cg","Object Type":"LoanApplicationAsset","Notes":""},{"Key Prefix":"0ch","Object Type":"LoanApplicationLiability","Notes":""},{"Key Prefix":"0ci","Object Type":"LoanApplicantIncome","Notes":""},{"Key Prefix":"0cj","Object Type":"LoanApplicantAddress","Notes":""},{"Key Prefix":"0ck","Object Type":"LoanApplicantEmployment","Notes":""},{"Key Prefix":"0cl","Object Type":"ProcessCartPricingEvent","Notes":""},{"Key Prefix":"0cm","Object Type":"HealthcareProvider","Notes":""},{"Key Prefix":"0cn","Object Type":"CartPricingResponseEvent","Notes":""},{"Key Prefix":"0cs","Object Type":"OauthConsumerScope","Notes":""},{"Key Prefix":"0cu","Object Type":"ManagedContentSpaceLanguage","Notes":""},{"Key Prefix":"0cv","Object Type":"FlowExecutionEventMetric","Notes":""},{"Key Prefix":"0cw","Object Type":"ManagedContentVersionLanguage","Notes":""},{"Key Prefix":"0cx","Object Type":"StrategyContext","Notes":""},{"Key Prefix":"0d0","Object Type":"CareProviderSearchableField","Notes":""},{"Key Prefix":"0d4","Object Type":"SharingOrgDefaultMetrics","Notes":""},{"Key Prefix":"0d8","Object Type":"B2BCommercePkgOrdersUE","Notes":""},{"Key Prefix":"0dN","Object Type":"CallDisposition","Notes":""},{"Key Prefix":"0dO","Object Type":"CallDispositionCategory","Notes":""},{"Key Prefix":"0dR","Object Type":"RefundLinePayment","Notes":""},{"Key Prefix":"0dU","Object Type":"LensDeveloper","Notes":""},{"Key Prefix":"0dY","Object Type":"CommSubscriptionConsent","Notes":""},{"Key Prefix":"0dd","Object Type":"DocumentChecklistItem","Notes":""},{"Key Prefix":"0dh","Object Type":"WorkerCompCoverageClass","Notes":""},{"Key Prefix":"0dn","Object Type":"RecordMergeHistory","Notes":""},{"Key Prefix":"0do","Object Type":"BusinessMilestone","Notes":""},{"Key Prefix":"0dq","Object Type":"ClaimItem","Notes":""},{"Key Prefix":"0dr","Object Type":"OrgDeleteRequest","Notes":""},{"Key Prefix":"0du","Object Type":"DelegatedAccount","Notes":""},{"Key Prefix":"0dz","Object Type":"PlatformEventEnrichmentField","Notes":""},{"Key Prefix":"0e0","Object Type":"ConsentEvent","Notes":""},{"Key Prefix":"0e1","Object Type":"ProfileClientSettings","Notes":""},{"Key Prefix":"0e2","Object Type":"LoanApplicantAsset","Notes":""},{"Key Prefix":"0e4","Object Type":"FlowExtensionGenericType","Notes":""},{"Key Prefix":"0e5","Object Type":"SharingOrgStandardMetrics","Notes":""},{"Key Prefix":"0e7","Object Type":"OutboundNetworkConnection","Notes":""},{"Key Prefix":"0e8","Object Type":"OutboundNetworkConnProperty","Notes":""},{"Key Prefix":"0eA","Object Type":"FlowExtensionProcessType","Notes":""},{"Key Prefix":"0eB","Object Type":"CommSubscriptionChannelType","Notes":""},{"Key Prefix":"0eC","Object Type":"FlowExecutionErrorEvent","Notes":""},{"Key Prefix":"0eF","Object Type":"EngagementChannelType","Notes":""},{"Key Prefix":"0eH","Object Type":"EnhancedEmailTemplate","Notes":""},{"Key Prefix":"0eK","Object Type":"LoanApplicantLiability","Notes":""},{"Key Prefix":"0eN","Object Type":"DataflowNotification","Notes":""},{"Key Prefix":"0eO","Object Type":"AppleDomainVerification","Notes":""},{"Key Prefix":"0eP","Object Type":"ExecutionPlan","Notes":""},{"Key Prefix":"0eQ","Object Type":"BusinessProfile","Notes":""},{"Key Prefix":"0eS","Object Type":"InvoicePostedEvent","Notes":""},{"Key Prefix":"0eT","Object Type":"MobileEvent","Notes":""},{"Key Prefix":"0eU","Object Type":"AutoTriageMetrics","Notes":""},{"Key Prefix":"0eX","Object Type":"SecuritiesHolding","Notes":""},{"Key Prefix":"0eb","Object Type":"EntityBlacklist","Notes":""},{"Key Prefix":"0el","Object Type":"DocumentChecklistMetrics","Notes":""},{"Key Prefix":"0en","Object Type":"Endorsement","Notes":""},{"Key Prefix":"0eo","Object Type":"CommChannelLayout","Notes":""},{"Key Prefix":"0ep","Object Type":"CommChannelLayoutItem","Notes":""},{"Key Prefix":"0eq","Object Type":"CommChannelLayoutMapping","Notes":""},{"Key Prefix":"0er","Object Type":"SdbStmtIdToSqlIdMap","Notes":""},{"Key Prefix":"0et","Object Type":"CareProviderAdverseAction","Notes":""},{"Key Prefix":"0ex","Object Type":"CareProviderSearchConfig","Notes":""},{"Key Prefix":"0f6","Object Type":"FlowInterviewLogEntry","Notes":""},{"Key Prefix":"0fE","Object Type":"FormulaFunctionAllowedType","Notes":""},{"Key Prefix":"0fL","Object Type":"DataPrepServiceLocator","Notes":""},{"Key Prefix":"0fP","Object Type":"SourceObjectAttributes","Notes":""},{"Key Prefix":"0fR","Object Type":"FormulaVariable","Notes":""},{"Key Prefix":"0fi","Object Type":"CredentialStuffingEvent","Notes":""},{"Key Prefix":"0fj","Object Type":"CredentialStuffingEventStore","Notes":""},{"Key Prefix":"0fr","Object Type":"FeedRecommendationInfo","Notes":""},{"Key Prefix":"0fu","Object Type":"FlowTriggerTypeDefinition","Notes":""},{"Key Prefix":"0fw","Object Type":"LegalEntity","Notes":""},{"Key Prefix":"0fy","Object Type":"FlexipageInfo","Notes":""},{"Key Prefix":"0g0","Object Type":"InvocableActionGenericType","Notes":""},{"Key Prefix":"0g2","Object Type":"UserSetupEntityAccess","Notes":""},{"Key Prefix":"0g3","Object Type":"PageContentAssignment","Notes":""},{"Key Prefix":"0g4","Object Type":"MobileSecurityUserMetric","Notes":""},{"Key Prefix":"0g8","Object Type":"PartyConsent","Notes":""},{"Key Prefix":"0gP","Object Type":"AssetDowntimePeriod","Notes":""},{"Key Prefix":"0gR","Object Type":"RecoveryCopyJob","Notes":""},{"Key Prefix":"0gS","Object Type":"RecoveryFlashback","Notes":""},{"Key Prefix":"0gU","Object Type":"ManagedContentImportExportJob","Notes":""},{"Key Prefix":"0gi","Object Type":"InboundNetworkConnection","Notes":""},{"Key Prefix":"0gl","Object Type":"ManagedContentRecordShare","Notes":""},{"Key Prefix":"0gp","Object Type":"InboundNetworkConnProperty","Notes":""},{"Key Prefix":"0gv","Object Type":"CaseArticle","Notes":""},{"Key Prefix":"0hJ","Object Type":"BulkApiResultEventStore","Notes":""},{"Key Prefix":"0hK","Object Type":"RecordsetFilterCriteriaRule","Notes":""},{"Key Prefix":"0hY","Object Type":"ThreatDetectionFeedback","Notes":""},{"Key Prefix":"0hc","Object Type":"HashtagCount","Notes":""},{"Key Prefix":"0hd","Object Type":"HashtagDefinition","Notes":""},{"Key Prefix":"0hn","Object Type":"CallCoachingMediaProvider","Notes":""},{"Key Prefix":"0hr","Object Type":"RecordsetFilterCriteria","Notes":""},{"Key Prefix":"0ht","Object Type":"Hashtag","Notes":""},{"Key Prefix":"0hx","Object Type":"BulkApiResultEvent","Notes":""},{"Key Prefix":"0hy","Object Type":"CallCoachConfigModifyEvent","Notes":""},{"Key Prefix":"0iA","Object Type":"SurveyVersionAddlInfo","Notes":""},{"Key Prefix":"0iJ","Object Type":"ShiftTemplate","Notes":""},{"Key Prefix":"0iK","Object Type":"SurveyEngagementContext","Notes":""},{"Key Prefix":"0iR","Object Type":"ProductServiceCampaign","Notes":""},{"Key Prefix":"0in","Object Type":"KnowledgeableUser","Notes":""},{"Key Prefix":"0j5","Object Type":"ApiAnomalyEvent","Notes":""},{"Key Prefix":"0j6","Object Type":"ApiAnomalyEventStore","Notes":""},{"Key Prefix":"0jd","Object Type":"ManagedContentSpaceResource","Notes":""},{"Key Prefix":"0jk","Object Type":"ManagedContentDeployment","Notes":""},{"Key Prefix":"0jl","Object Type":"ManagedContentDeploymentItem","Notes":""},{"Key Prefix":"0jp","Object Type":"JobProfile","Notes":""},{"Key Prefix":"0jv","Object Type":"CdnDomain","Notes":""},{"Key Prefix":"0jx","Object Type":"InteractionScheduledPath","Notes":""},{"Key Prefix":"0k8","Object Type":"IdentityProviderEventStore","Notes":""},{"Key Prefix":"0ka","Object Type":"UserListPreference","Notes":""},{"Key Prefix":"0kb","Object Type":"ManagedContentExportJobItem","Notes":""},{"Key Prefix":"0kt","Object Type":"ApexTypeImplementor","Notes":""},{"Key Prefix":"0mV","Object Type":"SalesWorkQueueSettings","Notes":""},{"Key Prefix":"0mt","Object Type":"ManagedTopicLocation","Notes":""},{"Key Prefix":"0n3","Object Type":"FinanceTransaction","Notes":""},{"Key Prefix":"0nU","Object Type":"InteractionStageStepAssignee","Notes":""},{"Key Prefix":"0ns","Object Type":"ProcessNodeSecurity","Notes":""},{"Key Prefix":"0ob","Object Type":"ShipmentItem","Notes":""},{"Key Prefix":"0pr","Object Type":"Recommendation","Notes":""},{"Key Prefix":"0ps","Object Type":"RecommendationReaction","Notes":""},{"Key Prefix":"0rB","Object Type":"ReportResultBlob","Notes":""},{"Key Prefix":"0ri","Object Type":"InteractionStageItemParam","Notes":""},{"Key Prefix":"0rp","Object Type":"RemoteProxy","Notes":"Remote Site Setting to allow access to an external URL."},{"Key Prefix":"0rs","Object Type":"ChatterAnswersReputationLevel","Notes":""},{"Key Prefix":"0sa","Object Type":"ChatterAnswersActivity","Notes":""},{"Key Prefix":"0sg","Object Type":"RecommendationStrategy","Notes":""},{"Key Prefix":"0sn","Object Type":"RecommendationStrategyNode","Notes":""},{"Key Prefix":"0sp","Object Type":"ServiceProvider","Notes":""},{"Key Prefix":"0sr","Object Type":"ScheduledRecommendation","Notes":""},{"Key Prefix":"0t0","Object Type":"TagDefinition","Notes":""},{"Key Prefix":"0tG","Object Type":"TaskGroup","Notes":""},{"Key Prefix":"0tR","Object Type":"TopicRecordSetting","Notes":""},{"Key Prefix":"0tS","Object Type":"TopicSuggestionSetting","Notes":""},{"Key Prefix":"0ta","Object Type":"TopicComputeStatus","Notes":""},{"Key Prefix":"0te","Object Type":"TopicUserEvent","Notes":""},{"Key Prefix":"0tg","Object Type":"TopicGroupActivity","Notes":""},{"Key Prefix":"0tn","Object Type":"TopicNameChange","Notes":""},{"Key Prefix":"0tr","Object Type":"TrendingTopic","Notes":""},{"Key Prefix":"0ts","Object Type":"ProcessTransitionSecurity","Notes":""},{"Key Prefix":"0tu","Object Type":"TopicUserActivity","Notes":""},{"Key Prefix":"0up","Object Type":"UserPermissionAccess","Notes":""},{"Key Prefix":"0ur","Object Type":"UserRecSummary","Notes":""},{"Key Prefix":"0v8","Object Type":"PlatformEventChannelMember","Notes":"ChangeDataCaptureEntity"},{"Key Prefix":"0wt","Object Type":"ManagedContentSpacePermission","Notes":""},{"Key Prefix":"0xt","Object Type":"StrategyContextArgument","Notes":""},{"Key Prefix":"0yp","Object Type":"LearningContentItemProgress","Notes":""},{"Key Prefix":"0zF","Object Type":"DashboardSnapshotItem","Notes":""},{"Key Prefix":"0zf","Object Type":"DashboardSnapshotResults","Notes":""},{"Key Prefix":"100","Object Type":"UserLicense","Notes":""},{"Key Prefix":"101","Object Type":"ExternalString","Notes":"Custom Label"},{"Key Prefix":"102","Object Type":"FeatureLicense","Notes":""},{"Key Prefix":"10y","Object Type":"TaskRecurrenceException","Notes":""},{"Key Prefix":"10z","Object Type":"EventRecurrenceException","Notes":""},{"Key Prefix":"110","Object Type":"ObjectPermissions","Notes":"Doc"},{"Key Prefix":"111","Object Type":"EventComments","Notes":""},{"Key Prefix":"112","Object Type":"ProposedEventTime","Notes":""},{"Key Prefix":"113","Object Type":"ProposedEventResponse","Notes":""},{"Key Prefix":"11a","Object Type":"DBCThumbnail","Notes":""},{"Key Prefix":"128","Object Type":"LightningMessageField","Notes":""},{"Key Prefix":"129","Object Type":"LightningMessageChannel","Notes":""},{"Key Prefix":"130","Object Type":"Address","Notes":""},{"Key Prefix":"131","Object Type":"Location","Notes":""},{"Key Prefix":"149","Object Type":"OpportunitySplitType","Notes":""},{"Key Prefix":"19i","Object Type":"EmbeddedServiceBranding","Notes":""},{"Key Prefix":"1AB","Object Type":"CleanAccountBackup","Notes":""},{"Key Prefix":"1AR","Object Type":"AssetRelationship","Notes":""},{"Key Prefix":"1CA","Object Type":"AccountCleanInfo","Notes":""},{"Key Prefix":"1CB","Object Type":"CleanContactBackup","Notes":""},{"Key Prefix":"1CC","Object Type":"ContactCleanInfo","Notes":""},{"Key Prefix":"1CF","Object Type":"PathAssistantStepInfo","Notes":""},{"Key Prefix":"1CL","Object Type":"LeadCleanInfo","Notes":""},{"Key Prefix":"1CP","Object Type":"PathAssistant","Notes":""},{"Key Prefix":"1CS","Object Type":"PathAssistantStepItem","Notes":""},{"Key Prefix":"1DS","Object Type":"DigitalSignature","Notes":""},{"Key Prefix":"1DW","Object Type":"DigitalWallet","Notes":""},{"Key Prefix":"1ED","Object Type":"EncryptionStatistics","Notes":""},{"Key Prefix":"1EF","Object Type":"DataDotComFieldSetting","Notes":""},{"Key Prefix":"1EH","Object Type":"EncryptionFieldHistoryStatistics","Notes":""},{"Key Prefix":"1EM","Object Type":"EntityMilestone","Notes":""},{"Key Prefix":"1EP","Object Type":"EncryptableDataProblem","Notes":""},{"Key Prefix":"1ES","Object Type":"DataDotComEntitySetting","Notes":""},{"Key Prefix":"1ET","Object Type":"EncryptionFeedTrackingStatistics","Notes":""},{"Key Prefix":"1EV","Object Type":"EventType","Notes":""},{"Key Prefix":"1Ep","Object Type":"EventTypeParameter","Notes":""},{"Key Prefix":"1FS","Object Type":"CleanFieldSettingOld","Notes":""},{"Key Prefix":"1GS","Object Type":"ExpressionFilter","Notes":""},{"Key Prefix":"1HA","Object Type":"FieldHistoryArchive","Notes":""},{"Key Prefix":"1HB","Object Type":"LoginEvent","Notes":""},{"Key Prefix":"1HC","Object Type":"PlatformEventMetric","Notes":""},{"Key Prefix":"1JS","Object Type":"CleanJobSetting","Notes":""},{"Key Prefix":"1L7","Object Type":"ComparisonSummary","Notes":""},{"Key Prefix":"1L8","Object Type":"ComparisonResult","Notes":""},{"Key Prefix":"1LB","Object Type":"CleanLeadBackup","Notes":""},{"Key Prefix":"1LT","Object Type":"LimitsTracker","Notes":""},{"Key Prefix":"1MA","Object Type":"MaintenanceAsset","Notes":""},{"Key Prefix":"1MC","Object Type":"MetaMindConnection","Notes":""},{"Key Prefix":"1MP","Object Type":"MaintenancePlan","Notes":""},{"Key Prefix":"1Mc","Object Type":"PersonAccountMetrics","Notes":""},{"Key Prefix":"1NR","Object Type":"NamespaceRegistry","Notes":""},{"Key Prefix":"1OO","Object Type":"OutOfOffice","Notes":""},{"Key Prefix":"1OZ","Object Type":"CaseExternalDocument","Notes":""},{"Key Prefix":"1PI","Object Type":"PaymentIdempotent","Notes":""},{"Key Prefix":"1QQ","Object Type":"BatchApexErrorEvent","Notes":""},{"Key Prefix":"1QR","Object Type":"ConcurLongRunApexErrEvent","Notes":""},{"Key Prefix":"1RL","Object Type":"ReleaseUpdateStepLog","Notes":""},{"Key Prefix":"1RS","Object Type":"ReleaseUpdateStep","Notes":""},{"Key Prefix":"1RU","Object Type":"ReleaseUpdate","Notes":""},{"Key Prefix":"1S1","Object Type":"MenuItem","Notes":""},{"Key Prefix":"1SA","Object Type":"StampAssignment","Notes":""},{"Key Prefix":"1SR","Object Type":"ServiceReport","Notes":""},{"Key Prefix":"1ST","Object Type":"Stamp","Notes":""},{"Key Prefix":"1Sl","Object Type":"ServiceTerritoryLocation","Notes":""},{"Key Prefix":"1U7","Object Type":"AppCapabilityConfig","Notes":""},{"Key Prefix":"1U9","Object Type":"LearningUserSummary","Notes":""},{"Key Prefix":"1V4","Object Type":"Expense","Notes":""},{"Key Prefix":"1WK","Object Type":"LinkedArticle","Notes":""},{"Key Prefix":"1WL","Object Type":"WorkOrderLineItem","Notes":""},{"Key Prefix":"1XO","Object Type":"ExternalServiceOperation","Notes":""},{"Key Prefix":"1XP","Object Type":"ExternalServiceParameter","Notes":""},{"Key Prefix":"1Xl","Object Type":"ExternalServiceListType","Notes":""},{"Key Prefix":"1Xm","Object Type":"ExternalServiceMapType","Notes":""},{"Key Prefix":"1Xo","Object Type":"ExternalServiceObjectType","Notes":""},{"Key Prefix":"1Xp","Object Type":"ExternalServiceProperty","Notes":""},{"Key Prefix":"1Xt","Object Type":"ExternalServiceDataType","Notes":""},{"Key Prefix":"1Xx","Object Type":"ExternalServiceSimpleType","Notes":""},{"Key Prefix":"1YZ","Object Type":"PrivacyConsent","Notes":""},{"Key Prefix":"1ZE","Object Type":"ComputedComponentMetadata","Notes":""},{"Key Prefix":"1bm","Object Type":"BranchMerge","Notes":""},{"Key Prefix":"1br","Object Type":"Branch","Notes":""},{"Key Prefix":"1cN","Object Type":"MessagingChannelSkill","Notes":""},{"Key Prefix":"1cb","Object Type":"ChangeListBranch","Notes":""},{"Key Prefix":"1ci","Object Type":"Integration","Notes":""},{"Key Prefix":"1cl","Object Type":"ChangeList","Notes":""},{"Key Prefix":"1cm","Object Type":"ServiceCrewMember","Notes":""},{"Key Prefix":"1cr","Object Type":"ServiceCrew","Notes":""},{"Key Prefix":"1dc","Object Type":"MetadataContainer","Notes":"from the Tooling API"},{"Key Prefix":"1de","Object Type":"IDEWorkspace","Notes":""},{"Key Prefix":"1do","Object Type":"ApexExecutionOverlayAction","Notes":""},{"Key Prefix":"1dp","Object Type":"IDEPerspective","Notes":""},{"Key Prefix":"1dr","Object Type":"ContainerAsyncRequest","Notes":"from the Tooling API"},{"Key Prefix":"1gh","Object Type":"GitHubRepositoryLink","Notes":""},{"Key Prefix":"1gp","Object Type":"GtwyProvPaymentMethodType","Notes":"/GitHubPushOperation"},{"Key Prefix":"1mr","Object Type":"MetadataRevisionTemplate","Notes":""},{"Key Prefix":"1o1","Object Type":"LightningToggleMetrics","Notes":""},{"Key Prefix":"1pm","Object Type":"PartitionLevelMember","Notes":""},{"Key Prefix":"1ps","Object Type":"PartitionLevelScheme","Notes":""},{"Key Prefix":"1rX","Object Type":"BriefcaseRule","Notes":""},{"Key Prefix":"1rY","Object Type":"BriefcaseDefinition","Notes":""},{"Key Prefix":"1rZ","Object Type":"BriefcaseRuleFilter","Notes":""},{"Key Prefix":"1rp","Object Type":"Repository","Notes":""},{"Key Prefix":"1rr","Object Type":"ResetAsyncRequest","Notes":""},{"Key Prefix":"1s2","Object Type":"InteractionCollectionProc","Notes":""},{"Key Prefix":"1sa","Object Type":"StagingArea","Notes":""},{"Key Prefix":"1te","Object Type":"TimeSheetEntry","Notes":""},{"Key Prefix":"1ts","Object Type":"TimeSheet","Notes":""},{"Key Prefix":"1vc","Object Type":"VersionedContentEntity","Notes":""},{"Key Prefix":"1w1","Object Type":"ShiftPattern","Notes":""},{"Key Prefix":"1w2","Object Type":"ShiftPatternEntry","Notes":""},{"Key Prefix":"1w5","Object Type":"AppleEcKey","Notes":""},{"Key Prefix":"1w6","Object Type":"LearningContentItem","Notes":""},{"Key Prefix":"200","Object Type":"ChunkableTask","Notes":""},{"Key Prefix":"201","Object Type":"ChunkableEntityTally","Notes":""},{"Key Prefix":"202","Object Type":"ChunkableEntityChunk","Notes":""},{"Key Prefix":"203","Object Type":"ChunkableEntityTally2","Notes":""},{"Key Prefix":"204","Object Type":"SfdcPartner","Notes":""},{"Key Prefix":"205","Object Type":"ChunkableEntityChunk2","Notes":""},{"Key Prefix":"208","Object Type":"SFDC_DIVISION","Notes":""},{"Key Prefix":"20A","Object Type":"DashboardCompColResult","Notes":""},{"Key Prefix":"20X","Object Type":"LocationTrustMeasure","Notes":""},{"Key Prefix":"20Y","Object Type":"ManagedContent","Notes":""},{"Key Prefix":"20Z","Object Type":"ManagedContentResource","Notes":""},{"Key Prefix":"21Z","Object Type":"LearningEarnedAward","Notes":""},{"Key Prefix":"23N","Object Type":"ProductServiceCampaignItem","Notes":""},{"Key Prefix":"26Z","Object Type":"EmailRelay","Notes":""},{"Key Prefix":"2AS","Object Type":"ActiveScratchOrg","Notes":""},{"Key Prefix":"2BM","Object Type":"DataflowTriggerSource","Notes":""},{"Key Prefix":"2CE","Object Type":"ChunkableTask2","Notes":""},{"Key Prefix":"2Ca","Object Type":"CustomHelpMenuItem","Notes":""},{"Key Prefix":"2Cx","Object Type":"CustomHelpMenuSection","Notes":""},{"Key Prefix":"2ED","Object Type":"EncryptionStatisticsChunk","Notes":""},{"Key Prefix":"2EH","Object Type":"EncryptionFieldHistoryStatisticsChunk","Notes":""},{"Key Prefix":"2EP","Object Type":"EncryptableDataProblemChunk","Notes":""},{"Key Prefix":"2ET","Object Type":"EncryptionFeedTrackingStatisticsChunk","Notes":""},{"Key Prefix":"2FE","Object Type":"CleanFactEntityClaim","Notes":""},{"Key Prefix":"2FF","Object Type":"CleanFactFieldClaim","Notes":""},{"Key Prefix":"2LA","Object Type":"PermissionSetLicenseAssign","Notes":""},{"Key Prefix":"2Pd","Object Type":"PermissionDependency","Notes":""},{"Key Prefix":"2Pe","Object Type":"ProcessException","Notes":""},{"Key Prefix":"2SB","Object Type":"ApiTaskResult","Notes":""},{"Key Prefix":"2SR","Object Type":"ScratchOrgInfo","Notes":""},{"Key Prefix":"2ZC","Object Type":"WaveSyncOut","Notes":""},{"Key Prefix":"2hf","Object Type":"PersonalizationResource","Notes":""},{"Key Prefix":"2kA","Object Type":"FinanceBalanceSnapshot","Notes":""},{"Key Prefix":"2oN","Object Type":"ReturnOrder","Notes":""},{"Key Prefix":"2pc","Object Type":"PackageConversion","Notes":""},{"Key Prefix":"2wz","Object Type":"TimeSheetTemplate","Notes":""},{"Key Prefix":"300","Object Type":"FlowDefinition","Notes":"InteractionDefinition - Visual Workflow or Flow"},{"Key Prefix":"301","Object Type":"InteractionDefinitionVersion","Notes":""},{"Key Prefix":"302","Object Type":"FlowTestCoverage","Notes":""},{"Key Prefix":"303","Object Type":"FlowElementTestCoverage","Notes":""},{"Key Prefix":"307","Object Type":"InteractionScreenFieldParam","Notes":""},{"Key Prefix":"308","Object Type":"InteractionCondition","Notes":""},{"Key Prefix":"309","Object Type":"InteractionOperand","Notes":""},{"Key Prefix":"30A","Object Type":"InteractionAllocator","Notes":""},{"Key Prefix":"30C","Object Type":"InteractionChoice","Notes":""},{"Key Prefix":"30D","Object Type":"InteractionDecision","Notes":""},{"Key Prefix":"30F","Object Type":"InteractionForm","Notes":""},{"Key Prefix":"30L","Object Type":"InteractionConnector","Notes":""},{"Key Prefix":"30Q","Object Type":"InteractionQuestion","Notes":""},{"Key Prefix":"30R","Object Type":"InteractionReference","Notes":""},{"Key Prefix":"30S","Object Type":"InteractionStatement","Notes":""},{"Key Prefix":"30T","Object Type":"InteractionDynTypeMapping","Notes":""},{"Key Prefix":"30V","Object Type":"InteractionVariable","Notes":""},{"Key Prefix":"30W","Object Type":"InteractionWait","Notes":""},{"Key Prefix":"30X","Object Type":"ProcessPlugin","Notes":""},{"Key Prefix":"30a","Object Type":"InteractionAllocation","Notes":""},{"Key Prefix":"30c","Object Type":"InteractionConstant","Notes":""},{"Key Prefix":"30d","Object Type":"InteractionDataColumn","Notes":""},{"Key Prefix":"30e","Object Type":"InteractionWaitEvent","Notes":""},{"Key Prefix":"30f","Object Type":"InteractionFormula","Notes":""},{"Key Prefix":"30g","Object Type":"InteractionLayoutGroup","Notes":""},{"Key Prefix":"30m","Object Type":"InteractionApexCall","Notes":""},{"Key Prefix":"30p","Object Type":"InteractionWaitEventParam","Notes":""},{"Key Prefix":"30r","Object Type":"InteractionResource","Notes":""},{"Key Prefix":"30t","Object Type":"InteractionTodo","Notes":""},{"Key Prefix":"30v","Object Type":"InteractionValueList","Notes":""},{"Key Prefix":"310","Object Type":"InteractionLayoutDetail","Notes":""},{"Key Prefix":"31A","Object Type":"Subinteraction","Notes":""},{"Key Prefix":"31C","Object Type":"SubinteractionVariableAssignment","Notes":""},{"Key Prefix":"31S","Object Type":"InteractionSwitch","Notes":""},{"Key Prefix":"31V","Object Type":"InteractionFieldValue","Notes":""},{"Key Prefix":"31c","Object Type":"InteractionChoiceLookup","Notes":""},{"Key Prefix":"31d","Object Type":"InteractionDataSource","Notes":""},{"Key Prefix":"31i","Object Type":"InteractionDataInput","Notes":""},{"Key Prefix":"31o","Object Type":"InteractionDataOutput","Notes":""},{"Key Prefix":"31v","Object Type":"InteractionValueListEntry","Notes":""},{"Key Prefix":"31w","Object Type":"InteractionFieldMetaData","Notes":""},{"Key Prefix":"31x","Object Type":"InteractionStage","Notes":""},{"Key Prefix":"31y","Object Type":"FlowStageRelation","Notes":""},{"Key Prefix":"31z","Object Type":"FlowRecordRelation","Notes":""},{"Key Prefix":"32A","Object Type":"InteractionStart","Notes":""},{"Key Prefix":"34L","Object Type":"ManagedContentNode","Notes":""},{"Key Prefix":"365","Object Type":"FlowElementSubtype","Notes":""},{"Key Prefix":"39d","Object Type":"InvoiceUsageMetrics","Notes":""},{"Key Prefix":"3AM","Object Type":"EmbeddedServiceAppointmentSettings","Notes":""},{"Key Prefix":"3CL","Object Type":"EmbeddedServiceCustomLabel","Notes":""},{"Key Prefix":"3Ca","Object Type":"ChannelAccountMetrics","Notes":""},{"Key Prefix":"3DP","Object Type":"EventDeliveryData","Notes":""},{"Key Prefix":"3DS","Object Type":"EventDelivery","Notes":""},{"Key Prefix":"3Db","Object Type":"EventDelivery","Notes":""},{"Key Prefix":"3Df","Object Type":"FlexipageFieldInstanceProperty","Notes":""},{"Key Prefix":"3Dp","Object Type":"EventDeliveryParam","Notes":""},{"Key Prefix":"3Er","Object Type":"EmbeddedServiceResource","Notes":""},{"Key Prefix":"3FC","Object Type":"EmbeddedServiceFlowConfig","Notes":""},{"Key Prefix":"3FL","Object Type":"EmbeddedServiceFlow","Notes":""},{"Key Prefix":"3HP","Object Type":"EventSubscriptionHandleData","Notes":""},{"Key Prefix":"3J5","Object Type":"ProfileIpRestrictionMetrics","Notes":""},{"Key Prefix":"3JK","Object Type":"PlatformEventSubscriberConfig","Notes":""},{"Key Prefix":"3M0","Object Type":"DataDotComCleanMetrics","Notes":""},{"Key Prefix":"3M1","Object Type":"OrgObjectsMetrics","Notes":""},{"Key Prefix":"3M2","Object Type":"OrgStandardObjectsMetrics","Notes":""},{"Key Prefix":"3M3","Object Type":"ChatterMetrics","Notes":""},{"Key Prefix":"3M4","Object Type":"ChatterOrgWideMetrics","Notes":""},{"Key Prefix":"3M5","Object Type":"NetworkCustomerLoginMetrics","Notes":""},{"Key Prefix":"3M6","Object Type":"NetworkPartnerLoginMetrics","Notes":""},{"Key Prefix":"3MA","Object Type":"PermissionSetMetricsByOrg","Notes":""},{"Key Prefix":"3MB","Object Type":"DataDotComSocialMetrics","Notes":""},{"Key Prefix":"3MC","Object Type":"OpportunityMetrics","Notes":""},{"Key Prefix":"3MD","Object Type":"ContentMetrics","Notes":""},{"Key Prefix":"3ME","Object Type":"CustomObjectUsageMetrics","Notes":""},{"Key Prefix":"3MF","Object Type":"SharingRowCauseMetrics","Notes":""},{"Key Prefix":"3MG","Object Type":"SharingMetrics","Notes":""},{"Key Prefix":"3MH","Object Type":"IdeaMetrics","Notes":""},{"Key Prefix":"3MI","Object Type":"UserDimMetrics","Notes":""},{"Key Prefix":"3MJ","Object Type":"PermissionSetLicenseMetrics","Notes":""},{"Key Prefix":"3MK","Object Type":"OpptyAndPricingMetrics","Notes":""},{"Key Prefix":"3MM","Object Type":"ChatterGroupConMetrics","Notes":""},{"Key Prefix":"3MN","Object Type":"ChatterUserNetworkMetrics","Notes":""},{"Key Prefix":"3MO","Object Type":"QuickActionMetrics","Notes":""},{"Key Prefix":"3MP","Object Type":"ForecastingTypeMetrics","Notes":""},{"Key Prefix":"3MQ","Object Type":"VisualforceMetrics","Notes":""},{"Key Prefix":"3MR","Object Type":"EventLogFileMetrics","Notes":""},{"Key Prefix":"3MS","Object Type":"DataDotComListPoolMetrics","Notes":""},{"Key Prefix":"3MT","Object Type":"ProcessMetrics","Notes":""},{"Key Prefix":"3MU","Object Type":"DeclarativePlatformMetrics","Notes":""},{"Key Prefix":"3MV","Object Type":"SharingUserMetrics","Notes":""},{"Key Prefix":"3MW","Object Type":"PlatformOrgObjectMetrics","Notes":""},{"Key Prefix":"3Mi","Object Type":"SharingPortalMetrics","Notes":""},{"Key Prefix":"3Ml","Object Type":"InteractionLanguageMetrics","Notes":""},{"Key Prefix":"3Ms","Object Type":"EmbeddedServiceMenuSettings","Notes":""},{"Key Prefix":"3Mt","Object Type":"InteractionTranslMetrics","Notes":""},{"Key Prefix":"3N1","Object Type":"ExtIdentityLoginMetrics","Notes":""},{"Key Prefix":"3NA","Object Type":"CustomObjectUserLicenseMetrics","Notes":""},{"Key Prefix":"3NB","Object Type":"LayoutDefinition","Notes":""},{"Key Prefix":"3NC","Object Type":"DialerMinutesMetrics","Notes":""},{"Key Prefix":"3NO","Object Type":"OpportunitySplitMetrics","Notes":""},{"Key Prefix":"3NS","Object Type":"SandboxOrgDimensionMetrics","Notes":""},{"Key Prefix":"3NT","Object Type":"SandboxDimensionMetrics","Notes":""},{"Key Prefix":"3NU","Object Type":"DataDotComCleanPrefMetrics","Notes":""},{"Key Prefix":"3NV","Object Type":"TwoFactorMetrics","Notes":""},{"Key Prefix":"3NW","Object Type":"NetworkPowerCustomerLoginMetrics","Notes":""},{"Key Prefix":"3NX","Object Type":"LightningComponentMetrics","Notes":""},{"Key Prefix":"3NY","Object Type":"ChatterUniqueContributorDailyMetrics","Notes":""},{"Key Prefix":"3NZ","Object Type":"ChatterActivityDailyMetrics","Notes":""},{"Key Prefix":"3PP","Object Type":"EventParameterData","Notes":""},{"Key Prefix":"3PS","Object Type":"EventParameter","Notes":""},{"Key Prefix":"3PX","Object Type":"ProcessPluginParameter","Notes":""},{"Key Prefix":"3Pb","Object Type":"EventPublication","Notes":""},{"Key Prefix":"3Ph","Object Type":"EventPublicationHandle","Notes":""},{"Key Prefix":"3Pp","Object Type":"EventPublicationParam","Notes":""},{"Key Prefix":"3Ri","Object Type":"LearningContentProgress","Notes":""},{"Key Prefix":"3SP","Object Type":"EventSubscriptionData","Notes":""},{"Key Prefix":"3SS","Object Type":"EventSubscription","Notes":""},{"Key Prefix":"3U2","Object Type":"ActionOverrideInfo","Notes":""},{"Key Prefix":"3Ys","Object Type":"SetupAssistantStep","Notes":""},{"Key Prefix":"3ad","Object Type":"FlowVariableView","Notes":""},{"Key Prefix":"3cd","Object Type":"FlowApexClassDescriptor","Notes":""},{"Key Prefix":"3dd","Object Type":"FlowDefinitionView","Notes":""},{"Key Prefix":"3ec","Object Type":"EmbeddedServiceCustomization","Notes":""},{"Key Prefix":"3la","Object Type":"AnalyticsLicensedAsset","Notes":""},{"Key Prefix":"3mK","Object Type":"LightningUsageByBrowserMetrics","Notes":""},{"Key Prefix":"3mi","Object Type":"EmbeddedServiceMenuItem","Notes":""},{"Key Prefix":"3pc","Object Type":"Product2CriteriaSharingRule","Notes":""},{"Key Prefix":"3pd","Object Type":"FlowApexClassPropertyDesc","Notes":""},{"Key Prefix":"3pf","Object Type":"Product2SharingRuleFilterItem","Notes":""},{"Key Prefix":"3qb","Object Type":"DmUser","Notes":""},{"Key Prefix":"3qc","Object Type":"DmPermissionSetAssignmentMetrics","Notes":""},{"Key Prefix":"3qd","Object Type":"DmPermissionSetMetrics","Notes":""},{"Key Prefix":"3qe","Object Type":"DmProfileMetric","Notes":""},{"Key Prefix":"3qf","Object Type":"DmUserCustomizationMetrics","Notes":""},{"Key Prefix":"3qg","Object Type":"DmUserLicenseMetrics","Notes":""},{"Key Prefix":"3qh","Object Type":"DmUserLoginMetrics","Notes":""},{"Key Prefix":"3qi","Object Type":"DmUserRoleMetrics","Notes":""},{"Key Prefix":"3uC","Object Type":"ManagedContentNodeRendition","Notes":""},{"Key Prefix":"3v1","Object Type":"OrgMetric","Notes":""},{"Key Prefix":"3vd","Object Type":"FlowVersionView","Notes":""},{"Key Prefix":"3zl","Object Type":"ExpenseReportEntry","Notes":""},{"Key Prefix":"400","Object Type":"ApexClassMember","Notes":""},{"Key Prefix":"401","Object Type":"ApexTriggerMember","Notes":""},{"Key Prefix":"402","Object Type":"ApexPageMember","Notes":""},{"Key Prefix":"403","Object Type":"ApexComponentMember","Notes":""},{"Key Prefix":"404","Object Type":"WorkflowRuleMember","Notes":""},{"Key Prefix":"405","Object Type":"ValidationRuleMember","Notes":""},{"Key Prefix":"406","Object Type":"WorkflowFieldUpdateMember","Notes":""},{"Key Prefix":"407","Object Type":"WorkflowTaskMember","Notes":""},{"Key Prefix":"408","Object Type":"WorkflowAlertMember","Notes":""},{"Key Prefix":"410","Object Type":"WorkflowOutboundMessageMember","Notes":""},{"Key Prefix":"412","Object Type":"CustomFieldMember","Notes":""},{"Key Prefix":"413","Object Type":"ContentLogMetricsByFileType","Notes":""},{"Key Prefix":"42C","Object Type":"FlowSaveTrigger","Notes":""},{"Key Prefix":"48D","Object Type":"LearningAward","Notes":""},{"Key Prefix":"4A0","Object Type":"PendingChange","Notes":""},{"Key Prefix":"4Dr","Object Type":"PromptError","Notes":""},{"Key Prefix":"4F0","Object Type":"ApexClassVersion","Notes":""},{"Key Prefix":"4F1","Object Type":"ApexTriggerVersion","Notes":""},{"Key Prefix":"4F2","Object Type":"ApexPageVersion","Notes":""},{"Key Prefix":"4F3","Object Type":"ApexComponentVersion","Notes":""},{"Key Prefix":"4F4","Object Type":"CustomFieldVersion","Notes":""},{"Key Prefix":"4F5","Object Type":"EntityDefinitionVersion","Notes":""},{"Key Prefix":"4M5","Object Type":"NetworkCustomerDailyLoginMetrics","Notes":""},{"Key Prefix":"4M6","Object Type":"NetworkPartnerDailyLoginMetrics","Notes":""},{"Key Prefix":"4NA","Object Type":"CooperSettingsMetrics","Notes":""},{"Key Prefix":"4NB","Object Type":"SupportOrgWideMetrics","Notes":""},{"Key Prefix":"4NC","Object Type":"LightningServiceMetrics","Notes":""},{"Key Prefix":"4ND","Object Type":"UtilityBarMetrics","Notes":""},{"Key Prefix":"4NW","Object Type":"NetworkPCustDailyLoginMetrics","Notes":""},{"Key Prefix":"4V3","Object Type":"WarrantyTerm","Notes":""},{"Key Prefix":"4Wz","Object Type":"Package2UpgradeExport","Notes":""},{"Key Prefix":"4XF","Object Type":"BatchApexErrorEventBatchJobId","Notes":"TBC - The unique ID of the batch job that fired the event from BatchApexErrorEvent.RequestID"},{"Key Prefix":"4YL","Object Type":"Image","Notes":""},{"Key Prefix":"4Zu","Object Type":"AnimationRule","Notes":""},{"Key Prefix":"4ci","Object Type":"CompactLayoutItemInfo","Notes":""},{"Key Prefix":"4cl","Object Type":"CompactLayoutInfo","Notes":""},{"Key Prefix":"4co","Object Type":"SearchLayout","Notes":""},{"Key Prefix":"4dt","Object Type":"DataType","Notes":""},{"Key Prefix":"4fe","Object Type":"FieldDefinition","Notes":""},{"Key Prefix":"4fp","Object Type":"UserFieldAccess","Notes":""},{"Key Prefix":"4ft","Object Type":"ServiceFieldDataType","Notes":""},{"Key Prefix":"4hy","Object Type":"MyDomainDiscoverableLogin","Notes":""},{"Key Prefix":"4ie","Object Type":"EntityDefinition","Notes":""},{"Key Prefix":"4nK","Object Type":"AssetStatePeriod","Notes":""},{"Key Prefix":"4nL","Object Type":"AssetAction","Notes":""},{"Key Prefix":"4nM","Object Type":"AssetActionSource","Notes":""},{"Key Prefix":"4pb","Object Type":"Publisher","Notes":""},{"Key Prefix":"4pv","Object Type":"PicklistValueInfo","Notes":""},{"Key Prefix":"4sr","Object Type":"Service","Notes":""},{"Key Prefix":"4st","Object Type":"ServiceDataType","Notes":""},{"Key Prefix":"4sv","Object Type":"ServiceVersion","Notes":""},{"Key Prefix":"4v2","Object Type":"ProcessExceptionEvent","Notes":""},{"Key Prefix":"4ve","Object Type":"ApexPageInfo","Notes":""},{"Key Prefix":"4ws","Object Type":"WebServiceDefinition","Notes":""},{"Key Prefix":"4wt","Object Type":"WsdlDataType","Notes":""},{"Key Prefix":"4xo","Object Type":"AssetWarranty","Notes":""},{"Key Prefix":"4xs","Object Type":"XmlSchema","Notes":""},{"Key Prefix":"500","Object Type":"Case","Notes":""},{"Key Prefix":"501","Object Type":"Solution","Notes":""},{"Key Prefix":"50r","Object Type":"ApiTask","Notes":""},{"Key Prefix":"550","Object Type":"Entitlement","Notes":""},{"Key Prefix":"551","Object Type":"EntitlementTemplate","Notes":""},{"Key Prefix":"552","Object Type":"SlaProcess","Notes":""},{"Key Prefix":"553","Object Type":"Milestone","Notes":""},{"Key Prefix":"554","Object Type":"SlaProcessFilter","Notes":""},{"Key Prefix":"555","Object Type":"CaseMilestone","Notes":""},{"Key Prefix":"556","Object Type":"SlaProcessFilterItem","Notes":""},{"Key Prefix":"557","Object Type":"MilestoneType","Notes":""},{"Key Prefix":"558","Object Type":"MilestoneCondition","Notes":""},{"Key Prefix":"559","Object Type":"MilestoneTimeTrigger","Notes":""},{"Key Prefix":"560","Object Type":"MilestoneTimeAction","Notes":""},{"Key Prefix":"561","Object Type":"MilestoneSuccessAction","Notes":""},{"Key Prefix":"562","Object Type":"TimeStop","Notes":""},{"Key Prefix":"563","Object Type":"SlaProcessPushRule","Notes":""},{"Key Prefix":"570","Object Type":"LiveChatTranscript","Notes":""},{"Key Prefix":"571","Object Type":"LiveChatVisitor","Notes":""},{"Key Prefix":"572","Object Type":"LiveChatDeployment","Notes":""},{"Key Prefix":"573","Object Type":"LiveChatButton","Notes":""},{"Key Prefix":"574","Object Type":"QuickText","Notes":""},{"Key Prefix":"577","Object Type":"ConversationContextEntry","Notes":""},{"Key Prefix":"5CS","Object Type":"ChatSession","Notes":""},{"Key Prefix":"5H0","Object Type":"ActiveProfileMetric","Notes":""},{"Key Prefix":"5H1","Object Type":"ActivePermSetLicenseMetric","Notes":""},{"Key Prefix":"5H2","Object Type":"ActiveFeatureLicenseMetric","Notes":""},{"Key Prefix":"5LH","Object Type":"BriefcaseAssignment","Notes":""},{"Key Prefix":"5ML","Object Type":"MacroUsage","Notes":""},{"Key Prefix":"5OU","Object Type":"ManagedContentVersion","Notes":""},{"Key Prefix":"5Pa","Object Type":"SessionPermSetActivation","Notes":""},{"Key Prefix":"5QL","Object Type":"QuickTextUsage","Notes":""},{"Key Prefix":"5Sp","Object Type":"SegmentSpace","Notes":""},{"Key Prefix":"5Uj","Object Type":"ProductWarrantyTerm","Notes":""},{"Key Prefix":"600","Object Type":"BILLING_DIVISION","Notes":""},{"Key Prefix":"601","Object Type":"BILLING_ORDER","Notes":""},{"Key Prefix":"602","Object Type":"CURRENCY","Notes":""},{"Key Prefix":"604","Object Type":"PLAN","Notes":""},{"Key Prefix":"605","Object Type":"PRODUCT","Notes":""},{"Key Prefix":"606","Object Type":"BILLING_ORDER_ITEM","Notes":""},{"Key Prefix":"607","Object Type":"PLAN_PRODUCT","Notes":""},{"Key Prefix":"608","Object Type":"ForecastShare","Notes":""},{"Key Prefix":"625","Object Type":"ProcessPalette","Notes":""},{"Key Prefix":"62C","Object Type":"LightningUsageByAppTypeMetrics","Notes":""},{"Key Prefix":"6AA","Object Type":"AssociationQueueItem","Notes":""},{"Key Prefix":"6AB","Object Type":"EventAssociationItem","Notes":""},{"Key Prefix":"6AC","Object Type":"MailAssociationItem","Notes":""},{"Key Prefix":"6AD","Object Type":"TaskAssociationItem","Notes":""},{"Key Prefix":"6At","Object Type":"PersonalizationTargetInfo","Notes":""},{"Key Prefix":"6Au","Object Type":"Audience","Notes":""},{"Key Prefix":"6EB","Object Type":"EngagementHistoryRollup","Notes":""},{"Key Prefix":"6SS","Object Type":"SegmentSpaceChunk","Notes":""},{"Key Prefix":"6TS","Object Type":"IframeWhiteListUrl","Notes":""},{"Key Prefix":"6ZC","Object Type":"DashboardComponentReference","Notes":""},{"Key Prefix":"6f3","Object Type":"InteractionSteppedStageItem","Notes":""},{"Key Prefix":"6g5","Object Type":"ExpenseReport","Notes":""},{"Key Prefix":"6mX","Object Type":"OrgMetricScanSummary","Notes":""},{"Key Prefix":"6pS","Object Type":"PartitionStatus","Notes":""},{"Key Prefix":"700","Object Type":"MetadataChangeTemplate","Notes":""},{"Key Prefix":"701","Object Type":"Campaign","Notes":""},{"Key Prefix":"707","Object Type":"AsyncApexJob","Notes":"Doc"},{"Key Prefix":"708","Object Type":"BatchApexRelationship","Notes":""},{"Key Prefix":"709","Object Type":"ApexTestQueueItem","Notes":"Doc"},{"Key Prefix":"70a","Object Type":"AssetShare","Notes":""},{"Key Prefix":"70b","Object Type":"AssetOwnerSharingRule","Notes":""},{"Key Prefix":"70c","Object Type":"AssetCriteriaSharingRule","Notes":""},{"Key Prefix":"70d","Object Type":"AssetSharingRuleFilterItem","Notes":""},{"Key Prefix":"710","Object Type":"LoginIp","Notes":""},{"Key Prefix":"711","Object Type":"ApiLoginKey","Notes":""},{"Key Prefix":"712","Object Type":"LoginIpEmail","Notes":""},{"Key Prefix":"713","Object Type":"ClientBrowser","Notes":""},{"Key Prefix":"714","Object Type":"ApexCodeCoverage","Notes":""},{"Key Prefix":"715","Object Type":"ApexCodeCoverageAggregate","Notes":""},{"Key Prefix":"716","Object Type":"ApexOrgWideCoverage","Notes":""},{"Key Prefix":"729","Object Type":"Photo","Notes":""},{"Key Prefix":"737","Object Type":"FieldHistory","Notes":""},{"Key Prefix":"750","Object Type":"AsyncApiJob","Notes":"Bulk Query Job"},{"Key Prefix":"751","Object Type":"AsyncApiBatch","Notes":"Bulk Query Batch"},{"Key Prefix":"752","Object Type":"AsyncApiQueryResult","Notes":"Bulk Query Result"},{"Key Prefix":"753","Object Type":"TempStore","Notes":""},{"Key Prefix":"754","Object Type":"AsyncApiJobOptions","Notes":""},{"Key Prefix":"766","Object Type":"UiStyleDefinition","Notes":""},{"Key Prefix":"777","Object Type":"UiStyle","Notes":""},{"Key Prefix":"7Ce","Object Type":"DataflowTrigger","Notes":""},{"Key Prefix":"7EL","Object Type":"SoftLimitsApiUsageMetrics","Notes":""},{"Key Prefix":"7Eh","Object Type":"LinkedInLeadGen","Notes":""},{"Key Prefix":"7Eq","Object Type":"LeadConvertMapping","Notes":""},{"Key Prefix":"7Er","Object Type":"LightningComponentTarget","Notes":""},{"Key Prefix":"7FG","Object Type":"ManagedContentTypeSearchBlackList","Notes":""},{"Key Prefix":"7MM","Object Type":"LightningOnboardingConfig","Notes":"/LightningOnboarding"},{"Key Prefix":"7dR","Object Type":"LearningContent","Notes":""},{"Key Prefix":"7dl","Object Type":"DebugLevel","Notes":""},{"Key Prefix":"7fc","Object Type":"MaintenanceWorkRule","Notes":""},{"Key Prefix":"7iv","Object Type":"SoftwareProduct","Notes":""},{"Key Prefix":"7ov","Object Type":"NetworkDiscoverableLogin","Notes":""},{"Key Prefix":"7pV","Object Type":"LightningUsageByFlexiPageMetrics","Notes":""},{"Key Prefix":"7tf","Object Type":"TraceFlag","Notes":""},{"Key Prefix":"7tg","Object Type":"S2XGoogleServiceAccount","Notes":""},{"Key Prefix":"7ud","Object Type":"OauthCustomScope","Notes":""},{"Key Prefix":"7ue","Object Type":"OauthCustomScopeApp","Notes":""},{"Key Prefix":"800","Object Type":"Contract","Notes":""},{"Key Prefix":"801","Object Type":"Order","Notes":""},{"Key Prefix":"802","Object Type":"OrderItem","Notes":""},{"Key Prefix":"803","Object Type":"INVOICE","Notes":""},{"Key Prefix":"804","Object Type":"INVOICE_ITEM","Notes":""},{"Key Prefix":"805","Object Type":"PAYMENT","Notes":""},{"Key Prefix":"806","Object Type":"Approval","Notes":""},{"Key Prefix":"807","Object Type":"URI_BLOCK_RULE","Notes":""},{"Key Prefix":"80D","Object Type":"OrganizationValue","Notes":""},{"Key Prefix":"810","Object Type":"ServiceContract","Notes":""},{"Key Prefix":"811","Object Type":"ContractLineItem","Notes":""},{"Key Prefix":"817","Object Type":"S2XTransaction","Notes":""},{"Key Prefix":"820","Object Type":"S2XRecordMap","Notes":""},{"Key Prefix":"822","Object Type":"S2XUserMap","Notes":""},{"Key Prefix":"823","Object Type":"S2XServiceAccount","Notes":""},{"Key Prefix":"824","Object Type":"S2XTransactionLock","Notes":""},{"Key Prefix":"825","Object Type":"S2XEventRecordMap","Notes":""},{"Key Prefix":"828","Object Type":"ActivityRecurrence2","Notes":""},{"Key Prefix":"829","Object Type":"ActivityExtension","Notes":""},{"Key Prefix":"82B","Object Type":"ActivityRecurrence2Exception","Notes":""},{"Key Prefix":"886","Object Type":"OauthClientRegistration","Notes":""},{"Key Prefix":"888","Object Type":"OauthConsumer","Notes":"Remote Access"},{"Key Prefix":"889","Object Type":"OauthConsumerAsset","Notes":""},{"Key Prefix":"8BM","Object Type":"ExpressionFilterCriteria","Notes":""},{"Key Prefix":"8D3","Object Type":"RevenueElement","Notes":""},{"Key Prefix":"8GR","Object Type":"CareDeterminant","Notes":""},{"Key Prefix":"8Kk","Object Type":"PlatformEventUsageMetric","Notes":""},{"Key Prefix":"8Z7","Object Type":"AlternativePaymentMethod","Notes":""},{"Key Prefix":"8dy","Object Type":"MetricsInMQMetrics","Notes":""},{"Key Prefix":"8gZ","Object Type":"FlowInterviewLog","Notes":""},{"Key Prefix":"8lW","Object Type":"ContactPointAddress","Notes":""},{"Key Prefix":"8wk","Object Type":"DashboardSavedView","Notes":""},{"Key Prefix":"8yy","Object Type":"ApexTestRunResultMetrics","Notes":""},{"Key Prefix":"906","Object Type":"Question","Notes":""},{"Key Prefix":"907","Object Type":"Reply","Notes":""},{"Key Prefix":"910","Object Type":"QuestionSubscription","Notes":""},{"Key Prefix":"911","Object Type":"QuestionReportAbuse","Notes":""},{"Key Prefix":"912","Object Type":"ReplyReportAbuse","Notes":""},{"Key Prefix":"918","Object Type":"ChatterServiceSiteSetting","Notes":""},{"Key Prefix":"99Q","Object Type":"LearningRank","Notes":""},{"Key Prefix":"9BV","Object Type":"PackageBooleanValue","Notes":""},{"Key Prefix":"9D9","Object Type":"CustomObjTeamMemberMetric","Notes":""},{"Key Prefix":"9DV","Object Type":"PackageDateValue","Notes":""},{"Key Prefix":"9EW","Object Type":"IotActivityLog","Notes":""},{"Key Prefix":"9EZ","Object Type":"IoTActivityLogEvent","Notes":""},{"Key Prefix":"9NV","Object Type":"PackageIntegerValue","Notes":""},{"Key Prefix":"9Pt","Object Type":"ManagedContentNodeRefTree","Notes":""},{"Key Prefix":"9Pu","Object Type":"ManagedContentSpaceFolder","Notes":""},{"Key Prefix":"9Px","Object Type":"ManagedContentSpaceFolderMember","Notes":""},{"Key Prefix":"9Py","Object Type":"ManagedContentFolderLink","Notes":""},{"Key Prefix":"9UX","Object Type":"OrgDomainLog","Notes":""},{"Key Prefix":"9V6","Object Type":"RedirectWhitelistUrl","Notes":""},{"Key Prefix":"9Vl","Object Type":"ContactPointEmail","Notes":""},{"Key Prefix":"9XN","Object Type":"GenericContentFolderMember","Notes":""},{"Key Prefix":"9XP","Object Type":"GenericContentFolder","Notes":""},{"Key Prefix":"9aM","Object Type":"OrgMetricScanResult","Notes":""},{"Key Prefix":"9bq","Object Type":"AIInsightFeedback","Notes":""},{"Key Prefix":"9gd","Object Type":"ServiceSetupProvisioning","Notes":""},{"Key Prefix":"9jr","Object Type":"StrategyMonthlyStats","Notes":""},{"Key Prefix":"9qb","Object Type":"AIRecordInsight","Notes":""},{"Key Prefix":"9qc","Object Type":"AIInsightValue","Notes":""},{"Key Prefix":"9qd","Object Type":"AIInsightAction","Notes":""},{"Key Prefix":"9s4","Object Type":"IPAddressRange","Notes":""},{"Key Prefix":"9s9","Object Type":"InteractionCollSortOption","Notes":""},{"Key Prefix":"9ss","Object Type":"InteractionSteppedStage","Notes":""},{"Key Prefix":"9tv","Object Type":"PaymentAuthAdjustment","Notes":""},{"Key Prefix":"9xb","Object Type":"GenericContentFolderItem","Notes":""},{"Key Prefix":"9yZ","Object Type":"LicenseManagementOrgCertificate","Notes":""},{"Key Prefix":"9zx","Object Type":"PaymentGroup","Notes":""},{"Key Prefix":"9zz","Object Type":"SqlInfoPfes","Notes":""},{"Key Prefix":"kA#","Object Type":"KnowledgeArticle","Notes":""},{"Key Prefix":"ka#","Object Type":"KnowledgeArticleVersion","Notes":""},{"Key Prefix":"ka0","Object Type":"Article","Notes":"Knowledge Article"}]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResultDetails = exports.RuleResult = exports.ScanResult = exports.Compiler = exports.FlowVariable = exports.FlowType = exports.FlowResource = exports.FlowNode = exports.FlowElement = exports.FlowAttribute = exports.Flow = exports.fix = exports.scan = exports.getRules = void 0;
const FixFlows_1 = __nccwpck_require__(169);
const GetRuleDefinitions_1 = __nccwpck_require__(874);
const ScanFlows_1 = __nccwpck_require__(514);
function getRules(ruleNames) {
    if (ruleNames && ruleNames.length > 0) {
        const ruleSeverityMap = new Map(ruleNames.map((name) => [name, 'error']));
        return (0, GetRuleDefinitions_1.GetRuleDefinitions)(ruleSeverityMap);
    }
    else {
        return (0, GetRuleDefinitions_1.GetRuleDefinitions)();
    }
}
exports.getRules = getRules;
function scan(parsedFlows, ruleOptions) {
    let flows = [];
    for (let flow of parsedFlows) {
        if (!flow.errorMessage && flow.flow) {
            flows.push(flow.flow);
        }
    }
    let scanResults;
    if ((ruleOptions === null || ruleOptions === void 0 ? void 0 : ruleOptions.rules) && Object.entries(ruleOptions.rules).length > 0) {
        scanResults = (0, ScanFlows_1.ScanFlows)(flows, ruleOptions);
    }
    else {
        scanResults = (0, ScanFlows_1.ScanFlows)(flows);
    }
    if (ruleOptions === null || ruleOptions === void 0 ? void 0 : ruleOptions.exceptions) {
        for (const [exceptionName, exceptionElements] of Object.entries(ruleOptions.exceptions)) {
            for (const scanResult of scanResults) {
                if (scanResult.flow.name === exceptionName) {
                    for (const ruleResult of scanResult.ruleResults) {
                        if (exceptionElements[ruleResult.ruleName]) {
                            const exceptions = exceptionElements[ruleResult.ruleName];
                            const filteredDetails = ruleResult.details.filter((detail) => {
                                return !exceptions.includes(detail.name);
                            });
                            ruleResult.details = filteredDetails;
                            ruleResult.occurs = filteredDetails.length > 0;
                        }
                    }
                }
            }
        }
    }
    return scanResults;
}
exports.scan = scan;
function fix(results) {
    let newResults = [];
    for (let result of results) {
        if (result.ruleResults && result.ruleResults.length > 0) {
            let fixables = result.ruleResults.filter((r) => r.ruleName === 'UnusedVariable' && r.occurs || r.ruleName === 'UnconnectedElement' && r.occurs);
            if (fixables && fixables.length > 0) {
                const newFlow = (0, FixFlows_1.FixFlows)(result.flow, fixables);
                result.flow = newFlow;
                newResults.push(result);
            }
        }
    }
    return newResults;
}
exports.fix = fix;
var Flow_1 = __nccwpck_require__(877);
Object.defineProperty(exports, "Flow", ({ enumerable: true, get: function () { return Flow_1.Flow; } }));
var FlowAttribute_1 = __nccwpck_require__(80);
Object.defineProperty(exports, "FlowAttribute", ({ enumerable: true, get: function () { return FlowAttribute_1.FlowAttribute; } }));
var FlowElement_1 = __nccwpck_require__(930);
Object.defineProperty(exports, "FlowElement", ({ enumerable: true, get: function () { return FlowElement_1.FlowElement; } }));
var FlowNode_1 = __nccwpck_require__(360);
Object.defineProperty(exports, "FlowNode", ({ enumerable: true, get: function () { return FlowNode_1.FlowNode; } }));
var FlowResource_1 = __nccwpck_require__(526);
Object.defineProperty(exports, "FlowResource", ({ enumerable: true, get: function () { return FlowResource_1.FlowResource; } }));
var FlowType_1 = __nccwpck_require__(929);
Object.defineProperty(exports, "FlowType", ({ enumerable: true, get: function () { return FlowType_1.FlowType; } }));
var FlowVariable_1 = __nccwpck_require__(455);
Object.defineProperty(exports, "FlowVariable", ({ enumerable: true, get: function () { return FlowVariable_1.FlowVariable; } }));
var Compiler_1 = __nccwpck_require__(450);
Object.defineProperty(exports, "Compiler", ({ enumerable: true, get: function () { return Compiler_1.Compiler; } }));
var ScanResult_1 = __nccwpck_require__(992);
Object.defineProperty(exports, "ScanResult", ({ enumerable: true, get: function () { return ScanResult_1.ScanResult; } }));
var RuleResult_1 = __nccwpck_require__(379);
Object.defineProperty(exports, "RuleResult", ({ enumerable: true, get: function () { return RuleResult_1.RuleResult; } }));
var ResultDetails_1 = __nccwpck_require__(995);
Object.defineProperty(exports, "ResultDetails", ({ enumerable: true, get: function () { return ResultDetails_1.ResultDetails; } }));
//# sourceMappingURL=index.js.map
})();

module.exports = __webpack_exports__;
/******/ })()
;