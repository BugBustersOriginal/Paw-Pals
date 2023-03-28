import { io } from 'socket.io-client';

const URL = 'http://localhost:1234/';

export const socket = io.connect(URL);