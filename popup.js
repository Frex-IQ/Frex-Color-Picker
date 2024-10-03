      // JavaScript logic for the Frex Color Picker
        const colorPicker = document.getElementById('color-picker');
        const colorDisplay = document.getElementById('color-display');
        const hexInput = document.getElementById('hex-input');
        const rgbInput = document.getElementById('rgb-input');
        const hslInput = document.getElementById('hsl-input');
        const colorPalette = document.getElementById('color-palette');
        const savedColors = document.getElementById('saved-colors');
        const gradientPreview = document.getElementById('gradient-preview');
        const gradientStart = document.getElementById('gradient-start');
        const gradientEnd = document.getElementById('gradient-end');
        const brightnessSlider = document.getElementById('brightness-slider');
        const contrastSlider = document.getElementById('contrast-slider');
        const brightnessValue = document.getElementById('brightness-value');
        const contrastValue = document.getElementById('contrast-value');

        // Color picker functionality
        colorPicker.addEventListener('input', updateColorDisplay);

        function updateColorDisplay() {
            const color = colorPicker.value;
            colorDisplay.style.backgroundColor = color;
            hexInput.value = color;
            rgbInput.value = hexToRgb(color);
            hslInput.value = hexToHsl(color);
        }

        function hexToRgb(hex) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgb(${r}, ${g}, ${b})`;
        }

        function hexToHsl(hex) {
            const r = parseInt(hex.slice(1, 3), 16) / 255;
            const g = parseInt(hex.slice(3, 5), 16) / 255;
            const b = parseInt(hex.slice(5, 7), 16) / 255;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0;
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            h = Math.round(h * 360);
            s = Math.round(s * 100);
            l = Math.round(l * 100);
            return `hsl(${h}, ${s}%, ${l}%)`;
        }

        // Tab switching logic
        const tabs = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                tabContents.forEach(content => content.classList.remove('active'));
                document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
            });
        });

        // Close button logic
        document.getElementById('close-button').addEventListener('click', () => {
            window.close();
        });

        // Copy color to clipboard
        document.getElementById('copy-color').addEventListener('click', () => {
            const color = hexInput.value;
            navigator.clipboard.writeText(color).then(() => {
                alert('Color copied to clipboard: ' + color);
            });
        });

        // Save color to palette
        document.getElementById('save-color').addEventListener('click', () => {
            const color = hexInput.value;
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = color;
            savedColors.appendChild(swatch);

            swatch.addEventListener('click', () => {
                colorPicker.value = color;
                updateColorDisplay();
            });
        });

        // Gradient preview functionality
        gradientStart.addEventListener('input', updateGradientPreview);
        gradientEnd.addEventListener('input', updateGradientPreview);

        function updateGradientPreview() {
            const startColor = gradientStart.value;
            const endColor = gradientEnd.value;
            gradientPreview.style.background = `linear-gradient(to right, ${startColor}, ${endColor})`;
        }

        // Brightness and contrast adjustment
        brightnessSlider.addEventListener('input', () => {
            const brightness = brightnessSlider.value;
            colorDisplay.style.filter = `brightness(${brightness}%)`;
            brightnessValue.textContent = `${brightness}%`;
        });

        contrastSlider.addEventListener('input', () => {
            const contrast = contrastSlider.value;
            colorDisplay.style.filter = `contrast(${contrast}%)`;
            contrastValue.textContent = `${contrast}%`;
        });