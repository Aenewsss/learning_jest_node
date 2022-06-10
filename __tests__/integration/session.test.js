const factory = require('../factories');
const request = require('supertest');

const app = require('../../src/app');
const truncate = require('../utils/truncate');
const server = require('../../src/server');

describe('Authentication', () => {
    beforeEach(async () => {
        await truncate();
    });

    test('If user not exists in database', async () => {
        const user = await factory.create('User', {
            password: '123123'
        })
        
        const response = await request(app)
            .post('/sessions')
            .send({
                email: 'naoexiste@gmail.com',
                password: '123123'
            })

        expect(response.status).toBe(401);
    });

    test('authenticate with valid credentials', async () => {
        const user = await factory.create('User', {
            password: '123123'
        })
        
        const response = await request(app)
            .post('/sessions')
            .send({
                email:user.email,
                password: '123123'
            })

        expect(response.status).toBe(200);
    });

    test('should not authenticate with invalid credentials', async () => {
        const user = await factory.create('User', {
            password: '123123'
        })
        
        const response = await request(app)
            .post('/sessions')
            .send({
                email:user.email,
                password: '123456'
            })

        expect(response.status).toBe(401);
    });

    test('Receive a jwt token when authenticated', async () => {
        const user = await factory.create('User', {
            password: '123123'
        })
        
        const response = await request(app)
            .post('/sessions')
            .send({
                email:user.email,
                password: '123123'
            })

        expect(response.body).toHaveProperty("token");
    });

    test('If authenticated is able to access private routes' ,async () => {
        const user = await factory.create('User', {
            password: '123123'
        })
        
        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    });

    test("If token no exists" ,async () => {
        const user = await factory.create('User', {
            password: '123123'
        })
        
        const response = await request(app)
            .get('/dashboard')

        expect(response.status).toBe(401);
    });

    test("If token authentication is invalid to access private routes" ,async () => {
        const user = await factory.create('User', {
            password: '123123'
        })
        
        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${45}`);

        expect(response.status).toBe(401);
    });
});
    