/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ClearanceOrder {
  clearanceOrderNumber: number | string | undefined;
  parentClearanceOrderId?: number | string | undefined;
  shippingDocumentNumber: string | number | undefined;
  cargoWiseReference: string | number | undefined;
  containerMode?: number | undefined;
  declarationId?: number | undefined;
  consignorId?: number | undefined;
  consigneeId?: number | undefined;
  notifyPartyId?: number | undefined;
  forwarderId?: number | undefined;
  agentId?: number | undefined;
  declarantId?: number | undefined;
  shipmentType: number | undefined;
  transportMode: number | undefined;
  submitStatus: number | undefined;
  [key: string]: string | number | undefined;
}

export interface Notification {
  key: string;
  badge?: string;
  body?: string;
  data?: any;
  renotify?: boolean;
  silent?: boolean;
  timestamp?: number;
  title?: string;
}

export interface LocationDetail {
  latitude?: number | null;
  longitude?: number | null;
  address?: string | null;
}
export interface ChecklistItem {
  name: string;
  clearanceOrderId: number;
  invoiceLineId: string | null;
  hsCode: string | null;
  documentCheckListId: number;
  clearanceDocumentRequirementId: number | null;
  isVerified: boolean;
  isSystem: boolean;
  expiryDate: string | null;
  issueDate: string | null;
  issuingAuthority: string | null;
  documentId: number | null;
  document: any;
  id: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  isDeleted: boolean;
  deletedAt: string | null;
  fileType?: string | null;
  tasks?: Task[];
}
export interface Comment {
  id: number;
  userId?: number;
  content: string;
}

export interface Task {
  id?: number;
  documentCheckListItemId?: number | null;
  documentCheckListItemIds?: number[] | null;
  name?: string;
  description?: string;
  taskStatus?: number | null;
  taskType?: number | null;
  priority?: number | null;
  startTime?: string | null;
  completedTime?: string | null;
  assigneeId?: number | null;
  assignee?: string | null;
  assignedById?: number | null;
  assignedBy?: number | null;
  assignedOnDate?: string | null;
  estimatedCompletionDate?: string | null;
  clearanceOrderId?: number | null;
  clearanceOrder?: ClearanceOrder;
  checkListItems: ChecklistItem[];
  comments?: Comment[];
  location?: LocationDetail;
}

export interface TaskCardProp {
  task: Task;
}

export interface TakListProps {
  tasks: Task[];
  isLoading: boolean;
}

export interface FileProps {
  path: string;
  name: string;
  size: number;
  type: string;
}
export interface DocumentChecklist {
  clearanceOrderId: number;
  docketId: number;
  clearanceOrder: any;
  documentCheckListItems: ChecklistItem[];
  domainEvents: any[];
  id: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  isDeleted: boolean;
  deletedAt: string | null;
}
