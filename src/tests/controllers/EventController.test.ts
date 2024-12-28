import request from 'supertest';
import { app } from '../../app';
import {
  connectTestDB,
  disconnectTestDB,
} from '../../infrastructure/database/db';

let eventId: string;
let userId: string;
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
  console.log(eventId);
  await request(app).post('/api/v1/bets').send({
    userId,
    eventId,
    betValue: 500,
    fee: 2.0,
    status: 'Pendiente',
  });

  await request(app).post('/api/v1/bets').send({
    userId,
    eventId,
    betValue: 300,
    fee: 1.8,
    status: 'Ganada',
  });
});

afterAll(async () => {
  await disconnectTestDB();
});

describe('EventController', () => {
  it('should get all events with total bets', async () => {
    const response = await request(app).get('/api/v1/events');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    const event = response.body.find((e: any) => e._id === eventId);
    expect(event).toBeDefined();
    expect(event.bets).toHaveLength(2);
  });
});
