function generateCapsules(xOffset, yOffset, count) {
    let capsules = '';
    const cols = 4; // 4 kapsułki na półkę
    const rows = 3; // 3 rzędy kapsułek
    const gap = 140; // Odstęp między kapsułkami

    for (let i = 0; i < count; i++) {
        let x = xOffset + (i % cols) * gap;
        let y = yOffset + Math.floor(i / cols) * (gap - 20); // Przesunięcie w pionie dla każdego rzędu
        capsules += `<g class="capsule-group" transform="translate(${x},${y})">${CAPSULE}</g>\n`;
    }

    return capsules;
}

const CAPSULE = "<svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "  <style>\n" +
    "    .capsule-top { fill: black; } \n" +
    "    .capsule-highlight { fill: darkgray; } \n" +
    "    .capsule-rim { fill: black; } \n" +
    "    .capsule-body { fill: gray; } \n" +
    "    .capsule-bottom { fill: black; } \n" +
    "    .capsule-shadow { fill: darkgray; } \n" +
    "    .capsule-logo { fill: gold; }\n" +
    "  </style>\n" +
    "  \n" +
    "  <!-- Capsule Top -->\n" +
    "  <rect class=\"capsule-top\" x=\"6\" y=\"6\" width=\"20\" height=\"4\"/>\n" +
    "  <rect class=\"capsule-highlight\" x=\"8\" y=\"8\" width=\"16\" height=\"2\"/>\n" +
    "  \n" +
    "  <!-- Capsule Rim -->\n" +
    "  <rect class=\"capsule-rim\" x=\"4\" y=\"10\" width=\"24\" height=\"2\"/>\n" +
    "  \n" +
    "  <!-- Capsule Body -->\n" +
    "  <rect class=\"capsule-body\" x=\"6\" y=\"12\" width=\"20\" height=\"10\"/>\n" +
    "  \n" +
    "  <!-- Capsule Bottom -->\n" +
    "  <rect class=\"capsule-bottom\" x=\"8\" y=\"22\" width=\"16\" height=\"2\"/>\n" +
    "  \n" +
    "  <!-- Capsule Side Shadow -->\n" +
    "  <rect class=\"capsule-shadow\" x=\"20\" y=\"12\" width=\"2\" height=\"10\"/>\n" +
    "  \n" +
    "  <!-- Gold Logo (Pixelated Style) -->\n" +
    "  <rect class=\"capsule-logo\" x=\"12\" y=\"8\" width=\"8\" height=\"1\"/>\n" +
    "  <rect class=\"capsule-logo\" x=\"14\" y=\"9\" width=\"4\" height=\"1\"/>\n" +
    "</svg>\n"