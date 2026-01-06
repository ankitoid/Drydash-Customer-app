// services/order.service.ts
import api from "./api";

export const getOrders = () => api.get("/orders");
export const getOrderById = (id: string) => api.get(`/orders/${id}`);
