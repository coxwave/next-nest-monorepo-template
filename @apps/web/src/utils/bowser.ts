import Bowser from 'bowser';

export const isMobile: () => boolean = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  return browser.getPlatform().type === 'mobile';
};

export const isTablet: () => boolean = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  return browser.getPlatform().type === 'tablet';
};

export const isDesktop: () => boolean = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  return browser.getPlatform().type === 'desktop';
};

export const isMacOS: () => boolean | null = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  return browser.getOS().name?.toLowerCase().includes('mac') ?? null;
};

export const isKakaoInApp: () => boolean = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  return browser.getUA().toLowerCase().includes('kakao');
};
