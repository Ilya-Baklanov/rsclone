import * as http from 'http';
import { Server, Socket } from 'socket.io';
import gameLogic from '@/resources/Game/game.controller';
import {Room} from '@/resources/Game/game.models';

export default (server : http.Server ) : void => {
  const rooms : Array<Room> = [];
  const io = new Server(server,
    {
      path: '/websocket',
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      }});

  io.on('connection', (socket : Socket) : void =>{
    gameLogic(io, socket, rooms);
  });
};