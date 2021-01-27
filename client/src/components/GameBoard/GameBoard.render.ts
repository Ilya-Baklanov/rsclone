/* eslint-disable no-console */
import Phaser from 'phaser';
import { IMAGES, SCENES } from '@/components/Game/constant';
import { GameState, IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import { setBackground } from '@/utils/utils';
import { createEnemyCards } from '@/components/GameBoard/EnemyCards/EnenmyCards.render';
import { createPlayerCards } from '@/components/GameBoard/UserCards/UserCards.render';
import {
  createGameTableImg,
  createPlayerTableZone,
} from '@/components/GameBoard/Table/Table.services';
import {
  START_GAME,
  NEXT_TURN,
  HAND_CARD_PLAY,
  NEXT_ROUND,
} from '@/components/GameBoard/constants';
import {
  getPositionOfCard,
  setDraggableCardsDependOnPlayerMana,
} from '@/components/Card/Card.services';
import {
  createEnemyAvatar,
  createPlayerAvatar,
} from '@/components/GameBoard/UserAvatar/Avatar.service';
import { Card } from '@/components/Card/Card.model';
import { createScalableCard } from '@/components/Card/Card.render';
import { createPlayerMana } from '@/components/GameBoard/UserMana/UserMana.render';
import { MANA_COUNT_FIELD } from '@/components/GameBoard/UserMana/constants';
import { onHandCardPlay } from '@/components/GameBoard/EnemyCards/EnemyCard.service';
import { createEndTurnButton } from '@/components/GameBoard/EndTurnButton/EndTurnButton.render';
import { IS_PLAYER_ONE_TURN_FIELD } from '@/components/GameBoard/EndTurnButton/constants';
import { create } from './GameBoard.services';

export class GameBoardScene extends Phaser.Scene implements IGameBoardScene {
  private socket: SocketIOClient.Socket;

  private isPlayerOne = false;

  private enemyAvatar: Phaser.GameObjects.Container;

  private playerAvatar: Phaser.GameObjects.Container;

  private enemyCards: Phaser.GameObjects.Container[] = [];

  private playerCards: Phaser.GameObjects.Container[] = [];

  private playerTableCards: Phaser.GameObjects.Container[] = [];

  private enemyTableCards: Phaser.GameObjects.Container[] = [];

  private playerTableZone: Phaser.GameObjects.Zone;

  private enemyTableZone: Phaser.GameObjects.Zone;

  private gameTableImg: Phaser.GameObjects.Container;

  private playerMana: Phaser.GameObjects.Container;

  private endTurnButton: Phaser.GameObjects.Container;

  constructor() {
    super({
      key: SCENES.GAME_BOARD,
      active: false,
      visible: false,
    });
  }

  public getPlayerCards(): Phaser.GameObjects.Container[] {
    return this.playerCards;
  }

  public getEnemyCards(): Phaser.GameObjects.Container[] {
    return this.enemyCards;
  }

  public getPlayerTableCards(): Phaser.GameObjects.Container[] {
    return this.playerTableCards;
  }

  public getEnemyTableCards(): Phaser.GameObjects.Container[] {
    return this.enemyTableCards;
  }

  public getSocket(): SocketIOClient.Socket {
    return this.socket;
  }

  public getPlayerMana(): Phaser.GameObjects.Container {
    return this.playerMana;
  }

  public getEndTurnButton(): Phaser.GameObjects.Container {
    return this.endTurnButton;
  }

  public getPlayerTableZone(): Phaser.GameObjects.Zone {
    return this.playerTableZone;
  }

  public getIsPlayerOne(): boolean {
    return this.isPlayerOne;
  }

  public setPlayerMana(value: number): void {
    this.playerMana.data.values[MANA_COUNT_FIELD] = value;
  }

  create(data: {
    initState: GameState;
    socket: SocketIOClient.Socket;
    isPlayerOne: boolean;
  }): void {
    setBackground(this, IMAGES.GAME_BACKGROUND.NAME);

    create(this);
    this.socket = data.socket;
    this.isPlayerOne = data.isPlayerOne;

    this.enemyCards = createEnemyCards(this, data.initState.enemy.countCards);

    this.playerCards = createPlayerCards(this, data.initState.handCards);

    this.gameTableImg = createGameTableImg(this);

    this.playerTableZone = createPlayerTableZone(this, this.gameTableImg);

    this.enemyAvatar = createEnemyAvatar(
      this,
      data.initState.enemy.name,
      data.initState.enemy.health,
    );

    this.playerAvatar = createPlayerAvatar(this, data.initState.name, data.initState.health);

    this.playerMana = createPlayerMana(this, data.initState.currentMana);

    this.endTurnButton = createEndTurnButton(this, data.initState.isPlayerOneTurn);

    if (this.isPlayerOne === data.initState.isPlayerOneTurn) {
      setDraggableCardsDependOnPlayerMana(this);
    } else {
      this.input.setDraggable(this.playerCards, false);
    }

    this.socket.on(START_GAME, () => {});

    this.socket.on(NEXT_TURN, (isPlayerOneTurn: boolean) => {
      this.endTurnButton.setData(IS_PLAYER_ONE_TURN_FIELD, isPlayerOneTurn);
      if (this.isPlayerOne === isPlayerOneTurn) {
        setDraggableCardsDependOnPlayerMana(this);
      } else {
        this.input.setDraggable(this.playerCards, false);
      }
    });

    this.socket.on(NEXT_ROUND, (maxMana: number) => {
      this.setPlayerMana(maxMana);
    });

    this.socket.on(HAND_CARD_PLAY, (card: Card, isPlayerOne: boolean) => {
      onHandCardPlay(this, card, isPlayerOne);
    });
  }
}
