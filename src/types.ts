// types.ts
import { Worker } from 'worker_threads';

export interface AnalyticsEvent {
  category: string;
  action: string;
  label: string;
  value: number;
}

export interface AnalyticsEventMap {
  [category: string]: { [action: string]: { [label: string]: number } };
}

export interface WorkerMessage {
  type: 'ANALYTICS_EVENT' | 'ANALYTICS_EVENT_MAP' | 'CLEAN_EVENTS';
  payload?: AnalyticsEvent | AnalyticsEventMap | never;
}

export interface WorkerResponse {
  type?: 'EVENTS_PROCESSED' | 'EVENTS_COUNT';
  payload?: AnalyticsEvent[];
}

export function isWorkerMessage(obj: any): obj is WorkerMessage {
  return 'type' in obj && (obj.type === 'ANALYTICS_EVENT' || obj.type === 'ANALYTICS_EVENT_MAP' || obj.type === 'CLEAN_EVENTS');
}

export function isWorkerResponse(obj: any): obj is WorkerResponse {
  return 'type' in obj && (obj.type === 'EVENTS_PROCESSED' || obj.type === 'EVENTS_COUNT');
}

export interface WorkerOptions {
  worker: Worker;
  onMessage?: (event: WorkerMessage) => void;
  close?: () => void;
}