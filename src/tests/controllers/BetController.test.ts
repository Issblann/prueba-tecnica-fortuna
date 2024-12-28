import request from 'supertest';
import { app } from '../../app';
import {
  connectTestDB,
  disconnectTestDB,
} from '../../infrastructure/database/db';

let userId: string;
let eventId: string;

beforeAll(async () => {
  await connectTestDB();

  const userResponse = await request(app).post('/api/v1/users').send({
    name: 'Test User',
    email: 'testuser@example.com',
    balance: 1000,
  });
  userId = userResponse.body._id;

  const eventResponse = await request(app).post('/api/v1/events').send({
    name: 'Gran Final de Fútbol',
    date: new Date(),
    sportType: 'Fútbol',
  });
  eventId = eventResponse.body._id;
});

afterAll(async () => {
  await disconnectTestDB();
});

describe('BetController', () => {
  let betId: string;

  it('should create a new bet', async () => {
    const response = await request(app).post('/api/v1/bets').send({
      userId,
      eventId,
      betValue: 400,
      fee: 1.9,
      status: 'Ganada',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('userId');
    betId = response.body._id;
  });

  it('should get all bets by user', async () => {
    const response = await request(app).get(`/api/v1/bets/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('should update bet status', async () => {
    const response = await request(app)
      .put(`/api/v1/bets/${betId}/status`)
      .send({ status: 'Ganada' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Estado de la apuesta actualizado');
    expect(response.body.updatedBet.status).toBe('Ganada');
  });
});
