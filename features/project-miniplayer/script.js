export default async function ({ feature }) {
    let controllerEnabled = false;
    let currentPosition = 'left-top';
    let activeGuiPlayer = null;
    let hasCustomDragPosition = false;
    let isDragging = false;
    let dragPointerId = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    const ENTER_MINIPLAYER_BOTTOM = -48;
    const EXIT_MINIPLAYER_BOTTOM = 96;
    const MINIPLAYER_EDGE_GAP = 8;
    const POSITION_DRAG = 'drag';
    const INTERACTIVE_SELECTOR = 'button, a, input, textarea, select, option, label, [role="button"], [role="link"], [contenteditable="true"]';

    const miniplayerElement = document.createElement('div');
    miniplayerElement.className = 'ste-project-miniplayer';

    function getNavigationOffset() {
        const navigationElement = document.querySelector('nav#navigation');
        if (!navigationElement) return 0;

        const navigationStyle = window.getComputedStyle(navigationElement);
        const isFixedLike = navigationStyle.position === 'fixed' || navigationStyle.position === 'sticky';
        if (!isFixedLike) return 0;

        return Math.max(0, Math.round(navigationElement.getBoundingClientRect().bottom));
    }

    function syncNavigationOffset() {
        miniplayerElement.style.setProperty('--ste-navigation-offset', `${getNavigationOffset()}px`);
    }

    function applyAnchoredPosition(positionValue) {
        syncNavigationOffset();

        const [horizontal = 'left', vertical = 'top'] = (positionValue || 'left-top').split('-');
        const isRight = horizontal === 'right';
        const isBottom = vertical === 'bottom';

        miniplayerElement.style.right = isRight ? `${MINIPLAYER_EDGE_GAP}px` : '';
        miniplayerElement.style.left = isRight ? '' : `${MINIPLAYER_EDGE_GAP}px`;
        miniplayerElement.style.top = isBottom ? '' : `calc(var(--ste-navigation-offset, 0px) + ${MINIPLAYER_EDGE_GAP}px)`;
        miniplayerElement.style.bottom = isBottom ? `${MINIPLAYER_EDGE_GAP}px` : '';
    }

    function clampDraggedPosition(left, top, width, height) {
        const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
        const viewportHeight = document.documentElement.clientHeight || window.innerHeight;
        const maxLeft = Math.max(MINIPLAYER_EDGE_GAP, viewportWidth - width - MINIPLAYER_EDGE_GAP);
        const maxTop = Math.max(MINIPLAYER_EDGE_GAP, viewportHeight - height - MINIPLAYER_EDGE_GAP);

        return {
            left: Math.round(Math.min(Math.max(left, MINIPLAYER_EDGE_GAP), maxLeft)),
            top: Math.round(Math.min(Math.max(top, MINIPLAYER_EDGE_GAP), maxTop))
        };
    }

    function setDraggedPosition(left, top) {
        const rect = miniplayerElement.getBoundingClientRect();
        const clamped = clampDraggedPosition(left, top, rect.width, rect.height);

        miniplayerElement.style.left = `${clamped.left}px`;
        miniplayerElement.style.top = `${clamped.top}px`;
        miniplayerElement.style.right = '';
        miniplayerElement.style.bottom = '';
    }

    function activateFreeDragPosition() {
        if (miniplayerElement.style.display === 'none') {
            syncNavigationOffset();
            miniplayerElement.style.left = `${MINIPLAYER_EDGE_GAP}px`;
            miniplayerElement.style.top = `calc(var(--ste-navigation-offset, 0px) + ${MINIPLAYER_EDGE_GAP}px)`;
            miniplayerElement.style.right = '';
            miniplayerElement.style.bottom = '';
            hasCustomDragPosition = true;
            return;
        }

        const rect = miniplayerElement.getBoundingClientRect();
        setDraggedPosition(rect.left, rect.top);
        hasCustomDragPosition = true;
    }

    function stopDragging(pointerId) {
        if (!isDragging) return;

        if (pointerId !== null && pointerId !== undefined && miniplayerElement.hasPointerCapture?.(pointerId)) {
            miniplayerElement.releasePointerCapture(pointerId);
        }

        isDragging = false;
        dragPointerId = null;
    }

    function canStartDragFromTarget(target, clientY) {
        if (target === miniplayerElement) return true;
        if (!activeGuiPlayer) return false;
        if (!activeGuiPlayer.contains(target)) return false;
        if (target.closest(INTERACTIVE_SELECTOR)) return false;

        const headerElement = activeGuiPlayer.querySelector('header, [class*="header"]');
        if (headerElement) {
            return headerElement.contains(target);
        }

        const guiRect = activeGuiPlayer.getBoundingClientRect();
        return clientY <= guiRect.top + 44;
    }

    function onMiniplayerPointerDown(event) {
        if (currentPosition !== POSITION_DRAG) return;
        if (event.button !== 0) return;
        if (!(event.target instanceof Element)) return;
        if (miniplayerElement.style.display === 'none') return;
        if (!canStartDragFromTarget(event.target, event.clientY)) return;

        const rect = miniplayerElement.getBoundingClientRect();
        setDraggedPosition(rect.left, rect.top);

        const positionedRect = miniplayerElement.getBoundingClientRect();
        dragPointerId = event.pointerId;
        dragOffsetX = event.clientX - positionedRect.left;
        dragOffsetY = event.clientY - positionedRect.top;
        hasCustomDragPosition = true;
        isDragging = true;
        miniplayerElement.setPointerCapture?.(event.pointerId);
        event.preventDefault();
    }

    function onWindowPointerMove(event) {
        if (!isDragging || event.pointerId !== dragPointerId) return;
        setDraggedPosition(event.clientX - dragOffsetX, event.clientY - dragOffsetY);
    }

    function onWindowPointerUp(event) {
        if (event.pointerId !== dragPointerId) return;
        stopDragging(event.pointerId);
    }

    miniplayerElement.addEventListener('pointerdown', onMiniplayerPointerDown);
    window.addEventListener('pointermove', onWindowPointerMove, { passive: true });
    window.addEventListener('pointerup', onWindowPointerUp);
    window.addEventListener('pointercancel', onWindowPointerUp);

    await ScratchTools.waitForElements('div.preview', (element) => {
        if (miniplayerElement.parentNode !== element) {
            element.appendChild(miniplayerElement);
        }
    });

    await ScratchTools.waitForElements('div.guiPlayer', (element) => {
        if (controllerEnabled === false) createController(element)
    });

    function createController(guiPlayer) {
        if (!guiPlayer.parentNode) return;
        activeGuiPlayer = guiPlayer;

        const playerPlaceholder = document.createElement('div');
        const originalParent = guiPlayer.parentNode;
        let originalNextSibling = guiPlayer.nextSibling;
        let playerInMiniplayer = false;
        let evaluateQueued = false;
        let destroyed = false;

        function ensureMiniplayerContainer() {
            const preview = document.querySelector('div.preview');
            if (preview && miniplayerElement.parentNode !== preview) {
                preview.appendChild(miniplayerElement);
            }
        }

        function syncPlaceholderMetrics() {
            const playerRect = guiPlayer.getBoundingClientRect();
            const playerStyle = window.getComputedStyle(guiPlayer);
            const placeholderHeight = Math.max(Math.round(playerRect.height), guiPlayer.offsetHeight);

            playerPlaceholder.style.height = `${placeholderHeight}px`;
            playerPlaceholder.style.marginTop = playerStyle.marginTop;
            playerPlaceholder.style.marginRight = playerStyle.marginRight;
            playerPlaceholder.style.marginBottom = playerStyle.marginBottom;
            playerPlaceholder.style.marginLeft = playerStyle.marginLeft;
        }

        function movePlayerBack() {
            miniplayerElement.style.display = 'none';

            if (!playerInMiniplayer) return;

            if (playerPlaceholder.parentNode) {
                playerPlaceholder.replaceWith(guiPlayer);
            } else if (document.body.contains(originalParent)) {
                const restoreBefore = originalNextSibling && originalNextSibling.parentNode === originalParent
                    ? originalNextSibling
                    : null;
                originalParent.insertBefore(guiPlayer, restoreBefore);
            }

            playerInMiniplayer = false;
        }

        function movePlayerToMiniplayer() {
            if (playerInMiniplayer) return;

            syncPlaceholderMetrics();

            if (guiPlayer.parentNode) {
                originalNextSibling = guiPlayer.nextSibling;
                guiPlayer.parentNode.insertBefore(playerPlaceholder, guiPlayer);
            }

            ensureMiniplayerContainer();
            miniplayerElement.style.display = 'block';
            miniplayerElement.appendChild(guiPlayer);
            playerInMiniplayer = true;
        }

        function evaluatePosition() {
            if (destroyed) return;

            syncNavigationOffset();

            if (!document.body.contains(guiPlayer) && !document.body.contains(playerPlaceholder)) {
                cleanupController();
                return;
            }

            if (document.querySelector('.gui_stage-and-target-wrapper_Qg4hA .stage-wrapper_stage-wrapper_odn2t')) {
                movePlayerBack();
                return;
            }

            const playerBottom = playerInMiniplayer && playerPlaceholder.parentNode
                ? playerPlaceholder.getBoundingClientRect().bottom
                : guiPlayer.getBoundingClientRect().bottom;

            if (!playerInMiniplayer && playerBottom <= ENTER_MINIPLAYER_BOTTOM) {
                movePlayerToMiniplayer();
                return;
            }

            if (playerInMiniplayer && playerBottom >= EXIT_MINIPLAYER_BOTTOM) {
                movePlayerBack();
            }
        }

        function queueEvaluate() {
            if (evaluateQueued) return;

            evaluateQueued = true;
            window.requestAnimationFrame(() => {
                evaluateQueued = false;
                evaluatePosition();
            });
        }

        function onResize() {
            if (playerInMiniplayer) {
                syncPlaceholderMetrics();
            }

            if (hasCustomDragPosition && currentPosition === POSITION_DRAG && miniplayerElement.style.display !== 'none') {
                const rect = miniplayerElement.getBoundingClientRect();
                setDraggedPosition(rect.left, rect.top);
            }

            queueEvaluate();
        }

        function cleanupController() {
            if (destroyed) return;
            destroyed = true;

            window.removeEventListener('scroll', queueEvaluate);
            window.removeEventListener('resize', onResize);

            if (domObserver) {
                domObserver.disconnect();
            }

            movePlayerBack();

            if (playerPlaceholder.parentNode) {
                playerPlaceholder.remove();
            }

            if (activeGuiPlayer === guiPlayer) {
                activeGuiPlayer = null;
            }

            controllerEnabled = false;
        }

        const domObserver = typeof MutationObserver === 'function'
            ? new MutationObserver(() => {
                if (!document.body.contains(guiPlayer) && !document.body.contains(playerPlaceholder)) {
                    cleanupController();
                }
            })
            : null;

        window.addEventListener('scroll', queueEvaluate, { passive: true });
        window.addEventListener('resize', onResize);

        if (domObserver) {
            domObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        controllerEnabled = true;
        queueEvaluate();
    }

    function updateSetting (key, value) {
        switch (key) {
            case 'position': {
                currentPosition = value || 'left-top';
                if (currentPosition === POSITION_DRAG) {
                    activateFreeDragPosition();
                } else {
                    stopDragging(dragPointerId);
                    hasCustomDragPosition = false;
                    applyAnchoredPosition(currentPosition);
                }
                break;
            }
            case 'opacity': {
                const opacityValue = Number(value);
                if (!opacityValue) {
                    miniplayerElement.style.opacity = 1;
                } else {
                    miniplayerElement.style.opacity = Math.max(0.1, 1 - Math.min(opacityValue, 90) / 100);
                }
                break;
            }
            default:
                break;
        }
    }

    syncNavigationOffset();
    updateSetting('position', await feature.settings.get('position'));
    updateSetting('opacity', await feature.settings.get('opacity'));

    feature.settings.addEventListener('changed', ({ key, value }) => {
        updateSetting(key, value)
    })
}
