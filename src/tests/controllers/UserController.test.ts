import request from 'supertest';
import { app } from '../../app';
import {
  connectTestDB,
  disconnectTestDB,
} from '../../infrastructure/database/db';

let userId: string;

beforeAll(async () => {
  await connectTestDB();

  const response = await request(app).post('/api/v1/users').send({
    name: 'Test User',
    email: 'testuser@example.com',
    balance: 1000,
  });
  userId = response.body._id;
});

afterAll(async () => {
  await disconnectTestDB();
});

describe('UserController', () => {
  it('should get all users', async () => {
    const response = await request(app).get('/api/v1/users');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should create a new user', async () => {
    const newUser = {
      name: 'New Test User',
      email: 'newuser@example.com',
      balance: 500,
    };

    const response = await request(app).post('/api/v1/users').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
    expect(response.body.balance).toBe(newUser.balance);
  });

  it('should update user information', async () => {
    const updatedUser = {
      name: 'Updated Test User',
      balance: 1500,
    };

    const response = await request(app)
      .put(`/api/v1/users/${userId}`)
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Usuario actualizado');
  });
});
