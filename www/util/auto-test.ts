/* global IS_PRODUCTION */

type GetTestNodeIdType = (nodeId: string) => string | null;
type GetTestNodeDataType = (data: Record<string, string> | string) => string | null;

function productionGetTestNodeId(): string | null {
    return null;
}

export function developmentGetTestNodeId(nodeId: string): string | null {
    return nodeId;
}

function productionGetTestNodeData(): string | null {
    return null;
}

export function developmentGetTestNodeData(data: Record<string, string> | string): string | null {
    return typeof data === 'string' ? data : JSON.stringify(data);
}

const isProduction = Boolean(typeof IS_PRODUCTION === 'boolean' && IS_PRODUCTION);

export const getTestNodeId: GetTestNodeIdType = isProduction ? productionGetTestNodeId : developmentGetTestNodeId;
export const getTestNodeData: GetTestNodeDataType = isProduction
    ? productionGetTestNodeData
    : developmentGetTestNodeData;
