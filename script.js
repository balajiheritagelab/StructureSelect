function selectSystem() {

    const span = parseFloat(document.getElementById("span").value);
    const height = parseInt(document.getElementById("height").value);
    const seismic = parseInt(document.getElementById("seismic").value);

    if (!span || !height) {
        document.getElementById("result").innerHTML =
            "Please enter valid span and height values.";
        return;
    }

    // ----------------------------
    // STRUCTURAL SYSTEM DATABASE
    // ----------------------------

    const systems = [

        {
            name: "Load Bearing Masonry",
            maxSpan: 5,
            maxHeight: 3,
            seismicSuitability: 2,
            baseScore: 3,
            description: "Suitable for small spans and low-rise buildings."
        },

        {
            name: "RCC Moment Resisting Frame",
            maxSpan: 10,
            maxHeight: 20,
            seismicSuitability: 5,
            baseScore: 4,
            description: "Flexible system for multi-storey residential and commercial buildings."
        },

        {
            name: "Steel Frame Structure",
            maxSpan: 30,
            maxHeight: 40,
            seismicSuitability: 4,
            baseScore: 4,
            description: "Efficient for long spans and rapid construction."
        },

        {
            name: "Shear Wall System",
            maxSpan: 8,
            maxHeight: 50,
            seismicSuitability: 5,
            baseScore: 4,
            description: "Effective lateral load resisting system for seismic zones."
        }

    ];

    // ----------------------------
    // HARD FILTER
    // ----------------------------

    let validSystems = systems.filter(system =>
        span <= system.maxSpan &&
        height <= system.maxHeight
    );

    if (validSystems.length === 0) {
        document.getElementById("result").innerHTML =
            "No suitable standard structural system found. Consult structural engineer.";
        return;
    }

    // ----------------------------
    // WEIGHTED SCORING
    // ----------------------------

    const weights = {
        span: 0.4,
        height: 0.3,
        seismic: 0.3

