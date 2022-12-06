(function() {
    window.addEventListener('DOMContentLoaded', () => {
        const config = window.ChatrixBlockConfig;
        if (!config) {
            throw "ChatrixBlockConfig is not defined";
        }

        const containerId = config.containerId;
        const container = document.getElementById(containerId);
        if (!container) {
            throw `element with id ${containerId} was not found`;
        }

        Chatrix.renderBlock(containerId, { attributes: config.attributes });
    });
})();
