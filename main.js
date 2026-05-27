import { loquacePlugin } from "/loquace.js";

kaplay({
    scale: 2,
    background: [0, 0, 0],
    plugins: [loquacePlugin],
    font: "pristina",
});

loquace.init();

loadSprite("title", "assets/title.png");
loadSprite("instruction", "assets/instruction.png");
loadSprite("table", "assets/table.png");
loadSprite("book_closed", "assets/book_closed.png");
loadSprite("book_closed_outline", "assets/book_closed_outline.png");
loadSprite("character", "assets/character.png");
loadSprite("pages", "assets/pages.png", {
    sliceX: 3,
    anims: {
        page: {
            from: 0,
            to: 2,
        },
    },
});
loadSprite("button", "assets/button.png");
loadSprite("button_outline", "assets/button_outline.png");
loadSprite("arrow_right", "assets/arrow_right.png");
loadSprite("arrow_right_outline", "assets/arrow_right_outline.png");
loadSprite("arrow_left", "assets/arrow_left.png");
loadSprite("arrow_left_outline", "assets/arrow_left_outline.png");
loadSprite("picture1", "assets/picture1.jpg");
loadSprite("picture2", "assets/picture2.jpg");
loadSprite("picture3", "assets/picture3.jpg");
loadSprite("picture4", "assets/picture4.jpg");
loadSprite("picture5", "assets/picture5.jpg");


scene("title", () => {

    onUpdate(() => setCursor("default"));

    const table = add([
        sprite("table"),
        pos(380, 180),
        scale(2),
        anchor("center"),
        opacity(1),
    ]);

    const title = add([
        sprite("title"),
        pos(385, 80),
        scale(1),
        anchor("center"),
        opacity(1),
        animate({ relative: true }),
    ]);

    title.animate("scale", [vec2(1), vec2(1.1), vec2(1)], {
        duration: 4,
        easing: easings.easeInOutQuad,
    });

    const instruction = add([
        sprite("instruction"),
        pos(385, 160),
        scale(0.5),
        anchor("center"),
        opacity(1),
    ]);

    const closedbook_outline = add([
        sprite("book_closed_outline"),
        pos(390, 280),
        scale(1.5),
        anchor("center"),
        area(),
        opacity(0),
    ]);

    const closedbook = add([
        sprite("book_closed"),
        pos(390, 280),
        scale(1.5),
        anchor("center"),
        area(),
        opacity(1),
    ]);

    closedbook.onHoverUpdate(() => {
        setCursor("pointer");
        closedbook_outline.opacity = 1;
    });

    closedbook.onHoverEnd(() => {
        closedbook_outline.opacity = 0;
    });

    closedbook.onClick(() => {
        title.fadeOut(1);
        instruction.fadeOut(1);
        wait(1.5, () => {
            go("intro");
        });
    });

    table.fadeIn(1);
    title.fadeIn(1);
    instruction.fadeIn(1);
    closedbook.fadeIn(1);
    closedbook_outline.fadeIn(1);

});

scene("intro", () => {

    onUpdate(() => setCursor("default"));

    const table = add([
        sprite("table"),
        pos(380, 180),
        scale(2),
        anchor("center"),
        opacity(1),
    ]);

    const closedbook = add([
        sprite("book_closed"),
        pos(390, 280),
        scale(1.5),
        anchor("center"),
        area(),
        opacity(1),
    ]);

    const character = add([
        sprite("character"),
        pos(100,240),
        scale(1),
        anchor("center"),
        opacity(1),
    ]);

    character.fadeIn(1);

    wait(1, () => {
        loquace.script([
            "Salut ! Je m’appelle Karuna !",
            "Je suis originaire du Bangladesh.",
            "J’aimerais d’abord te poser une question.",
            "Est-ce que tu sais ce que c’est un déplacé climatique ?",
            "C’est une personne qui se retrouve obligée de quitter définitivement son domicile à cause des conséquences du changement climatique.",
            "Dans ce livre tu trouveras des photos qui racontent une partie de ma vie qui a été très difficile.",
            "J’espère que tu seras intéressé par mon histoire.",
        ]);
    });

    let s0 = 1;

    onClick(() => {
        loquace.next();
        s0 += 1;
        if (s0 > 7) {
            table.fadeOut(1);
            closedbook.fadeOut(1);
            character.fadeOut(1);
            wait(1.5, () => {
                go("book");
            });
        }
    });

});

var c = 1

scene("book", () => {

    onUpdate(() => setCursor("default"));

    const table = add([
        sprite("table"),
        pos(380, 180),
        scale(2),
        anchor("center"),
        opacity(1),
    ]);

    const pages = add([
        sprite("pages", {anim: "page"}),
        pos(385,170),
        scale(1),
        anchor("center"),
        opacity(1),
    ]);

    let p = 0;
    pages.stop();
    pages.frame = p;

    table.fadeIn(1);
    pages.fadeIn(1);

    const arrow_right_outline = add([
        sprite("arrow_right_outline"),
        pos(620,320),
        scale(0.8),
        anchor("center"),
        area(),
        opacity(0),
    ]);

    arrow_right_outline.onHoverUpdate(() => {
        arrow_right_outline.opacity = 1;
    });

    arrow_right_outline.onHoverEnd(() => {
        arrow_right_outline.opacity = 0;
    });

    const arrow_right = add([
        sprite("arrow_right"),
        pos(620,320),
        scale(0.8),
        anchor("center"),
        area(),
        opacity(1),
    ]);

    arrow_right.onHoverUpdate(() => {
        setCursor("pointer");
    });

    arrow_right.onClick(() => {
        if (p < 2) {
            flash(BLACK, 0.5);
            pages.frame = p + 1;
            p += 1;
        }
    });

    const arrow_left_outline = add([
        sprite("arrow_left_outline"),
        pos(150,320),
        scale(0.8),
        anchor("center"),
        area(),
        opacity(0),
    ]);

    arrow_left_outline.onHoverUpdate(() => {
        arrow_left_outline.opacity = 1;
    });

    arrow_left_outline.onHoverEnd(() => {
        arrow_left_outline.opacity = 0;
    });

    const arrow_left = add([
        sprite("arrow_left"),
        pos(150,320),
        scale(0.8),
        anchor("center"),
        area(),
        opacity(1),
    ]);

    arrow_left.onHoverUpdate(() => {
        setCursor("pointer");
    });

    arrow_left.onClick(() => {
        if (p > 0) {
            flash(BLACK, 0.5);
            pages.frame = p - 1;
            p -= 1;
        }
    });
    
    const picture_left = add([
        sprite("button"),
        pos(274,157),
        scale(1),
        anchor("center"),
        area(),
    ]);

    const picture_left_outline = add([
        sprite("button_outline"),
        pos(274,157),
        scale(1),
        anchor("center"),
        area(),
        opacity(0),
    ]);

    picture_left.onHoverUpdate(() => {
        if (p != 0) {
            setCursor("pointer");
            picture_left_outline.opacity = 1;
        }
    });

    picture_left.onHoverEnd(() => {
        if (p != 0) {
            setCursor("pointer");
            picture_left_outline.opacity = 0;
        }
    });

    picture_left.onClick(() => {
        if (p == 1) {
            if (c >= 2) {
                table.fadeOut(1);
                pages.fadeOut(1);
                destroy(picture_left_outline);
                wait(1.5, () => {
                    go("picture2");
                });
            } else {
                loquace.script([
                    "Tu devrais plutôt regarder les photos dans l'ordre !",
                ]);
                wait(3, () => {
                    loquace.clear();
                });
            }
        }
        if (p == 2) {
            if (c >= 4) {
                table.fadeOut(1);
                pages.fadeOut(1);
                destroy(picture_left_outline);
                wait(1.5, () => {
                    go("picture4");
                });
            } else {
                loquace.script([
                    "Tu devrais plutôt regarder les photos dans l'ordre !",
                ]);
                wait(3, () => {
                    loquace.clear();
                });
            }
        }
    });

    const picture_right = add([
        sprite("button"),
        pos(495,157),
        scale(1),
        anchor("center"),
        area(),
    ]);

    const picture_right_outline = add([
        sprite("button_outline"),
        pos(495,157),
        scale(1),
        anchor("center"),
        area(),
        opacity(0),
    ]);

    picture_right.onHoverUpdate(() => {
        setCursor("pointer");
        picture_right_outline.opacity = 1;
    });

    picture_right.onHoverEnd(() => {
        picture_right_outline.opacity = 0;
    });

    picture_right.onClick(() => {
        if (p == 0) {
            table.fadeOut(1);
            pages.fadeOut(1);
            destroy(picture_right_outline);
            wait(1.5, () => {
                go("picture1");
            });
        }
        if (p == 1) {
            if (c >= 3) {
                table.fadeOut(1);
                pages.fadeOut(1);
                destroy(picture_right_outline);
                wait(1.5, () => {
                    go("picture3");
                });
            } else {
                loquace.script([
                    "Tu devrais plutôt regarder les photos dans l'ordre !",
                ]);
                wait(3, () => {
                    loquace.clear();
                });
            }
        }
        if (p == 2) {
            if (c == 5) {
                table.fadeOut(1);
                pages.fadeOut(1);
                destroy(picture_right_outline);
                wait(1.5, () => {
                    go("picture5");
                });
            } else {
                loquace.script([
                    "Tu devrais plutôt regarder les photos dans l'ordre !",
                ]);
                wait(3, () => {
                    loquace.clear();
                });
            }
        }
    });

});

scene("picture1", () => {

    onUpdate(() => setCursor("default"));
    
    const picture2 = add([
        sprite("picture1"),
        pos(390,160),
        scale(1.3),
        anchor("center"),
        opacity(1),
    ]);

    const character = add([
        sprite("character"),
        pos(100,240),
        scale(1),
        anchor("center"),
        opacity(1),
    ]);

    picture2.fadeIn(1);
    character.fadeIn(1);

    wait(1, () => {
        loquace.script([
            "Sur cette photo, tu peux voir la maison où j’ai grandi avec mes deux sœurs et mes parents.",
            "Nous vivions presque tout au sud du pays, dans le delta du Gange.",
            "Mes parents étaient tous les deux agriculteurs, ils travaillaient dur.",
            "Ils ne gagnaient pas beaucoup d’argent mais assez pour que tout le monde ait pu manger à sa faim et pour que mes sœurs et moi ayons pu aller à l’école.",
            "J’avais pas mal d’amies autour de chez moi que je visitais presque tous les jours.",
            "J’étais heureuse, nous vivions une vie plutôt tranquille.",
        ]);
    });

    let s1 = 1;

    onClick(() => {
        loquace.next();
        s1 += 1;
        if (s1 > 6) {
            picture2.fadeOut(1);
            character.fadeOut(1);
            if (c == 1) {
                c += 1;
            }
            wait(1.5, () => {
                go("book");
            })
        }
    });

});

scene("picture2", () => {

    onUpdate(() => setCursor("default"));
    
    const picture2 = add([
        sprite("picture2"),
        pos(390,180),
        scale(1.3),
        anchor("center"),
        opacity(1),
    ]);

    const character = add([
        sprite("character"),
        pos(100,240),
        scale(1),
        anchor("center"),
        opacity(1),
    ]);

    picture2.fadeIn(1);
    character.fadeIn(1);

    wait(1, () => {
        loquace.script([
            "C’est une photo qui a été prise pas très loin de chez moi juste après le passage d’un cyclone.",
            "J’avais 6 ans à ce moment-là et c’était la première fois que j’avais été touchée pas un cyclone. ",
            "C’était terrifiant…",
            "Mais ce n’était pas la dernière fois.",
            "Au fur et à mesure que j’ai grandi, ils ont commencé à être plus fréquent et plus violents.",
            "À l’école, j’avais appris que c’était à cause du réchauffement climatique.",
        ]);
    });

    let s2 = 1;

    onClick(() => {
        loquace.next();
        s2 += 1;
        if (s2 > 6) {
            picture2.fadeOut(1);
            character.fadeOut(1);
            if (c == 2) {
                c += 1;
            }
            wait(1.5, () => {
                go("book");
            })
        }
    });

});

scene("picture3", () => {

    onUpdate(() => setCursor("default"));
    
    const picture3 = add([
        sprite("picture3"),
        pos(390,180),
        scale(1.3),
        anchor("center"),
        opacity(1),
    ]);

    const character = add([
        sprite("character"),
        pos(100,240),
        scale(1),
        anchor("center"),
        opacity(1),
    ]);

    picture3.fadeIn(1);
    character.fadeIn(1);

    wait(1, () => {
        loquace.script([
            "Voilà ma maison et celles des voisins vues du ciel.",
            "Comme tu peux le voir, elles sont presque inondées.",
            "Mais l’eau n’a pas toujours été aussi proche bien sûr, sinon nous ne vivrions pas ici.",
            "Il y avait même une plage avant, sauf que l’eau a commencé à monter petit à petit.",
            "Elle grignotait de plus en plus de terrain, notre maison était vouée à disparaître…",
            "Et c’était à cause d’une autre conséquence du réchauffement climatique.",
        ]);
    });

    let s3 = 1;

    onClick(() => {
        loquace.next();
        s3 += 1;
        if (s3 > 6) {
            picture3.fadeOut(1);
            character.fadeOut(1);
            if (c == 3) {
                c += 1;
            }
            wait(1.5, () => {
                go("book");
            })
        }
    });

});

scene("picture4", () => {

    onUpdate(() => setCursor("default"));
    
    const picture4 = add([
        sprite("picture4"),
        pos(390,180),
        scale(1.3),
        anchor("center"),
        opacity(1),
    ]);

    const character = add([
        sprite("character"),
        pos(100,240),
        scale(1),
        anchor("center"),
        opacity(1),
    ]);

    picture4.fadeIn(1);
    character.fadeIn(1);

    wait(1, () => {
        loquace.script([
            "La montée des eaux ne nous a laissé aucun choix, nous avons dû partir… ",
            "Partir c’était tout abandonner pour l’inconnu.",
            "Le voyage a duré plusieurs jours et nous avons dû prendre plusieurs bateaux.",
            "Nous nous dirigions vers la capitale, Dhaka.",
            "Le dernier bateau que nous avons pris était comme celui que tu peux voir sur la photo.",
            "À bord, nous avons rencontré d’autres familles qui avaient aussi dû tout laisser derrière elles.",
            "Nous n’étions pas les seuls, beaucoup de personnes étaient touchées par les mêmes problèmes.",
        ]);
    });

    let s4 = 1;

    onClick(() => {
        loquace.next();
        s4 += 1;
        if (s4 > 7) {
            picture4.fadeOut(1);
            character.fadeOut(1);
            if (c == 4) {
                c += 1;
            }
            wait(1.5, () => {
                go("book");
            })
        }
    });

});

scene("picture5", () => {

    onUpdate(() => setCursor("default"));
    
    const picture5 = add([
        sprite("picture5"),
        pos(390,180),
        scale(1.3),
        anchor("center"),
        opacity(1),
    ]);

    const character = add([
        sprite("character"),
        pos(100,240),
        scale(1),
        anchor("center"),
        opacity(1),
    ]);

    picture5.fadeIn(1);
    character.fadeIn(1);

    wait(1, () => {
        loquace.script([
            "Une fois arriver à Dhaka, j’étais d’abord très désorientée.",
            "Je n’étais pas habituée à autant de monde, à autant de trafic, et à autant de bruit.",
            "Mes parents avaient une connaissance qui vivait dans la capitale.",
            "Elle avait accepté de nous héberger le temps que nous trouvions un nouveau domicile.",
            "Ça a été très compliqué…",
        ]);
    });

    let s5 = 1;

    onClick(() => {
        loquace.next();
        s5 += 1;
        if (s5 > 5) {
            picture5.fadeOut(1);
            character.fadeOut(1);
            wait(1.5, () => {
                go("end");
            });
        }
    });

});

scene("end", () => {

    const table = add([
        sprite("table"),
        pos(380, 180),
        scale(2),
        anchor("center"),
        opacity(1),
    ]);

    const closedbook = add([
        sprite("book_closed"),
        pos(390, 280),
        scale(1.5),
        anchor("center"),
        opacity(1),
    ]);

    const character = add([
        sprite("character"),
        pos(100,240),
        scale(1),
        anchor("center"),
        opacity(1),
    ]);

    table.fadeIn(1);
    closedbook.fadeIn(1);
    character.fadeIn(1);

    wait(1.3, () => {
        loquace.script([
            "Voilà mon parcours en tant que déplacé climatique.",
            "Peut-être que tu n’es pas impacté de la même manière, mais tout le monde est concerné par le changement climatique.",
            "J’espère que tu n’auras jamais à traverser quelque chose de similaire. ",
            "Personne ne devrait…",
        ]);
    });

    let s6 = 1;

    onClick(() => {
        loquace.next();
        s6 += 1;
        if (s6 > 4) {
            table.fadeOut(1);
            closedbook.fadeOut(1);
            character.fadeOut(1);
            wait(3, () => {
                go("title");
            });
        }
    });

});


go("title");