// process.js - Adapted for ArcOS app with Polling for Responsiveness

const html = await loadHtml("body.html");

/**
 * Represents the process for the ArcOS third-party application.
 * This class extends the ArcOS-provided `ThirdPartyAppProcess` to manage
 * the application's lifecycle and rendering within the ArcOS environment.
 */
class proc extends ThirdPartyAppProcess {
    /**
     * @type {number | null}
     */
    resizePollIntervalId = null; // To store the interval ID for polling
    /**
     * Stores the last known dimensions of the parent body element.
     */
    lastParentWidth = 0;
    lastParentHeight = 0;

    constructor(handler, pid, parentPid, app, workingDirectory, ...args) {
        super(handler, pid, parentPid, app, workingDirectory);
        this.handleResize = this.handleResize.bind(this);
    }

    /**
     * Renders the application's user interface.
     * This method is called by ArcOS when the application needs to display its content.
     */
    async render() {
        if (this._disposed) return;

        // Define the elevation request before calling elevate
        // This definition must be present before the elevate call.
        this.elevations = this.elevations || {}; // Ensure elevations object exists
        this.elevations.prepareThyself = {
            what: "You might regret running this, please confirm that you are mentally prepared.",
            image: await this.fs.direct(util.join(workingDirectory, "icon.png")),
            title: "ArcOS",
            description: "by Nik Nikovsky",
            level: 2, // 0-low, 1-medium, 2-high severity
        };

        // Request elevation immediately at the start of the app's rendering lifecycle.
        // If elevation is denied or fails, dispose of the process and prevent further rendering.
        try {
            const elevated = await this.elevate("prepareThyself");
            if (!elevated) {
                this.Log("Elevation denied. Closing application.", LogLevel.critical);
                this.killSelf(); // Close the app if elevation is denied
                return; // Stop further rendering
            }
            this.Log("Elevation granted.", LogLevel.info);
            // Continue with rendering and other operations if elevation is granted

        } catch (error) {
            this.Log(`Error during elevation request: ${error}`, LogLevel.critical);
            this.killSelf(); // Close the app on error during elevation request
            return; // Stop further rendering
        }

        const body = this.getBody();
        this.deleteOldFolder();
        body.innerHTML = html;

        this.Log("ArcOS rendered.", LogLevel.info);

        // Set up version selection functionality
        this.setupVersionSelector();

        const arcos = document.getElementById('arcos-frame');
        if (arcos) {
            // Initial sizing
            this.handleResize();

            // --- START: Polling for responsiveness ---
            // Clear any existing interval to prevent duplicates on re-render
            if (this.resizePollIntervalId) {
                clearInterval(this.resizePollIntervalId);
            }

            // Start polling to detect dimension changes of the parent body element
            this.resizePollIntervalId = setInterval(() => {
                if (this._disposed) { // Ensure we don't poll if app is disposed
                    clearInterval(this.resizePollIntervalId);
                    return;
                }
                const bodyElement = this.getBody();
                const currentWidth = bodyElement.clientWidth;
                const currentHeight = bodyElement.clientHeight;

                // Only call handleResize if dimensions have actually changed
                if (currentWidth !== this.lastParentWidth || currentHeight !== this.lastParentHeight) {
                    this.Log(`[Polling Detected] Dimensions changed: ${currentWidth}x${currentHeight}`, LogLevel.info);
                    this.lastParentWidth = currentWidth;
                    this.lastParentHeight = currentHeight;
                    this.handleResize(); // Re-apply sizing
                }
            }, 100); // Check every 100ms (adjust as needed, lower is more responsive but more CPU intensive)
            // --- END: Polling ---

            // Initial diagnostic logs (keep these to verify initial state)
            this.Log(`[Render] window.innerWidth: ${window.innerWidth}, window.innerHeight: ${window.innerHeight}`, LogLevel.info);
            if (this.app && this.app.size) {
                this.Log(`[Render] this.app.size properties: w=${this.app.size.w}, h=${this.app.size.h}`, LogLevel.info);
                if (typeof this.app.size.subscribe === 'function') {
                    this.Log(`[Render] this.app.size HAS a 'subscribe' method (potential ReadableStore).`, LogLevel.info);
                } else {
                    this.Log(`[Render] this.app.size DOES NOT have a 'subscribe' method.`, LogLevel.info);
                }
            } else {
                this.Log(`[Render] this.app or this.app.size is undefined at render.`, LogLevel.warning);
            }

        } else {
            this.Log("iframe element not found for sizing.", LogLevel.error);
        }
    }

    /**
     * Sets the iframe size based on the parent body element's client dimensions.
     */
    handleResize() {
        if (this._disposed) return;

        const arcos = document.getElementById('arcos-frame');
        if (arcos) {
            const bodyElement = this.getBody(); // The div.body element injected by ArcOS

            const parentWidth = bodyElement.clientWidth;
            const parentHeight = bodyElement.clientHeight;

            this.Log(`[handleResize] Setting iframe to: ${parentWidth}x${parentHeight}px`, LogLevel.info);

            // Set iframe dimensions directly
            arcos.style.width = `${parentWidth}px`;
            arcos.style.height = `${parentHeight}px`;

            // Update last observed dimensions
            this.lastParentWidth = parentWidth;
            this.lastParentHeight = parentHeight;

            // Diagnostic logs
            this.Log(`[handleResize] Parent client dimensions (bodyElement): ${parentWidth}x${parentHeight}`, LogLevel.info);
            this.Log(`[handleResize] Window inner dimensions: ${window.innerWidth}x${window.innerHeight}`, LogLevel.info);
        }
    }

    /**
     * Overriding the dispose method to ensure clean up of polling interval and iframe.
     */
    dispose() {
        if (this.resizePollIntervalId) {
            clearInterval(this.resizePollIntervalId);
            this.Log("Resize polling interval cleared.", LogLevel.info);
        }

        this.Log("App dispose method called. Initiating iframe cleanup.", LogLevel.info);
        const arcos = document.getElementById('arcos-frame');
        if (arcos) {
            try {
                arcos.src = 'about:blank';
                this.Log("Iframe src set to about:blank.", LogLevel.info);
                setTimeout(() => {
                    if (arcos.parentNode) {
                        arcos.parentNode.removeChild(arcos);
                        this.Log("Iframe removed from DOM.", LogLevel.info);
                    } else {
                        this.Log("Iframe already detached from parent node.", LogLevel.warning);
                    }
                }, 100);
            } catch (e) {
                this.Log(`Error during iframe cleanup: ${e.message || e}`, LogLevel.error);
            }
        } else {
            this.Log("No iframe element found for cleanup during dispose.", LogLevel.warning);
        }
        super.dispose();
        this.Log("App disposed. Super dispose called.", LogLevel.info);
    }

    /**
     * Sets up the version selector functionality
     */
    setupVersionSelector() {
        // Version URLs mapping
        const versionUrls = {
            'v5': 'https://v5.izkuipers.nl', 
            'v6': 'https://v6.izkuipers.nl', 
            'v7': 'https://v7.izkuipers.nl',
            'nightly': 'https://v7.izkuipers.nl/nightly' 
        };

        const versionCards = document.querySelectorAll('.version-card');
        const versionSelector = document.getElementById('version-selector');
        const iframe = document.getElementById('arcos-frame');
        
        versionCards.forEach(card => {
            card.addEventListener('click', () => {
                const version = card.getAttribute('data-version');
                const url = versionUrls[version];
                
                if (url) {
                    this.Log(`Loading ArcOS ${version} from ${url}`, LogLevel.info);
                    
                    // Hide the version selector
                    versionSelector.style.display = 'none';
                    
                    // Set iframe source and show it
                    iframe.src = url;
                    iframe.style.display = 'block';
                    
                    // Re-initialize resize handling for the iframe
                    this.handleResize();
                }
            });
        });
    }

    /**
     * Moves the old application folder to the Temp (T:) drive
     */
    async deleteOldFolder() {
        try {
            await this.fs.moveItem("U:/Applications/ArcOS", "T:/");
            this.Log("Old folder U:/Applications/ArcOS moved to T:/ successfully.", LogLevel.info);
        } catch (error) {
            this.Log(`Failed to move old folder: ${error}`, LogLevel.error);
        }
    }
}

return { proc };
