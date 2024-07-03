export interface Queue {
  publish(queue: string, message: any): Promise<void>;
}
