import {Room} from '@/resources/Game/Room/room.model';
import {v4 as uuidv4} from 'uuid';
import {Player} from '@/resources/Game/Player/player.model';
import {COUNTDOWN_SEC} from '@/resources/Game/constants';
import {MAX_ROOM_PLAYERS_COUNT, NO_SECOND_PLAYER} from '@/resources/Game/Room/constants';

export function getEnemyPlayer(room: Room, curPlayer: Player) : Player{
  const enemyPlayer = room.players.find((player:Player) => player.userId !== curPlayer.userId);
  if (enemyPlayer === undefined || enemyPlayer === null) {
    throw new TypeError(NO_SECOND_PLAYER);
  }
  return enemyPlayer;
}

export function isOpenedRoomExist(rooms : Array<Room>): boolean{
  const openRoom = rooms.find((room ) => room.players.length < MAX_ROOM_PLAYERS_COUNT);
  return !!openRoom;
}
export function getOpenedRoom(rooms : Array<Room>): Room {
  return <Room>rooms.find((room) => room.players.length < MAX_ROOM_PLAYERS_COUNT);
}
export function createRoom(): Room{
  return {
    'id': uuidv4(),
    'isPlayerOneTurn': (Math.random() < 0.5),
    'players': [],
    'timer': null,
    'newRound': false,
    'countDown': COUNTDOWN_SEC,
  };
}

export function deleteRoom(rooms : Array<Room>, openRoom : Room) : void{
  const openRoomIndex = rooms.findIndex((room)=>
    room.id === openRoom.id,
  );
  rooms.splice(openRoomIndex, 1);
}
export function deletePlayerFromRoom(players : Array<Player>, player : Player) : void{
  const indexOfPlayer = players.findIndex(
    (roomPlayer) =>
      roomPlayer.socket.id === player.socket.id,
  );
  players.splice(indexOfPlayer, 1);
}