const GET_NOTEPAD = (error) => {
    return "<svg width=\"150\" height=\"200\" viewBox=\"0 0 200 300\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "<style>\n" +
        "    .small {\n" +
        "      font: italic 10px sans-serif;\n" +
        "    }\n" +
        "    .heavy {\n" +
        "      font: bold 11px sans-serif;\n" +
        "    }\n" +
        "\n" +
        "    /* Note that the color of the text is set with the    *\n" +
        "     * fill property, the color property is for HTML only */\n" +
        "    .Rrrrr {\n" +
        "      font: italic 40px serif;\n" +
        "      fill: red;\n" +
        "    }\n" +
        "  </style>\n"+
        "  <!-- Notepad Background -->\n" +
        "  <rect x=\"10\" y=\"10\" width=\"180\" height=\"280\" fill=\"#d0d000\" stroke=\"black\" stroke-width=\"2\" />\n" +
        "  \n" +
        "  <!-- Pixelated Spiral Binding -->\n" +
        "  <g fill=\"black\">\n" +
        "    <rect x=\"28\" y=\"8\" width=\"4\" height=\"4\" />\n" +
        "    <rect x=\"48\" y=\"8\" width=\"4\" height=\"4\" />\n" +
        "    <rect x=\"68\" y=\"8\" width=\"4\" height=\"4\" />\n" +
        "    <rect x=\"88\" y=\"8\" width=\"4\" height=\"4\" />\n" +
        "    <rect x=\"108\" y=\"8\" width=\"4\" height=\"4\" />\n" +
        "    <rect x=\"128\" y=\"8\" width=\"4\" height=\"4\" />\n" +
        "    <rect x=\"148\" y=\"8\" width=\"4\" height=\"4\" />\n" +
        "    <rect x=\"168\" y=\"8\" width=\"4\" height=\"4\" />\n" +
        "  </g>\n" +
        "  \n" +
        "  <!-- Pixelated Guidelines -->\n" +
        "  <g stroke=\"gray\" stroke-width=\"2\">\n" +
        "    <line x1=\"16\" y1=\"40\" x2=\"184\" y2=\"40\" />\n" +
        "    <line x1=\"16\" y1=\"60\" x2=\"184\" y2=\"60\" />\n" +
        "    <line x1=\"16\" y1=\"80\" x2=\"184\" y2=\"80\" />\n" +
        "    <line x1=\"16\" y1=\"100\" x2=\"184\" y2=\"100\" />\n" +
        "    <line x1=\"16\" y1=\"120\" x2=\"184\" y2=\"120\" />\n" +
        "    <line x1=\"16\" y1=\"140\" x2=\"184\" y2=\"140\" />\n" +
        "    <line x1=\"16\" y1=\"160\" x2=\"184\" y2=\"160\" />\n" +
        "    <line x1=\"16\" y1=\"180\" x2=\"184\" y2=\"180\" />\n" +
        "    <line x1=\"16\" y1=\"200\" x2=\"184\" y2=\"200\" />\n" +
        "    <line x1=\"16\" y1=\"220\" x2=\"184\" y2=\"220\" />\n" +
        "    <line x1=\"16\" y1=\"240\" x2=\"184\" y2=\"240\" />\n" +
        "  </g>\n" +
        `  <text x=\"18\" y=\"40\" class=\"small\">CLEANLINESS: ${(error.data[0] === 1 ? "✘" : "✔")}</text>\n` +
        `  <text x=\"18\" y=\"60\" class=\"small\">POWER SUPPLY: ${(error.data[1] === 1 ? "✘" : "✔")}</text>\n` +
        `  <text x=\"18\" y=\"80\" class=\"small\">SEALS/HOSES: ${(error.data[2] === 1 ? "✘" : "✔")}</text>\n` +
        `  <text x=\"18\" y=\"100\" class=\"small\">PUMP: ${(error.data[3] === 1 ? "✘" : "✔")}</text>\n` +
        `  <text x=\"18\" y=\"120\" class=\"small\">FROTHER: ${(error.data[4] === 1 ? "✘" : "✔")}</text>\n` +
        `  <text x=\"18\" y=\"140\" class=\"small\">ELECTRONICS: ${(error.data[5] === 1 ? "✘" : "✔")}</text>\n` +
        "  <text x=\"18\" y=\"160\" class=\"small\">DETAILED DESCRIPTION</text>\n" +
        "  <text x=\"18\" y=\"180\" class=\"small\">OF THE FAULT:</text>\n" +
        `  <text x=\"18\" y=\"200\" class=\"heavy\">${error.divided[0].toUpperCase()}</text>\n` +
        `  <text x=\"18\" y=\"220\" class=\"heavy\">${error.divided[1].toUpperCase()}</text>\n` +
        `  <text x=\"18\" y=\"220\" class=\"heavy\">${error.divided[2].toUpperCase()}</text>\n` +
        // "  <text x=\"18\" y=\"40\" class=\"small\">CLEANLINESS: ✔</text>\n" +
        // "  <text x=\"18\" y=\"60\" class=\"small\">POWER SUPPLY: ✘</text>\n" +
        // "  <text x=\"18\" y=\"80\" class=\"small\">SEALS/HOSES: ✔</text>\n" +
        // "  <text x=\"18\" y=\"100\" class=\"small\">PUMP: ✔</text>\n" +
        // "  <text x=\"18\" y=\"120\" class=\"small\">FROTHER: ✔</text>\n" +
        // "  <text x=\"18\" y=\"140\" class=\"small\">ELECTRONICS: ✔</text>\n" +
        // "  <text x=\"18\" y=\"160\" class=\"small\">DETAILED DESCRIPTION</text>\n" +
        // "  <text x=\"18\" y=\"180\" class=\"small\">OF THE FAULT:</text>\n" +
        // "  <text x=\"18\" y=\"200\" class=\"heavy\">TOO MUCH VOLTAGE</text>\n" +
        // "  <text x=\"18\" y=\"220\" class=\"heavy\">APPLIED</text>\n" +
        "</svg>\n"
}