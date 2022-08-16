import {login, register} from "../src/api/auth"
import { RegisterRequest } from "../src/api/base"


async function test_login() {
    let err, response = await login('xxj', '12345678', 'device-a1b2c3d4')
    if (err) {
        console.info('error: ', err)
    }
    expect(response.code).toBe(200)
    console.info("token: ", response.token)
}

async function test_register() {
    let user1: RegisterRequest = {
        'account': 'xxj',
        'nickName': 'xxjay',
        'password': '12345678'
    }
    let user2: RegisterRequest = {
        'account': 'typescript',
        'nickName': 'typescript',
        'password': '12345678'
    }

    let err1, response1 = await register(user1)
    let err2, response2 = await register(user2)
    expect(err1).toBeNull()
    expect(err2).toBeNull()

    expect(response1.code).toBe(400)
    expect(response2.code).toBe(200)
}

test('test_login', test_login)
test('test_register', test_register)