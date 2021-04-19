import { RegisterDTO } from '../../src/models/register.dto';
import * as request from 'supertest';
import { LoginDTO } from '../../src/models/login.dto';
const base_url = 'http://localhost:3000/api';

it('GET /', () => {
    return request(base_url).get('/').expect(200).expect('Hello World!');
});

it('POST /auth/register', () => {
    const user: RegisterDTO = {
        email: 'abd@h.com',
        username: 'abd_qq',
        password: '@Matrix1234@',
        passwordConfirmation: '@Matrix1234@',
        firstName: 'abd',
        lastName: 'qassab',
    };
    return request(base_url).post('/auth/register').send(user).expect(201);
});

it('POST /auth/login', () => {
    const user: LoginDTO = {
        email: 'abd@h.com',
        password: '@Matrix1234@',
    };
    return request(base_url).post('/auth/login').send(user).expect(201);
});
