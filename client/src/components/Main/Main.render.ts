import { createHtmlElement } from '@/utils/utils';
import { createMenuPage } from '../Menu/Menu.render';

export const renderMain = (): void => {
  const mainEl: HTMLElement = createHtmlElement('main', 'main');
  document.body.appendChild(mainEl);

  mainEl.appendChild(createMenuPage());
};