import { container } from 'tsyringe';

export const clientContainer = container.createChildContainer();
export const doctorContainer = container.createChildContainer();
export const clinicContainer = container.createChildContainer();
export const usersContainer = container.createChildContainer();