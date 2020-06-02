import { Cliente } from '../models/cliente.model';

describe('Cliente', () => {
  it('should create an instance', () => {
    expect(new Cliente()).toBeTruthy();
  });
});
