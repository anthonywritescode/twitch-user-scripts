// ==UserScript==
// @name         twitch chat thingy
// @namespace    https://asottile.dev
// @version      0.1
// @description  make a highlight thingy so I know where I'm at in chat
// @author       asottile
// @match        https://dashboard.twitch.tv/popout/u/*/stream-manager/chat
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let highlighted = null, button = null;

    document.body.addEventListener('click', (e) => {
        let target = e.target;
        while (target !== document.body && !target.classList.contains('chat-line__message')) {
            if (target.classList.contains('chat-line__username')) {
                target = document.body;
            } else {
                target = target.parentNode;
            }
        }
        if (target !== document.body) {
            if (highlighted !== null) {
                highlighted.style.border = 'inherit';
            }
            highlighted = target;
            highlighted.style.border = '3px solid #FF69B4';
        }

        if (button === null) {
            let chatButton = document.querySelector('.stream-chat .tw-mg-l-05 > button')
            if (chatButton === null) {
                return
            }

            button = chatButton.cloneNode(true);
            button.childNodes[0].childNodes[0].textContent = 'JUMP';
            button.addEventListener('click', () => {
                highlighted.scrollIntoView();
            });
            let buttons = document.querySelector('[data-test-selector="chat-input-buttons-container"]');
            buttons.insertBefore(
                button,
                buttons.childNodes[buttons.childNodes.length - 1],
            );
        }
    });
})();
