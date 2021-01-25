import { setBackground } from '@/utils/utils';
import { ATLASES, IMAGES, MENU_IMAGES, SCENES } from '@/components/Game/constant';
import { HEIGHT_COEFFICIENT, MENU_ITEM_HEIGHT } from '@/components/MenuScene/constants';
import { browserHistory } from '@/router/history';
import { GAME_URL, MY_CARDS_URL, PROFILE_URL } from '@/router/constants';
import { handleLogout } from '@/components/Auth/Auth.services';
import { createButton } from '@/components/Button/Button.services';

export function create(scene: Phaser.Scene): void {
  setBackground(scene, IMAGES.MENU_BACKGROUND.NAME);
  const position = { X: scene.game.renderer.width / 2, Y: scene.game.renderer.height / 2 };

  const startButton = createButton(
    scene,
    position,
    MENU_ITEM_HEIGHT * 2,
    ATLASES.MENU_START_ATLAS.NAME,
    MENU_IMAGES.MENU_START_GAME,
    HEIGHT_COEFFICIENT,
  );
  startButton.on('pointerup', () => {
    browserHistory.push(GAME_URL);
  });

  const myCardsButton = createButton(
    scene,
    position,
    MENU_ITEM_HEIGHT,
    ATLASES.MY_CARDS_ATLAS.NAME,
    MENU_IMAGES.MENU_MY_CARDS,
    HEIGHT_COEFFICIENT,
  );
  myCardsButton.on('pointerup', () => {
    browserHistory.push(MY_CARDS_URL);
  });

  const settingButton = createButton(
    scene,
    position,
    0,
    ATLASES.SETTINGS_ATLAS.NAME,
    MENU_IMAGES.MENU_SETTINGS,
    HEIGHT_COEFFICIENT,
  );

  settingButton.on('pointerup', () => {
    browserHistory.push(PROFILE_URL);
  });

  const exitButton = createButton(
    scene,
    position,
    -MENU_ITEM_HEIGHT,
    ATLASES.EXIT_ATLAS.NAME,
    MENU_IMAGES.MENU_EXIT,
    HEIGHT_COEFFICIENT,
  );
  exitButton.on('pointerup', () => {
    handleLogout();
  });
}
