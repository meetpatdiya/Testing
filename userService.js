import db from "./db.js";
import axios from "axios";
import fs from "fs/promises";
import crypto from "crypto";

export async function getUser(id){
    const [user] = await db.query(`select * from users where id = ${id}`);
    return user[0];
}

export async function getName(id){
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.data;
}

export async function readUserConfig() {
    const data = await fs.readFile('user-config.json', 'utf-8');
    return JSON.parse(data);
}

export function generateApiKey() {
    return crypto.randomBytes(32).toString('hex');
}

export function sum(a,b){
return a+b;
}

export const apiConfig = {
    auth: {
        getToken() {
            return "real-token";
        }
    }
};

export class LoggerClass {
    logInfo(msg) {
        console.log("INFO:", msg);
    }
}